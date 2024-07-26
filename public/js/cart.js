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


const decBtns = document.querySelectorAll(".dec");
const incBtns = document.querySelectorAll(".inc");
const removeBtns = document.querySelectorAll(".remove__item");

async function patchCart(id, newQty) {
  const url = `cart/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      qty: newQty,
    }),
  });
  location.reload();
}

async function deleteCart(id) {
  const url = `cart/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  location.reload();
}

function decQty(event) {
  let itemId = null;
  let currentQty = null;

  const btn = event.target;
  const children = btn.parentElement.children;

  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
    if (element.id == "qty") {
      currentQty = +element.value;
    }
  });
  const newQty = currentQty - 1;
  if (newQty == 0) {
    deleteCart(itemId);
  } else {
    patchCart(itemId, newQty);
  }
}

function incQty(event) {
  let itemId = null;
  let currentQty = null;

  const btn = event.target;
  const children = btn.parentElement.children;

  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
    if (element.id == "qty") {
      currentQty = +element.value;
    }
  });
  const newQty = currentQty + 1;
  patchCart(itemId, newQty);
}

function removeItem(event) {
  let itemId = null;

  const btn = event.target;
  const children = btn.parentElement.parentElement.children;

  Array.from(children).forEach((element) => {
    if (element.id == "itemId") {
      itemId = element.value;
    }
  });
  deleteCart(itemId);
}

decBtns.forEach((btn) => {
  btn.addEventListener("click", decQty);
});

incBtns.forEach((btn) => {
  btn.addEventListener("click", incQty);
});

removeBtns.forEach((btn) => {
  btn.addEventListener("click", removeItem);
});


let addressInput = document.getElementById("newAddress");
let updateBtn = document.getElementById("updateBtn");
let editBtn = document.getElementById("editBtn");
let addressContainer = document.getElementById("addressContainer");
let proceedContainer = document.getElementById("proceedContainer");

function getvariables() {
  addressInput = document.getElementById("newAddress");
  updateBtn = document.getElementById("updateBtn");
}

async function patchAddress(newAddress) {
  const url = "/user/u/address";
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newValue: newAddress,
    }),
  });
  location.reload();
}

function updateAddress() {
  const newAddress = addressInput.value;
  patchAddress(newAddress);
}

function editAddress() {
  addressContainer.innerHTML = `<input type="text" id="newAddress" name="address" class="address__input" placeholder="Enter your address" spellcheck="false">
  <button class="update__btn" id="updateBtn">Update</button>`;
  proceedContainer.innerHTML = `<input type="button" class="proceed__btn" title="Please update your address before placing order." value="Place Order&#9205;">`;
  getvariables(); 
  updateBtn.addEventListener("click", updateAddress);
}

if (updateBtn) {
  updateBtn.addEventListener("click", updateAddress);
}

if (editBtn) {
  editBtn.addEventListener("click", editAddress);
}

const itemName = document.getElementById("itemName").value.split(",");
const itemServe = document.getElementById("itemServe").value.split(",");
const itemQty = document.getElementById("itemQty").value.split(",");
const itemPrice = document.getElementById("itemPrice").value.split(",");
const subTotal = document.getElementById("subTotal").value;
const tax = document.getElementById("tax").value;
const deliveryCharge = document.getElementById("deliveryCharge").value;
const grandTotal = document.getElementById("grandTotal").value;

const placeOrderBtn = document.getElementById("placeOrderBtn");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");


function popupActive() {
  popup.classList.add("active");
  overlay.classList.add("active");
  return;
}


async function clearCart(orderId) {
  const url = `/cart/clear/all`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId: orderId,
    }),
  });
  popupActive();
  const reloadPage = setTimeout(() => {
    location.reload();
  }, 2200);
}
async function postOrder(items, bill) {
  const url = `/orders/new`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: items,
      bill: bill,
    }),
  });
  const order = await response.json();
  clearCart(order._id);
}

function placeOrder() {
  let items = [];
  for (let i = 0; i < itemName.length; i++) {
    items.push({
      itemName: itemName[i],
      itemServe: itemServe[i],
      itemQty: itemQty[i],
      itemPrice: itemPrice[i],
    });
  }
  const bill = { subTotal, tax, deliveryCharge, grandTotal };
  postOrder(items, bill);
}
placeOrderBtn.addEventListener("click", placeOrder);
