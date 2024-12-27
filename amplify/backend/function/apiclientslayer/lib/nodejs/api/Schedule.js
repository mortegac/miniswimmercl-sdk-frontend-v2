const { getSchedule } = require("./graphql/queries_custom");
// const { createEnrollment } = require("./graphql/mutations_custom")
const {API} = require("../utils/api");



const fetchSchedule = async ({ env, variables }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const base = await API({
                env,
                _query: getSchedule,
                _variables: {
                    ...variables
                },
            });
            return resolve(base);
        } catch (error) {
            console.log(variables, "----ERROR - fetchSchedule()----", error);
            return reject(JSON.stringify(error));
        }
    });
};







module.exports = {
    fetchSchedule,
}