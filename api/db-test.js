require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DB_PRIMARY_CONNECTION_STRING, {
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if(err)
  const db = client.db("edwardsvilleMemorialTracker");
  db.collection("memorials").findOne({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    client.close();
  });
});
