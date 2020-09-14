const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class Type extends Model {
  static get tableName() {
    return "Types";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["Name"],
      properties: {
        Name: { type: "string" },
      },
    };
  }

  static get idColumn() {
    return "Id";
  }

  static get relationMappings() {
    const Memorial = require("./Memorial");
    const Attribute = require("./Attribute");

    return {
      Memorials: {
        relation: Model.HasManyRelation,
        modelClass: Memorial,
        join: {
          from: "Types.Id",
          to: "Memorials.TypeId",
        },
      },

      Attributes: {
        relation: Model.ManyToManyRelation,
        modelClass: Attribute,
        join: {
          from: "Types.Id",
          through: {
            from: "Types_Attributes.TypeId",
            to: "Types_Attributes.AttributeId",
          },
          to: "Attributes.Id",
        },
      },
    };
  }
}

module.exports = Type;
