const MemorialService = require("../services/memorial.services");
const TypeServices = require("../services/type.services");
const AttributeServices = require("../services/attribute.services");
const ValueServices = require("../services/value.services");

class MemorialController {
  constructor() {
    this.memorialService = new MemorialService();
    this.typeService = new TypeServices();
    this.attributeService = new AttributeServices();
    this.valueService = new ValueServices();
  }

  getMemorialsWithTypeWithAttributesWithValues = async (req, res) => {
    try {
      const memorials = await this.memorialService
        .getMemorials()
        .orderBy("Name");

      await Promise.all(
        memorials.map(async (memorial) => {
          memorial.Type = await this.typeService.getType(memorial.TypeId);
        })
      );

      await Promise.all(
        memorials.map(async (memorial) => {
          memorial.Type.Attributes = await this.typeService
            .getAttributesOfType(memorial.TypeId)
            .orderBy("Name");
        })
      );

      await Promise.all(
        memorials.map(async (memorial) => {
          await Promise.all(
            memorial.Type.Attributes.map(async (attribute) => {
              const value = await this.valueService.getValueByMemorialIdAndByAttributeId(
                memorial.Id,
                attribute.Id
              );
              value.Value = JSON.parse(value.Value);
              attribute.Value = value;
            })
          );
        })
      );

      memorials.forEach((memorial) => {
        memorial.Type.Attributes = this.sortAttributesLatLngFirst(
          memorial.Type.Attributes
        );
      });

      res.status(200).json(memorials);
    } catch (err) {
      Error.errorHandler(err, res);
    }
  };

  sortAttributesLatLngFirst = (attributes) => {
    const sortedAttributes = [];
    for (let i = attributes.length - 1; i > -1; i--) {
      const attribute = attributes[i];
      const attributeName = attribute.Name.toLowerCase();
      attributeName === "latitude" || attributeName === "longitude"
        ? sortedAttributes.unshift(attribute)
        : sortedAttributes.push(attribute);
    }
    return sortedAttributes;
  };
}
module.exports = MemorialController;
