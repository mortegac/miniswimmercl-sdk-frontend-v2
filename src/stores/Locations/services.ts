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


export const fetchDataOnly = async (country?: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     

      let filterCountry = (typeof country === 'undefined' || country === "" ) ?
      { } : { country: { eq: country } };
      
      
      const getData:any = await client.graphql({
        query: listLocationsOnly, 
        variables: { 
          filter: { 
            isActive: { eq: true }, 
            isVisible: { eq: true }, 
            // country: { eq: country } 
            ...filterCountry
          } },
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
