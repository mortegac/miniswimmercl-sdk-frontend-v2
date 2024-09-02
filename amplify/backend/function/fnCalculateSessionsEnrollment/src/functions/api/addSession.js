
const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const addSession = async (props) => {
    try {
        let sessionsDate = new Date(props.date);
        const _month = sessionsDate.getMonth() + 1; // Sumamos 1 para que enero sea 1 y diciembre 12
        const _year = sessionsDate.getFullYear();
       

        return (await api.createSessions({
            env: ENVIROMENT,
            variables: {
                 date: sessionsDate,                          //Fecha Session
                   month:String(_month),
                   year:String(_year),
                   status: "ACTIVE",
                   wasEmailSent: false,
                   sessionNumber:parseInt(props.sessionNumber),
                   totalSessions:parseInt(props.totalSessions),
                   proratedValue: parseFloat(props.proratedValue),
                   enrollmentSessionDetailsId: props.enrollmentId,   //InscripcionId
                   sessionDetailStudentId: props.studentId          //StudentId
            },
        }));
    } catch (error) {
        throw new Error("failed create Sessions: " + error);
    }
};
  
  module.exports = {
    addSession
  }