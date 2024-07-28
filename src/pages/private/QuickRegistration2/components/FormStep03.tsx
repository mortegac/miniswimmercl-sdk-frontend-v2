import React, { Fragment, useState, useEffect, useRef } from "react";


import { HeaderTitle } from "./HeaderTitle";
import CardCourses from "./CardCourses";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectCourse, getCourses} from "@/stores/Courses/slice";

// function CoursesList(){
  
  
//   return(
//     <>
//         {/* <div className="grid grid-cols-12 gap-6 intro-y">           */}
//         <div key="COURSES-LIST"  className="flex justify-between intro-y" >          
//           { Array.isArray(courses) &&
//                 courses.map((item: any, i: number) => <>
//                   {item.id && <Card key={`${i}-COURSES-LIST-CARD`} students={item} />}
//                 </>
//           )}
//         </div>
//       </>
//     )
// }
function CoursesList(props: any) {
  const { data } = props;

  // Asumimos que data ya está ordenado por locationCoursesId
  let currentLocationId:string | null = null;

  return (
    <div key="COURSES-LIST" className="flex justify-between flex-row flex-wrap flex-1">
      {Array.isArray(data) &&
        data.map((item: any, i: number) => {
          const showLocationId = item.locationCoursesId !== currentLocationId;
          if (showLocationId) {
            currentLocationId = item.locationCoursesId;
          }

          return (
            <Fragment key={`${i}-COURSES`}>
              {showLocationId && (
                <div className="w-full  py-3">
                   <h2 className="mt-3 text-xl font-medium leading-none text-slate-600 dark:text-slate-500">
                   {item.locationCoursesId}</h2>
                </div>
              )}
              <CardCourses courses={item} />
            </Fragment>
          );
        })}
    </div>
  );
}

export const FormStep03 = ({ onChangeSetStore }: any) => {
  const {courses} = useAppSelector(selectCourse);
  const dispatch = useAppDispatch();
  
  useEffect(() => { (async () => await dispatch(getCourses()))(); }, []);
  
  return (
    <>
    <pre>{JSON.stringify(courses, null, 2)}</pre>
      <HeaderTitle
        title={"Proceso de inscripción"}
        description={"Paso 3"}
      />

      <div className="mt-4 ml-2">
        {/*<div className="lg:p-5 intro-y ">
           <div className="grid lg:grid-cols-4 xs:grid-cols-2 lg:gap-6"> */}
          <div className="">
          <h2 className="font-thin text-xl">Seleccione el curso</h2>
          <CoursesList data={courses}/>
        </div>
      {/* </div> */}
      </div>
    </>
  );
};
