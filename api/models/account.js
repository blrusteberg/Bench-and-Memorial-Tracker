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
      required: ["Id"],
      properties: {
        Id: { type: "string" },
        email: {type: "string"},
        password: {type: "string"},
        accountType: {
            type: "string",
            enum: ["tagger", "clerk", "admin"]}
      },
    };
  }
}

module.exports = Accounts;