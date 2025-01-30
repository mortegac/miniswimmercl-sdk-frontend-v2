import { generateClient } from 'aws-amplify/api';


import { getAWSDateStgoChile } from "@/utils/helper";
import { FilterOptions, InputOptions } from './types';
import { listSessionDetails } from './queries';
import { updateSessionDetail, createSessionDetail, deleteSessionDetail } from './mutation';
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
      locationIdUsed: String(objFilter?.locationIdUsed),
      
    };
    // console.log(">> inputData >>", inputData)
    
   
    const setData:any = await client.graphql({
      query: updateSessionDetail,
      variables: {
        input: { ...inputData }
      }
    });
    
    // console.log(">> setData >>", setData)
    
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



export const updateSession = async (objFilter: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
  
      const date = new Date(`${objFilter?.sessionDate}T00:00:00.000Z`);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
    // const newDate:string = objFilter?.sessionDate.replace("T00:00:00.000Z", '')
    const newDate: string = (objFilter.sessionDate as string).replace("T00:00:00.000Z", '');
console.log("--newDate--", newDate)

    const inputData: Input = {
      // id: String(objFilter?.sessionId),
      status: String(objFilter?.status),
      locationIdUsed: String(objFilter?.locationIdUsed),
      locationId: String(objFilter?.locationId),
      date:String(`${objFilter?.sessionDate}T00:00:00.000Z`),
      modifiedBy: String(objFilter?.userModifyId || ""),
      modifiedByDate: getAWSDateStgoChile(),
      sessionDetailStudentId: objFilter?.studentId || null,
      enrollmentSessionDetailsId: objFilter?.enrollmentId || null,
      day: day,
      month: month,
      year: year,
      
      sessionNumber : 1,
      totalSessions: 1,
      proratedValue: 1,
      wasEmailSent:false,
    
    };

    const removeData:any = await client.graphql({
      query: deleteSessionDetail,
      variables: {
        input: { 
          id: String(objFilter?.sessionId),
          date: String(objFilter?.currentSession),
         }
      }
    });
    
    console.log(">> removeData >>", removeData)
    
    const setData:any = await client.graphql({
      query: createSessionDetail,
      variables: {
        input: { ...inputData }
      }
    });
    
    console.log(">> createSessionDetail >>", setData?.data?.createSessionDetail?.id)
    // setData?.data?.createSessionDetail?.id
        resolve(setData?.data?.createSessionDetail?.id && true as any);
        
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
     
      console.log(">> objFilter >>", objFilter)
    
    const filterEnrollment= typeof objFilter?.enrollmentId === 'undefined'
      ? {}
      : { enrollmentSessionDetailsId: { eq: String(objFilter?.enrollmentId) } };
      
    const filterLocation= typeof objFilter?.locationId === 'undefined' || objFilter?.locationId === ""
      ? {}
      : { locationId: { eq: String(objFilter?.locationId) } };
      
    const filterStudent = typeof objFilter?.studentId === 'undefined'
      ? {}
      : { sessionDetailStudentId: { eq: String(objFilter?.studentId) } };
      
    const filterSessionDate = typeof objFilter?.sessionDate === 'undefined'
      ? {}
      : { 
        // date: { eq: String(objFilter?.sessionDate) } 
        // date: { eq: "2024-08-13T00:00:00.000Z"},
        date: { contains: objFilter?.sessionDate},
      };
    const filterStatus = (typeof objFilter?.status === 'undefined') ?
    {}
    : { status: { eq: String(objFilter.status) } };
    
    const filter: any = {
      ...filterStudent,
      ...filterStatus,
      ...filterSessionDate,
      ...filterLocation,
      ...filterEnrollment,
    };
   
    let getData:any;
    
    // console.log(">>> objFilter  >>>", objFilter )
    
    if(objFilter?.status === "ACTIVE"){
      getData = await client.graphql({
        query: listSessionDetails,
        variables: { 
          filter:{
            // sessionDetailStudentId: {eq: String(objFilter?.studentId)},
            ...filterStudent,
            ...filterSessionDate,
            ...filterLocation,
            or: [
                    {status: { eq: "ACTIVE" }},
                    {status: { eq: "RECOVERED" }}            
                ]
          
          }, limit:1000000000
        },
      });
  }else{
    getData = await client.graphql({
      query: listSessionDetails,
      variables: { 
        filter: {
          ...filter,
          or: [
            {status: { ne: "DELETED" }},
        ]
        },
        limit: 1000000000
      },
    });
  }

  
      
      const data:any = getData.data;
      // console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data)
      // data.listSessionDetails.items.length > 0 && console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data.listSessionDetails)
      
        resolve({ ...data.listSessionDetails } as any);
        
        // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      console.log(">> err >>", err)
      reject({
        errorMessage:JSON.stringify(err)
      }
    );
  }
  });
};


// COURSES QUOTE 
export const fetchDataCourseQuote = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
    
      const filterLocation= typeof objFilter?.locationId === 'undefined' || objFilter?.locationId === ""
      ? {}
      : { locationId: { eq: String(objFilter?.locationId) } };
      
      // locationId
      
      const getData:any = await client.graphql({
        query: listSessionDetails,
        variables: { 
          filter:{
            ...filterLocation,
            date: {
              between: [
              `2025-01-01T00:00:00.000Z`,
              `2025-01-31T00:00:00.000Z`
              ]
            },            
            or: [
                    {status: { eq: "ACTIVE" }},
                    {status: { eq: "RECOVERED" }}            
                ]
          
          }, limit:1000000000
        },
      });
  

  
      
      const data:any = getData.data;
      // console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data)
      // data.listSessionDetails.items.length > 0 && console.log(objFilter?.studentId, " <<< SESSIONS DETAIL DATA <<<<< ", data.listSessionDetails)
      
        resolve({ ...data?.listSessionDetails } as any);
        
        // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      console.log(">> err >>", err)
      reject({
        errorMessage:JSON.stringify(err)
      }
    );
  }
  });
};


