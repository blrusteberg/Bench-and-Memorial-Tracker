// Update with your config settings.

module.exports = {
  development: {
    client: "mssql",
    connection: {
      user: process.env.SQL_SERVER_USER,
      password: process.env.SQL_SERVER_PASSWORD,
      server: process.env.SQL_SERVER,
      port: parseInt(process.env.SQL_SERVER_PORT, 10),
      database: process.env.SQL_DATABASE,
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
