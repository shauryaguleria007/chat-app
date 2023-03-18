const sendEmail = require("./transporter")


const verificationMail = async ({ email, client, token }) => {
    return sendEmail({
        to: email,
        subject: "Email Verification",
        html: `<h4> Hello, <a href="${client}/${token}" target="_blank"> verify email </a></h4>`
    })
}

module.exports = verificationMail;
