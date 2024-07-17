import { generateClient } from 'aws-amplify/api';


import { FilterOptions } from './types';
import { listSessionDetails } from './queries';
const client = generateClient();


import { LIMIT_FILTER } from "../../utils/config";

interface FilterInput {
  [key: string]: {
    [operator: string]: string | number | boolean | null;
  };
}

export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      // console.log(">> objFilter >>", objFilter)
      // studentId?: string;
      // status?: string;
    //   const filterStudentId = typeof objFilter?.studentId === 'undefined'
    //   ? {}
    //   : { sessionDetailStudentId: { eq: objFilter.studentId } };
      
    //   const filterStatus = typeof objFilter?.status === 'undefined'
    //   ? {}
    //   : { status: { eq: objFilter.status } };

    // const filterDetail = {
    //   filter: {
    //     ...filterStudentId,
    //     ...filterStatus,
    //   },
    //   limit: LIMIT_FILTER
    // };
    
    const filter: FilterInput = {
      // createdAt: { gt: "2023-01-01" },
      sessionDetailStudentId: { eq: String(objFilter?.studentId) },
      status: { eq: "ACTIVE" },
      // Puedes agregar más condiciones según tus necesidades
    };
    
   
    const getData:any = await client.graphql({
      query: listSessionDetails,
      variables: { 
        filter: filter,
        // ...filterDetail // Mantenemos otras variables que puedas tener
      },
    });
    
      // const getData:any = await client.graphql({
      //   query: listSessionDetails,
      //   variables: { ...filterDetail },
      // });
      
      const data:any = getData.data;
      data.listSessionDetails.items.length > 0 && console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data.listSessionDetails)
      
        resolve({ ...data.listSessionDetails } as any);
        
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
