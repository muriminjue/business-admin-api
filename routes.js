// import modules
const express = require("express");
const router = express.Router();
const multer = require("multer");

// import funtions and contollers
const product = require("./controllers/product");
const package = require("./controllers/package");
const staff = require("./controllers/staff");
const user = require("./controllers/user");
const upload = multer();



// products
router.get("/products", product.get);

router.post("/products", product.add);
router.post("/products/:id", product.update);

// packges
router.get("/packages", package.get);
router.post("/packages", package.add);

//get stocking trasnsactions
/*router.get("/stocktransact", async (req, res) => {
  var product = await db.stock_transanction.findAll();
  res.send(product);
});

//get record of packing activities
router.get("/Packingrec", async (req, res) => {
  var product = await db.Packing_rec.findAll();
  res.send(product);
});*/

// staff
router.get("/staff", user.ensureAuth, staff.get);
router.post("/staff", upload.single("file"), staff.add);

// users
router.post("/user/register", user.create);
router.post("/user/login", user.login)

router.get("/headers", (req, res) => {
  res.send(req.headers['authorization'])
})

module.exports = router;
