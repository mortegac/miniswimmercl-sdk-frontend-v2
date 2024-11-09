// const { listSessionDetails } = require("./graphql/queries_custom");
const { createEnrollment, updateEnrollment } = require("./graphql/mutations_custom")
const API = require("../utils/api");

const createEnrollments = async ({ env, variables = {} }) => {

    const createAPITransactions = await API({
        env,
        _query: createEnrollment,
        _variables: {
            input: {
                ...variables,
                // day: dateObj.day,
                // month: dateObj.month,
                // year: dateObj.year,
            }
        },
    });
    console.log(`-- createAPITransactions -- ${JSON.stringify(createAPITransactions)}`);

    return createAPITransactions
};


const updateEnrollments = async ({ env, variables = {} }) => {

    const updateAPITransactions = await API({
        env,
        _query: updateEnrollment,
        _variables: {
            input: {
                ...variables
            }
        },
    });
    console.log(`-- updateEnrollments -- ${JSON.stringify(updateAPITransactions)}`);

    return updateAPITransactions
};






module.exports = {
    createEnrollments,
    updateEnrollments
}