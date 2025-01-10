import { generateClient } from 'aws-amplify/api';


import { listEnrollments } from './queries';
import { generateEnrollment, removeEnrollment } from './mutation';
import { FilterOptions } from './types';
const client = generateClient();


export const fetchData = async (filter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {

      
      const month:number = Number(filter?.month)
   
      console.log("--fetchData--filter", filter)
      
      const filterDay = (typeof filter?.day === 'undefined' && filter?.day === '') ?
      "" : filter?.day;
      
          
      const filterStudentId = (typeof filter?.studentId === 'undefined') ?
      { } : { studentEnrollmentsId : { eq: filter?.studentId } };
      
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
      const dataOrder = [...data?.listEnrollments?.items].sort((a, b) => {
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
      
      const data = setData?.data?.generateEnrollment || {};
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


