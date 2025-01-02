import { generateClient } from 'aws-amplify/api';


import { listCourses } from './queries';
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
