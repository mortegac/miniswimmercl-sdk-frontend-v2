const { listSessionDetails } = require("./graphql/queries_custom");
const { createSessionDetail, deleteSessionDetail } = require("./graphql/mutations_custom")
const API = require("../utils/api");


const fetchSessionDetail = async ({ env, variables, access }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const base = await API({
                env,
                _query: listSessionDetails,
                ...variables,
                // _variables: {
                //     filter: {
                //         type: { eq: "complete" }
                //     }
                //     // input: {
                //     //     ...variables,
                //     // },
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

const createSessions = async ({ env, variables }) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("----createSessions ----", variables);
            
            const req = await API({
                env,
                _query: createSessionDetail,
                _variables: {
                    input: {
                        ...variables,
                    }
                },
            });
            
            console.log("createSessions----req ----", req);
            return resolve(req);
        } catch (error) {
            console.log(variables, "----ERROR - createBase()----", error);
            return reject(JSON.stringify(error));
        }
    });
};

const deleteSession = async ({ env, variables }) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("----deleteSession ----", variables);
            
            const req = await API({
                env,
                _query: deleteSessionDetail,
                _variables: {
                    input: {
                        ...variables,
                    }
                },
            });
            
            console.log("deleteSession----req ----", req);
            return resolve(req);
        } catch (error) {
            console.log(variables, "----ERROR - deleteSession()----", error);
            return reject(JSON.stringify(error));
        }
    });
};






module.exports = {
    fetchSessionDetail,
    createSessions,
    deleteSession
}