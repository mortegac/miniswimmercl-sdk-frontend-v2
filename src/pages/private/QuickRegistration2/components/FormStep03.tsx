import React, { Fragment, useState, useEffect, useRef } from "react";

import LoadingIcon from "@/components/Base/LoadingIcon";
import { HeaderTitle } from "./HeaderTitle";
import CardCourses from "./CardCourses";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectCourse, getCourses} from "@/stores/Courses/slice";


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
              { showLocationId && (
                <div className="w-full  py-3 mt-8">
                   <h2 className="mt-3 text-2xl font-medium leading-none text-slate-600 dark:text-slate-500">
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
  const {courses, status } = useAppSelector(selectCourse);
  const dispatch = useAppDispatch();
  
  useEffect(() => { (async () => await dispatch(getCourses({isActive:true})))(); }, []);
  
  return (
    <>
      <HeaderTitle
        title={"Proceso de inscripción"}
        description={"Paso 3 - seleccione el curso"}
      />
      <div className="mt-4 ml-2">
      
      { status === "loading" &&
                <div className="flex justify-center items-center w-full h-48"><LoadingIcon
                  color="#AE5EAB"
                  icon="oval"
                  className="w-10 h-10 mt-10"
                /></div>
        }
      { status === "idle" && <CoursesList data={courses}/> }
      
          
          
      {/* </div> */}
      </div>
    </>
  );
};
