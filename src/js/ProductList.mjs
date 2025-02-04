function productCardTemplate(product) {
  let card = ""
  try {
    card = `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Name}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
    </li>`}
  catch {
    card = `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Name}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
    </li>`
  }
  return card;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list - to be completed
    this.renderList(list)
  }

  renderList(list) {
    try {
      let theList = list.map((item) => productCardTemplate(item));
      document.querySelector(".product-list").innerHTML = theList.join("");
    } catch (error) {
      window.console.log(error);

    }
  }
}