const express = require("express");
const verifyWriter = require("../middleware/verifyWriter");
const verifyUser = require("../middleware/verifyUser")

const router = express.Router();

const { renderEntryPage, postEntry } = require("../controllers/entryController");

router.get("/write", verifyWriter, renderEntryPage);
router.post("/write", verifyWriter, postEntry)

module.exports = router;