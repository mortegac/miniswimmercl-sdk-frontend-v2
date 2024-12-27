
const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const addSession = async (props) => {
    try {
        let sessionsDate = new Date(props.date);
        let _day, _month, _year ="";
        try {
          _day = String(sessionsDate.getDate()).padStart(2, '0');
          _month = sessionsDate.getMonth() + 1; // Sumamos 1 para que enero sea 1 y diciembre 12
          _year = sessionsDate.getFullYear();
          
        } catch (error) {
          console.log("error al calcular la fecha addSession", error)
          _day = ""
          _month = ""
          _year = ""
        }
       

        return (await api.createSessions({
            env: ENVIROMENT,
            variables: {
              ...props,
              date: sessionsDate,                          //Fecha Session
              day:String(_day),
              month:String(_month),
              year:String(_year),
              status: "ACTIVE",
              wasEmailSent: false,
              modifiedBy :"",
              modifiedByDate:"1800-01-01T00:00:00.000Z"
            },
        }));
    } catch (error) {
        throw new Error("failed create Sessions: " + error);
    }
};
  
  module.exports = {
    addSession
  }