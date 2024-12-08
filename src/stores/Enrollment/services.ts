import { generateClient } from 'aws-amplify/api';


import { listEnrollments } from './queries';
import { generateEnrollment } from './mutation';
import { FilterOptions } from './types';
const client = generateClient();


export const fetchData = async (filter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {

      
      const month:number = Number(filter?.month)
      
      // filter.locationId
      // filter.month
      // filter.year
      
       const getData:any = await client.graphql({
         query: listEnrollments,
         variables: { 
          filter: {
            startDate: {
              between: [
                `${filter?.month}-01-${filter?.year}`,`${filter?.month}-31-${filter?.year}`,
              ],
            },
            or: [
              { startDate: { contains: `${filter.month}-` } },
              { startDate: { contains: `-${filter?.year}` } },
              // { startDate: { contains: `${Number(filter.month-1)}-` } },
              // { startDate: { contains: `-${month}-${filter?.year}` } },
              // { startDate: { contains: `-${Number(month-1)}-${filter?.year}` } }
            ]
          },
          limit:100000000
        },
        //  variables: { 
          //  input: {
          //    id: filter.name
          //  } 
        //  },
       });
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


