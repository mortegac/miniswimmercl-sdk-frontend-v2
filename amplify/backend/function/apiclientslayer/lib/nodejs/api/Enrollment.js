// const { listSessionDetails } = require("./graphql/queries_custom");
const { createEnrollment } = require("./graphql/mutations_custom")
const API = require("../utils/api");



// const  = async ({ env, variables, access }) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const req = await API({
//                 env,
//                 _query: createEnrollment,
//                 _variables: {
//                     ...variables
//                 },
//                 access,
//             });
//             return resolve(req);
//         } catch (error) {
//             console.log(variables, "----ERROR - createEnrollment()----", error);
//             return reject(JSON.stringify(error));
//         }
//     });
// };

const createEnrollments = async ({ env, variables = {} }) => {

    // const dateObj = calculateCurrentDate()

    // MUTATION
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





module.exports = {
    createEnrollments,
}