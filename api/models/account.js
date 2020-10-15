const { Model } = require("objection");
const knex = require("../db/knex");

Model.knex(knex);

class Accounts extends Model {
  static get tableName() {
    return "Accounts";
  }

  static get idColumn() {
    return "Id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        Id: { type: "string" },
        Username: {type: "string"},
        Password: {type: "string"},
        AccountType: {
            type: "string",
            enum: ["tagger", "clerk", "admin"]},
        DelAccess: {type: "bit"}
      },
    };
  }
}

module.exports = Accounts;