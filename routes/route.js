const express = require('express');
const router = express();
const auth = require('../controller/auth');
const { authenticate, generateToken } = require('../model/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.get("/", auth.login);

router.post("/loginUser", generateToken, auth.authUser);

router.get("/registration", auth.registration);
router.post("/signup", upload.single('Image'), auth.signup);

router.get("/forgetpassword", auth.forgetpassword);
router.post("/verifyEmail", auth.verifyEmail);

router.post("/otp", auth.otp);
router.post("/verifyOtp", auth.verifyOtp);

router.get("/verifyemail", auth.verifyemail);
router.post("/updatePassword", auth.updatePassword);

router.get('/index',authenticate,auth.index);

router.get("/viewprofile", authenticate, auth.viewprofile);
router.post("/updateprofile/:id", authenticate, upload.single('Image'), auth.updateprofile);

router.get("/resetPassword", authenticate, auth.resetPassword);
router.post("/resetPass", authenticate, auth.resetPass);

router.get("/logout", auth.logout);
module.exports = router;