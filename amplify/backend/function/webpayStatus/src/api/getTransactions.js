
const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");

const ENVIROMENT = process.env.ENV;


const query = gql`
  query TransactionsByToken($token: String!) {
    paymentTransactionsByToken(token: $token) 
    {
      items {
        id
        status
        token
        urlWebpay
        amount
        buy_order
        card_number
        transaction_date
        accounting_date
        installments_number
        payment_type_code
        session_id
        card_detail
        installments_amount
        authorization_code
        response_code
        vci
        day
        month
        year
        hour
        glosa
        hasRefund
        shoppingCartPaymentTransactionsId
        usersPaymentTransactionsId
      }
    }
  }
`;

const getPaymentTransactionsByToken = async (variables) => {
  
  // console.log("--getPaymentTransactionsByToken--", variables)
  // console.log("--layer?.utils?.APIv2--", layer?.utils?.APIv2)

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
            const res = base?.data?.paymentTransactionsByToken?.items
            console.log("--getPaymentTransactionsByToken--res--", res)
            return resolve(res);
        } catch (error) {
            console.log(variables, "----ERROR - getPaymentTransactionsByToken()----", error);
            return reject(JSON.stringify(error));
        }
    });
};


module.exports = {
    getPaymentTransactionsByToken,
}