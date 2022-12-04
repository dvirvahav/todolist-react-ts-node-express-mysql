const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'todolistnotifier@outlook.co.il',
    pass: 'Ortlast307892323',
  },
  tls: {
    ciphers: 'SSLv3',
  },
});
