function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData() {
    let result = await fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
    if (this.category == "tents") {
      result;
    }
    else {
      result = await result.Result
    }
    return result;
  }
  async findProductById(id) {
    let products = await this.getData();
    let result = products.find((item) => item.Id == id);
    return result;
  }
  async findProductByName(name) {
    const products = await this.getData();
    let theName = await name;
    let result = await products.find((item) => item.Name == theName);
    return result;
  }
}
