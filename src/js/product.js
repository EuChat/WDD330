import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { setLocalStorage, getParam, LoadHeaderFooter, getLocalStorage } from "./utils.mjs";

LoadHeaderFooter();


const dataSource = new ProductData(getLocalStorage("category"));

const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);

product.init();

function addProductToCart(_product) {
  // Retrieve the existing cart from local storage
  let currentCart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Add the new product to the cart
  currentCart.push(_product);

  setLocalStorage("so-cart", currentCart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  // const product = await dataSource.findProductById(e.target.dataset.id);
  let __product = await dataSource.findProductById(e);
  addProductToCart(__product);
}

try {
  // preventing an error from  showing when on main page
  // add listener to Add to Cart button
  let cartButton = document.getElementById("addToCart");
  // cartButton.addEventListener("click", () => { addToCartHandler }); old broken code on this line
  cartButton.addEventListener("click", () => {
    addToCartHandler(cartButton.value);
  });
  // console.log(cartButton)
} catch (error) {
  window.console.log(error);
}
