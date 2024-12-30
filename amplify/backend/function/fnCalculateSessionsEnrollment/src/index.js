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
const { addShoppingCart, addShoppingCartDetail, fetchShoppingCart } = require("./functions/api/addShoppingCart")
const { getCalculateSessions } = require("./functions/calculations/getCalculateSessions")


exports.handler = async (event) => {
    try {
        const sessionInfoArray = []; // Array para devolver las sessiones creadas
        const param = event.arguments;
        
        console.log(`1.---------- param ----------${JSON.stringify(param)}`);
        
         // Verificar que las tres variables requeridas existan y no sean undefined
        if (!param.studentId || !param.userId || !param.startDate || !param.sessionTypeId || !param.scheduleId || !param.courseId) {
            return {
            statusCode: 400,
            body: JSON.stringify({ 
                error: 'Missing required fields. studentId, userId, startDate, and sessionTypeId are all required.'
            })
            };
        }
        


        
// OBTIENE HORARIOS DEL CURSO A INSCRIBIR
        console.log(`2.---------- SCHEDULE ----------`);
        const schedule = await getSchedule(param.scheduleId)
        console.log(`2.---------- schedule ----------`, schedule.location.id);
        console.log(`2.---------- schedule ----------`);

// OBTIENE PACK DE SESSIONES DEL CURSO A INSCRIBIR
        console.log(`3.---------- SESSION TYPE ----------`);
        const sessiontype = await getSessionType(param.sessionTypeId)
        console.log(`sessiontype: ${JSON.stringify(sessiontype)}`);
        console.log(`ID_CURSO: ${param.courseId}`);
        


// CREA LA INSCRIPCION DEL ALUMNO EN EL CURSO
        console.log(`4.---------- ENROLLMENT ----------`);
        const dataEnrollment = {
            startDate: param.startDate,
            numberOfSessions: sessiontype.totalSessions, //param.cantidadSesiones,
            amountPaid: sessiontype.amount, //param.valorCurso,
            wasPaid: false,
            timeAWeek: sessiontype.timeAWeek,    // TODO:  obtener de sessionTYpe la Cantidad de veces por semana contratadas
            sessionsLeft: sessiontype.totalSessions, //param.cantidadSesiones,
            sessionsUsed:0,
            studentEnrollmentsId: param.studentId,
            courseEnrollmentsId: param.courseId,
            sessionTypeEnrollmentsId: param.sessionTypeId,
            scheduleId:param.scheduleId,
            scheduleName:`${schedule.day} ${schedule.startHour}`
            
            // scheduleEnrollmentsId:param.scheduleId,
        }
        
        console.log(`addEnrollments -pARAMS: ${JSON.stringify(dataEnrollment)}`);
        
        const enrollmentResult = await addEnrollments({
           ...dataEnrollment
        })
        console.log(`createEnrollment: ${JSON.stringify(enrollmentResult)}`);
        console.log(`ID - createEnrollment: ${JSON.stringify(enrollmentResult?.id)}`);


        const obj = {  
            courseDay: schedule.day,
            amountCourse:sessiontype.amount, //param.valorCurso, 
            numberOfSessions:sessiontype.totalSessions, //param.cantidadSesiones, 
            startDate:param.startDate, 
        }
        
        console.log(`obj create sessions: ${JSON.stringify(obj)}`);
        
// CALCULA EL DETALLE DE LAS SESIONES
        console.log(`5.---------- CALCULATE SESSIONS ----------`);
        const calculateSession = await getCalculateSessions(obj)  // TODO:  SE PUEDEN ACEPTAR MAS DE UN CURSO (cursos con 8 sessiones)*/
        
        console.log(`calculateSession: ${JSON.stringify(calculateSession)}`);
        
        

// CREA CADA SESION DEL ALUMNO EN LA BD,  SEGUN EL CALCULO ANTERIOR
        console.log(`6.---------- CREATE SESSIONS ----------`);
        if (Array.isArray(calculateSession)) {
            try {
                const sessionPromises = calculateSession.map((item, key) => {
                  return addSession({
                    date: item.date,
                    sessionDetailStudentId: param.studentId,
                    sessionNumber: parseInt(item.sessionNumber),
                    totalSessions: parseInt(item.totalSessions),
                    proratedValue: parseFloat(item.proratedValue),
                    locationId: schedule.location.id,
                    locationIdUsed: "",                    
                    enrollmentSessionDetailsId: enrollmentResult?.id,
                  });
                });

                const results = await Promise.all(sessionPromises);
            
                console.log(`6.---------- results ----------`, JSON.stringify(results, null, 2 ));


                // const monthShort = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
                

                results.forEach((req, index) => {
                  const sessionId = req.data.createSessionDetail.id;
                  const sessionDay = req.data.createSessionDetail.day;
                  const sessionMonth = req.data.createSessionDetail.month;
                  const sesionNumber = index + 1;

                  sessionInfoArray.push({
                    id: sessionId,
                    sesionNumber,
                    date:`${sessionDay} - ${sessionMonth}`,
                    locationId:schedule.location.id,
                  });

                  console.log(`Session ${sesionNumber} creada: ${JSON.stringify(req)}`);

                });
                
                console.log('Todas las sesiones han sido creadas');
                console.log('SESIONES CREADAS', sessionInfoArray);

            } catch (error) {
            console.error('Error al crear sesiones:', error);
            }
        } else {
          console.log('calculateSession no es un array válido');
        }
        
// VERIFICAR SI EXISTE UN CARRO VIGENTE 
        console.log(`7.---------- CHECK EXIST SHOPPING CART ----------`);
        const shoppingCart = await fetchShoppingCart( 
          {
            usersShoppingCartId:{ eq:param?.userId},
            status:{eq:"PENDING"}
          }
        )
        console.log(`7.---------- A - CHECK EXIST SHOPPING CART ----------`, shoppingCart);
        console.log(`7.---------- B -Array.isArray(shoppingCart?.items ----------`, Array.isArray(shoppingCart?.items));
        console.log(`7.---------- C -shoppingCart?.items.length ----------`, shoppingCart?.items.length);
        
        let idShoppingCart="";
      if (Array.isArray(shoppingCart?.items) && shoppingCart?.items.length === 0){
        
        // CREAR SHOPPING CART ENCABEZADO      
                console.log(`8.---------- CREATE SHOPPING CART ----------`);
                const dataShoppingCart = {
                  totalPrice:sessiontype.amount,    
                  status: "PENDING",
                  usersShoppingCartId: param?.userId,
                }
        
                console.log(`8.---------- addShoppingCart -pARAMS: ${JSON.stringify(dataShoppingCart)}`);
                
                const cartResult = await addShoppingCart({
                  ...dataShoppingCart
                })
                console.log(`8.---------- CREATE SHOPPING CART -- cartResult: ${JSON.stringify(cartResult)}`);

                idShoppingCart = cartResult?.id
        
      }else{
        idShoppingCart = shoppingCart?.items[0]?.id
      }
      
      
      
      console.log(`8.---------- idShoppingCart: ${idShoppingCart}`);




// CREAR SHOPPING CART DETALLE
      if(idShoppingCart && idShoppingCart != ""){
        
        console.log(`9.---------- CREATE SHOPPING CART DETAIL ----------`);
        const dataShoppingCartDetail = {
          type: "ENROLLMENTS", 
          quantity: 1,
          amount:sessiontype.amount,    
          // detail: "4 clases Bebes, Ninos - 2 a 3 anos, VITACURA-PISCINA-MUNICIPAL, martes 15:30",
          detail: `${sessiontype.totalSessions} clases ${schedule?.courseSchedulesId}, ${schedule?.location.id}, ${schedule?.day} ${schedule?.startHour}`,
          shoppingCartCartDetailsId: idShoppingCart,
          shoppingCartDetailEnrollmentId: enrollmentResult?.id,
        }

        console.log(`9.---------- addShoppingCart -pARAMS: ${JSON.stringify(dataShoppingCartDetail)}`);

        const cartResultDetail = await addShoppingCartDetail({
          ...dataShoppingCartDetail
        })
        console.log(`9.----------cartResultDetail : ${JSON.stringify(cartResultDetail)}`);

      }

        
        const responseData = {
          sessions: sessionInfoArray,
          cartId:idShoppingCart
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify(responseData),
          };
        
    } catch (error) {
        console.error(">>>> FINAL ERROR", error);
        
        return {
            statusCode: 500,
            body: JSON.stringify(error),
          };
        
    }
};
