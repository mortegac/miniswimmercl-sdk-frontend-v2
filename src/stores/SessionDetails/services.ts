import { generateClient } from 'aws-amplify/api';


import { FilterOptions, InputOptions } from './types';
import { listSessionDetails } from './queries';
import { updateSessionDetail } from './mutation';
const client = generateClient();


import { LIMIT_FILTER } from "../../utils/config";

interface FilterInput {
  [key: string]: {
    [operator: string]: string | number | boolean | null;
  };
}
interface Input {
  [key: string]:  string | number | boolean | null;
}

export const updateData = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
  
    
    const inputData: Input = {
      id: String(objFilter?.sessionId),
      status: String(objFilter?.status),
      
    };
    
   
    const setData:any = await client.graphql({
      query: updateSessionDetail,
      variables: {
        input: { ...inputData }
      }
    });
    
    console.log(">> setData >>", setData)
    
        resolve({ status: "ok"} as any);
        
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
      status: { eq: String(objFilter?.status) },
      // Puedes agregar más condiciones según tus necesidades
    };
    
    const filterStatus = (typeof objFilter?.status === 'undefined') ?
    {}
    : { status: { eq: objFilter.status } };

  // const filterSecondStatus = (typeof objFilter?.status === 'undefined') ?
  //   {}
  //   : { status: { eq: "RECOVERED" } };
   
    let getData:any;
    
    console.log(">>> objFilter?.status  >>>", objFilter?.status )
    
    if(objFilter?.status === "ACTIVE"){
      getData = await client.graphql({
        query: listSessionDetails,
        variables: { 
          filter:{
            sessionDetailStudentId: {eq: String(objFilter?.studentId)},
            or: [
                    {status: { eq: "ACTIVE" }},
                    {status: { eq: "RECOVERED" }}            
                  ]
          
          }
          // sessionDetailStudentId: { eq: String(objFilter?.studentId) },
          // or: [
          //   {status: { eq: "ACTIVE" }},
          //   {status: { eq: "RECOVERED" }}            
          // ]
        },
      });
  }else{
    getData = await client.graphql({
      query: listSessionDetails,
      variables: { 
        filter: {...filter},
      },
    });
  }
    
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


