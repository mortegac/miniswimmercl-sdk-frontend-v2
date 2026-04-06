import { generateClient } from 'aws-amplify/api';


import { listEnrollments, listEnrollmentsExpiring } from './queries';
import { getUsers } from '../Users/queries';
import { generateEnrollment, removeEnrollment, updateEnrollment } from './mutation';
import { sessionDetailsByLocationIdAndDate } from '../SessionDetails/queries';
import { fetchDataOnly } from '../Locations/services';
import { FilterOptions, FilterUser } from './types';
const client = generateClient();



export const fetchGuardian = async (objFilter: FilterUser): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {      
      const getData:any = await client.graphql({
        query: getUsers,
        variables: { id: objFilter.userEmail },
      });
      const data = getData.data;
      
        resolve({ ...data.getV2Users} as any);
        
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


export const fetchData = async (filter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {

      
      const month:number = Number(filter?.month)
   
      console.log("--fetchData--filter", filter)
      
      const filterDay = (typeof filter?.day === 'undefined' && filter?.day === '') ?
      "" : filter?.day;
      
          
      const filterStudentId = (typeof filter?.studentId === 'undefined') ?
      { } : { studentId : { eq: filter?.studentId } };
      
      // let filterPaid = (typeof filter?.wasPaid === 'undefined' && {}|| filter?.wasPaid === "" || filter?.wasPaid) ?
      // { } : { wasPaid: { eq: filter?.wasPaid } };
          
      let filterPaid = (typeof filter?.wasPaid === 'undefined' || filter?.wasPaid === "" ) ?
      { } : { wasPaid: { eq: filter?.wasPaid } };
      
      // const filterRemoved = (typeof filter?.wasDeleted === 'undefined' && filter?.wasDeleted === "") ?
      // { } : { wasDeleted: { eq: filter?.wasDeleted } };
      
      const filterAll: any = {
        ...filterPaid,
        // ...filterStudentId,
        // ...filterRemoved,
      };
     
      let getData:any;
   if (typeof filter?.studentId === 'undefined' || filter?.studentId === ""){
     getData= await client.graphql({
       query: listEnrollments,
       variables: { 
        filter: {
          ...filterAll,
          startDate: {
            // 2024-12-16T19:01:29.732Z
            between: [
              `${filter?.month}-${filterDay==="" ? "01":filterDay}-${filter?.year}`,
              `${filter?.month}-${filterDay==="" ? "31":filterDay}-${filter?.year}`,
            ],
            
          },
          // or: [
          //   { startDate: { contains: `${filter.month}-` } },
          //   { startDate: { contains: `-${filter?.year}` } },
          // ]
        },
        limit:1000000000
      },
      //  variables: { 
        //  input: {
        //    id: filter.name
        //  } 
      //  },
     });
    
   }else{
    getData= await client.graphql({
      query: listEnrollments,
      variables: { 
       filter: {
         ...filterStudentId,
       },
       limit:1000000000
     },
    
    });
   }
      
       // Update USER
        // Save o update RELATION
      
      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData?.data;
      const dataOrder = [...(data?.listV2Enrollments?.items || [])].sort((a, b) => {
        // Primero ordenar por wasPaid (false primero)
        if (a.wasPaid !== b.wasPaid) {
          return a.wasPaid ? 1 : -1;
        }
        
        // Si wasPaid es igual, ordenar por fecha
        const [aMonth, aDay, aYear] = a.startDate.split('-').map(Number);
        const [bMonth, bDay, bYear] = b.startDate.split('-').map(Number);
        
        // Crear objetos Date para comparación precisa
        const dateA:any = new Date(aYear, aMonth - 1, aDay);
        const dateB:any = new Date(bYear, bMonth - 1, bDay);
        
        return dateA - dateB;
      });
      
        resolve([...dataOrder] as any);
        // resolve([...data?.listEnrollments?.items] as any);
        
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


export const createEnrollment = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: generateEnrollment,
        variables: {
          // input: {            
            userId: objFilter.userId,
            studentId: objFilter.studentId,
            startDate: objFilter.enrollmentStartDate,
            sessionTypeId: objFilter.enrollmentSessionTypeId,
            scheduleId: objFilter.enrollmentScheduleId,
            courseId: objFilter.enrollmentCourseId,
          // }
        }
      });
      
      // console.log("<<< ENROLLMENT CREADO <<<<< ", setData)
      // const data = setData.data;
      // resolve({ ...data.generateEnrollment } as any);
      
      const result = setData?.data?.v2GenerateEnrollment || {};
      // sessions ya vienen del backend con date formateada "LUNES-07-ABR" y sesionNumber
      resolve({ data: result } as any);
        
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

// }

export const deleteEnrollment = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const deleteData:any = await client.graphql({
        query: removeEnrollment,
        variables: {
          // input: {            
            enrollId: objFilter?.enrollmentId,
            employeeId: objFilter?.employeeId,
          // }
        }
      });
      
      // console.log("<<< ENROLLMENT CREADO <<<<< ", setData)
      // const data = setData.data;
      // resolve({ ...data.generateEnrollment } as any);
      
      const data = deleteData?.data?.removeEnrollment || {};
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
export const updatePayEnrollment = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const updatePayData:any = await client.graphql({
        query: updateEnrollment,
        variables: {
          input: {            
            id: objFilter?.enrollmentId,
            wasPaid: String(objFilter?.wasPaid),
          }
        }
      });
      
      // console.log("<<< ENROLLMENT CREADO <<<<< ", setData)
      // const data = setData.data;
      // resolve({ ...data.generateEnrollment } as any);
      
      const data = updatePayData?.data?.updateEnrollment || {};
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



export const createUpdateStep01 = async (data: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: listEnrollments,
        // variables: { id: userId },
      });
      
      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listCourses } as any);
        
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
export const createUpdateStep02 = async (data: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: listEnrollments,
        // variables: { id: userId },
      });
      
      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listCourses } as any);
        
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
export const createUpdateStep03 = async (data: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: listEnrollments,
        // variables: { id: userId },
      });
      
      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listCourses } as any);
        
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

/**
 * Obtiene los Enrollment que están por vencer usando la query optimizada sessionDetailsByLocationIdAndDate
 * Un Enrollment está por vencer si tiene SessionDetail con status ACTIVE o RECOVERED
 * que están en el mes especificado por filter.sessionDate (o mes actual si no se especifica)
 * 
 * @param filter - Opciones de filtro:
 *   - sessionDate: Fecha en formato YYYY-MM-DD para calcular el mes a consultar
 *   - locationId: ID de location específica (opcional, si no se especifica consulta todas)
 *   - wasPaid: Filtro de pago (opcional)
 */
export const fetchEnrollmentsExpiring = async (filter?: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Calcular fechas basadas en sessionDate del filter o usar fecha actual
      let sessionDateStr: string;
      
      if (filter?.sessionDate) {
        // Si viene en formato completo con T, extraer solo la fecha
        sessionDateStr = filter.sessionDate.includes('T') 
          ? filter.sessionDate.split('T')[0] 
          : filter.sessionDate;
      } else {
        // Si no viene sessionDate, usar fecha actual
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        sessionDateStr = `${year}-${month}-${day}`;
      }
      
      // Calcular primer y último día del mes de sessionDate
      const sessionDate = new Date(sessionDateStr + 'T00:00:00.000Z');
      const year = sessionDate.getUTCFullYear();
      const month = sessionDate.getUTCMonth();
      
      const firstDayOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
      const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));
      
      // Formatear fechas para GraphQL usando el formato especificado
      const firstDayISO = firstDayOfMonth.toISOString().split('T')[0] + 'T00:00:00.000Z';
      const lastDayISO = lastDayOfMonth.toISOString().split('T')[0] + 'T23:59:59.999Z';
      
     
      
         
      // Obtener sesiones de todas las locations del mes especificado
      const allSessions: any[] = [];
      
        try {
          let nextToken: string | null = null;
          
      
            const sessionData: any = await client.graphql({
              query: sessionDetailsByLocationIdAndDate,
              variables: {
                locationId: filter?.locationId || "PENALOLEN-COMUNIDAD-ECOLOGICA",
                date: {
                  between: [firstDayISO, lastDayISO]
                },
                sortDirection: "ASC",
                filter: {
                  or: [
                    { status: { eq: "ACTIVE" } },
                    { status: { eq: "RECOVERED" } }
                  ]
                },
                limit: 10000,
                // nextToken: nextToken || undefined
              }
            });
            
            const items = sessionData?.data?.listV2SessionDetailByLocationIdAndDate?.items || [];
            allSessions.push(...items);
            nextToken = sessionData?.data?.listV2SessionDetailByLocationIdAndDate?.nextToken || null;
     
        } catch (locationSessionError) {
          console.error(`Error obteniendo sesiones :`, locationSessionError);
          // Continuar con la siguiente location
        }

      
        console.log("<<< firstDayOfMonth >>>", firstDayISO)
        console.log("<<< lastDayISO >>>", lastDayISO)
        console.log("<<< allSessions >>>", allSessions)
      
      
      // Agrupar sesiones por enrollmentId
      const sessionsByEnrollment: { [key: string]: any[] } = {};
      
      allSessions.forEach((session: any) => {
        const enrollmentId = session.enrollmentId;
        if (enrollmentId) {
          if (!sessionsByEnrollment[enrollmentId]) {
            sessionsByEnrollment[enrollmentId] = [];
          }
          sessionsByEnrollment[enrollmentId].push(session);
        }
      });
      
      console.log("<<< sessionsByEnrollment >>>", sessionsByEnrollment)
      
      // Identificar enrollments que están por vencer
      const expiringEnrollmentIds: string[] = [];
      
      Object.keys(sessionsByEnrollment).forEach((enrollmentId) => {
        const sessions = sessionsByEnrollment[enrollmentId];
        
        // Filtrar sesiones ACTIVE o RECOVERED
        const activeOrRecoveredSessions = sessions.filter((s: any) => 
          s.status === 'ACTIVE' || s.status === 'RECOVERED'
        );
        
        if (activeOrRecoveredSessions.length === 0) {
          return; // No tiene sesiones activas o recuperadas
        }
        
        // Obtener totalSessions del primer SessionDetail
        const totalSessions = sessions[0]?.totalSessions || 0;
        
        if (totalSessions === 0) {
          return; // No tiene totalSessions válido
        }
        
        // Calcular sesiones activas en el mes especificado
        const sessionsInMonth = activeOrRecoveredSessions.filter((session: any) => {
          const sessionDateObj = new Date(session.date);
          return sessionDateObj >= firstDayOfMonth && sessionDateObj <= lastDayOfMonth;
        });
        
        if (sessionsInMonth.length === 0) {
          return; // No tiene sesiones en el mes especificado
        }
        
        // Calcular sesiones activas totales
        const totalActiveSessions = activeOrRecoveredSessions.length;
        
        // Un enrollment está por vencer si:
        // - Tiene sesiones activas en el mes especificado Y
        // - Le quedan menos del 30% de sesiones activas O tiene menos de 4 sesiones activas
        const remainingSessionsRatio = totalActiveSessions / totalSessions;
        const isExpiring = (
          remainingSessionsRatio < 0.3 || 
          totalActiveSessions < 4
        );
        
        if (isExpiring) {
          expiringEnrollmentIds.push(enrollmentId);
        }
      });
      
      
      console.log("<<< expiringEnrollmentIds >>>", expiringEnrollmentIds)
      
      // Si no hay enrollments por vencer, retornar array vacío
      if (expiringEnrollmentIds.length === 0) {
        resolve([]);
        return;
      }
      
      // Crear un Set para búsqueda rápida de enrollment IDs
      const expiringEnrollmentIdsSet = new Set(expiringEnrollmentIds);
      
      // Filtrar sesiones que pertenecen a los enrollments por vencer
      const filteredSessions = allSessions.filter((session: any) => {
        return session.enrollmentId && 
               expiringEnrollmentIdsSet.has(session.enrollmentId);
      });
      
      // Mapear las sesiones a la estructura requerida
      const result = filteredSessions.map((session: any) => {
        return {
          course: session.course?.title || null,
          courseId: session.courseId || null,
          date: session.date || null,
          scheduleId: session.scheduleId || null,
          scheduleDay: session.schedule?.day || null,
          scheduleStartHour: session.schedule?.startHour || null,
          studentId: session.studentId || null,
          birthdate: session.student?.birthdate || null,
          lastName: session.student?.lastName || null,
          emailPhone: session.student?.emailPhone || null,
          contactPhone: session.student?.contactPhone || null,
          name: session.student?.name || null,
          sessionNumber: session.sessionNumber || null,
          totalSessions: session.totalSessions || null,
          status: session.status || null
        };
      });
      
      // Ordenar por fecha y luego por studentId
      const sortedResult = result.sort((a: any, b: any) => {
        // Primero ordenar por fecha (más antiguos primero)
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        
        if (dateA !== dateB) {
          return dateA - dateB;
        }
        
        // Si las fechas son iguales, ordenar por studentId
        const studentIdA = a.studentId || "";
        const studentIdB = b.studentId || "";
        return studentIdA.localeCompare(studentIdB);
      });
      
      resolve(sortedResult as any);
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};


