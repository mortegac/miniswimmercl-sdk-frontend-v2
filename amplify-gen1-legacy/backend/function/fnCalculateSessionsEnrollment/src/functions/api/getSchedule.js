
const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const getSchedule = async (scheduleId) => {
    try {
        return (await api.fetchSchedule({
            env: ENVIROMENT,
            variables: {
                id: scheduleId,
            },
        })).data.getSchedule;
    } catch (error) {
        throw new Error("failed fetching the process: " + error);
    }
};

  
  module.exports = {
    getSchedule
  }