
const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const getSessionType = async (sessionTypeId) => {
    try {
        return (await api.fetchSessionType({
            env: ENVIROMENT,
            variables: {
                id: sessionTypeId,
            },
        })).data.getSessionType;
    } catch (error) {
        throw new Error("failed fetching getSessionType: " + error);
    }
};

  
  module.exports = {
    getSessionType
  }