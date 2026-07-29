const nodemailer = require('nodemailer');

const MAIL_PORT = parseInt(process.env.MAIL_PORT || '587', 10);

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: MAIL_PORT,
  secure: MAIL_PORT === 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendResetPasswordEmail = async (to, resetToken) => {
  const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
  await transporter.sendMail({
    from: `"API Support" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <h2>Réinitialisation de mot de passe</h2>
      <p>Clique sur ce lien pour réinitialiser ton mot de passe (valable 30 min) :</p>
      <a href="${resetLink}" style="background:#e53e3e;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
        Réinitialiser mon mot de passe
      </a>
      <p>Si tu n'es pas à l'origine de cette demande, ignore cet email.</p>
    `,
  });
};

const sendPasswordChangedEmail = async (to) => {
  await transporter.sendMail({
    from: `"API Support" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Mot de passe modifié',
    html: `
      <h2>Mot de passe modifié</h2>
      <p>Ton mot de passe a bien été modifié avec succès.</p>
      <p>Si tu n'es pas à l'origine de cette action, contacte-nous immédiatement.</p>
    `,
  });
};

module.exports = { sendResetPasswordEmail, sendPasswordChangedEmail };
