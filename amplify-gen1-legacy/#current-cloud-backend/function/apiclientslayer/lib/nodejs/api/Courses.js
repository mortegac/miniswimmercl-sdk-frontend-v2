const { getCourse, listCourses } = require("./graphql/queries_custom");
// const { createEnrollment } = require("./graphql/mutations_custom")
const {API} = require("../utils/api");




const fetchListCourses = async ({ env, variables, access }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const base = await API({
                env,
                _query: listCourses,
                ...variables,
                // _variables: {
                    // filter: {
                    //     // type: { eq: "complete" }
                    //     ...variables
                    // }
                    // input: {
                    //     ...variables,
                    // },
                // },
                access,
            });
            return resolve(base);
        } catch (error) {
            console.log(variables, "----ERROR - fetchBaseRecipe()----", error);
            return reject(JSON.stringify(error));
        }
    });
};







module.exports = {
    fetchListCourses,
}