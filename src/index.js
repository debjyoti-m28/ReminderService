const express = require('express');
const bodyParser = require('body-parser');

const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');
const jobs = require("./utils/cronJobs");
const TicketController = require("./controllers/ticket-controller");

const { createChannel, subscribeMessage } = require("./utils/messageQueue");
// const { REMINDER_BINDING_KEY } = require("./config/serverConfig");

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('/api/v1/tickets', TicketController.create);

    //message queue
    const channel = await createChannel();
    subscribeMessage(channel, undefined, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        // jobs();
    });
}

setupAndStartServer();