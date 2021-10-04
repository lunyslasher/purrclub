const { Router } = require(`express`);

const router = Router();

router.use(`/api`, require(`./routes`));
router.get(`/confirm`, require(`./routes/emailRoutes`));
router.get(`/`, (req, res) => res.status(200).json({ message: `Всё чётко` }));
module.exports = router;
