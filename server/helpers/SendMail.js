import nodemailer from 'nodemailer';

const sendMail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
 
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
    return { success: true };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: "Failed to send email" };
  } finally {
    transporter.close();
  }
};

export default sendMail;


// import nodemailer from 'nodemailer';

// const sendMail = async ({ to, subject, text }) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // STARTTLS
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   try {
//     await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to,
//       subject,
//       text,
//     });
//     return { success: true };
//   } catch (err) {
//     console.error("Error sending email:", err);
//     return { success: false, error: "Failed to send email" };
//   }
// };

// export default sendMail;
