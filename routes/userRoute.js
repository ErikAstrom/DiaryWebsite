const express = require("express");

const router = express.Router();

const {renderRegister, submitRegistration } = require("../controllers/registerController");
const {renderLogin, userLogin} = require("../controllers/loginController");
const {resetRender, resetSubmit, resetParams, resetFormSubmit} = require("../controllers/resetPassword");
const {renderMyPage } = require("../controllers/myPageController")

const verifyToken = require("../middleware/verifyUser");




router.get("/register", renderRegister);
router.post("/register", submitRegistration);

router.get("/login", renderLogin);
router.post("/login", userLogin);

router.get("/reset", resetRender)
router.post("/reset", resetSubmit)

router.get("/reset/:token", resetParams)
router.post("/resetForm", resetFormSubmit)

router.get("/myPage", verifyToken, renderMyPage)

module.exports = router;