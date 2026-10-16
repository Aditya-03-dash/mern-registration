const express = require("express");
const c = require("../controllers/registrationController");

const router = express.Router();

router.route("/").get(c.getRegistrations).post(c.createRegistration);
router.route("/:id").get(c.getRegistration).put(c.updateRegistration).delete(c.deleteRegistration);

module.exports = router;
