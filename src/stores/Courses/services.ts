import { generateClient } from 'aws-amplify/api';


import { listCourses } from './queries';
const client = generateClient();




export const fetchData = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: listCourses,
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
