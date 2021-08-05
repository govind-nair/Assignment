//a Separate responsibility  for  Product  HTTP request handling

var Product = require("../dal/productsdal");

exports.getAll = function (req, res) {
  console.log("calling controller function");
  Product.getAllProduct(function (err, aProduct) {
    if (err) res.send(err);
    res.send(aProduct);
  });
};

exports.insert = function (req, res) {
  var aProduct = new Product(req.body);
  console.log(req.body);

  //handles null error
  if (!aProduct.name || !aProduct.unit_price) {
    res.status(400).send({
      error: true,
      message: "Please provide name and price for aProduct",
    });
  } else {
    Product.createProduct(aProduct, function (err, data) {
      if (err) res.send(err);
      res.json(data);
    });
  }
};

exports.getBy = function (req, res) {
  Product.getProductById(req.params.id, function (err, aProduct) {
    if (err) res.send(err);
    res.json(aProduct);
  });
};

exports.update = function (req, res) {
  Product.updateById(
    req.params.id,
    new Product(req.body),
    function (err, aProduct) {
      if (err) res.send(err);
      res.json(aProduct);
    }
  );
};

exports.remove = function (req, res) {
  Product.remove(req.params.id, function (err, aProduct) {
    if (err) res.send(err);
    res.json({ message: "aProduct successfully deleted" });
  });
};
