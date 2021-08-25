const db = require("../models");

const get = async (req, res) => {
    var product = await db.Package.findAll({ include: { model: db.Product } });
    res.send(product);
}

const add = async (req, res) => {
    await db.Package.create({
        productId: req.body.product,
        quantity: parseInt(req.body.quantity),
        number: 0,
        price: parseInt(req.body.price),
    });
    res.status(200).send("Submitted");
}

const package = {
    get: get,
    add: add
}
module.exports = package;