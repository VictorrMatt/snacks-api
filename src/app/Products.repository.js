const knex = require("knex");
const knexConf = require("../db/knexfile");
const connect = knex(knexConf.development);

class ProductsRepository {
  updateAllProducts = async (data) => {
    await connect("products").delete();
    const dataResp = await connect("products").insert(data);
    return dataResp;
  };

  readAllProducts = async () => {
    const dataResp = await connect("products");
    return dataResp;
  };

  findProductById = async (id) => {
    const dataResp = await connect("products").where({ id });
    return dataResp;
  };
}

module.exports = ProductsRepository;
