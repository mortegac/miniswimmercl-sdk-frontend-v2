const { getCourseSessionType } = require("./graphql/queries_custom");
// const { createEnrollment } = require("./graphql/mutations_custom")
const API = require("../utils/api");



const fetchCourseSessionType = async ({ env, variables }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const base = await API({
                env,
                _query: getCourseSessionType,
                _variables: {
                    ...variables
                },
            });
            return resolve(base);
        } catch (error) {
            console.log(variables, "----ERROR - fetchCourseSessionType()----", error);
            return reject(JSON.stringify(error));
        }
    });
};







module.exports = {
    fetchCourseSessionType,
}