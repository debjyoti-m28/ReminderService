const sender = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");
const ticketRepository = new TicketRepository();

const sendBasicEmail = async ( mailFrom, mailTo, mailSubject, mailBody ) => {
    try {
        const response = await sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    });
    } catch (error) {
       console.log(error); 
    }
}

const fetchPendingEmails = async (timestamp) => {
    try {
        const tickets = await ticketRepository.get({status: "PENDING"});
        return tickets;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const tickets = await ticketRepository.update(ticketId, data);
        return tickets;
    } catch (error) {
        console.log(error);
    }
}

const createNotification = async (data) => {
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}