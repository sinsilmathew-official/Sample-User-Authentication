const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
class mailFuncs  {
 async sendMail(mail_to,mail_from,mail_subject,mail_html) {
        try {
                const msg = {
                to: mail_to,
                from: mail_from,
                subject: mail_subject,
                html: mail_html
            };
            if(process.env.SENDGRID_API_KEY!==undefined){
                await sgMail.send(msg);
            }
        } catch (error) {
            throw error;
        }
    }
}

exports.mailFuncs = mailFuncs;