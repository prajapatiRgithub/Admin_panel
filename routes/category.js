const express = require('express');
const router = express();
const catagory = require('../controller/category');
const { authenticate } = require('../model/auth');

router.get("/category", authenticate, catagory.viewCategory);
router.get("/showCategory", authenticate, catagory.showCategory);
router.post("/addCategory", authenticate, catagory.addCategory);

router.get("/deleteCategory/:id", authenticate, catagory.deleteCategory);

router.get("/multiDeleteCategory", authenticate, catagory.multiDeleteCategory);

router.get("/showEditCategory/:id", authenticate, catagory.showEditCategory);
router.post("/updateCategory", authenticate, catagory.updateCategory);

module.exports = router;







