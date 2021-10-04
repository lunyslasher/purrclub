const nm = require(`nodemailer`);

const mailer = nm.createTransport({
    host: `smtp.yandex.ru`,
    port: 465,
    secure: true,
    auth: {
        user: `no-reply@lunyslasher.ru`,
        pass: `nqcscsnysgcjqhxj`,
    },
    dkim: {
        privateKey: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFMdu1D5Vi8Kn0F4kwRCEo3ODqbcCmKjJl5E9/49EGwZgXfpjP8ssyLlF4MPIibH3j8pGIh6k6XklPThCAAVzcMviHuEIOXW/duUDMjX/jq18j6a0Ouhd41Cg9QZdufz/ZWzdqL8p7Ofwtj4daHs/+gS5YUP0SRV20nYqvZEnQEwIDAQAB`,
        domainName: `lunyslasher.ru`,
    },
});

const sendConfirm = async (email, hash) => {
    const mail = await mailer.sendMail({
        to: email,
        from: `no-reply@lunyslasher.ru`,
        subject: `no-reply`,
        text: `Подтверждение почты на сайте purrclub.ru`,
        html: `<b>Подтверждение почты: ${hash}</b>`,
    });
    return mail;
};

module.exports = { sendConfirm };
