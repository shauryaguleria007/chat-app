
require("dotenv").config();


module.exports = {
    // host: process.env.MAIL_HOST,
    // port: process.env.MAIL_PORT,
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}

// module.exports ={
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'carmella52@ethereal.email',
//         pass: '3RuuqhVEUkHzMN8QD4'
//     }
// }