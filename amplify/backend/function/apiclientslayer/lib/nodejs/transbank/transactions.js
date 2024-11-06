const util = require("util");
const { getEnviroment } = require("../utils");

const WebpayPlus = require("transbank-sdk").WebpayPlus; // ES5
const { v4: uuidv4 } = require("uuid");

const createTransaction = async ({ env, buyOrder, amount }) => {
    return new Promise(async (resolve, reject) => {

        console.log(`------ENV-------: ${env}`);
        if (env === "") return "The enviroment does not exist";
        const ENV = getEnviroment(env);
        const uuidSessionId = uuidv4();

        console.log(`------ENV-------: ${ENV.type} - ${ENV.WPP_CC}`);

        // VALIDATE PRODUCTION
        if (ENV.WPP_CC && ENV.WPP_KEY) {
            WebpayPlus.configureForProduction(ENV.WPP_CC, ENV.WPP_KEY);
        }
        else {
        WebpayPlus.configureForTesting();
        }

        try {
            const createResponse = await (new WebpayPlus.Transaction())
                .create(
                    buyOrder?.toString() || "",
                    uuidSessionId || "",
                    amount || "",
                    ENV.RETURN_URL_WEBPAY || ""
                );
            resolve({ ...createResponse, session_id: uuidSessionId });

        } catch (err) {
            console.log(`ERROR TRY/CATCH - createTransaction() - ${util.inspect(err)}`);
            reject(JSON.stringify(err));
        }
    })
};

const commitTransaction = async ({ env, token }) => {
    return new Promise(async (resolve, reject) => {

        console.log(`------ENV-------: ${env}`);
        if (env === "") return "The enviroment does not exist";
        const ENV = getEnviroment(env);
        // const uuidSessionId = uuidv4();

        console.log(`------ENV-------: ${ENV.type} - ${ENV.WPP_CC}`);

        // VALIDATE PRODUCTION
        if (ENV.WPP_CC && ENV.WPP_KEY) {
            WebpayPlus.configureForProduction(ENV.WPP_CC, ENV.WPP_KEY);
        }
        else {
            WebpayPlus.configureForTesting();
        }


        try {
            const commitResponse = await (new WebpayPlus.Transaction()).commit(token);
            console.log(`------commitResponse-------: ${JSON.stringify(commitResponse)}`);

            resolve(commitResponse);

        } catch (err) {
            console.log(`ERROR TRY/CATCH - commitTransaction() - ${util.inspect(err)}`);
            reject(JSON.stringify(err));
        }
    })
};


const statusTransaction = async ({ env, token }) => {
    return new Promise(async (resolve, reject) => {

        console.log(`------ENV-------: ${env}`);
        if (env === "") return "The enviroment does not exist";
        const ENV = getEnviroment(env);

        console.log(`------ENV-------: ${ENV.type} - ${ENV.WPP_CC}`);

        // VALIDATE PRODUCTION
        if (ENV.WPP_CC && ENV.WPP_KEY) {
            WebpayPlus.configureForProduction(ENV.WPP_CC, ENV.WPP_KEY);
        }
        // else {
        //     WebpayPlus.configureForTesting();
        // }

        try {
            const statusResponse = await (new WebpayPlus.Transaction())
                .status(token);

            console.log(`------statusResponse-------: ${statusResponse}`);

            resolve({ ...statusResponse });

        } catch (err) {
            console.log(`ERROR TRY/CATCH - statusResponse() - ${util.inspect(err)}`);
            reject(JSON.stringify(err));
        }
    })
};

module.exports = {
    createTransaction,
    commitTransaction,
    statusTransaction
};




