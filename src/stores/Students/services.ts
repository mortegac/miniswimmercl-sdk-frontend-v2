import { generateClient } from 'aws-amplify/api';


import { listStudents } from './queries';
import { createStudent } from './mutation';
import { FilterOptions } from './types';

const client = generateClient();




export const fetchData = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: listStudents,
        // variables: { id: userId },
      });
      
      console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listStudents } as any);
        
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
export const createStudentquick = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: createStudent,
        variables: {
          input: {
            name: objFilter.name,
            lastName: objFilter.lastName,
            middleName: "",
            birthdate: objFilter.birthdate,
            placeOfResidence: objFilter.placeOfResidence,
            contactPhone: objFilter.contactPhone,
            whoIsTheContact: "",
            emailPhone: objFilter.emailPhone,
            gender: objFilter.gender,
            anyIllnessInjuryMedicalCondition: "No ninguna"
          }
        }
      });
      
      // console.log("<<< STUDENT CREADO <<<<< ", getData.data)
      const data = getData.data;
      console.log("<<< STUDENT ...data.createUsers <<<<< ", data)
      
        resolve({ ...data.createStudent} as any);
        
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