const { Router } = require(`express`);

const router = Router();

router.get(`/test`, (req, res) => {
    res.status(200).json({ message: "Works!" });
});

router.use(`/auth`, require(`./authRoutes`));

module.exports = router;
