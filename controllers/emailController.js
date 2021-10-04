const logger = require("../logger");
const User = require("../models/User");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const confirm = async (req, res) => {
    try {
        const { link } = req.query;

        if (!link) {
            return res.status(400).json({ message: `Невалидная ссылка.` });
        }

        const user = await User.findOne({ where: { confirmHash: link } });
        if (!user) {
            return res.status(400).json({ message: `Невалидная ссылка.` });
        }
        if (user && user.active) {
            return res
                .status(400)
                .json({ message: `Вы уже подтвердили свой Email.` });
        }

        user.active = true;
        user.confirmHash = null;
        await user.save();

        return res.status(200).json({ message: `Email успешно подтверждён.` });
    } catch (e) {
        logger.err(__filename, e);
        return res
            .status(500)
            .json({ message: `Что-то пошло не так, попробуйте ещё раз.` });
    }
};

module.exports = { confirm };
