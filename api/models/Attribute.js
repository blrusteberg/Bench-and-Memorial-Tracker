const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class Attribute extends Model {
  static get tableName() {
    return "Attributes";
  }

  static get idColumn() {
    return "Id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["Name", "ValueType"],
      properties: {
        Name: { type: "string" },
        ValueType: {
          type: "string",
          enum: ["Yes/No", "Words", "Date", "Number"],
        },
      },
    };
  }

  static get relationMappings() {
    const Value = require("./Value");
    const Type = require("./Type");

    return {
      Values: {
        relation: Model.HasManyRelation,
        modelClass: Value,
        join: {
          from: "Attributes.Id",
          to: "Values.AttributeId",
        },
      },

      Types: {
        relation: Model.ManyToManyRelation,
        modelClass: Type,
        join: {
          from: "Attributes.Id",
          through: {
            from: "Types_Attributes.AttributeId",
            to: "Types_Attributes.TypeId",
            extra: ["Required"],
          },
          to: "Types.Id",
        },
      },
    };
  }
}

module.exports = Attribute;
