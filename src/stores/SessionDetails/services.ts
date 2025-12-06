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

export const updateData = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
  
    
    
    const inputData: Input = {
      id: String(objFilter?.sessionId),
      status: String(objFilter?.status),
      locationIdUsed: String(objFilter?.locationIdUsed),
      locationId: String(objFilter?.locationIdUsed),
      date: String(objFilter?.date),
      
    };
    // console.log(">> inputData >>", inputData)
    
   
    const setData:any = await client.graphql({
      query: updateSessionDetail,
      variables: {
        input: { ...inputData }
      }
    });
    
    // console.log(">> setData >>", setData)
    
        resolve({ status: "ok"} as any);
        
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



export const updateSession = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
  
      const date = new Date(`${objFilter?.sessionDate}T00:00:00.000Z`);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
    // const newDate:string = objFilter?.sessionDate.replace("T00:00:00.000Z", '')
    const newDate: string = (objFilter.sessionDate as string).replace("T00:00:00.000Z", '');
console.log("--newDate--", newDate)

    const inputData: Input = {
      // id: String(objFilter?.sessionId),
      status: String(objFilter?.status),
      locationIdUsed: String(objFilter?.locationIdUsed),
      locationId: String(objFilter?.locationId),
      date:String(`${objFilter?.sessionDate}T00:00:00.000Z`),
    
      modifiedByDate: getAWSDateStgoChile(),
      modifiedBy: String(objFilter?.userModifyId || ""),
      
      sessionDetailStudentId: objFilter?.studentId || null,
      enrollmentSessionDetailsId: objFilter?.enrollmentId || null,
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
      removeData = await client.graphql({
        query: deleteSessionDetail,
        variables: {
          input: { 
            id: String(objFilter?.sessionId),
            date: String(objFilter?.currentSession),
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
    
    if(objFilter?.status === "ACTIVE"){
      getData = await client.graphql({
        query: sessionDetailsBySessionDetailStudentId,
        variables: { 
          sessionDetailStudentId: String(objFilter?.studentId),
          filter:{
            or: [
                    {status: { eq: "ACTIVE" }},
                    {status: { eq: "RECOVERED" }}            
                ]
          
          }, limit:1000000000
        },
      });
    }else{
      getData = await client.graphql({
        query: sessionDetailsBySessionDetailStudentId,
        variables: { 
          sessionDetailStudentId: String(objFilter?.studentId),
          filter: {
            or: [
              {status: { eq: "USED" }},
              {status: { eq: "DELETED" }},
          ]
          },
          limit: 1000000000
        },
      });
    }

  
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


