const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const routesInit = require('./routes/index_route');
const path = require('path');

const fileStore = require('session-file-store')(session);

const db = require('./models');
(async () => {
    await db.sequelize.sync();
})();

const app = express();

const staticFolder = path.join(__dirname, 'public');
app.use('/', express.static(staticFolder));

app.use(
    session({
        name: process.env.SES_NAME,
        resave: false,
        saveUninitialized: false,
        secret: process.env.SES_SECRET,
        store: new fileStore(),
        cookie: {
            maxAge: Date.now() + 1000 * 60 * 60,
            sameSite: true,
        }
    })
);

app.use(
    cors({
        origin: process.env.FRONTEND_HOST,
        credentials: true,
    }),
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

routesInit(app);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));