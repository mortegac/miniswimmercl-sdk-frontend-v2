import { generateClient } from 'aws-amplify/api';


import { createSchedule } from './mutation';
import { FilterOptions } from './types';
const client = generateClient();


export const createSchedules = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: createSchedule,
        variables: {
          input: {     
            courseSchedulesId: objFilter.courseId,
            locationSchedulesId: objFilter.locationId,
            day: objFilter.day,
            startHour: objFilter.startHour,
            endHour: objFilter.endHour,
            minimumQuotas: objFilter?.minimumQuotas || 0,
            maximumQuotas: objFilter?.maximumQuotas || 0,
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
