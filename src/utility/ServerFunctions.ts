import nodemailer, { Transporter } from "nodemailer";

import * as aws from "@aws-sdk/client-ses";

export async function sendFeedbackEmail(title: string, content: string) {
	const config: aws.SESClientConfig = {
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
		},
		region: process.env.AWS_REGION as string,
	};
	const ses = new aws.SES(config);
	const transporter: Transporter = nodemailer.createTransport({
		SES: { ses, aws },
	});
	const sendMessageInfo = await transporter.sendMail({
		from: "BeatShot Support <support@beatshot.gg>",
		to: "support@beatshot.gg",
		subject: `Feedback: ${title}`,
		html: `${content}`,
	});
	return sendMessageInfo;
}
