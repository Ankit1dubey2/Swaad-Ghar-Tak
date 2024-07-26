const profile__menu = document.querySelector(".profile__menu");
const profileBtn = document.getElementById("profileBtn");


function toggleProfileDropdown(event) {
  event.target.classList.toggle("icon-hover"); 
  event.target.classList.toggle("icon-active");
  profile__menu.classList.toggle("profile__menu-active");
}

function closeProfileDropdown(event) {
  if (event.target.id != "profileBtn") {
    if (profile__menu.classList.contains("profile__menu-active")) {
      profileBtn.classList.remove("icon-active");
      profileBtn.classList.toggle("icon-hover");
      profile__menu.classList.remove("profile__menu-active");
    }
  }
}

profileBtn.addEventListener("click", toggleProfileDropdown);
document.addEventListener("click", closeProfileDropdown);

let addBtns = null;
async function cartCount() {
  const url = `${location.origin}/cart/count`;
  const cart = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await cart.json();
  const count = +response.items.length;
  const countSpan = document.getElementById("cartCount");
  countSpan.innerHTML = count;
  return;
}

async function postCart(id) {
  const url = `${location.origin}/cart/${id}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  cartCount(); 
  return;
}

function changetoTick(event) {
  event.target.innerHTML = "&check;";
  event.target.classList.add("item__ticked");
  return;
}
async function cartAdd(event) {
  let itemId = null;

  const btn = event.target;
  const children = btn.parentElement.children;
  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
  });
  changetoTick(event);
  await postCart(itemId);
  return;
}

function addBtnsEvent() {
  addBtns = document.querySelectorAll(".item__add");
  addBtns.forEach((btn) => {
    btn.addEventListener("click", cartAdd);
  });
}

const searchInput = document.getElementById("searchInput");
const resultGrid = document.getElementById("resultGrid");
let str = "";
async function getSearch(value) {
  const url = `${location.origin}/menu/search?name=${value}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  resultUpdate(result);
}
function resultUpdate(result) {
  if (!(result.items.length > 0)) {
    return (resultGrid.innerHTML = `<p class="result__alt">Not Found</p>`);
  }

  Array.from(result.items).forEach((item) => {
    const isUnitString = () => {
      if (
        item.unit == "Plate" ||
        item.unit == "Piece" ||
        item.unit == "Glass" ||
        item.unit == "Cup" ||
        item.unit == "Pound"
      ) {
        return item.unit;
      } else {
        return item.serve + " " + item.unit;
      }
    };

    str += `<div class="menu__item menu__item-shadow">
    <div class="item__header">
      <img
        src="${item.image}"
        class="item__image"
        alt="${item.name} "
      />
    </div>
    <div class="item__body">
      <h4 class="item__name">${item.name}</h4>
      <div class="info__add__wrapper">
        <div class="info__wrapper">
          <p class="item__price">&#8377;${item.price}</p>
          <p class="item__unit">Per ${isUnitString()} </p>
        </div>
        <div class="add__wrapper">
          <input type="hidden" id="itemId" value="${item.itemId}"> 
          <button class="item__add">+</button>
        </div>
      </div>
    </div>
  </div>`;
  });
  resultGrid.innerHTML = str;
  addBtnsEvent();
  str = "";
  return;
}
function searchItems(event) {
  resultGrid.innerHTML = "";
  const value = event.target.value;
  if (!(value.length > 1)) {
    return;
  }
  getSearch(value);
  return;
}
window.onload = function () {
  searchInput.focus();
};
searchInput.addEventListener("keyup", searchItems);