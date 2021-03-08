const express = require("express");
const verifyWriter = require("../middleware/verifyWriter");
const verifyUser = require("../middleware/verifyUser")
const { renderHomePage, likeEntry, logOut} = require("../controllers/homeController");
const router = express.Router();


router.get("/", verifyUser, renderHomePage);

// likeEntry moved to entryRoute



router.get("/logout", logOut)




module.exports = router;