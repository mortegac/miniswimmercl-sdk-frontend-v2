// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });
const { createInvitationEmails } = require("./template/invitationToLicitation")
const { sendEmail } = require("./functions/sendEmail")
// const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const res = new Promise(async (resolve, reject) => {
        try {
            const emailList = event?.arguments?.emailList || []
            const isWhiteList = event?.arguments?.isWhiteList || false
            // const { id, template } = event.arguments
            const id = "mortegac@gmail.com"
            const template = "inviteOperators"
            
            if (!id) {
                return new Error("this resolver needs to have an id")
            }
            if (!template) {
                return new Error("this resolver needs to have a valid template")
            }
            let emails = await createInvitationEmails({ id, emailList, isWhiteList })
            console.log("---emails--", emails)
            // if (template == "inviteOperators") {
            //     emails = await createInvitationEmails({ id, emailList, isWhiteList })
            // }
            
            const message =  await sendEmail({ email: "mortegac@gmail.com", body: template })
            console.log("---message--", message)
            // const res = await Promise.all(emails.map(async ({ template, email }) => {
            //     return {
            //         message: await sendEmail({ email: email, body: template }),
            //         body: template,
            //         usersBaseEmailId: email,
            //         baseBaseEmailId: id
            //     }
            // }))
            // if (template == "inviteOperators") {
            //     resolve(Promise.all(res.map((r) => {
                    // const obj = {
                    //     id: r.message.MessageId,
                    //     body: r.body,
                    //     usersLicitacionEmailId: r.usersBaseEmailId,
                    //     licitationLicitacionEmailId: r.baseBaseEmailId
                    // }
                    // console.log("obj ", obj)
                    return { msg:""}
                    // return api.saveInvitations({
                    //     env: ENVIROMENT,
                    //     access: {
                    //         apikey: process.env.API_GRETABACKENDTS_GRAPHQLAPIKEYOUTPUT,
                    //         endpoint: process.env.API_GRETABACKENDTS_GRAPHQLAPIENDPOINTOUTPUT,
                    //     },
                    //     variables: {
                    //         ...obj
                    //     }
                    // })
                // })))
            // }
            // resolve(res)
        } catch (error) {
            console.error("error", error)
            reject(error)
        }
    })
    return res

};

// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  },
//         body: JSON.stringify('Hello from Lambda!'),
//     };
// };
