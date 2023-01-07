const cron = require('node-cron');
const sender = require("../config/emailConfig");
const EmailService = require("../services/email-service");

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
      try {
        const response = await EmailService.fetchPendingEmails();
        response.forEach(email => {
            // EmailService.sendBasicEmail(
            //     'notificationservice2023@gmail.com',
            //     email.recepientEmail,
            //     email.subject,
            //     email.content
            // )
            sender.sendMail({
               from: 'notificationservice2023@gmail.com',
               to: email.recepientEmail,
               subject: email.subject,
               text: email.content
           }, async (err, data) => {
               if(err) {
                console.log(err);
               } else {
                console.log(data);
                await EmailService.updateTicket(email.id, {status: 'SUCCESS'});
               }
           });
        });
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    });
}

module.exports = setupJobs;