import { generateClient } from 'aws-amplify/api';


import { listCourses, listCoursesStudent } from './queries';
import { FilterOptions } from './types';
const client = generateClient();




export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      
  
      const filterlocationId = (typeof objFilter?.locationId === 'undefined') ?
      {} : { locationCoursesId: { eq: String(objFilter.locationId) } };
      
      const filterIsActive = (typeof objFilter?.isActive === 'undefined') ?
      { isActive: { eq: true } } : { isActive: { eq: Boolean(objFilter.isActive) } };
      
      const filter: any = {
        ...filterlocationId,
        ...filterIsActive,
      };
      
      const getData:any = await client.graphql({
        query: listCourses,
        variables: { 
            filter: {...filter}
            , limit:100000000
        }
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

export const fetchDataStudent = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      
  
      // const filterlocationId = (typeof objFilter?.locationId === 'undefined') ?
      // {} : { locationCoursesId: { eq: String(objFilter.locationId) } };
      
      // const filterIsActive = (typeof objFilter?.isActive === 'undefined') ?
      // { isActive: { eq: true } } : { isActive: { eq: Boolean(objFilter.isActive) } };
      
      const filter: any = {
        // ...filterlocationId,
        // ...filterIsActive,
      };
      
      const getData:any = await client.graphql({
        query: listCoursesStudent,
        variables: { 
            filter: {...filter}
            , limit:1000000000
        }
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
