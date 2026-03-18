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
        
        // CONFIRM THE TRANSACTION USING THE TOKEN
        // const commitResponse = await (new WebpayPlus.Transaction()).commit(token);
        // CONFIRM TRANSACTION WEBPAY
        const confirmWebpayTransaction = await transbank.commitTransaction({
            env: ENVIROMENT,
            token: param.token
        });
        console.log(`------confirmWebpayTransaction-------: ${JSON.stringify(confirmWebpayTransaction)}`);


        //Flujos:
        //1. Flujo normal (OK): solo llega token_ws
        //2. Timeout (más de 10 minutos en el formulario de Transbank): llegan TBK_ID_SESION y TBK_ORDEN_COMPRA
        //3. Pago abortado (con botón anular compra en el formulario de Webpay): llegan TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
        //4. Caso atipico: llega todos token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA

      





        const responseData = {
            message: confirmWebpayTransaction,
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
