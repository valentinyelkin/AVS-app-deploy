
const AWS = require("aws-sdk");

module.exports = () => {
	const region = "us-east-1";
	const client = new AWS.SecretsManager({ region });

	const SecretId = "nest/secret/edu";
	return new Promise((resolve, reject) => {
		client.getSecretValue({ SecretId }, (err, data) => {
			if (err) {
				reject(err);
			} else {
				const secretsJSON = JSON.parse(data.SecretString);

				// creating a string to store write to .env file
				let secretsString = "";

				Object.keys(secretsJSON).forEach((key) => {
					secretsString += `${key}=${secretsJSON[key]}\n`;
				});
				resolve(secretsString);
			}
		});
	});
};
