const fs = require('fs');
const path = require('path');
const Cart = require("../models/cart");

module.exports.getMenu = async (req, res) => {
  console.log("Fetching menu from JSON file"); 

  let myCss = [];
  myCss.push({
    uri: "/css/menu.css",
  });

  const user = res.locals.user;
  const cart = await Cart.findOne({ userId: user._id });

  const filePath = path.join(__dirname, 'testmenu.json');
  console.log(`Reading menu items from: ${filePath}`);
  const jsonData = fs.readFileSync(filePath);
  const items = JSON.parse(jsonData);

  res.render("menu", {
    title: "EatEasy",
    styles: myCss,
    items: items,
    cart: cart,
  });
};

module.exports.getSearch = async (req, res) => {
  console.log("Performing search from JSON file"); 

  const name = req.query.name;

  if (!name) {
    let myCss = [];
    myCss.push({
      uri: "/css/search.css",
    });

    const user = res.locals.user;
    const cart = await Cart.findOne({ userId: user._id });

    return res.render("search", {
      title: "Search - EatEasy",
      styles: myCss,
      cart: cart,
    });
  }

  const filePath = path.join(__dirname, 'testmenu.json');
  console.log(`Reading menu items from: ${filePath}`); 
  const jsonData = fs.readFileSync(filePath);
  const items = JSON.parse(jsonData);

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));

  res.json({ items: filteredItems });
};
