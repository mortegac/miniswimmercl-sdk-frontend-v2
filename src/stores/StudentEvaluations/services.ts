import { generateClient } from 'aws-amplify/api';


import { getStudent } from './queries';
import { FilterOptions } from './types';
const client = generateClient();



export const fetchStudentEvaluations = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {      
      const getData:any = await client.graphql({
        query: getStudent,
        variables: { id: objFilter.studentId },
      });
      const data = getData.data;
      
        resolve({ ...data.getStudent} as any);
        
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

// export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {



//       // const filterlocationId = (typeof objFilter?.locationId === 'undefined') ?
//       //   {} : { locationCoursesId: { eq: String(objFilter.locationId) } };

//       // const filterIsActive = (typeof objFilter?.isActive === 'undefined') ?
//       //   { isActive: { eq: true } } : { isActive: { eq: Boolean(objFilter.isActive) } };

//       // const filter: any = {
//       //   ...filterlocationId,
//       //   ...filterIsActive,
//       // };

//       const getData: any = await client.graphql({
//         query: getStudentEvaluations,
//         variables: {
//           // filter: { ...filter }
//           limit: 100000000
//         }
//       });

//       console.log("<<< listEvaluationLevels DATA <<<<< ", getData?.data?.listEvaluationLevels)
//       const data:any = getData?.data?.listEvaluationLevels;

//       resolve([ ...data.items ] as any);

//       // ...userData.data.getUsers
//       // } else {
//       //   reject({
//       //     errorMessage: errorMsg,
//       //   });
//       // }
//     } catch (err) {
//       reject(
//         JSON.stringify({
//           errorMessage: err,
//         })
//       );
//     }
//   });
// };
