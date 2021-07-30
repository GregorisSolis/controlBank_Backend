require('dotenv/config');

module.exports = {
	APP_NAME: "Controlbank",
	APP_URL: "http://localhost:3030",
	AWS_ACCESS_KEY_ID: "AKIASJUGXCDAC6MKZ65U",
	AWS_SECRET_ACCESS_KEY: "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",
	AWS_DEFAULT_REGION: "us-east-1",
	AWS_BUCKET: "photocontrolbank",
	DATA_BASE_URL: 'mongodb+srv://gregoBank:32perXros27calieZntes45@cluster0.hljav.mongodb.net/Controlbank',
	APP_SECRET: "4K4bSaIzibw544u46uJsu3GtCiytRpEL",
	STORAGE_TYPE: "local",
	PORT: process.env.PORT || 3030,
	SECRET_APP: "4K4bSaIzibw544u46uJsu3GtCiytRpEL",
	NODE_MAILER_HOST: 'smtp.sparkpostmail.com',
	NODE_MAILER_PORT: 587,
	NODE_MAILER_USER: "SMTP_Injection",
	NODE_MAILER_PASS: "0941a3989f367201d51e328183eab069b07bb134"
}