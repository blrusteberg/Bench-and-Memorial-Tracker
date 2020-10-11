const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class Value extends Model {
  static get tableName() {
    return "Values";
  }

  static get idColumn() {
    return "Id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["AttributeId", "MemorialId"],
      properties: {
        Value: { type: "string" },
        AttributeId: { type: "string" },
        MemorialId: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Attribute = require("./Attribute");
    const Memorial = require("./memorial");

    return {
      Attribute: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attribute,
        join: {
          from: "Values.AttributeId",
          to: "Attributes.Id",
        },
      },

      Memorial: {
        relation: Model.BelongsToOneRelation,
        modelClass: Memorial,
        join: {
          from: "Values.MemorialId",
          to: "Memorials.Id",
        },
      },
    };
  }
}

module.exports = Value;
