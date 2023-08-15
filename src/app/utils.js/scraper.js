const puppeteer = require("puppeteer");

class Scraper {
  constructor() {
    this.browser = null;
  }

  async initialize() {
    this.browser = await puppeteer.launch({headless: true,});
  }

  async close() {
    await this.browser.close();
  }

  async scrapeData() {
    // Inicialização do Puppeteer e navegação para a página desejada:
    const page = await this.browser.newPage();
    await page.goto(
      "https://sampetiscaria.smartpos.app/?categoria=&nome=Todas+as+categorias",
      { timeout: 120000 }
    );
    await page.waitForSelector(".sc-pVTFL");
    // Esperando a página carregar e encontrar os elementos:
    const arrayOfProducts = [];

    let catalogContainer = await page.$$(".sc-pVTFL");
    const products = await this.gettingAllData(catalogContainer);

    const thereIsAnotherPage = await this.checkIfClassExists(page);
    if (thereIsAnotherPage) {
      await this.nextPage(page);

      catalogContainer = await page.$$(".sc-pVTFL");
      const otherProducts = await this.gettingAllData(catalogContainer);

      // Enviando ambas as páginas para a mesma array e retornando
      arrayOfProducts.push(products, otherProducts);
      return arrayOfProducts;
    }

    return products;
  }

  async gettingAllData(catalog) {
    const array = [];
    const productsName = await this.gettingDataFromClassNames(
      ".sc-bqiRlB",
      catalog
    ); // Nome dos produtos
    const productsCategory = await this.gettingDataFromPseudoClasses(
      ".sc-crHmcD",
      catalog
    ); // Categoria dos produtos
    const productsValue = await this.gettingDataFromPseudoClasses(
      ".sc-fotOHu",
      catalog
    ); // Valor dos itens
    const productsImagesUrls = await this.gettingImagesUrls("img", catalog);
    array.push(
      productsName,
      productsCategory,
      productsValue,
      productsImagesUrls
    );
    return array;
  }

  //   Esta é a função responsável por obter o conteúdo da pseudo-classe ::after para cada elemento .sc-fotOHu dentro dos elementos .sc-pVTFL. */
  async gettingDataFromPseudoClasses(pseudoClass, elements) {
    const array = [];
    for (let eachElement of elements) {
      //  Nesta parte, estamos usando o método evaluate() para executar código JavaScript na página. Passamos uma função que será executada no contexto da página (dentro do navegador controlado pelo Puppeteer). Os argumentos elementSelector e pseudoClass são passados para a função interna através do último parâmetro da evaluate().*/
      const computedStyle = await eachElement.evaluate(
        (currentElement, pseudoClass) => {
          // Dentro da função evaluate(), estamos navegando para o elemento .sc-fotOHu dentro do elemento .sc-pVTFL usando elementSelector.querySelector(pseudoClass). Em seguida, utilizamos window.getComputedStyle() para obter os estilos computados do elemento ::after. Finalmente, removemos as aspas do valor do content para obter o conteúdo real da pseudo-classe.
          const element = currentElement.querySelector(pseudoClass);
          const afterContent = window.getComputedStyle(
            element,
            "::after"
          ).content;
          return afterContent.replace(/"/g, "");
        },
        pseudoClass
      );
      array.push(computedStyle);
    }
    return array;
  }

  async gettingDataFromClassNames(className, elements) {
    const array = [];
    for (let eachElement of elements) {
      const computedStyle = await eachElement.evaluate(
        (currentElement, elementClass) => {
          const element = currentElement.querySelector(elementClass);
          return element ? element.textContent : null;
        },
        className
      );
      array.push(computedStyle);
    }
    return array;
  }

  async gettingImagesUrls(tagName, elements) {
    const array = [];
    for (let eachElement of elements) {
      const computedStyle = await eachElement.evaluate(
        (currentElement, elementTag) => {
          const element = currentElement.querySelector(elementTag);
          return element ? element.getAttribute("src") : null;
        },
        tagName
      );
      array.push(computedStyle);
    }
    return array;
  }

  // checkar se temos conteudo na próxima página
  async checkIfClassExists(page) {
    // Esperar a tag com a classe desejada estar presente na página.
    const classExists = await page.evaluate(() => {
      // Substitua "sua-classe" pela classe que você deseja verificar.
      const element = document.querySelector(".next");
      const haveDisabled = element.classList.contains("disabled");
      if (haveDisabled) {
        return false;
      } else {
        return true;
      }
    });
    return classExists;
  }

  // avançando para a prócima página
  async nextPage(page) {
    // Esperando o botão next ficar pronto para irmos á próxima página.
    await page.waitForSelector(".next");
    await page.click(".next");
    await page.waitForTimeout(2000); // Tempinho de espera até que o evento seja concluído
  }
}

module.exports = Scraper;
