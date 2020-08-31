require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DB_PRIMARY_CONNECTION_STRING, {
  useUnifiedTopology: true,
});

class MemorialDb {
  static getMemorials = () => {
    client.connect((err, client) => {
      const db = client.db("edwardsvilleMemorialTracker");
      db.collection("memorials").find({}, (err, result) => {
        client.close();
        return err ? err : result;
      });
    });
  };
}

module.exports = MemorialDb;
