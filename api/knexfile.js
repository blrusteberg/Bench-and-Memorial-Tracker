// Update with your config settings.

module.exports = {
  development: {
    client: "mssql",
    connection: {
      user: "test_user",
      password: "password",
      server: "192.168.1.2",
      port: 1433,
      database: "EdwardsvilleMemorialTracker",
    },
  },

  production: {
    client: "mssql",
    connection: {
      server: process.env.SQL_SERVER,
      user: process.env.SQL_SERVER_USER,
      password: process.env.SQL_SERVER_PASSWORD,
      options: {
        port: process.env.SQL_SERVER_PORT,
        database: process.env.SQL_DATABASE,
        encrypt: true,
      },
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds/test",
    },
  },
};
