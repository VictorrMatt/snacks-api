const { URI } = require("./utils.js/routeAnnotation");
const ProductsService = require("./Products.service");

const productsService = new ProductsService();

const updateAllProducts = async (req, res) => {
  const response = await productsService.updateAllProducts();
  res.status(200).json(response);
  return response;
};

const readAllProducts = async (req, res) => {
  const response = await productsService.readAllProducts();
  res.status(200).json(response);
  return response;
};

const findProductById = async (req, res) => {
  const id = req.params.id;
  const response = await productsService.findProductById(id);
  res.status(200).json(response);
  return response;
};

module.exports = {
  updateAllProducts: URI("/products", "PUT")(updateAllProducts),
  readAllProducts: URI("/products", "GET")(readAllProducts),
  findProductById: URI("/products/:id", "GET")(findProductById),
};
