import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import Button from "@/components/Base/Button";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getStudent,  selectStudent } from "@/stores/Students/slice";
// import { Enrollment } from '@/stores/Students/types';



export const EnrollmentList: React.FC<any> = ({studentId, setDataStudent, studentSelected}) => {
  const dispatch = useAppDispatch();
  const { student, status } = useAppSelector(selectStudent);
  const enrollments = student?.enrollments as any;
  {/* { status === "idle" && <> */}
  
  
    useEffect(() => {
    typeof studentId !== "undefined" &&
      dispatch(getStudent({ studentId: studentId || ""}))
   
    return () => {};
  }, [studentId]);
  
  return(
 <> 
 <div className="mt-4 bg-white p-4 ">
   <div className="relative overflow-hidden ">
     { Array.isArray(enrollments?.items) && 
     [...enrollments?.items]
     .sort((a, b) => {
       const ad = new Date(a.startDate);
       const bd = new Date(b.startDate);
       return ad > bd ? -1 : ad < bd ? 1 : 0;
     })
     .map((item:any, index:number)=>{
         
         return <>
         <div
         className=""
           key={index}
         >
          {/* <pre>item = {JSON.stringify( item, null, 2)}</pre> */}
          {/* sessionTypeEnrollmentsId */}
{/* {
  "courseEnrollmentsId": "NINOS-4-5-ANOS-VITACURA",
  "scheduleId": "f22f6c20-7b2c-48c8-bcc4-4ac25e61d589",
  "scheduleName": "domingo 10:30",
  "course": {
    "id": "NINOS-4-5-ANOS-VITACURA",
    "title": "Niños 4 a 5 años",
    "location": {
      "id": "VITACURA-PISCINA-MUNICIPAL",
      "name": "VITACURA"
      }
      },
      "id": "e384830c-2f2d-4465-bfb3-89c6a0d7c63f",
      "startDate": "01-26-2025",
      "amountPaid": 30000,
      "wasPaid": true,
  
} */}
             <div className="flex flex-row justify-between items-center w-full">
                <div className=" px-2 w-56">
                  <p className=" text-left min-w-24 text-[0.8rem] uppercase">{item?.scheduleName}</p>
                  <p className=" text-left min-w-24 text-[0.6rem] ">{item?.course?.title}</p>
                  <p className=" text-left min-w-24 text-[0.6rem]">{item?.course?.location?.name}</p>
                  <p className=" text-center rounded-xl px-2 w-20 text-[0.6rem] bg-slate-200">{item?.startDate}</p>
                  
                </div>
                <Button
                  variant="soft-primary"
                  className="mr-2"
                  onClick={()=>setDataStudent({
                    // studentId: student?.student?.id,
                    // studentName: `${student?.student?.name} ${student?.student?.lastName}`,
                    // studentAge: edad,
                    // studentGender: student?.student?.gender,
                    ...studentSelected,
                    locationId: item?.course?.location?.id,
                    courseId: item?.courseEnrollmentsId,
                    scheduleId: item?.scheduleId,
                    packId: item?.sessionTypeEnrollmentsId,
                    // packId: "",
                    // studentId: "",
                    })}
                  // onClick={()=> {
                    // setDataCourse({
                    //   id: item?.id,
                    //   locationId: item?.course?.location?.id,
                    //   courseId: item?.courseEnrollmentsId,
                    //   scheduleId: item?.scheduleId,      
                    // })
                    // setSessionSlideover(true)
                  // }}
                >Renovar</Button>
               
             </div>
           
         </div>     
         </>
     })}
     
   </div>
 </div>
</>
  )
}
