import { generateClient } from 'aws-amplify/api';


import { listLocations, listLocationsOnly } from './queries';
const client = generateClient();




export const fetchData = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: listLocations,
        variables: { 
          filter:{}
          , limit:100000000
        },
      });
      
      // console.log("<<< LOCATIONS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listLocations } as any);
        
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
export const fetchDataOnly = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: listLocationsOnly,
        // variables: { id: userId },
      });
      
      // console.log("<<< LOCATIONS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listLocations } as any);
        
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
