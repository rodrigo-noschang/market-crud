import { transporter } from "../services/mailer";

export const sendAnyEmail = (emailTo: string | undefined, emailSubject: string, emailText: string) => {
    let mailOptions = {
        from: '"kmarket@mail.com', 
        to: emailTo,  // user?.user_email, 
        subject: emailSubject,
        text: emailText
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}
