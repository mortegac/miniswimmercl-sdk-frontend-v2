// const { listSessionDetails } = require("./graphql/queries_custom");
const { createEnrollment, updateEnrollment, deleteEnrollment } = require("./graphql/mutations_custom")
const { listEnrollments, getEnrollment } = require("./graphql/queries_custom")
const {API} = require("../utils/api");

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

const deleteEnrollments = async ({ env, variables = {} }) => {

    const deleteAPITransactions = await API({
        env,
        _query: deleteEnrollment,
        _variables: {
            input: {
                ...variables
            }
        },
    });
    console.log(`-- deleteAPITransactions -- ${JSON.stringify(deleteAPITransactions)}`);

    return deleteAPITransactions
};


const getEnrollments = async ({ env, variables }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const base = await API({
                env,
                _query: getEnrollment,
                _variables: {
                    ...variables
                },
            });
            return resolve(base);
        } catch (error) {
            console.log(variables, "----ERROR - getEnrollment()----", error);
            return reject(JSON.stringify(error));
        }
    });
};

const fetchEnrollments = async ({ env, variables }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const base = await API({
                env,
                _query: listEnrollments,
                _variables: {
                    ...variables
                },
            });
            return resolve(base);
        } catch (error) {
            console.log(variables, "----ERROR - listEnrollments()----", error);
            return reject(JSON.stringify(error));
        }
    });
};



module.exports = {
    fetchEnrollments,
    getEnrollments,
    createEnrollments,
    updateEnrollments,
    deleteEnrollments
}