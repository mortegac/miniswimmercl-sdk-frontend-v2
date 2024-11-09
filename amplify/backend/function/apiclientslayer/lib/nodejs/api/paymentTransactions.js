const API = require('../utils/api');
const { 
    createPaymentTransactions, 
    updatePaymentTransactions, 
    updateShoppingCart,
    createShoppingCart,
    createShoppingCartDetail

} = require("./graphql/mutations_custom");
const { listPaymentTransactions, listShoppingCartDetails } = require("./graphql/queries_custom");
const { calculateCurrentDate } = require("../utils/");


const createTransaction = async ({ env, variables = {} }) => {

    const dateObj = calculateCurrentDate()

    // MUTATION
    const createAPITransactions = await API({
        env,
        _query: createPaymentTransactions,
        _variables: {
            input: {
                ...variables,
                day: dateObj.day,
                month: dateObj.month,
                year: dateObj.year,
                hour: dateObj.hourFull,
            }
        },
    });
    console.log(`-- createAPITransactions -- ${JSON.stringify(createAPITransactions)}`);

    return createAPITransactions
};

const updateTransaction = async ({ env, variables = {} }) => {

    const dateObj = calculateCurrentDate()

    // MUTATION
    const updateAPITransactions = await API({
        env,
        _query: updatePaymentTransactions,
        _variables: {
            input: {
                ...variables,
                day: dateObj.day,
                month: dateObj.month,
                year: dateObj.year,
            }
        },
    });
    console.log(`-- updateAPITransactions -- ${JSON.stringify(updateAPITransactions)}`);

    return updateAPITransactions
};

const getPaymentTransaction = async ({ env, variables = {} }) => {

    // variables : { token: {eq: _token } }

    // QUERY
    const getAPITransactions = await API({
        env,
        _query: listPaymentTransactions,
        _variables: {
            filter: {
                ...variables,
            }
        },
    });
    console.log(`-- getAPITransactions -- ${JSON.stringify(getAPITransactions)}`);

    return getAPITransactions
};



// SHOPPING CART

const createCart = async ({ env, variables = {} }) => {

    // MUTATION
    const createAPICart = await API({
        env,
        _query: createShoppingCart,
        _variables: {
            input: {
                ...variables,
            }
        },
    });
    console.log(`-- createAPICart -- ${JSON.stringify(createAPICart)}`);

    return createAPICart
};

const createCartDetail = async ({ env, variables = {} }) => {

    // MUTATION
    const createAPICartDetail = await API({
        env,
        _query: createShoppingCartDetail,
        _variables: {
            input: {
                ...variables,
            }
        },
    });
    console.log(`-- createAPICartDetail -- ${JSON.stringify(createAPICartDetail)}`);

    return createAPICartDetail
};

const updateCart = async ({ env, variables = {} }) => {

    // MUTATION
    const updateAPI = await API({
        env,
        _query: updateShoppingCart,
        _variables: {
            input: {
                ...variables,
            }
        },
    });
    console.log(`-- updateAPI -- ${JSON.stringify(updateAPI)}`);

    return updateAPI
};


const getShoppingCartDetails = async ({ env, variables = {} }) => {

    // variables : { token: {eq: _token } }

    // QUERY
    const dataShoppingCartDetails = await API({
        env,
        _query: listShoppingCartDetails,
        _variables: {
            filter: {
                ...variables,
            }
        },
    });
    console.log(`-- dataShoppingCartDetails -- ${JSON.stringify(dataShoppingCartDetails)}`);

    return dataShoppingCartDetails
};






module.exports = {
    createTransaction,
    updateTransaction,
    getPaymentTransaction,
    updateCart,
    createCart,
    createCartDetail,
    getShoppingCartDetails
    
}