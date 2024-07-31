import { generateClient } from 'aws-amplify/api';


import { listEnrollments } from './queries';
import { generateEnrollment } from './mutation';
import { FilterOptions } from './types';
const client = generateClient();




export const fetchData = async (filter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      
       // Save USER
       const getData:any = await client.graphql({
         query: listEnrollments,
         variables: { 
           input: {
             id: filter.name
           } 
         },
       });
       // Update USER
        // Save o update RELATION
      
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


export const createEnrollment = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: generateEnrollment,
        variables: {
          // input: {            
            studentId: objFilter.studentId,
            startDate: objFilter.enrollmentStartDate,
            sessionTypeId: objFilter.enrollmentSessionTypeId,
            scheduleId: objFilter.enrollmentScheduleId,
            courseId: objFilter.enrollmentCourseId,
          // }
        }
      });
      
      console.log("<<< ENROLLMENT CREADO <<<<< ", setData)
      const data = setData.data;
      
      resolve({ ...data.generateEnrollment } as any);
        
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


