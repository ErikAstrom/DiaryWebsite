const express = require("express");
const verifyWriter = require("../middleware/verifyWriter");
const verifyUser = require("../middleware/verifyUser")
const verifyAdmin = require("../middleware/verifyAdmin");


const { renderAdmin, clearEntries, deleteUser } = require("../controllers/adminController");
const router = require("./userRoute");


router.get("/admin", verifyAdmin, renderAdmin)

router.post("/admin", verifyAdmin, deleteUser);

router.get("/clearEntries", verifyAdmin, clearEntries )



module.exports = router;