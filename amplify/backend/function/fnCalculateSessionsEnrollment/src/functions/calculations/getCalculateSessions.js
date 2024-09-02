

const getCalculateSessions = (obj) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      // diaCurso | obj.courseDay
      // valorCurso | obj.amountCourse
      // cantidadSesiones | obj.numberOfSessions
      // fechaInicio | obj.startDate
      
      const weekDays = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
      const valorPorSesion = obj.amountCourse / obj.numberOfSessions;
      const daySessions = [];
      let courseStartDate = new Date(obj.startDate);
      const courseDayIndex = weekDays.indexOf(obj.courseDay);

      // Ajustar la fecha de inicio al primer día de curso
      while (courseStartDate.getDay() !== courseDayIndex) {
          courseStartDate.setDate(courseStartDate.getDate() + 1);
      }

      for (let i = 0; i < obj.numberOfSessions; i++) {
          daySessions.push({
            day: weekDays[courseStartDate.getDay()],
            date: courseStartDate.toISOString().split('T')[0],
            proratedValue: valorPorSesion.toFixed(2),
            sessionNumber:parseInt(i+1),
            totalSessions:parseInt(obj.numberOfSessions),
          });
          
          courseStartDate.setDate(courseStartDate.getDate() + 7);
        }

      resolve(daySessions);
   
      
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCalculateSessions
}