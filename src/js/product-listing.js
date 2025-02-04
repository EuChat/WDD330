import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParam, setLocalStorage } from "./utils.mjs";

// let category = "tents";
let category = getParam("category");
setLocalStorage("category", category)
let targetList = document.querySelector(".product-list");
let Info = new ProductData(category);
let List = new ProductListing(category, Info, targetList);

List.init();

// <a href="/product_pages/index.html?product=${product.Name}">
