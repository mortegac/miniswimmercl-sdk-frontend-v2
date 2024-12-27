const util = require("util");
const axios = require("axios");
const graphql = require("graphql");
const { print } = graphql;
// const AWS = require('aws-sdk');
// const { AppSyncClient, CreatePostCommand } = require("@aws-sdk/client-appsync");
// const { AppSyncClient, SendCommand } = require("@aws-sdk/client-appsync");
// const { AppSyncClient, SendMutationCommand } = require("@aws-sdk/client-appsync");

// import { AppSyncClient, CreatePostCommand } from "@aws-sdk/client-appsync";


const { getEnviroment } = require("./enviroment");



const API = async ({ env, type = "", _query, _variables = {} }) => {
    return new Promise(async (resolve, reject) => {

        // console.log(`------ENV-------: ${env}`);

        if (env === "") return reject("The enviroment does not exist");

        const ENV = getEnviroment(env);

        console.log(`------getEnviroment-------: ${JSON.stringify(ENV.message)}`);
        console.log(`------_variables-------: ${JSON.stringify(_variables)}`);
        console.log(`------_query-------: ${JSON.stringify(_query)}`);

        try {
            const params = {
                url: ENV.API_ENDPOINT,
                method: "post",
                headers: { "x-api-key": ENV.API_KEY },
                data: {
                    query: print(_query),
                    variables: { ..._variables }
                },
            };

            // console.log(`------params-------: ${JSON.stringify(params)}`);

            const graphqlData = await axios(params);
            if (graphqlData.data?.errors) {
                console.log(`ERROR GRAPHQL - ${util.inspect(graphqlData.data)}`);

                reject(JSON.stringify(graphqlData.data.errors));
            }
            console.log(`OK - ${type} - ${util.inspect(graphqlData.data)}`);

            resolve(graphqlData.data);

        } catch (err) {
            console.log(`ERROR TRY/CATCH - ${util.inspect(err)}`);
            reject(JSON.stringify(err));
        }
    })
};
const APIv2 = async ({ env, type = "", _query, _variables = {}, access }) => {
    return new Promise(async (resolve, reject) => {

        // console.log(`------ENV-------: ${env}`);

        if (env === "") return reject("The enviroment does not exist");

        const ENV = getEnviroment(env);

        // console.log(`------getEnviroment-------: ${JSON.stringify(ENV.message)}`);
        // console.log(`env:${env} ------getEnviroment-------: ${JSON.stringify(ENV)}`);
        // console.log(`------_variables-------: ${JSON.stringify(_variables)}`);
        // console.log(`------_query-------: ${JSON.stringify(_query)}`);

        try {
            const params = {
                url: access.endpoint,
                method: "post",
                headers: { "x-api-key": access.apikey },
                data: {
                    query: print(_query),
                    variables: { ..._variables }
                },
            };

            // console.log(`------params-------: ${JSON.stringify(params)}`);

            const graphqlData = await axios(params);
            if (graphqlData.data?.errors) {
                console.log(`ERROR GRAPHQL - ${util.inspect(graphqlData.data)}`);
                console.log(_variables)

                return reject(JSON.stringify(graphqlData.data.errors));
            }
            console.log(`OK - ${type} - ${util.inspect(graphqlData.data)}`);

            return resolve(graphqlData.data);

        } catch (err) {
            console.log(`ERROR TRY/CATCH - ${util.inspect(err)}`);
            return reject(JSON.stringify(err));
        }
    })
};

module.exports = {
    API,
    APIv2
}