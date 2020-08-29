const config = {
  endpoint: process.env.DB_ENDPOINT,
  key: process.env.PRIMARY_PASSWORD,
  databaseId: process.env.DB_ID,
  containerId: process.end.DB_COLLECTIONS_ID,
};

module.exports = config;
