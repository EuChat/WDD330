// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
};


export function LoadHeaderFooter() {
  const templateHead = "/public/partials/header.html";
  let header = document.querySelector("#mainHeader");
  LoadData(templateHead, header);


  const templateFoot = "/public/partials/footer.html";
  let footer = document.querySelector("#mainFooter");
  LoadData(templateFoot, footer);

  LoadSuper();
};

async function LoadData(path, target) {
  let data = await fetch(path);
  let html = await data.text();
  target.innerHTML = html
};
function LoadSuper() {
  let num = document.querySelector("header");
  let num2 = num.querySelector("div");

  window.console.log(num);
  window.console.log(num2);
};
