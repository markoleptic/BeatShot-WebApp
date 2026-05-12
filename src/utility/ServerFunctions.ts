import nodemailer, { Transporter } from "nodemailer";

import { SendEmailCommand, SESv2Client, SESv2ClientConfig } from "@aws-sdk/client-sesv2";

export async function sendFeedbackEmail(title: string, content: string) {
	const config: SESv2ClientConfig = {
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
		},
		region: process.env.AWS_REGION as string,
	};
	const sesClient = new SESv2Client(config);
	const transporter: Transporter = nodemailer.createTransport({
		SES: { sesClient, SendEmailCommand },
	});
	const sendMessageInfo = await transporter.sendMail({
		from: "BeatShot Support <support@beatshot.gg>",
		to: "support@beatshot.gg",
		subject: `Feedback: ${title}`,
		html: `${content}`,
	});
	return sendMessageInfo;
}
