const fs = require("fs").promises;

const express = require("express");
const server = express();

const products = [
  { id: 1, name: "meat", price: 12.3, count: 12 },
  { id: 2, name: "milk", price: 3.0, count: 4 },
  { id: 3, name: "apple", price: 1.0, count: 33 },
  { id: 4, name: "orange", price: 2.0, count: 23 }
];

server.get("/products", function (req, res) {
  const count = parseInt(req.query.count);
  const offset = parseInt(req.query.offset);
  if (count && offset) {
    res.send({
      products: products.slice(offset, offset + count),
      count: products.length
    });
  } else {
    res.json(products);
  }
});

server.get("/products/:id", function (req, res) {
  const product = products.find(
    (product) => product.id === Number(req.params.id)
  );
  if (!product) {
    res.status(404).send("404 NOT FOUND");
  }
  res.status(200).json(product);
});

server.listen(3000, () => {
  console.log("true");
});
