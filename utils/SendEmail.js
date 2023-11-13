//const nodemailer = require("nodemailer");

//module.exports = async (email, subject, text) => {
//  try {
//    const transporter = nodemailer.createTransport({
//      host: process.env.HOST,
//      service: process.env.SERVISE,
//      port: Number(process.env.EMAIL_PORT),
//      secure: Boolean(process.env.SECURE),
//      auth: {
//        user: process.env.USER,
//        pass: process.env.PASS,
//      },
//    });
//    await tranporter.sendMAil({
//      from: process.env.USER,
//      to: email,
//      subject: subject,
//      text: text,
//    });
//    console.log("Email sent successfully.");
//  } catch (error) {
//    console.log("Email not send");
//    console.log(error.message);
//  }
//};


const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error.message);
		
	}
};
