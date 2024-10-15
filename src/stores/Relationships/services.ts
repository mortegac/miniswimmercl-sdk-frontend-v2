import { generateClient } from 'aws-amplify/api';


import { createRelationship } from './mutation';
import { listRelationships } from './queries';
import { FilterOptions } from './types';
const client = generateClient();


export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      console.log("<<< objFilter <<<<< ", objFilter)
     
      const filterEmail = (typeof objFilter?.userEmail === 'undefined') ?
      {}
      : { usersRelationshipsId: { eq: String(objFilter.userEmail).toLowerCase() } };
      
      const filterStudent = (typeof objFilter?.studentRelationshipsId === 'undefined') ?
      {}
      : { studentRelationshipsId: { eq: String(objFilter.studentRelationshipsId) } };
      
      const filter: any = {
        ...filterEmail,
        ...filterStudent,
      };
      
      const getData:any = await client.graphql({
        query: listRelationships,
        variables: { 
          filter: {...filter}
          , limit:1000000
        },
        
        
      });
      
      console.log("<<< listRelationships DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve([ ...data.listRelationships.items ] as any);
        
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



// CREATE STUDENT
// 
export const createRelation = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: createRelationship,
        variables: {
          input: {
            usersRelationshipsId: objFilter.userId,
            studentRelationshipsId: objFilter.studentId,
            relationType: objFilter.relation,
          }
        }
      });
      
      // console.log("<<< STUDENT CREADO <<<<< ", getData.data)
      const data = setData.data;
      console.log("<<< RELATIONSHIP ...data.createRelationship <<<<< ", data)
      
        resolve({ ...data.createRelationship} as any);
        
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