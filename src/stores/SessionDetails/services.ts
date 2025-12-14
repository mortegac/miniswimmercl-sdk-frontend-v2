import { generateClient } from 'aws-amplify/api';


import { getAWSDateStgoChile } from "@/utils/helper";
import { FilterOptions, InputOptions } from './types';
import { listSessionDetails, sessionDetailsBySessionDetailStudentId, sessionDetailsByLocationIdAndDate } from './queries';
import { updateSessionDetail, createSessionDetail, deleteSessionDetail } from './mutation';
const client = generateClient();


import { LIMIT_FILTER } from "../../utils/config";

interface FilterInput {
  [key: string]: {
    [operator: string]: string | number | boolean | null;
  };
}
interface Input {
  [key: string]:  string | number | boolean | null;
}

// export const updateData = async (objFilter: InputOptions): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
  
    
    
//     const inputData: Input = {
//       id: String(objFilter?.sessionId),
//       status: String(objFilter?.status),
//       locationIdUsed: String(objFilter?.locationIdUsed),
//       locationId: String(objFilter?.locationIdUsed),
//       date: String(objFilter?.date),
      
//     };
//     // console.log(">> inputData >>", inputData)
    
   
//     const setData:any = await client.graphql({
//       query: updateSessionDetail,
//       variables: {
//         input: { ...inputData }
//       }
//     });
    
//     // console.log(">> setData >>", setData)
    
//         resolve({ status: "ok"} as any);
        
//         // ...userData.data.getUsers
//       // } else {
//       //   reject({
//       //     errorMessage: errorMsg,
//       //   });
//       // }
//     } catch (err) {
//       reject(
//         JSON.stringify({
//           errorMessage: err,
//         })
//       );
//     }
//   });
// };



// MODIFICACION MASIVA DEL CURSO POR HORARIO
// export const setModifiedSessionsBySchedules = async (objFilter: InputOptions): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
      
//       const modifiedByDate= getAWSDateStgoChile();
//       const modifiedBy: String = objFilter?.userModifyId || "";
      
//       // sessions?: any[];
//       // scheduleId?: string;
      
//       // const inputData: Input = {
//       //   // id: String(objFilter?.sessionId),
//       //   courseId: objFilter?.courseId || null,
//       //   scheduleId: objFilter?.scheduleId || null,
        
//       // };
      
      
      
      
//     } catch (err) {
//       reject(
//         JSON.stringify({
//           errorMessage: err,
//         })
//       );
//     }
//   });
// };


// [
//   {
//     "sessionId": "774f9947-e03e-4c9b-b22e-b5c52eb1f096",
//     "status": "RECOVERED",
//     "courseId": "BEBES-19-MESES-A-3-AÑOS-PENALOLEN-COMUNIDAD-ECOLOGICA",
//     "scheduleId": "eda53f80-9b80-41aa-94a7-31ef147ac6c5",
//     "locationId": "PENALOLEN-COMUNIDAD-ECOLOGICA",
//     "courseTitle": "TODDLER-19-MESES-A-3-AÑOS",
//     "scheduleTitle": "lunes-11:40",
//     "date": "19-NOV-2024"
//   },
//   {
//     "sessionId": "33428016-017b-4e2c-82d2-8fdf55fc4a3e",
//     "status": "RECOVERED",
//     "courseId": "19-MESES-A-3-AñOS-CHILLAN-PISCINA-AQUA-MARI",
//     "scheduleId": "1a26c910-8651-4517-848e-8012d79e1fd7",
//     "locationId": "NUNOA-CLUB-SUIZO",
//     "courseTitle": "19-MESES-A-3-AñOS",
//     "scheduleTitle": "domingo-12:50",
//     "date": "23-NOV-2024"
//   }
// ]


export const updateSessionsBySchedulesProcess = async (
  // calendarsArray: any[], 
  // newCourseId: string, 
  // newScheduleId: string,
  // newLocationId: string,
  id: string,
  date: string,
  status: string,
) => {
  try {
    
    console.log("-updateSessionsBySchedulesProcess-id--", id)
    console.log("-updateSessionsBySchedulesProcess-date--", date)
    console.log("-updateSessionsBySchedulesProcess-status--", status)
    
    const results = await client.graphql({
      query: `
        mutation ACTUALIZAR_SESSION_STATUS($input: UpdateSessionDetailInput!) {
          updateSessionDetail(input: $input) {
           id
          }
        }
      `,
      variables: {
        input: {
          id: id,
          status: status,
          date: date,
        }
      }
    })
    // const results = await Promise.allSettled(
    //   calendarsArray.map((item, index) =>
    //     client.graphql({
    //       query: `
    //         mutation MODIFICAR_SESIONES_POR_HORARIO($input: UpdateSessionDetailInput!) {
    //           updateSessionDetail(input: $input) {
    //            id
    //           }
    //         }
    //       `,
    //       variables: {
    //         input: {
    //           id: item?.id,
    //           status: item?.status,
    //           date: item?.date,
    //           courseId: newCourseId === "" ? item?.courseId : newCourseId,
    //           scheduleId: newScheduleId,
    //           locationId: newLocationId,
    //         }
    //       }
    //     })
    //   )
    // );
    // console.log("results", results);
    return results;
  } catch (error) {
    console.log("Error anulando reservas:", error);
    throw error;
  }
};
export const updateSessionsMasive = async (
  calendarsArray: any[], 
  newCourseId: string, 
  newScheduleId: string,
  newLocationId: string,
) => {
  try {
    
    console.log("-updateSessionsBySchedulesProcess-calendarsArray--", calendarsArray)
    console.log("-updateSessionsBySchedulesProcess-newCourseId--", newCourseId)
    console.log("-updateSessionsBySchedulesProcess-newScheduleId--", newScheduleId)
    console.log("-updateSessionsBySchedulesProcess-newLocationId--", newLocationId)
    const results = await Promise.allSettled(
      calendarsArray.map((item, index) =>
        client.graphql({
          query: `
            mutation MODIFICAR_SESIONES_POR_HORARIO($input: UpdateSessionDetailInput!) {
              updateSessionDetail(input: $input) {
               id
              }
            }
          `,
          variables: {
            input: {
              id: item?.id,
              status: item?.status,
              date: item?.date,
              courseId: newCourseId === "" ? item?.courseId : newCourseId,
              scheduleId: newScheduleId,
              locationId: newLocationId,
            }
          }
        })
      )
    );
    // console.log("results", results);
    return results;
  } catch (error) {
    console.log("Error anulando reservas:", error);
    throw error;
  }
};


export const updateSession = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
  
      // Usar métodos UTC para evitar problemas de zona horaria
      // Parsear la fecha directamente desde el string para obtener día, mes y año correctos
      const dateString = String(objFilter?.date || "");
      let day: string, month: string, year: number;
      
      // Si la fecha viene en formato ISO (YYYY-MM-DDTHH:mm:ss.SSSZ)
      if (dateString.includes('T')) {
        const date = new Date(dateString);
        // Usar métodos UTC para obtener los valores correctos independientemente de la zona horaria
        day = date.getUTCDate().toString().padStart(2, '0');
        month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        year = date.getUTCFullYear();
      } else {
        // Si viene en formato YYYY-MM-DD, parsear directamente
        const dateParts = dateString.split('-');
        if (dateParts.length === 3) {
          year = parseInt(dateParts[0], 10);
          month = dateParts[1];
          day = dateParts[2];
        } else {
          // Fallback: usar new Date() normal
          const date = new Date(dateString);
          day = date.getUTCDate().toString().padStart(2, '0');
          month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
          year = date.getUTCFullYear();
        }
      }
      
    const newDate: string = (objFilter.date as string);
console.log("-updateSession-newDate--", newDate)
console.log("-updateSession-objFilter--", objFilter)
console.log("-updateSession-date-parts--", { day, month, year, dateString })

    // sessionDetailStudentId es requerido (ID!) según el schema, no puede ser null
    const sessionDetailStudentId = objFilter?.sessionDetailStudentId || objFilter?.studentId;
    if (!sessionDetailStudentId) {
      const errorMsg = "sessionDetailStudentId es requerido y no puede ser null";
      console.error(errorMsg, objFilter);
      reject({
        errorMessage: errorMsg,
        details: "El campo sessionDetailStudentId (o studentId) es obligatorio para crear una sesión"
      });
      return;
    }

    const inputData: Input = {
      // id: String(objFilter?.sessionId),
      status: String(objFilter?.status),
      locationIdUsed: String(objFilter?.locationIdUsed),
      locationId: String(objFilter?.locationId),
      date:String(`${objFilter?.date}`),
    
      modifiedByDate: getAWSDateStgoChile(),
      modifiedBy: String(objFilter?.modifiedBy || ""),
      
      sessionDetailStudentId: String(sessionDetailStudentId), // Requerido, no puede ser null
      enrollmentSessionDetailsId: objFilter?.enrollmentSessionDetailsId || objFilter?.enrollmentId || null,
      day: day,
      month: month,
      year: year,
      courseId: objFilter?.courseId || null,
      scheduleId: objFilter?.scheduleId || null,
      
      
      sessionNumber : objFilter?.sessionNumber || null,
      totalSessions: objFilter?.totalSessions || null,
      proratedValue: objFilter?.proratedValue || null,
      wasEmailSent:objFilter?.wasEmailSent || null,
    
    };

    console.log("updateSession--inputData--", inputData)
    
    // Paso 1: Crear la nueva sesión primero
    let setData: any;
    let createdId: string | null = null;
    try {
      setData = await client.graphql({
        query: createSessionDetail,
        variables: {
          input: { ...inputData }
        }
      });
      
      console.log(">> createSessionDetail >>", setData?.data?.createSessionDetail?.id);
      
      // Validar que la creación fue exitosa
      if (!setData?.data?.createSessionDetail?.id) {
        const errorMsg = "Error al crear la sesión: respuesta inválida del servidor";
        console.error(errorMsg, setData);
        reject({
          errorMessage: errorMsg,
          details: setData,
          note: "No se pudo crear la nueva sesión. La sesión anterior no fue modificada."
        });
        return;
      }
      
      createdId = setData.data.createSessionDetail.id;
      console.log(">> Sesión creada correctamente con ID:", createdId);
      
    } catch (createError: any) {
      const errorMsg = "Error al crear la nueva sesión";
      console.error(errorMsg, createError);
      reject({
        errorMessage: errorMsg,
        details: createError?.message || createError,
        originalError: createError,
        note: "No se pudo crear la nueva sesión. La sesión anterior no fue modificada."
      });
      return;
    }
    
    // Paso 2: Eliminar la sesión antigua (solo si la creación fue exitosa)
    // Es importante que esta operación siempre se intente, incluso si falla
    let removeData: any = null;
    let deleteError: any = null;
    try {
      
      console.log("-deleteSessionDetail-objFilter--", objFilter?.id, " - ", objFilter?.date)
      
      removeData = await client.graphql({
        query: deleteSessionDetail,
        variables: {
          input: { 
            id: objFilter?.id,
            date:String(`${objFilter?.currentSession}`),
            // date:String(`${objFilter?.date}`),
          }
        }
      });
      
      console.log(">> removeData >>", removeData);
      
      // Validar que la respuesta de eliminación sea correcta
      if (!removeData?.data?.deleteSessionDetail?.id) {
        const errorMsg = "Error al eliminar la sesión antigua: respuesta inválida del servidor";
        console.error(errorMsg, removeData);
        deleteError = {
          errorMessage: errorMsg,
          details: removeData
        };
      } else {
        console.log(">> Sesión antigua eliminada correctamente con ID:", removeData.data.deleteSessionDetail.id);
      }
      
    } catch (err: any) {
      const errorMsg = "Error al eliminar la sesión antigua";
      console.error(errorMsg, err);
      deleteError = {
        errorMessage: errorMsg,
        details: err?.message || err,
        originalError: err
      };
    }
    
    // Resolver el resultado: la creación fue exitosa, reportar el estado de la eliminación
    if (deleteError) {
      // La creación fue exitosa pero la eliminación falló
      // Esto es un estado de advertencia, no un error completo
      resolve({
        success: true,
        warning: true,
        createdId: createdId,
        deleteError: deleteError,
        note: "La nueva sesión fue creada exitosamente, pero hubo un problema al eliminar la sesión antigua. Puede requerir intervención manual."
      });
    } else {
      // Ambas operaciones fueron exitosas
      resolve({
        success: true,
        createdId: createdId,
        deletedId: removeData?.data?.deleteSessionDetail?.id
      });
    }
        
  } catch (err: any) {
    const errorMsg = "Error inesperado en updateSession";
    console.error(errorMsg, err);
    reject({
      errorMessage: errorMsg,
      details: err?.message || err,
      originalError: err
    });
  }
  });
};


export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      console.log(">> objFilter >>", objFilter)
    
    const filterEnrollment= typeof objFilter?.enrollmentId === 'undefined'
      ? {}
      : { enrollmentSessionDetailsId: { eq: String(objFilter?.enrollmentId) } };
      
    const filterLocation= typeof objFilter?.locationId === 'undefined' || objFilter?.locationId === ""
      ? {}
      : { locationId: { eq: String(objFilter?.locationId) } };
      
    const filterStudent = typeof objFilter?.studentId === 'undefined'
      ? {}
      : { sessionDetailStudentId: { eq: String(objFilter?.studentId) } };
      
    const filterSessionDate = typeof objFilter?.sessionDate === 'undefined'
      ? {}
      : { 
        // date: { eq: String(objFilter?.sessionDate) } 
        // date: { eq: "2024-08-13T00:00:00.000Z"},
        date: { contains: objFilter?.sessionDate},
      };
    const filterStatus = (typeof objFilter?.status === 'undefined') ?
    {}
    : { status: { eq: String(objFilter.status) } };
    
    const filter: any = {
      ...filterStudent,
      ...filterStatus,
      ...filterSessionDate,
      ...filterLocation,
      ...filterEnrollment,
    };
   
    let getData:any;
    
    // console.log(">>> objFilter  >>>", objFilter )
    
    // ACTIVE
    // USED
    // RECOVERED
    // DELETED
    
    if(objFilter?.status === "ACTIVE"){
      getData = await client.graphql({
        query: listSessionDetails,
        variables: { 
          filter:{
            // sessionDetailStudentId: {eq: String(objFilter?.studentId)},
            ...filterStudent,
            ...filterSessionDate,
            ...filterLocation,
            or: [
                    {status: { eq: "ACTIVE" }},
                    {status: { eq: "USED" }},
                    {status: { eq: "RECOVERED" }}            
                ]
          
          }, limit:1000000000
        },
      });
  }else{
    getData = await client.graphql({
      query: listSessionDetails,
      variables: { 
        filter: {
          ...filter,
          or: [
            {status: { ne: "DELETED" }},
        ]
        },
        limit: 1000000000
      },
    });
  }

  
      
      const data:any = getData.data;
      // console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data)
      // data.listSessionDetails.items.length > 0 && console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data.listSessionDetails)
      
        resolve({ ...data.listSessionDetails } as any);
        
        // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      console.log(">> err >>", err)
      reject({
        errorMessage:JSON.stringify(err)
      }
    );
  }
  });
};
export const fetchSessionsByStudent = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
         
    let getData:any;
    let filterConfig: any;
    
    // Configurar el filtro según el status
    if(objFilter?.status === "ACTIVE"){
      // ACTIVE incluye también RECOVERED
      filterConfig = {
        or: [
          {status: { eq: "ACTIVE" }},
          {status: { eq: "RECOVERED" }}            
        ]
      };
    } else if(objFilter?.status === "USED"){
      // USED solo incluye USED
      filterConfig = {
        status: { eq: "USED" }
      };
    } else if(objFilter?.status === "DELETED"){
      // DELETED solo incluye DELETED
      filterConfig = {
        status: { eq: "DELETED" }
      };
    } else {
      // Por defecto, si no se especifica status, no filtrar por status
      filterConfig = undefined;
    }
    
    // Construir las variables de la query
    const queryVariables: any = {
      sessionDetailStudentId: String(objFilter?.studentId),
      limit: 1000000000
    };
    
    // Agregar el filtro solo si está definido
    if(filterConfig){
      queryVariables.filter = filterConfig;
    }
    
    getData = await client.graphql({
      query: sessionDetailsBySessionDetailStudentId,
      variables: queryVariables,
    });

  
       console.log(">>> getData.data  >>>", getData.data )
    const data:any = getData.data;
    resolve({ ...data.sessionDetailsBySessionDetailStudentId } as any);
        
    } catch (err) {
      console.log(">> err >>", err)
      reject({
        errorMessage:JSON.stringify(err)
      }
    );
  }
  });
};
export const fetchSessionsByLocationAndDate = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      
     const getData:any = await client.graphql({
        query: sessionDetailsByLocationIdAndDate,
        variables: { 
          locationId: objFilter?.locationId || "HIDROKIN-VINA-DEL-MAR",
          date: { between: [
            `${objFilter?.sessionDate}T00:00:00.000Z`, 
            `${objFilter?.sessionDate}T23:59:59.999Z`
          ] },
          sortDirection: "ASC",
          filter:{
            or: [
                {status: { eq: "ACTIVE" }},
                {status: { eq: "USED" }},
                {status: { eq: "RECOVERED" }}            
                ]
          }
        },
      });

       console.log(">>> getData.data  >>>", getData.data )
    const data:any = getData.data;
    resolve({ ...data.sessionDetailsByLocationIdAndDate } as any); // CORRECCIÓN AQUÍ
        
    } catch (err) {
      console.log(">> err >>", err)
      reject({
        errorMessage:JSON.stringify(err)
      });
    }
  });
};



export const fetchSessionsByLocationAndDatev2 = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      
     const getData:any = await client.graphql({
        query: sessionDetailsByLocationIdAndDate,
        variables: { 
          locationId: objFilter?.locationId || "",
          date: { between: [
            `${objFilter?.sessionDate}`, 
            `${objFilter?.sessionDateEnd}`
          ] },
          sortDirection: "ASC",
          limit: 1000000000,
          // filter:{
          //   or: [
          //       {status: { eq: "ACTIVE" }},
          //       {status: { eq: "USED" }},
          //       {status: { eq: "RECOVERED" }}            
          //       ]
          // }
        },
      });

       console.log(">>> fetchSessionsByLocationAndDatev2.data  >>>", getData.data )
    const data:any = getData.data;
    resolve({ ...data.sessionDetailsByLocationIdAndDate } as any); // CORRECCIÓN AQUÍ
        
    } catch (err) {
      console.log(">> err >>", err)
      reject({
        errorMessage:JSON.stringify(err)
      });
    }
  });
};


// COURSES QUOTE 
export const fetchDataCourseQuote = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
    
      const filterLocation= typeof objFilter?.locationId === 'undefined' || objFilter?.locationId === ""
      ? {}
      : { locationId: { eq: String(objFilter?.locationId) } };
      
      // locationId
      
      const getData:any = await client.graphql({
        query: listSessionDetails,
        variables: { 
          filter:{
            ...filterLocation,
            date: {
              between: [
              `2025-01-01T00:00:00.000Z`,
              `2025-01-31T00:00:00.000Z`
              ]
            },            
            or: [
                    {status: { eq: "ACTIVE" }},
                    {status: { eq: "RECOVERED" }}            
                ]
          
          }, limit:1000000000
        },
      });
  

  
      
      const data:any = getData.data;
      // console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data)
      // data.listSessionDetails.items.length > 0 && console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data.listSessionDetails)
      
        resolve({ ...data?.listSessionDetails } as any);
        
        // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      console.log(">> err >>", err)
      reject({
        errorMessage:JSON.stringify(err)
      }
    );
  }
  });
};


