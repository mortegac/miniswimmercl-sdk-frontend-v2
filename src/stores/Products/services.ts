import { generateClient } from 'aws-amplify/api';

import { createCourse, updateCourse } from './mutation';
import { listProducts } from './queries';
import { FilterOptions, } from './types';
const client = generateClient();





// export const deleteCourse = async (courseId:string): Promise<any> => {

//   return new Promise(async (resolve, reject) => {
//     try {
     
//       const deleteData:any = await client.graphql({
//         query: updateCourse,
//         variables: {
//           input: { 
//             id: courseId,
//             isActive: false          
//           }
//         }
//       });

//       console.log("<<< CURSO ELIMINADO <<<<< ", deleteData)
//       const data = deleteData?.data?.updateCourse || {};
//       resolve({ data } as any);
        
//     } catch (err) {
//       reject(
//         JSON.stringify({
//           errorMessage: err,
//         })
//       );
//     }
//   });
// };

export const fetchData = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {

      const filterIsActive = { isActive: { eq: Boolean(true) } };

      const filter: any = {
        // ...filterlocationId,
        ...filterIsActive,
      };

      const getData: any = await client.graphql({
        query: listProducts,
        variables: {
          filter: { ...filter }
          , limit: 100000000
        }
      });

      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;

      resolve([ ...data?.listProducts?.items ] as any);

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
