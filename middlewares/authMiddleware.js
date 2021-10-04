const { verify } = require(`jsonwebtoken`);
const { jwtSecret } = require("../config");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const auth = async (req, res, next) => {
    if (req.method == `OPTIONS`) return next();

    try {
        const token = req.headers.authorization.split(` `)[1];

        if (!token) {
            return res.status(401).json({ message: `Not authorized` });
        }
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
};

module.exports = auth;
