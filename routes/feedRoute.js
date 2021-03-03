const express = require("express");
const verifyWriter = require("../middleware/verifyWriter");
const verifyUser = require("../middleware/verifyUser")
const { getEntries, likeEntry } = require("../controllers/feedController");
const router = express.Router();



router.get("/feed", getEntries)
router.get("/feed/:id", verifyUser, likeEntry)

module.exports = router;