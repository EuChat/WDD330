import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  let _item = item;
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${_item.Image}"
        alt="${_item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${_item.Name}</h2>
    </a>
    <p class="cart-card__color">${_item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${_item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
