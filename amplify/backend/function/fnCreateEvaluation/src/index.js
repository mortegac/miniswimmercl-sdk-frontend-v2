
const { setEvaluation } = require("./api/studentEvaluations")
const { setEvaluationDetail } = require("./api/studentEvaluationsDetail")
// const layer = require("/opt/nodejs/index");



/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    
    try {

        // console.log("--layer--", layer.utils)
        console.log("--process.env--", process.env)
        // const params = event.arguments;
        // console.log(`1.---------- param ----------${JSON.stringify(params)}`);

        const localDate = new Date();
        const localDateUTC_ISO = localDate.toISOString();
        
        const _studentId= "0f42a6c9-17d9-4417-a89c-ffa62635cd73"
        const _userId= "hi@manuelo.dev"
        const _evaluationLevelId= "level-1"

        const params= {
            previousLevel: "Nivel 1 - Principiante",
            sessionsCarriedOut: "8",
            age: "5.5",
            wasApproved: false,
            observations: "Excelente progreso en las técnicas básicas",
            studentId: _studentId,
            evaluationLevelId: _evaluationLevelId,
            userId: _userId,
            evaluationLevelStudentEvaluationsId: _evaluationLevelId,
            usersStudentEvaluationsId: _userId,
            studentStudentEvaluationsId: _studentId,
        }

        // if (!param.studentId || !param.sessionsCarriedOut || !param.age || !param.wasApproved || !param.evaluationLevelId || !param.userId) {
        //     return {
        //     statusCode: 400,
        //     body: JSON.stringify({ 
        //         error: 'Missing required fields. studentId, userId, sessionsCarriedOut, and age are all required.'
        //     })
        //     };
        // }


        console.log(`2.---------- CREATE EVALUATION ----------`);
        const dataEvaluation = {
            date: localDateUTC_ISO,
            previousLevel: params?.previousLevel,
            sessionsCarriedOut: Number(params?.sessionsCarriedOut),
            age: Number(params?.age),
            wasApproved: params?.wasApproved,
            observations: params?.observations,
            studentId: params?.studentId,
            evaluationLevelId: params?.evaluationLevelId,
            userId: params?.userId,
            evaluationLevelStudentEvaluationsId: params?.evaluationLevelId,
            usersStudentEvaluationsId: params?.userId,
            studentStudentEvaluationsId: params?.studentId
        } 

        console.log(`2.1---------- dataEvaluation ---------- ${JSON.stringify(dataEvaluation)}`);
        
        const evaluationResult = await setEvaluation({
           ...dataEvaluation
        })

        const evaluationId = evaluationResult?.id;
        const evaluationDetailId = "level-1-3";

        console.log(`2.2---------- evaluationId ---------- ${JSON.stringify(evaluationId)}`);


        console.log(`3.---------- CREATE EVALUATION DETAIL ----------`);
        
        // const dataDetail = {
        //     wasAchieved: true,
        //     text: "Test detail",
        //     evaluationObjectiveId: params?.evaluationLevelId,                                 //   # Nivel
        //     evaluationObjetivesStudentEvaluationsDetailsId:params?.evaluationLevelId,         //   # Nivel
        //     studentEvaluationsId: params?.studentId,                                          //   # Objetivo
        //     studentEvaluationsStudentEvaluationsDetailsId:evaluationId                        //   # Objetivo
        // } 
    
        // console.log(`1.1---------- dataDetail ---------- ${JSON.stringify(dataDetail)}`);
        

        // evaluationObjectiveId: "level-1-3"
        // evaluationObjetivesStudentEvaluationsDetailsId:"level-1-3"

        

        const detailEvaluations = [
            {
                wasAchieved: true,
                text: "Test detail 1",
                evaluationObjectiveId: "level-1-1",                                 //   # Nivel
                evaluationObjetivesStudentEvaluationsDetailsId: "level-1-1",         //   # Nivel
                studentEvaluationsId: params?.studentId,                                          //   # Objetivo
                studentEvaluationsStudentEvaluationsDetailsId: evaluationId                        //   # Objetivo
            },
            {
                wasAchieved: true,
                text: "Test detail 2",
                evaluationObjectiveId: "level-1-2",                                 //   # Nivel
                evaluationObjetivesStudentEvaluationsDetailsId:"level-1-2",         //   # Nivel
                studentEvaluationsId: params?.studentId,                                          //   # Objetivo
                studentEvaluationsStudentEvaluationsDetailsId:evaluationId                        //   # Objetivo
            },
            {
                wasAchieved: true,
                text: "Test detail 3",
                evaluationObjectiveId: "level-1-3",                                 //   # Nivel
                evaluationObjetivesStudentEvaluationsDetailsId:"level-1-3",         //   # Nivel
                studentEvaluationsId: params?.studentId,                                          //   # Objetivo
                studentEvaluationsStudentEvaluationsDetailsId:evaluationId                        //   # Objetivo
            },
        ]

        // CREA CADA detalle de evaluacion
        // console.log(`6.---------- CREATE DETAIL EVALUATION ----------`);
        if (Array.isArray(detailEvaluations)) {
            try {
                const detailEvaluationPromises = detailEvaluations.map((item, key) => {
                  return setEvaluationDetail({
                   ...item
                  });
                });

                const results = await Promise.all(detailEvaluationPromises);
            
                console.log(`3.1---------- results ----------`, JSON.stringify(results, null, 2 ));



                // results.forEach((req, index) => {
                //   const sessionId = req.data.createSessionDetail.id;
                //   const sessionDay = req.data.createSessionDetail.day;
                //   const sessionMonth = req.data.createSessionDetail.month;
                //   const sesionNumber = index + 1;

                //   sessionInfoArray.push({
                //     id: sessionId,
                //     sesionNumber,
                //     date:`${sessionDay} - ${sessionMonth}`,
                //     locationId:schedule.location.id,
                //   });

                //   console.log(`Session ${sesionNumber} creada: ${JSON.stringify(req)}`);

                // });
                
                // console.log('Todas las sesiones han sido creadas');
                // console.log('SESIONES CREADAS', sessionInfoArray);

            } catch (error) {
            console.error('Error al crear sesiones:', error);
            }
        } else {
          console.log('calculateSession no es un array válido');
        }
      
      
   

        const responseData = {}

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

   // return {
     //   statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
       // body: JSON.stringify('Hello from Lambda!'),
 //   };
//};
