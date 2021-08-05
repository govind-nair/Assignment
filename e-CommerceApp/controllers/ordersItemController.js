//a Separate responsibility  for  Flowers  HTTP request handling

var OrderItem = require("../dal/orderitemsdal");

exports.getAll = function (req, res) {
  console.log("calling controller function");
  OrderItem.getAllOrderItem(function (err, orderItem) {
    if (err) res.send(err);
    res.send(orderItem);
  });
};

exports.insert = function (req, res) {
  var newOrderItem = new OrderItem(req.body);
  console.log(newOrderItem);

  //handles null error
  if (!newOrderItem.product_id || !newOrderItem.order_id) {
    res
      .status(400)
      .send({ error: true, message: "Please provide prod id and order id" });
  } else {
    OrderItem.createOrderItem(newOrderItem, function (err, orderItem) {
      if (err) res.send(err);
      res.json(orderItem);
    });
  }
};

exports.getBy = function (req, res) {
  Flower.getFlowerById(req.params.id, function (err, flower) {
    if (err) res.send(err);
    res.json(flower);
  });
};

exports.update = function (req, res) {
  OrderItem.updateById(
    req.params.id,
    new orderItem(req.body),
    function (err, orderItem) {
      if (err) res.send(err);
      res.json(orderItem);
    }
  );
};

exports.remove = function (req, res) {
  OrderItem.remove(req.params.id, function (err, orderItem) {
    if (err) res.send(err);
    res.json({ message: "Flower successfully deleted" });
  });
};
