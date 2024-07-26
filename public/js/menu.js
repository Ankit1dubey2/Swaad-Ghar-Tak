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

const addBtns = document.querySelectorAll(".item__add");

async function cartCount() {
  const url = `cart/count`;
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
  const url = `cart/${id}`;
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

addBtns.forEach((btn) => {
  btn.addEventListener("click", cartAdd);
});
