import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  let output = "";
  let determiner = getLocalStorage("category");
  if (determiner == "tents") {//in this case it is the category of tents
    output = `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;

  } else {//in thi scase it i snot the category of tents
    output = `<section class="product-detail"> <h3>${product.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryMedium}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;

  }


  return output;

}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductByName(this.productId);
    // once we have the product details we can render out the HTML
    // this.renderProductDetails("main");
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    try {
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } catch (error) {
      window.console.log(error);

    }
  }
  addToCart() {
    // setLocalStorage("so-cart", this.product); // broken code!
    // Retrieve the existing cart from local storage
    let currentCart = JSON.parse(localStorage.getItem("so-cart")) || [];
    try {
      let itemIndex = currentCart.indexOf((this.product));
      window.console.log(itemIndex)
    } catch { window.console.log("") }
    // Add the new product to the cart
    this.product.quantity = 1;
    currentCart.push(this.product);

    setLocalStorage("so-cart", currentCart);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.innerHTML = productDetailsTemplate(this.product)
    return element;
  }
}
