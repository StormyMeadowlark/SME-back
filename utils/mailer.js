
import nodemailer from "nodemailer";


  const sendEmail = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    auth: {
      user: "apikey",
      pass:
        'SG.xIPXDN36QSGi1zqThayj2Q.vwL0MxaOH6RKhW_n - Vs35bOc4uL2Bc24ObaDTlmvxrw',
    },
  });


export default sendEmail;
