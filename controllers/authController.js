const { validationResult } = require(`express-validator`);
const bcrypt = require(`bcryptjs`);
const User = require("../models/User");
const { hashSalt, jwtSecret } = require("../config");
const logger = require("../logger");
const { sign } = require("jsonwebtoken");
const { sendConfirm } = require("../email");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: `Проверьте правильность введённых данных и повторите попытку.`,
                errors: errors.array(),
            });
        }

        const { email, username, password } = req.body;
        const candidate = await User.findOne({ where: { username } });

        if (candidate) {
            return res
                .status(400)
                .json({ message: `Имя пользователя уже занято.` });
        }
        const confirmHash = bcrypt.hashSync(email, 12);
        const hashedPassword = bcrypt.hashSync(password, 12);

        await User.create({
            email,
            username,
            confirmHash,
            password: hashedPassword,
        });
        await sendConfirm(`r4mzya@gmail.com`, confirmHash);
        res.status(201).json({ message: `Вы успешно зарегистрировались.` });
    } catch (error) {
        res.status(500).json({
            message: `Что-то пошло не так, попробуйте ещё раз.`,
        });
        logger.err(__filename, error);
    }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: `Проверьте правильность введённых данных и повторите попытку.`,
                errors: errors.array(),
            });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: `Пользователь не найден.` });
        }

        const decrypted = bcrypt.compareSync(password, user.password);

        if (!decrypted) {
            return res.status(401).json({
                message: `Проверьте правильность введённых данных и повторите попытку.`,
            });
        }

        const token = sign(
            {
                userId: user.id,
            },
            jwtSecret,
            {
                expiresIn: `2w`,
            }
        );

        res.status(200).json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({
            message: `Что-то пошло не так, попробуйте ещё раз.`,
        });
        logger.err(__filename, error);
    }
};

module.exports = { register, login };
