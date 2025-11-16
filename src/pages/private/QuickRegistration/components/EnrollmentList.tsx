import React, { useState, useEffect, useRef } from "react";

import {typeOfMonth} from "@/utils/dictionary";

import Button from "@/components/Base/Button";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getStudent,  selectStudent } from "@/stores/Students/slice";




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
 <div className="mt-4  bg-transparent p-4 ">
   <div className="relative overflow-hidden ">
     { Array.isArray(enrollments?.items) && 
     [...enrollments?.items]
     .sort((a, b) => {
       const ad = new Date(a.startDate);
       const bd = new Date(b.startDate);
       return ad > bd ? -1 : ad < bd ? 1 : 0;
     })
     .map((item:any, index:number)=>{
         const [month, day, year] = item?.startDate.split('-');
         return <>
         { item?.wasPaid &&
          <div
          className=""
            key={`lastEnroll${index}-${item?.id}`}
          >
              <div className="flex flex-row justify-between items-center w-full">
                  <div className=" px-2">
                    <p className=" text-left min-w-24 text-[0.8rem] uppercase">{item?.scheduleName} | <span>{item?.course?.title}</span></p>
                    {/* <p className=" text-left min-w-24 text-[0.6rem] ">{item?.course?.title}</p> */}
                    <p className=" text-left min-w-24 text-[0.6rem]">{item?.course?.location?.name}</p>
                    <p className=" text-center rounded-xl px-2 w-20 text-[0.6rem] bg-slate-200">{`${day} ${typeOfMonth[month]} ${year} `}</p>
                    
                  </div>
                  {/* <Button
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
                  >Renovar</Button> */}
                
              </div>
            
          </div>  
         }
         </>
     })}
     
   </div>
 </div>
</>
  )
}
