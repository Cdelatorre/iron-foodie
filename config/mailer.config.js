const nodemailer = require('nodemailer');

const email = process.env.EMAIL_ACCOUNT;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.sendValidationEmail = (user) => {
  console.log('entro en la función de enviar email');

  transporter
    .sendMail({
      from: `"Iron Foodie" <${email}>`, // sender address
      to: user.email, // list of receivers
      subject: 'Welcome to Iron Foodie', // Subject line
      html: `
                <h1>Welcome to Iron Foodie</h1>

                <p>Activate your account</p>

                <a href="${process.env.APP_HOST}/users/${user.id}/activate">Click here</a>

              `,
    })
    .then(() => {
      console.log(`email sent to ${user.id}`);
    })
    .catch((err) => {
      console.error('error sending mail', err);
    });
};
