import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Mailgen from 'mailgen';

dotenv.config();

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
       user: process.env.MAIL_USERNAME,
       pass: process.env.MAIL_PASSWORD
    }
});

/**
   * @param {string} customerEmail - The email of receiver.
   * @param {string} customerFName - The name of receiver.
   * @param {object} trackNber - The tracking number of the order.
   * @returns {object} message json object
   * @description generate the message for the email
   */
const generateMessage = (customerEmail, customerFname, trackNber) => ({
    from: 'markjoker73@gmail.com',
    to: `${customerEmail}`,
    subject: 'Order Confirmation',
    html: `<h1>${customerFname},</h1>
    <p>tracking number ${trackNber}</p>`
});
/**
   * @param {object} data details for receiver of the email
   * @param {string} name - The name of receiver.
   * @param {string} intro - The tracking number of the order.
   * @returns {object} response json object
   * @description send reset password email
   */
const sendMail = async (data, name, trackNber) => {
  const message = generateMessage(data, name, trackNber);
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
});
};
export default sendMail;
