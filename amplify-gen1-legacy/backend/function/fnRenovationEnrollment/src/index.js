

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { sendEmail } = require("./api/sendEmail")
const { getEnrollment } = require("./api/enrollment")
const { getSchedule } = require("./api/getSchedule")
const { getSessionType } = require("./api/getSessionType")

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const {arguments: {enrollId, startDate}} = event;

    // 1.- Get enrollment recibido
    // OBTIENE HORARIOS DEL CURSO A INSCRIBIR
    console.log(`2.---------- OLD oldEnrollment ----------`);
    const oldEnrollment = await getEnrollment(
        {id:enrollId}
    )
    console.log(`2.---------- oldEnrollment ----------`, oldEnrollment);

    ///////// oldEnrollment.scheduleId

    
            
// OBTIENE HORARIOS DEL CURSO A INSCRIBIR
console.log(`2.---------- SCHEDULE ----------`);
const schedule = await getSchedule({id:oldEnrollment.scheduleId})
console.log(`2.---------- schedule ----------`, schedule.location.id);
console.log(`2.---------- schedule ----------`);

// OBTIENE PACK DE SESSIONES DEL CURSO A INSCRIBIR
console.log(`3.---------- SESSION TYPE ----------`);
const sessiontype = await getSessionType({id:oldEnrollment.sessionTypeEnrollmentsId})
console.log(`sessiontype: ${JSON.stringify(sessiontype)}`);
// console.log(`ID_CURSO: ${param.courseId}`);



    // 2.- Crear enrollment
    // CREA LA INSCRIPCION DEL ALUMNO EN EL CURSO
    console.log(`4.---------- ENROLLMENT ----------`);
    const dataEnrollment = {
        startDate: startDate,
        numberOfSessions: oldEnrollment.numberOfSessions, //param.cantidadSesiones,
        amountPaid: oldEnrollment.amountPaid, //param.valorCurso,
        wasPaid: false,
        timeAWeek: oldEnrollment.timeAWeek,        // TODO:  obtener de sessionTYpe la Cantidad de veces por semana contratadas
        sessionsLeft: oldEnrollment.numberOfSessions, //param.cantidadSesiones,
        sessionsUsed:0,
        studentEnrollmentsId: oldEnrollment.studentEnrollmentsId,
        courseEnrollmentsId: oldEnrollment.courseEnrollmentsId,
        sessionTypeEnrollmentsId: oldEnrollment.sessionTypeEnrollmentsId,
        scheduleId: oldEnrollment.scheduleId,
        scheduleName: oldEnrollment.scheduleName
        
        // scheduleEnrollmentsId:param.scheduleId,
    }

    console.log(`addEnrollments -pARAMS: ${JSON.stringify(dataEnrollment)}`);

    // const enrollment = await addEnrollments({
    //    ...dataEnrollment
    // })
    // console.log(`createEnrollment: ${JSON.stringify(enrollment)}`);




    // 3.- Crear sessiones
    // CALCULA EL DETALLE DE LAS SESIONES

    const obj = {  
        courseDay: schedule.day,
        amountCourse:sessiontype.amount, //param.valorCurso, 
        numberOfSessions:sessiontype.totalSessions, //param.cantidadSesiones, 
        startDate:param.startDate, 
    }

    console.log(`obj create sessions: ${JSON.stringify(obj)}`);

    console.log(`5.---------- CALCULATE SESSIONS ----------`);
    const calculateSession = await getCalculateSessions(obj)  // TODO:  SE PUEDEN ACEPTAR MAS DE UN CURSO (cursos con 8 sessiones)*/
    //  console.log(`calculateSession: ${JSON.stringify(calculateSession)}`);


    // 4.- Crear Shoping cart Encabezado
    // 5.- Crear Shoping cart detalle



// 6.- Enviar email
    //SEND EMAIl
    const params = {
        to_client_email: "mortegac@gmail.com",
        reply_to: "mortegac@gmail.com",
        course_name: "BEBES 2 a 3 Años",
        payment_link: "https://pagos.miniswimmer.cl/",
        
      };
    const variables = {
        templateParams: JSON.stringify(params),
        type: "RENOVATION"
    }
    console.log(`variables: ${JSON.stringify(variables)}`);

    // const emaiLSend = await sendEmail(variables);

    // console.log(`emaiLSend: ${JSON.stringify(emaiLSend)}`);



    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Email enviado exitosamente',
            response: "" //emaiLSend
        })
    };
};
