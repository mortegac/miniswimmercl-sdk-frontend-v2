

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


// const axios = require("axios")
const CMF_API_KEY = "49b846de08ed48ce696689cfba2c6808c52106b0"
const BASE_URL = "https://api.cmfchile.cl/api-sbifv3/recursos_api/"
// const dayjs = require("dayjs")
// const utc = require("dayjs/plugin/utc");
// dayjs.extend(utc)

// const ENVIROMENT = process.env.ENV;
// const IVA = 1.19

// const getInterestRate = async () => (await axios.get(BASE_URL + `tip?apikey=${CMF_API_KEY}&formato=json`)).data;
// const getDate = () => {
    //     const now = dayjs()
    //     return now.format("YYYY-MM-DD")
    // }
    
    exports.handler = async (event) => {
        console.log(`EVENT: ${JSON.stringify(event)}`);
        
        
        // const getDolar = async () => (await axios.get(BASE_URL + `dolar?apikey=${CMF_API_KEY}&formato=json`)).data.Dolares[0].Valor;
        // const getUF = async () => (await axios.get(BASE_URL + `uf?apikey=${CMF_API_KEY}&formato=json`)).data.UFs[0].Valor;
        
        // console.log(` Valores : 
        //     dolar: ${getDolar} 
        //     UF: ${getUF} `)
    
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify({
            dolar : "getDolar",
            uf : "getUF",
        }),
    };
};
