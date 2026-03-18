const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");

// console.log("---layer---", layer)

const query = gql`
mutation SendEmail($templateParams: AWSJSON!, $type: String!) {
  sendEmail(templateParams: $templateParams, type: $type)
}
`;
const sendEmail = async (variables) => {
    console.log(`sendEmail-variables: ${JSON.stringify(variables)}`);
    return new Promise(async (resolve, reject) => {
        try {
            const base = (await layer?.utils?.APIv2({
                env: process.env.ENV,
                _query: query,
                _variables: {
                    ...variables
                },
                access: {
                    apikey: process.env.API_KEY,
                    endpoint: process.env.API_ENDPOINT,
                }
            }))
            const res = base?.data?.sendEmail
            return resolve(res);
        } catch (error) {
            console.log(variables, "----ERROR - sendEmail()----", error);
            return reject(JSON.stringify(error));
        }
    });
};

module.exports = {
    sendEmail
}