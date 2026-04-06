import { generateClient } from 'aws-amplify/api';


import { listAcademyStudents } from './queries';
// import { createStudent } from './mutation';
import { FilterOptions } from './types';

const client = generateClient();




export const fetchData = async (options?: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter: Record<string, any> = {};
      if (options?.year) {
        const y = parseInt(options.year, 10);
        filter.createdAt = {
          between: [`${y}-01-01T00:00:00.000Z`, `${y}-12-31T23:59:59.999Z`],
        };
      }

      const getData:any = await client.graphql({
        query: listAcademyStudents,
        variables: {
          filter,
          limit:100000000
        },
        // variables: { id: userId },
      });
      
      // console.log("<<< listAcademyStudents DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listV2AcademyStudents } as any);
        
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
// export const createStudentquick = async (objFilter: FilterOptions): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
     
//       const getData:any = await client.graphql({
//         query: createStudent,
//         variables: {
//           input: {
//             name: objFilter.name,
//             lastName: objFilter.lastName,
//             middleName: "",
//             birthdate: objFilter.birthdate,
//             placeOfResidence: objFilter.placeOfResidence,
//             contactPhone: objFilter.contactPhone,
//             whoIsTheContact: "",
//             emailPhone: objFilter.emailPhone,
//             gender: objFilter.gender,
//             anyIllnessInjuryMedicalCondition: "No ninguna"
//           }
//         }
//       });
      
//       // console.log("<<< STUDENT CREADO <<<<< ", getData.data)
//       const data = getData.data;
//       console.log("<<< STUDENT ...data.createUsers <<<<< ", data)
      
//         resolve({ ...data.createStudent} as any);
        
//         // ...userData.data.getUsers
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