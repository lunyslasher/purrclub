const colors = require(`colors`);

module.exports = {
    log: (msg) => {
        return console.log(`${colors.bold.blue(`[LOG]`)} ${msg}`);
    },
    err: (fn, msg) => {
        return console.log(
            `${colors.bold.red(`[ERROR]`)} File: ${fn}\n${colors.bold.red(
                `[ERROR]`
            )} Message: ${msg}`
        );
    },
};
