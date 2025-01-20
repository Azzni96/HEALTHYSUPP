const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587, // Vaihda portti 587
  secure: false, // Käytä STARTTLS:ää, joten secure: false
  auth: {
    user: 'nihadazzam96@gmail.com',
    pass: 'rklj siir phxv xtoh' // Käytä sovellussalasanaa
  },
  tls: {
    rejectUnauthorized: false // Ota käyttöön, jos testipalvelimella on itseallekirjoitettu sertifikaatti
  }
});

const mailOptions = {
  from: 'nihadazzam96@gmail.com',
  to: 'nihada@metropolia.fi', // Korvaa tämä sähköpostiosoitteella
  subject: 'Test Email',
  text: 'This is a test email sent via Nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Email sending failed:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
