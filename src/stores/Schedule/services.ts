import { generateClient } from 'aws-amplify/api';


import { schedulesByLocationAndCourse } from './queries';
import { createSchedule } from './mutation';
import { FilterOptions } from './types';
import { LIMIT_FILTER } from '../../utils/config';
const client = generateClient();


export const createSchedules = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: createSchedule,
        variables: {
          input: {     
            courseSchedulesId: objFilter.courseId,
            locationSchedulesId: objFilter.locationId,
            day: objFilter.day,
            startHour: objFilter.startHour,
            endHour: objFilter.endHour,
            minimumQuotas: objFilter?.minimumQuotas || 0,
            maximumQuotas: objFilter?.maximumQuotas || 0,
            isActive: true,
          }
        }
      });
      
      console.log("<<< HORARIO CREADO <<<<< ", setData)
      const data = setData?.data?.createSchedule || {};
      resolve({ data } as any);
        
      // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

export const getSchedulesByLocationAndCourse = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const setData:any = await client.graphql({
        query: schedulesByLocationAndCourse,
        variables: { 
          locationSchedulesId: objFilter?.locationId 
        }, 
        // limit: LIMIT_FILTER
      });
      const data = setData?.data?.schedulesByLocationAndCourse || {};
      resolve({ data } as any);
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};




// export const updateSession = async (objFilter: InputOptions): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
  
//       const date = new Date(`${objFilter?.sessionDate}T00:00:00.000Z`);
//       const day = date.getDate().toString().padStart(2, '0');
//       const month = (date.getMonth() + 1).toString().padStart(2, '0');
//       const year = date.getFullYear();
      
//     // const newDate:string = objFilter?.sessionDate.replace("T00:00:00.000Z", '')
//     const newDate: string = (objFilter.sessionDate as string).replace("T00:00:00.000Z", '');
// console.log("--newDate--", newDate)

//     const inputData: Input = {
//       // id: String(objFilter?.sessionId),
//       status: String(objFilter?.status),
//       locationIdUsed: String(objFilter?.locationIdUsed),
//       locationId: String(objFilter?.locationId),
//       date:String(`${objFilter?.sessionDate}T00:00:00.000Z`),
    
//       modifiedByDate: getAWSDateStgoChile(),
//       modifiedBy: String(objFilter?.userModifyId || ""),
      
//       sessionDetailStudentId: objFilter?.studentId || null,
//       enrollmentSessionDetailsId: objFilter?.enrollmentId || null,
//       day: day,
//       month: month,
//       year: year,
//       courseId: objFilter?.courseId || null,
//       scheduleId: objFilter?.scheduleId || null,
      
      
//       sessionNumber : objFilter?.sessionNumber || null,
//       totalSessions: objFilter?.totalSessions || null,
//       proratedValue: objFilter?.proratedValue || null,
//       wasEmailSent:objFilter?.wasEmailSent || null,
    
//     };

//     console.log("updateSession--inputData--", inputData)
    
//     // Paso 1: Crear la nueva sesión primero
//     let setData: any;
//     let createdId: string | null = null;
//     try {
//       setData = await client.graphql({
//         query: createSessionDetail,
//         variables: {
//           input: { ...inputData }
//         }
//       });
      
//       console.log(">> createSessionDetail >>", setData?.data?.createSessionDetail?.id);
      
//       // Validar que la creación fue exitosa
//       if (!setData?.data?.createSessionDetail?.id) {
//         const errorMsg = "Error al crear la sesión: respuesta inválida del servidor";
//         console.error(errorMsg, setData);
//         reject({
//           errorMessage: errorMsg,
//           details: setData,
//           note: "No se pudo crear la nueva sesión. La sesión anterior no fue modificada."
//         });
//         return;
//       }
      
//       createdId = setData.data.createSessionDetail.id;
//       console.log(">> Sesión creada correctamente con ID:", createdId);
      
//     } catch (createError: any) {
//       const errorMsg = "Error al crear la nueva sesión";
//       console.error(errorMsg, createError);
//       reject({
//         errorMessage: errorMsg,
//         details: createError?.message || createError,
//         originalError: createError,
//         note: "No se pudo crear la nueva sesión. La sesión anterior no fue modificada."
//       });
//       return;
//     }
    
//     // Paso 2: Eliminar la sesión antigua (solo si la creación fue exitosa)
//     // Es importante que esta operación siempre se intente, incluso si falla
//     let removeData: any = null;
//     let deleteError: any = null;
//     try {
//       removeData = await client.graphql({
//         query: deleteSessionDetail,
//         variables: {
//           input: { 
//             id: String(objFilter?.sessionId),
//             date: String(objFilter?.currentSession),
//           }
//         }
//       });
      
//       console.log(">> removeData >>", removeData);
      
//       // Validar que la respuesta de eliminación sea correcta
//       if (!removeData?.data?.deleteSessionDetail?.id) {
//         const errorMsg = "Error al eliminar la sesión antigua: respuesta inválida del servidor";
//         console.error(errorMsg, removeData);
//         deleteError = {
//           errorMessage: errorMsg,
//           details: removeData
//         };
//       } else {
//         console.log(">> Sesión antigua eliminada correctamente con ID:", removeData.data.deleteSessionDetail.id);
//       }
      
//     } catch (err: any) {
//       const errorMsg = "Error al eliminar la sesión antigua";
//       console.error(errorMsg, err);
//       deleteError = {
//         errorMessage: errorMsg,
//         details: err?.message || err,
//         originalError: err
//       };
//     }
    
//     // Resolver el resultado: la creación fue exitosa, reportar el estado de la eliminación
//     if (deleteError) {
//       // La creación fue exitosa pero la eliminación falló
//       // Esto es un estado de advertencia, no un error completo
//       resolve({
//         success: true,
//         warning: true,
//         createdId: createdId,
//         deleteError: deleteError,
//         note: "La nueva sesión fue creada exitosamente, pero hubo un problema al eliminar la sesión antigua. Puede requerir intervención manual."
//       });
//     } else {
//       // Ambas operaciones fueron exitosas
//       resolve({
//         success: true,
//         createdId: createdId,
//         deletedId: removeData?.data?.deleteSessionDetail?.id
//       });
//     }
        
//   } catch (err: any) {
//     const errorMsg = "Error inesperado en updateSession";
//     console.error(errorMsg, err);
//     reject({
//       errorMessage: errorMsg,
//       details: err?.message || err,
//       originalError: err
//     });
//   }
//   });
// };
