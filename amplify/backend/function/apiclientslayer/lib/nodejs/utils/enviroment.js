
const {
    // ACCESS_IAM_KEY,
    // ACCESS_IAM_SECRET,
    REGION_PROD,
    REGION_DEV,
    API_ID_DEV,
    API_KEY_DEV,
    API_ENDPOINT_DEV,
    API_ID_PROD,
    API_KEY_PROD,
    API_ENDPOINT_PROD,
} = require("../constant");

const paramsDEV = {
    type: "dev",
    message: ">>>>>>>> DEV <<<<<<<<<<<<",
    // ACCESS_KEY: ACCESS_IAM_KEY,
    // ACCESS_SECRET: ACCESS_IAM_SECRET,
    REGION: REGION_DEV,
    API_ID: API_ID_DEV,
    API_KEY: API_KEY_DEV,
    API_ENDPOINT: API_ENDPOINT_DEV,
}
const paramsPROD = {
    type: "main",
    message: ">>>>>>>> PRODUCTION <<<<<<<<<<<<",
    // ACCESS_KEY: ACCESS_IAM_KEY,
    // ACCESS_SECRET: ACCESS_IAM_SECRET,
    REGION: REGION_PROD,
    API_ID: API_ID_PROD,
    API_KEY: API_KEY_PROD,
    API_ENDPOINT: API_ENDPOINT_PROD,
}

const getEnviroment = (ENVIROMENT) => ENVIROMENT === "main" ? paramsPROD : paramsDEV

module.exports = {
    getEnviroment
};