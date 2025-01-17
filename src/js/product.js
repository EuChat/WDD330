import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const storedCart = localStorage.getItem("so-cart");
  console.log("Stored cart in local storage:", storedCart);

  const currentCart = JSON.parse(storedCart) || [];
  console.log("Parsed cart:", currentCart);

  if (!Array.isArray(currentCart)) {
    console.error("Error: Parsed cart is not an array. Resetting to an empty array.");
    localStorage.removeItem("so-cart"); // Clear the corrupted data
    currentCart = []; // Reset the cart
  }

  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
}


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
