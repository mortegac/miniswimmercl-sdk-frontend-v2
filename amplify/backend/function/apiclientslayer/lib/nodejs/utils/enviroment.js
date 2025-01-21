
const {
    RETURN_URL_WEBPAY_PROD,
    RETURN_URL_WEBPAY_QA,
    WPP_CC,
    WPP_KEY,
    CORS_WEBPAY_PROD,
    CORS_WEBPAY_QA,
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
    RETURN_URL_WEBPAY: RETURN_URL_WEBPAY_QA,
    CORS: CORS_WEBPAY_QA,
}
const paramsPROD = {
    type: "prod",
    message: ">>>>>>>> PRODUCTION <<<<<<<<<<<<",
    // ACCESS_KEY: ACCESS_IAM_KEY,
    // ACCESS_SECRET: ACCESS_IAM_SECRET,
    REGION: REGION_PROD,
    API_ID: API_ID_PROD,
    API_KEY: API_KEY_PROD,
    API_ENDPOINT: API_ENDPOINT_PROD,
    WPP_CC: WPP_CC,
    WPP_KEY: WPP_KEY,
    RETURN_URL_WEBPAY: RETURN_URL_WEBPAY_PROD,
    CORS: CORS_WEBPAY_PROD,
}

const getEnviroment = (ENVIROMENT) => ENVIROMENT === "prod" ? paramsPROD : paramsDEV

module.exports = {
    getEnviroment
};