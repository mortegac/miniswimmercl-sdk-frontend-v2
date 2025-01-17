import React, { useEffect, useState, Fragment, useMemo } from "react";
import _ from "lodash";
import Toastify from "toastify-js";

import {formatDateUTCShort} from "@/utils/helper";
import {statusSession} from "@/utils/dictionary";
import Notification from "@/components/Base/Notification";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import { FormSelect } from "@/components/Base/Form";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth} from "@/stores/Users/slice";
import { setOneSessionDetail, selectSessionDetails, getSessionDetails } from "@/stores//SessionDetails/slice";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getStudent } from "@/stores/Students/slice";
import { selectCourse, getCourses} from "@/stores/Courses/slice";

interface CourseFilter {
  courses: any[];
  schedules: any[];
}

export function CourseModify(props: any) {
    const {studentId, data, setSessionSlideover } = props;
    const [dataNew, setDataNew] = useState({
        id: data?.id,
        locationId: data?.locationId,
        courseId: data?.courseId,
        scheduleId: data?.scheduleId,
        
      });
    const [coursesFilter, setCoursesFilter] = useState<CourseFilter>({
      courses: [],
      schedules: []
    });
    const [scheduleFilter, setScheduleFilter] = useState({});
    
      const dispatch = useAppDispatch();
      const {email}= useAppSelector(selectAuth);
      const { locations } = useAppSelector(selectLocation);
      const {courses } = useAppSelector(selectCourse);
  
      async function updateSession(){
    
        const validation: boolean = dataNew?.id && dataNew?.locationId && dataNew?.courseId && dataNew?.scheduleId
        
        validation && await Promise.all([
          // await dispatch(
            // setOneSessionDetail({
            //   sessionId:dataNew?.id,
            //   status:dataNew?.status,
            //   locationId:dataNew?.locationId,
            //   locationIdUsed:dataNew?.locationIdUsed,
            //   sessionDate:dataNew?.date,
            //   userModifyId:email,
            // })),
            dispatch(getStudent({ studentId })),
            setSessionSlideover(false)
          // await  dispatch(getSessionDetails(
          //   {
          //       studentId:studentId, 
          //       enrollmentId:enrollmentId
          //   }))
        
        ])
        
        !validation && alert("Debe seleccionar todos los campos ")
        
        if(validation ){
          const successEl = document
          .querySelectorAll("#success-notification-content")[0]
          .cloneNode(true) as HTMLElement;
          successEl.classList.remove("hidden");
          Toastify({
            node: successEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
          }).showToast();
        }
      }
     
      // function handleSession(session: any) {
      //   // setSession({ ...session });
      //   setDataNew({
      //     ...dataNew,
      //     date: String(session.date).replace("T00:00:00.000Z", ''),
      //     locationId: session.locationId,
      //     status: session.status,
      //     id: session?.id
      //   });
      // }

    
    useEffect(() => {
      (async () => await dispatch(getLocationsOnly()))();
      (async () => await dispatch(getCourses({isActive:true})))();
    }, []);
    useEffect(() => {
      (async () => {
        const coursesData = courses.filter(course => course.locationCoursesId === dataNew?.locationId);
        const schedulesData = courses.find(course => course.id === dataNew?.courseId);

        setCoursesFilter({
          courses: [...coursesData],
          schedules: schedulesData ? schedulesData?.schedules?.items || [] : []
        });
        
      })();
      (async () => await dispatch(getCourses({isActive:true})))();
    }, [dataNew]);
    
    return(
        <>
      
          <Notification
          id="success-notification-content"
          className="flex hidden"
          >
            <Lucide icon="CheckCircle" className="text-success" />
            <div className="ml-4 mr-4">
              <div className="font-medium">Sesión actualizada</div>
              <div className="mt-1 text-slate-500">
                correctamente
              </div>
            </div>
          </Notification>
          <div className="flex flex-col">
              
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Modificación Curso</div>
                <div className="text-slate-500 mt-0.5  mb-12">del Alumno</div>
                
                
                 
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Sede:</div>
                        </div>
                      </div>
                    </label>
                    
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                        {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <>
                              <Button
                              key={`${i}-LOCATIONS-USED`}
                              onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                                setDataNew({ ...dataNew, locationId: item?.id })
                            }}                              
                            className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${item?.id === dataNew?.locationId && "bg-green-200"}`}>
                              <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                  
                                  {/* <p className="text-center line-clamp-1 text-xs text-slate-400">{item?.name}</p> */}
                                  <p className={`text-center line-clamp-1 text-xs text-slate-400  ${item?.id === dataNew?.locationId && "text-slate-500"}`}>{item?.name}</p>
                                  </span>
                              </span>
                              
                            </Button>
                            </>
                          ))}
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Curso:</div>
                        </div>
                      </div>
                    </label>
                    
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                        {Array.isArray(coursesFilter?.courses) &&
                          coursesFilter?.courses?.map((item, i) => (
                            <>
                              <Button
                              key={`${i}-LOCATIONS-USED`}
                              onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                                setDataNew({ ...dataNew, courseId: item?.id })
                            }}                              
                            className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${item?.id === dataNew?.courseId && "bg-green-200"}`}>
                              <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                  
                                  {/* <p className="text-center line-clamp-1 text-xs text-slate-400">{item?.name}</p> */}
                                  <p className={`text-center line-clamp-1 text-xs text-slate-400  ${item?.id === dataNew?.courseId && "text-slate-500"}`}>{item?.title}</p>
                                  </span>
                              </span>
                              
                            </Button>
                            </>
                          ))}
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Horario:</div>
                        </div>
                      </div>
                    </label>
                    
                    
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                        {Array.isArray(coursesFilter?.schedules) &&
                          coursesFilter?.schedules?.map((schedule, i) => (
                            <>
                              {/* <pre>{JSON.stringify(schedule[0], null, 2 )}</pre> */}
                              <Button
                              key={`${i}-SCHEDULES-`}
                              onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                                setDataNew({ ...dataNew, scheduleId: schedule?.id })
                            }}                              
                            className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${schedule?.id === dataNew?.scheduleId && "bg-green-200"}`}>
                              <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                  
                                  {/* <p className="text-center line-clamp-1 text-xs text-slate-400">{item?.name}</p> */}
                                  
                                  <p className={`text-center line-clamp-1 text-xs text-slate-400 ${schedule?.id === dataNew?.scheduleId && "text-slate-500"}`}>
                                    {schedule?.day} {schedule?.startHour}</p>
                                  </span>
                              </span>
                              
                            </Button>
                                  
                            </>
                          ))}
                    </div>
                  </div>
                  {/* <pre>{JSON.stringify(courses[0], null, 2 )}</pre> */}
            

                  
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                   
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <Button
                            key={`${"UPDATE_SESSION"}-span-buttons`} 
                            rounded
                            variant="primary"
                            className={`w-full px-2 py-2  mx-2 font-light uppercase `}
                            onClick={()=>updateSession()}
                          >Actualizar Curso</Button>
                    </div>
                  </div>
                  
                  
                  {/* <pre>sessionDetails= {JSON.stringify(sessionDetails, null, 2 )}</pre> */}
          
                  
                </div>
          </div>
        </>
    )
}