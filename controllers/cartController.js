const Item = require("../models/menu");
const Cart = require("../models/cart");

module.exports.getCart = async (req, res) => {
  let myCss = [];
  myCss.push({
    uri: "/css/cart.css",
  });

  const user = res.locals.user;
  const cart = await Cart.findOne({ userId: user._id });

  const items = await Item.find({});

  res.render("cart", {
    title: "EatEasy",
    styles: myCss,
    items: items,
    cart: cart,
  });
};

module.exports.getCount = async (req, res) => {
  const user = res.locals.user;
  const cart = await Cart.findOne({ userId: user._id });

  res.send(cart);
};

module.exports.postCart = async (req, res) => {
  const itemId = req.params.id;
  const user = res.locals.user;
  //Checking if user has cart
  const cart = await Cart.findOne({ userId: user._id });
  if (!cart) {
    const cartNew = new Cart({
      userId: user._id,
      items: { itemId: itemId, qty: 1 },
    });
    await cartNew.save();
    return res.redirect("/menu");
  }

  const isExist = await Cart.findOne({
    userId: user._id,
    "items.itemId": itemId,
  });
  if (isExist) {
    return res.redirect("/menu");
  }
  cart.items.push({ itemId: itemId, qty: 1 });
  await cart.save();
  return res.redirect("/menu");
};

module.exports.patchCart = async (req, res) => {
  const id = +req.params.id;
  const user = res.locals.user;
  const newQty = req.body.qty;


  await Cart.findOneAndUpdate(
    { userId: user._id, "items.itemId": id },
    { $set: { "items.$.qty": newQty } }
  );
  res.send("Item Updated");
};

module.exports.deleteCart = async (req, res) => {
  const id = +req.params.id;
  const user = res.locals.user;
  await Cart.findOneAndUpdate(
    { userId: user._id },
    { $pull: { items: { itemId: id } } }
  );
  res.redirect("/cart");
};

module.exports.clearCart = async (req, res) => {
  const user = res.locals.user;
  await Cart.deleteOne({ userId: user._id });
  res.send("Cart Cleared");
};
