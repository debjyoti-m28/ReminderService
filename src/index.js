const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
// const { sendBasicEmail } = require("./services/email-service");
var cron = require('node-cron');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);

        // sendBasicEmail(
        //     'notificationservice2023@gmail.com',
        //     'yt.debjyoti@gmail.com',
        //     'This is a test',
        //     'My fist mail using smtp server'
        // );

        // cron.schedule('*/1 * * * *', () => {
        //   console.log('running a task every two minutes');
        // });

    });
}

setupAndStartServer();