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

    try {
        console.log(`------ENVIROMENT-------: ${ENVIROMENT}`);

        // CREATE ID-ORDER
        const idOrder = await api.increaseCorrelative({ env: ENVIROMENT, nameParam: "PAYORDER" })
        console.log(`2.---------- idOrder-------: ${JSON.stringify(idOrder)}`);

        console.log(`3.---------- createWebpayTransaction-------: buyOrder= ${parseInt(idOrder?.correlative) || 0} amount= ${param.amount} `);
    
        // GET SHOPPING CART
        const glosa=`ORDEN  ${idOrder?.correlative || 0}`
        // CREATE TRANSACTION WEBPAY
        const createWebpayTransaction = await transbank.createTransaction({
            env: ENVIROMENT,
            buyOrder: parseInt(idOrder?.correlative) || 0,
            amount: param.amount || "0",
        });
        console.log(`3.---------- createWebpayTransaction-------: ${JSON.stringify(createWebpayTransaction)}`);

        const { token, url, session_id } = createWebpayTransaction;


        // CREATE TRANSACTION DATABASE
        if (token != null && url != null) {

            const createDBTransaction = await api.createTransaction({
                env: ENVIROMENT,
                variables: {
                    status: "CREATE",
                    token: token?.toString() || "",
                    urlWebpay: url?.toString() || "",
                    buy_order: `${idOrder?.correlative || 0}`,
                    session_id: session_id?.toString() || "",
                    amount: parseFloat(param.amount) || 0,
                    card_number: "",
                    transaction_date: "",
                    accounting_date: "",
                    installments_number: "",
                    payment_type_code: "",
                    vci: "",
                    glosa: glosa || "",
                    shoppingCartPaymentTransactionsId: param.cartId,
                    usersPaymentTransactionsId: param.userId === "" ? "sin-usuario" : param.userId,
                    hour:"",
                }

            });
            console.log(`4.---------- createDBTransaction-------: ${JSON.stringify(createDBTransaction)}`);
        }
          
        // return responses.Response(ENVIROMENT, 200, {
        //     orden: idOrder.correlative,
        //     token,
        //     url,
        // });
        const responseData = {
            token:token,
            url:url,
            orden:idOrder.correlative,
        };

        return {
            statusCode: 200,
            body: JSON.stringify(responseData)
        }
        // return { data: JSON.stringify(
        //         {
        //             orden: idOrder.correlative,
        //             token,
        //             url
        //         })
        //     }
          

    } catch (e) {
        console.log(`------ERROR-------: ${e}`);
        return responses.Response(ENVIROMENT, 500, { error: e });
    }
};
