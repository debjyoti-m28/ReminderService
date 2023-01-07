const cron = require('node-cron');
const EmailService = require("../services/email-service");

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
      try {
        const response = await EmailService.fetchPendingEmails();
        response.forEach(email => {
            EmailService.sendBasicEmail(
                'notificationservice2023@gmail.com',
                email.recepientEmail,
                email.subject,
                email.content
            )
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    });
}

module.exports = setupJobs;