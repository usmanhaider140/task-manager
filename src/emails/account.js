const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "usmanhaider461@gmail.com", // Change to your verified sender
    subject: `Welcome to the Task App`,
    text: `Welcome ${name} into our beautiful app. Let me know how you like the app. Thanks for Joining in...`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendCancellationEmail = (email, name) => {
  const msg = {
    to: email, // Change to your recipient
    from: "usmanhaider461@gmail.com", // Change to your verified sender
    subject: `Thanks for using our services`,
    text: `Please tell us why you cancel it. I hope to see you back...`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
