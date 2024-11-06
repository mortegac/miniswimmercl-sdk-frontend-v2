
const REGION_PROD = "us-east-2";
const REGION_DEV = "us-east-2";

// WEBPAY - TRANSBANK
// CREATED : 04/08/2022
const WPP_CC = "597052633137";      // COMERCE CODE
const WPP_KEY = "b6c76836-565e-483f-9421-50ac8be3ea00";                 // API KEY

const RETURN_URL_WEBPAY_DEV = "http://localhost:5173/return/"
const RETURN_URL_WEBPAY_PROD = "https://pagos.miniswimmer.cl/return/"
// const RETURN_URL_WEBPAY_PROD = "http://localhost:5173/return/"

// GRAPHQL
const API_ID_DEV = "ksgltqya2bdynm5pa3jia4ydse";
const API_KEY_DEV = "da2-vk3lmmvnk5bmbpt6vkfz7xghpi";
const API_ENDPOINT_DEV = "https://4mtfzd2aubcrhnnaclzkxosnoq.appsync-api.us-east-2.amazonaws.com/graphql";


const API_ID_PROD = "ksgltqya2bdynm5pa3jia4ydse";
const API_KEY_PROD = "da2-vk3lmmvnk5bmbpt6vkfz7xghpi";
const API_ENDPOINT_PROD = "https://4mtfzd2aubcrhnnaclzkxosnoq.appsync-api.us-east-2.amazonaws.com/graphql";


// APIGATEWAY
const CORS_DEV = "*";
const CORS_PROD = "*";

const CORS_WEBPAY_DEV = "*";
const CORS_WEBPAY_PROD = "*";
// const CORS_WEBPAY_PROD = "https://pagos.miniswimmer.cl";


module.exports = {
    REGION_PROD,
    REGION_DEV,
    // WEBPAY - TRANSBANK
    WPP_CC,
    WPP_KEY,
    CORS_WEBPAY_DEV,
    CORS_WEBPAY_PROD,
    RETURN_URL_WEBPAY_DEV,
    RETURN_URL_WEBPAY_PROD,
    
    // GRAPHQL
    API_ID_DEV,
    API_KEY_DEV,
    API_ENDPOINT_DEV,   
    

    API_ID_PROD,
    API_KEY_PROD,
    API_ENDPOINT_PROD,
    // APIGATEWAY
    CORS_DEV,
    CORS_PROD,
};