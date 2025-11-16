import { generateClient } from 'aws-amplify/api';

import { createCourse, updateCourse } from './mutation';
import { listCourses } from './queries';
import { FilterOptions, InputCourse } from './types';
const client = generateClient();


export const createCourses = async (objFilter: InputCourse): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: createCourse,
        variables: {
          input: {     
            // courseSchedulesId: objFilter.courseId,
            id: objFilter.id,
            title: objFilter.title,
            description: objFilter.description,
            startingAge: objFilter.startingAge,
            endingAge: objFilter.endingAge,
            ageType: objFilter.ageType,
            AgeGroupType: objFilter.AgeGroupType,
            duration: objFilter.duration,
            locationCoursesId: objFilter.locationCoursesId,
            isActive: true,
          }
        }
      });
      
      console.log("<<< HORARIO CREADO <<<<< ", setData)
      const data = setData?.data?.createSchedule || {};
      resolve({ data } as any);
        
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

// export const updateCourses = async (objFilter: InputCourse): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
     
//       const setData:any = await client.graphql({
//         query: updateCourse,
//         variables: {
//           input: {
//             id: objFilter.id,
//             title: objFilter.title,
//             description: objFilter.description,
//             startingAge: objFilter.startingAge,
//             endingAge: objFilter.endingAge,
//             ageType: objFilter.ageType,
//             AgeGroupType: objFilter.AgeGroupType,
//             duration: objFilter.duration,
//             locationCoursesId: objFilter.locationCoursesId,
//             isActive: objFilter.isActive,
//           }
//         }
//       });
      
//       console.log("<<< CURSO ACTUALIZADO <<<<< ", setData)
//       const data = setData?.data?.updateCourse || {};
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

export const deleteCourse = async (courseId:string): Promise<any> => {

  return new Promise(async (resolve, reject) => {
    try {
     
      const deleteData:any = await client.graphql({
        query: updateCourse,
        variables: {
          input: { 
            id: courseId,
            isActive: false          
          }
        }
      });

      console.log("<<< CURSO ELIMINADO <<<<< ", deleteData)
      const data = deleteData?.data?.updateCourse || {};
      resolve({ data } as any);
        
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

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

      const getData: any = await client.graphql({
        query: listCourses,
        variables: {
          filter: { ...filter }
          , limit: 100000000
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
      console.log("--fetchData--filter", objFilter)
      
      const filterDay = (typeof objFilter?.day === 'undefined' && objFilter?.day === '') ?
      "" : objFilter?.day;
       
          
      let filterLocation = (typeof objFilter?.locationId === 'undefined' && {}|| objFilter?.locationId === "") ?
      { } : { locationCoursesId: { eq: objFilter?.locationId } };
          
      const startDate = `${objFilter?.month}-${filterDay==="" ? "01":filterDay}-${objFilter?.year}`
      const endDate = `${objFilter?.month}-${filterDay==="" ? "31":filterDay}-${objFilter?.year}`
      
      console.log("startDate: ", startDate)
      console.log("endDate: ", endDate)
                
      const filterAll: any = {
        ...filterLocation,
      };

      const listCoursesStudent = /* GraphQL */ `
        query ListCourses(
          $id: ID
          $filter: ModelCourseFilterInput
          $limit: Int
          $nextToken: String
          $sortDirection: ModelSortDirection
          $startDate: String
          $endDate: String
          $wasPaid: Boolean
        ) {
          listCourses(
            id: $id
            filter: $filter
            limit: $limit
            nextToken: $nextToken
            sortDirection: $sortDirection
          ) {
            items {
              id
              ageType
              title
              locationCoursesId
              enrollments(
                filter:{
                  startDate: { between: [$startDate, $endDate] },
                  wasPaid: { eq: $wasPaid }
                  # startDate: { between: ["01-01-2025", ${String("01-31-2025")} ] },
                  # wasPaid: { eq: ${Boolean(objFilter?.wasPaid)} }
                }
              ){
                items{
                  scheduleName
                  wasPaid
                  startDate
                  student{
                    id
                    name
                    lastName
                    birthdate
                    emailPhone
                    contactPhone
                  }
                  sessionDetails{
                    items{
                      
                      date
                      month
                      year
                      status
                    }
                  }
                }
            }
            }
            nextToken
            __typename
          }
        }
      `;

      const getData: any = await client.graphql({
        query: listCoursesStudent,
        variables: {
          filter: { ...filterAll }
          , limit: 1000000000,
          startDate: startDate,
          endDate: endDate,
          wasPaid: Boolean(objFilter?.wasPaid)
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
