const express = require(`express`);
const cors = require(`cors`);
const config = require("./config");
const logger = require("./logger");
const User = require("./models/User");
const { connect } = require("./connection");

const app = express();

app.use(express.json());
app.use(cors());
app.use(require(`./router`));

const srv = app.listen(config.port, async () => {
    await connect();
    logger.log(`Server started at port ${srv.address().port}`);
});
