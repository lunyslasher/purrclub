const { Router } = require(`express`);
const { confirm } = require("../controllers/emailController");

const router = Router();

router.get(`/confirm`, confirm);

module.exports = router;
