const express = require('express');
const router = express();
const contact = require('../Controller/contact');
const { authenticate, generateToken } = require('../model/auth');

router.get("/contact", authenticate, contact.viewcontact);
router.get("/showcontact", authenticate, contact.showcontact);
router.post("/addcontact", authenticate, contact.addcontact);


router.get("/deleteContact/:id", authenticate, contact.deleteContact);

router.get("/multiDeleteContact", authenticate, contact.multiDeleteContact);

router.get("/showEditContact/:id", authenticate, contact.showEditContact);
router.post("/updateContact/:id", authenticate, contact.updateContact);

module.exports = router;