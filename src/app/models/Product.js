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
  
separateProductsByCategory(names, categories, values, imageUrls) {
  const allCategories = {};

  for (let i in names) {
    const category = categories[i];
    if (allCategories.hasOwnProperty(category)) {
      allCategories[category].push(
        names[i],
        category,
        values[i],
        imageUrls[i]
      );
    } else {
      allCategories[category] = [
        names[i],
        category,
        values[i],
        imageUrls[i]
      ];
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
