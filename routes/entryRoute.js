const express = require("express");
const verifyWriter = require("../middleware/verifyWriter");
const verifyUser = require("../middleware/verifyUser");


const router = express.Router();

const { renderEntryPage, postEntry } = require("../controllers/entryController");
const { likeEntry, removeEntry, unLikeEntry } = require("../controllers/likeController");

router.get("/write", verifyWriter, renderEntryPage);
router.post("/write", verifyWriter, postEntry)

router.get("/feed/:id", verifyUser, likeEntry)

router.get("/myPage/:id", verifyUser, removeEntry)

router.get("/dislike/:id", verifyUser, unLikeEntry)

module.exports = router;