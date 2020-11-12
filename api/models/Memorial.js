const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class Memorial extends Model {
  static get tableName() {
    return "Memorials";
  }

  static get idColumn() {
    return "Id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["TypeId"],
      properties: {
        TypeId: { type: "string" },
        Name: { type: "string" },
        Status: {
          type: "string",
          enum: ["unapproved", "approved", "on hold", "live"],
        },
        Image: { type: "string" },
        DateRecorded: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Type = require("./Type");
    const Value = require("./Value");

    return {
      Type: {
        relation: Model.BelongsToOneRelation,
        modelClass: Type,
        join: {
          from: "Memorials.TypeId",
          to: "Types.Id",
        },
      },

      Values: {
        relation: Model.HasManyRelation,
        modelClass: Value,
        join: {
          from: "Memorials.Id",
          to: "Values.MemorialId",
        },
      },
    };
  }
}

module.exports = Memorial;
