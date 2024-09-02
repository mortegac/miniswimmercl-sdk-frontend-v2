
const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const addEnrollments = async (props) => {
    try {
        
        const [month, day, year] = props.startDate.split('-');
        const startDate = new Date(year, month - 1, day); // month - 1 porque en JS los meses van de 0 a 11
        
        // Sumar 30 días para calcular fecha de termino
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 30);
        
        // Formatear la nueva fecha (opcional)
        const endDateFormatted = `${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}-${endDate.getFullYear()}`;

        return (await api.createEnrollments({
            env: ENVIROMENT,
            variables: {
                startDate: props.startDate,  //"07-01-2024" 
                endDate: endDateFormatted, 
                numberOfSessions:  props.numberOfSessions,
                amountPaid:  props.amountPaid,
                wasPaid:  props.wasPaid,
                timeAWeek:  props.timeAWeek,
                sessionsLeft: props.sessionsLeft,
                sessionsUsed: props.sessionsUsed,
                studentEnrollmentsId:  props.studentEnrollmentsId,
                courseEnrollmentsId:  props.courseEnrollmentsId,
                sessionTypeEnrollmentsId:  props.sessionTypeEnrollmentsId
            },
        })).data.createEnrollment;
    } catch (error) {
        throw new Error("failed create Enrollment: " + error);
    }
};
  
  module.exports = {
    addEnrollments
  }