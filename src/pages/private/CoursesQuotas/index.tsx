import {useEffect, useState, Fragment} from "react";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";

import Calendar from "@/components/Calendar";


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getCourses, selectCourse } from "@/stores/Courses/slice";


import Card from "./components/Card";

// function Content(props: any) {
//   const { data } = props;

//   // Asumimos que data ya está ordenado por locationCoursesId
//   let currentLocationId:string | null = null;

//   return (
//     <>
//     <div key="COURSES-LIST" className="flex justify-start flex-row flex-wrap">
//       {Array.isArray(data) &&
//         data.map((item: any, i: number) => {
//           const showLocationId = item.locationCoursesId !== currentLocationId;
//           if (showLocationId) {
//             currentLocationId = item.locationCoursesId;
//           }

//           return (
//             <Fragment key={`${i}-COURSES`}>
//               {showLocationId && (
//                 <div className="flex-1">
//                    <h2 className="mt-3 text-xl font-medium leading-none text-slate-600 dark:text-slate-500">
//                    {item.locationCoursesId}</h2>
//                 </div>
//               )}
               
//                 <Card courses={item} />
//             </Fragment>
//           );
//         })}
//         </div>
//     </>
//   );
// }


function Main() {
  
  // const {courses, status } = useAppSelector(selectCourse);
  // const dispatch = useAppDispatch();
  
  
  // dispatch(setBreadcrumb({first:"Listado de cursos", firstURL:"courses"}));
  
  // useEffect(() => { (async () => await dispatch(getCourses({isActive:true})))(); }, []);

  

  return (
    <>
     {/* <pre>{JSON.stringify(courses[0], null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className=" text-base font-medium group-[.mode--light]:text-white">
              Listado de Cursos
            </div>
            <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
              <Button
                rounded
                variant="primary"
                className="px-8 py-3 border border-slate-200"
                // onClick={()=>dispatch(getCourses({isActive:true, locationId:"CLUB-PATO-CORNEJO"}))}
              >
                <span className="text-border-slate-200">Lo Barnechea</span>
              </Button>
             
            </div>
          </div>
         
        </div>
      </div>
      <div className="w-full bg-white p-4"><Calendar /></div>
    </>
  );
}

export default Main;
