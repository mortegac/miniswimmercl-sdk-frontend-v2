const util = require("util");

const { getCorrelatives } = require("./graphql/queries_custom");
const { updateCorrelatives } = require("./graphql/mutations_custom");

const {API} = require("../utils/api");

const increaseCorrelative = async ({ env, nameParam }) => {
  return new Promise(async (resolve, reject) => {

    try {
      let newId = 0;

      const getDBParamsAPI = await API({
        env,
        _query: getCorrelatives,
        _variables: { "id": nameParam },
      })

      newId = getDBParamsAPI?.data?.getCorrelatives?.correlative || 0;
      newId = parseInt(newId) + 1;

      const setDBParamsAPI = await API({
        env,
        _query: updateCorrelatives,
        _variables: {
          input: {
            "id": nameParam,
            "correlative": parseInt(newId)
          }
        },
      })

      console.log(`-- updateCorrelatives -- ${JSON.stringify(setDBParamsAPI)}`);

      resolve({
        id: setDBParamsAPI.data.updateCorrelatives.id,
        correlative: setDBParamsAPI.data.updateCorrelatives.correlative
      });

    } catch (err) {
      console.log("----ERROR TRY-CATH - increaseCorrelative()----", err);
      reject(JSON.stringify(err));
    }
  })
}

module.exports = {
  increaseCorrelative
}