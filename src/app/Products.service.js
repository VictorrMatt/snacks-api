const ProductsRepository = require("./Products.repository");
const productsRepository = new ProductsRepository();

// Recebendo objeto responsável por fazer o Web Scraping dos Dados para mandar para o banco
const Scraper = require("./utils.js/scraper");
// Entidade que está contida em banco
const Product = require("./models/Product");

class ProductsService {
  updateAllProducts = async () => {
    // Início da raspagem
    const scraper = new Scraper();
    await scraper.initialize();

    const productsData = await scraper.scrapeData();
    scraper.close();
    // Fim -> Enviando os dados raspados para o banco

    const product = new Product();
    const allProducts = product.concatTwoArrays(
      productsData[0],
      productsData[1]
    );

    const formatedProducts = product.createProductsObject(
      allProducts[0],
      allProducts[1],
      allProducts[2],
      allProducts[3]
    );

    const response = await productsRepository.updateAllProducts(
      formatedProducts
    );

    let organizedCategories = product.separateProductsByCategory(
      allProducts[0],
      allProducts[1],
      allProducts[2],
      allProducts[3]
    );

    return organizedCategories;
  };

  readAllProducts = async () => {
    const response = await productsRepository.readAllProducts();

    // Desestruturando os objetos no array
    const unstructuredData = response.map(
      ({ categoria, id, produto, imagem, valor }) => {
        return { categoria, id, produto, imagem, valor };
      }
    );

    const product = new Product();
    let organizedCategories = product.separateProductsByCategory(
      unstructuredData.map(item => item.produto),
      unstructuredData.map(item => item.categoria),
      unstructuredData.map(item => item.valor),
      unstructuredData.map(item => item.imagem)
    );

    return organizedCategories;
  };

  findProductById = async (id) => {
    const response = await productsRepository.findProductById(id);
    return response;
  };
}

module.exports = ProductsService;
