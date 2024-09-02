/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { api, utils } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const { getSchedule } = require("./functions/api/getSchedule")
const { getSessionType } = require("./functions/api/getSessionType")
const { addEnrollments } = require("./functions/api/addEnrollments")
const { addSession } = require("./functions/api/addSession")
const { getCalculateSessions } = require("./functions/calculations/getCalculateSessions")


exports.handler = async (event) => {
    try {
        
        const param = event.arguments;
        
        console.log(`1.---------- param ----------${JSON.stringify(param)}`);
        
         // Verificar que las tres variables requeridas existan y no sean undefined
        if (!param.studentId || !param.startDate || !param.sessionTypeId || !param.scheduleId || !param.courseId) {
            return {
            statusCode: 400,
            body: JSON.stringify({ 
                error: 'Missing required fields. studentId, startDate, and sessionTypeId are all required.'
            })
            };
        }
        


        
// OBTIENE HORARIOS DEL CURSO A INSCRIBIR
        console.log(`2.---------- SCHEDULE ----------`);
        const schedule = await getSchedule(param.scheduleId)

// OBTIENE PACK DE SESSIONES DEL CURSO A INSCRIBIR
        console.log(`3.---------- SESSION TYPE ----------`);
        const sessiontype = await getSessionType(param.sessionTypeId)
        console.log(`sessiontype: ${JSON.stringify(sessiontype)}`);
        console.log(`ID_CURSO: ${param.courseId}`);
        


// CREA LA INSCRIPCION DEL ALUMNO EN EL CURSO
        console.log(`4.---------- ENROLLMENT ----------`);
        const enrollment = await addEnrollments({
            startDate: new Date(param.startDate),
            numberOfSessions: sessiontype.totalSessions, //param.cantidadSesiones,
            amountPaid: sessiontype.amount, //param.valorCurso,
            wasPaid: false,
            timeAWeek: sessiontype.timeAWeek,    // TODO:  obtener de sessionTYpe la Cantidad de veces por semana contratadas
            sessionsLeft: sessiontype.totalSessions, //param.cantidadSesiones,
            sessionsUsed:0,
            studentEnrollmentsId: param.studentId,
            courseEnrollmentsId: param.courseId,
            sessionTypeEnrollmentsId: param.sessionTypeId
        })
        console.log(`createEnrollment: ${JSON.stringify(enrollment)}`);


        const obj = {  
            courseDay: schedule.day,
            amountCourse:sessiontype.amount, //param.valorCurso, 
            numberOfSessions:sessiontype.totalSessions, //param.cantidadSesiones, 
            startDate:param.startDate, 
        }
        
// CALCULA EL DETALLE DE LAS SESIONES
        console.log(`5.---------- CALCULATE SESSIONS ----------`);
        const calculateSession = await getCalculateSessions(obj)  // TODO:  SE PUEDEN ACEPTAR MAS DE UN CURSO (cursos con 8 sessiones)*/
       //  console.log(`calculateSession: ${JSON.stringify(calculateSession)}`);
        
        

// CREA CADA SESION DEL ALUMNO EN LA BD,  SEGUN EL CALCULO ANTERIOR
        console.log(`6.---------- CREATE SESSIONS ----------`);
        if (Array.isArray(calculateSession)) {
            try {
                const sessionPromises = calculateSession.map((item, key) => {
                  return addSession({
                    date: item.date,
                    enrollmentId: enrollment.id,
                    studentId: param.studentId,
                    sessionNumber: item.sessionNumber,
                    totalSessions: item.totalSessions,
                    proratedValue: item.proratedValue
                  });
                });

                const results = await Promise.all(sessionPromises);
            
                results.forEach((req, index) => {
                  console.log(`Session ${index + 1} creada: ${JSON.stringify(req)}`);
                });
        
                console.log('Todas las sesiones han sido creadas');
            } catch (error) {
            console.error('Error al crear sesiones:', error);
            }
        } else {
          console.log('calculateSession no es un array válido');
        }
             
        
        
        
        return {
            statusCode: 200,
            body: JSON.stringify(calculateSession),
          };
        
    } catch (error) {
        console.error(">>>> FINAL ERROR", error);
        
        return {
            statusCode: 500,
            body: "proceso fallido",
          };
        
    }
};
