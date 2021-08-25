const db = require("../models");

const get = async (req, res) => {
  var product = await db.Product.findAll({
    order: [["createdAt", "DESC"]],
    include: { model: db.Package },
  });

  res.status(200).send(product);
}

const add = async (req, res) => {
  await db.Product.create({
    name: req.body.name,
    description: req.body.description,
    amount: 0,
    measure: req.body.measure,
    total: 0,
  });
  res.status(200).send("Submitted");
}

const update = async (req, res) => {
  var id = req.params.id;
  var product = await db.Product.findByPk(id);
  var amount = parseInt(req.body.amount) + product.amount;
  var total = parseInt(req.body.amount) + product.total;
  await db.Product.update(
    { amount: amount, total: total },
    {
      where: {
        id: id,
      },
    }
  );
  res.status(200).send("Submitted");
}

const product = {
  add: add,
  update: add,
  get: get
};

module.exports = product;