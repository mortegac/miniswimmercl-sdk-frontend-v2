const util = require("util");

const { listUsers } = require("./graphql/queries_custom");
const { createUsers, updateUsers } = require("./graphql/mutations_custom");

const API = require('../utils/api');

const createUser = async ({ env, variables, access }) => {
    return new Promise(async (resolve, reject) => {
        console.log(
            "created User = ", variables
        )
        try {
            const setDBUserAPI = await API({
                env,
                _query: createUsers,
                _variables: {
                    input: {
                        ...variables
                    }
                },
            })

            console.log(`-- setDBUserAPI -- ${JSON.stringify(setDBUserAPI)}`);

            resolve({ ...setDBUserAPI });

        } catch (err) {
            console.log("----ERROR TRY-CATH - createUser()----", err);
            reject(JSON.stringify(err));
        }
    })
}
const updateUser = async ({ env, variables, access }) => {
    return new Promise(async (resolve, reject) => {

        try {
            const setDBUserAPI = await API({
                env,
                _query: updateUsers,
                _variables: {
                    input: {
                        ...variables
                    }
                },
                access
            })

            console.log(`-- setDBUserAPI -- ${JSON.stringify(setDBUserAPI)}`);

            resolve({ ...setDBUserAPI });

        } catch (err) {
            console.log("----ERROR TRY-CATH - createUser()----", err);
            reject(JSON.stringify(err));
        }
    })
}

const getUsers = async ({ env, variables = {}, access }) => {

    // variables :  filter: { 
    //     thingsThingsUserId: { eq: `${idD}` },
    //     isActive: { eq: true }
    //   }

    // QUERY
    const getAPIUser = await API({
        env,
        _query: listUsers,
        ...variables,

        // _variables: {
        //     filter: {
        //         ...variables,
        //     }
        // },
    });
    console.log(`-- getAPIUser -- ${JSON.stringify(getAPIUser)}`);

    return getAPIUser
};




module.exports = {
    createUser,
    updateUser,
    getUsers,

}