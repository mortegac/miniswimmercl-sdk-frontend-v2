/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const util = require("util");


const { responses, api, transbank } = require('/opt/nodejs/index');
const ENVIROMENT = process.env.ENV;


exports.handler = async (event) => {

    const param = event.arguments;
    console.log(`1.---------- param ----------
    ${JSON.stringify(param)}`);

    // 

    try {
        console.log(`------ENVIROMENT-------: ${ENVIROMENT}`);
        
        // GET STATUS FROM TRANSBANK SDK
        const statusWebpayTransaction = await transbank.statusTransaction({
            env: ENVIROMENT,
            token: param.token
        });
        console.log(`01______________________________________________________________`);
        console.log(`01------statusWebpayTransaction-------: ${JSON.stringify(statusWebpayTransaction)}`);

        // GET API TRANSACTION DATA

        // UPDATE TRANSACTION INTO API

        /* ---------------------------------------------------------------
        VALIDATE IF THE TRANSACTIONS WAS SUCCESSFULL - CREATE EVENT CHARGE
        ------------------------------------------------------------------*/
      





        const responseData = {
            message: statusWebpayTransaction,
        };

        return {
            statusCode: 200,
            body: JSON.stringify(responseData)
        }

    } catch (e) {
        console.log(`------ERROR-------: ${e}`);
        return responses.Response(ENVIROMENT, 500, { error: e });
    }
};
