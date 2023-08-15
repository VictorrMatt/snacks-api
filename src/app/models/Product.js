class Product {
  constructor(nome, categoria, valor, url, id) {
    this.nome = nome;
    this.categoria = categoria;
    this.valor = valor;
    this.url = url;
    this.id = id;
  }

  createProductsObject(names, categorys, values, imageUrls) {
    const array = [];
    for (let index in names) {
      array.push({
        categoria: categorys[index],
        id: index,
        produto: names[index],
        imagem: imageUrls[index],
        valor: values[index],
      });
    }
    return array;
  }
  
  separateProductsByCategory(name, category, value, imageUrl) {
    const allCategories = {};

    for (let i in name) {
      if (allCategories.hasOwnProperty(category[i])) {
        allCategories[category[i]].push(
          name[i],
          category[i],
          value[i],
          imageUrl[i]
        );
      } else {
        allCategories[category[i]] = [category[i]];
      }
    }

    return allCategories;
  }

  concatTwoArrays(fArray, sArray) {
    const array = [];
    for (let index in fArray) {
      array.push(fArray[index].concat(sArray[index]));
    }
    return array;
  }
}

module.exports = Product;
