/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const util = require("util");


const { responses, api, transbank } = require('/opt/nodejs/index');
const ENVIROMENT = process.env.ENV;

let initialInput = {
    id: "",
    status: "start",
    token: "",

    buy_order: "",
    session_id: "",
    amount: 0,
    card_number: "",
    transaction_date: "",
    accounting_date: "",
    installments_number: "",
    payment_type_code: "",
    vci: "",
    day: "",
    month: "",
    hour: "",
    year: "",
    usersPaymentTransactionsId: "sin-usuario",
}
    
    // urlWebpay
    // card_detail
    // installments_amount
    // authorization_code
    // response_code
    // glosa
    // hasRefund
    // shoppingCartPaymentTransactionsId



exports.handler = async (event) => {

    const param = event.arguments;
    console.log(`1.---------- param ----------
    ${JSON.stringify(param)}`);

    // 

    try {
        console.log(`------ENVIROMENT-------: ${ENVIROMENT}`);
        
        // GET STATUS FROM TRANSBANK SDK
        console.log(`01____transbank.statusTransaction__________________________________________________________`);
        const statusWebpayTransaction = await transbank.statusTransaction({
            env: ENVIROMENT,
            token: param.token
        });
        console.log(`01------statusWebpayTransaction-------: ${JSON.stringify(statusWebpayTransaction)}`);

        // GET API TRANSACTION DATA
        console.log(`02__api.getPaymentTransaction____________________________________________________________`);
        const getAPIData = await api.getPaymentTransaction({
            env: ENVIROMENT,
            variables: {
                token: { eq: param.token }
            }
        });
        console.log(`02--getAPIData --${JSON.stringify(getAPIData)}`);

    

         // UPDATE TRANSACTION INTO API
         const getTransaction = {...getAPIData.data.listPaymentTransactions.items[0]}
         delete getTransaction.__typename
            delete getTransaction.createdAt
            delete getTransaction.updatedAt
         console.log(`03___newInitialInput_______________________________________________getTransaction____________`, getTransaction);
         let newInitialInput = { 
            ...initialInput, 
            ...getTransaction,
            // ...getAPIData.data.listPaymentTransactions.items[0], 
            buy_order: statusWebpayTransaction.buy_order,
            status: statusWebpayTransaction.status,
            session_id: statusWebpayTransaction.session_id,
            
            card_number: statusWebpayTransaction?.card_detail?.card_number || "",
            card_detail:statusWebpayTransaction?.card_detail?.card_number || "",
            
            transaction_date: statusWebpayTransaction.transaction_date,
            accounting_date: statusWebpayTransaction.accounting_date,
            installments_number: statusWebpayTransaction.installments_number,
            payment_type_code: statusWebpayTransaction.payment_type_code,
            vci: statusWebpayTransaction?.vci,
            
            
            // installments_amounts: statusWebpayTransaction
            // authorization_codestatusWebpayTransaction
            // response_codestatusWebpayTransaction

           
        };
        delete newInitialInput.__typename
        delete newInitialInput.createdAt
        delete newInitialInput.updatedAt
         console.log(`03--newInitialInput --${JSON.stringify(newInitialInput)}`);
 


        /* ---------------------------------------------------------------
       VALIDATE IF THE TRANSACTIONS WAS SUCCESSFULL - CREATE EVENT CHARGE
       ------------------------------------------------------------------*/
       if (statusWebpayTransaction?.status === "AUTHORIZED") {

        //  console.log(`------------------------------------------01--WEBPAY-STATUS -- AUTHORIZED------------------------------------------`);

        // A - UPDATE API TRANSACTION
        newInitialInput = { ...newInitialInput };
        console.log(`03--newInitialInput --${JSON.stringify(newInitialInput)}`);
        
        console.log(`04______________________________________________________________`);
        const updateAPI = await api.updateTransaction({
            env: ENVIROMENT,
            variables: {
                ...newInitialInput
            }
        });
        console.log(`04--putAPI --${JSON.stringify(updateAPI)}`);

        // B - UPDATE SHOPPING CART
        console.log(`05_______UPDATE SHOPPING CART_____________________________`);
        const updateAPICART = await api.updateCart({
            env: ENVIROMENT,
            variables: {
                id:getTransaction.shoppingCartPaymentTransactionsId,
                status: statusWebpayTransaction.status,
            }
        });
        console.log(`05_______UPDATE SHOPPING CART____--${JSON.stringify(updateAPICART)}`);

         // C - UPDATE ENROLLMENT
         console.log(`06_______ENROLLMENT_____________________________`);
     
         const getAPIEnrollment = await api.getShoppingCartDetails({
            env: ENVIROMENT,
            variables: {
                shoppingCartCartDetailsId: { eq: getTransaction.shoppingCartPaymentTransactionsId, }
            }
        });

        try {
            // 
            const updateEnrollments = async () => {
                try {
                  if (Array.isArray(getAPIEnrollment?.data?.listShoppingCartDetails?.items)) {
                    const updates = await Promise.all(
                      getAPIEnrollment.data.listShoppingCartDetails.items.map(async (item) => {
                        if (item?.type === "ENROLLMENTS" && item?.shoppingCartDetailEnrollmentId) {
                          const updateEnrollment = await api.updateEnrollments({
                            env: ENVIROMENT,
                            variables: {
                              id: item.shoppingCartDetailEnrollmentId,
                              wasPaid: true,
                            }
                          });
                          console.log(`06 - B_______updateEnrollment_____--${JSON.stringify(updateEnrollment)}`);
                          return updateEnrollment;
                        }
                        return null;
                      })
                    );
                    console.log(`06 - actualizaciones de ENROLLMENT completadas--${JSON.stringify(updates)}`);
                  }
                } catch (error) {
                  console.log(`06 - error al actualzar el ENROLLMENT --${JSON.stringify(error)}`);
                }
              };
              
              // Llamar a la función
              await updateEnrollments();


        } catch (error) {
            
        }
        console.log(`06--getAPIEnrollment --${JSON.stringify(getAPIEnrollment)}`);

    

         // 

         //  updateEnrollments
         // TODO: Recorrer el carro deatelle y actualziar los enrollment que existan 


    } else {
        // SAVE TRANSACTION IN API
        const updateAPI = await api.updateTransaction({
            env: ENVIROMENT,
            variables: {
                ...newInitialInput
            }
        });
        console.log(`00______________________________________________________________`);
        console.log(`00--api.updateTransaction --${JSON.stringify(updateAPI)}`);
    }

      





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
