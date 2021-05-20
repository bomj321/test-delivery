"user strict";

let express = require("express");
let router = express.Router();
let ProductsController = require("../controllers/products");

//Users routes
router.put("/products/:productId", ProductsController.update);
router.get("/products/:page?/:pageSize?", ProductsController.getProducts);

module.exports = router;
