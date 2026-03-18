const { getEnviroment } = require("../utils/enviroment");

const Response = (env, code, body) => {
  if (env === "") return reject("The enviroment does not exist");
  const _ENV = getEnviroment(env);
  console.log(`------getEnviroment-------: ${JSON.stringify(_ENV.message)}`);
  //cambio dummy para q se note
  let temp;
  if (body.message) {
    temp = { message: body.message, ...body };
  } else {
    temp = body;
  }
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": _ENV.CORS,
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: JSON.stringify(temp),
  };
};

module.exports = { Response };
