const source = "welcome@miniswimmer.cl"
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });


const sendEmail = async ({
    email,
    body,
}) => {
    const params = {
        Destination: {
            ToAddresses: [
                email,
            ],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: body,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "TEXT_FORMAT_BODY",
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Test email",
            },
        },
        Source: source,
    };
    console.log(params)
    return new AWS.SES({ apiVersion: "2010-12-01" })
        .sendEmail(params)
        .promise();
}

module.exports = { sendEmail }