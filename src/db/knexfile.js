// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "products_ojxf",
      user: "product",
      password: "TVMuTxij3aSv7FayE6nNJ2iftaHYtpML",
      host: "dpg-cj5e3bqvvtos738b9vh0-a",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
