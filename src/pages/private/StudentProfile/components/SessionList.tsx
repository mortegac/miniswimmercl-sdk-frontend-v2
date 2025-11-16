import React, { useEffect, useState, Fragment, useMemo } from "react";
import _ from "lodash";
import Toastify from "toastify-js";


import {formatDateUTC, formatCurrency} from "@/utils/helper";
import {formatDateUTCShort} from "@/utils/helper";
import {statusSession} from "@/utils/dictionary";
import Notification from "@/components/Base/Notification";
import { addDaysToDate } from "@/utils/dateHandler";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import { FormSelect } from "@/components/Base/Form";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth} from "@/stores/Users/slice";
import { setOneSessionDetail, selectSessionDetails, getSessionDetails } from "@/stores//SessionDetails/slice";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getStudent } from "@/stores/Students/slice";

import { selectCourse, getCourses } from "@/stores/Courses/slice";

interface CourseFilter {
  // courses: any[];
  scheduleFilter: any[];
  // packFilter: any[];
}


export function SessionList(props: any) {
    
    
    const {studentId, data, setSessionSlideover } = props;
    const [modifyCourse, setModifyCourse] = useState(false);
    const [coursesFilter, setCoursesFilter] = useState<CourseFilter>({
      // courses: [],
      scheduleFilter: [],
      // packFilter: [],
    });
    
    console.log("----data---", data)
    
    const [dataNew, setDataNew] = useState({
      // studentId, enrollmentId, startDate, courseId, courseName, scheduleId, scheduleName,
      
        id: data?.id,
        sessionNumber: data?.sessionNumber,
        // date: formatDateUTC(data?.date),
        date: String(data?.date).replace("T00:00:00.000Z", ''),
        //data?.startDate.replace("T00:00:00.000Z", ""),
        currentSession: data?.date,
        month: data?.month,
        year: data?.year,
        status: data?.status,
        locationId: data?.locationId,
        locationIdUsed: data?.locationIdUsed,
        studentId: data?.studentId,
        enrollmentId: data?.enrollmentId,
        // courseId: ""
        courseId: data?.courseId,
        courseName: data?.courseName,
        
        scheduleId: data?.scheduleId,
        scheduleName: data?.scheduleName,
        
        userModifyId: data?.userModifyId,
        totalSessions: data?.totalSessions,
        proratedValue: data?.proratedValue,
        wasEmailSent:data?.wasEmailSent,
      });
      
      const { courses, status: courseStatus} = useAppSelector(selectCourse);
      const dispatch = useAppDispatch();
      const {email}= useAppSelector(selectAuth);
      const { locations, status } = useAppSelector(selectLocation);
      
  
      const validityOfThePlan: any = {
        "1": 1,
        "4": 30,
        "12": 100,
        "24": 200
      }
      
      async function updateSession(){
    
        const validation: boolean = dataNew?.id && dataNew?.status && dataNew?.locationId && dataNew?.locationIdUsed && dataNew?.date
        
        validation && await Promise.all([
          await dispatch(
            setOneSessionDetail({
              sessionId:dataNew?.id,
              status:dataNew?.status,
              locationId:dataNew?.locationId,
              locationIdUsed:dataNew?.locationIdUsed,
              sessionDate:dataNew?.date,
              currentSession:dataNew?.currentSession,
              userModifyId:email,
              studentId:dataNew?.studentId,
              enrollmentId:dataNew?.enrollmentId,
              
              sessionNumber: dataNew?.sessionNumber,
              // month: dataNew?.month,
              // year: dataNew?.year,
              courseId: dataNew?.courseId,
              scheduleId: dataNew?.scheduleId,
              
              totalSessions: dataNew?.totalSessions,
              proratedValue: dataNew?.proratedValue,
              wasEmailSent:dataNew?.wasEmailSent,


            })),
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
      const dayOrder = new Map<string, number>([
        ['lunes', 1],
        ['martes', 2],
        ['miercoles', 3],
        ['jueves', 4],
        ['viernes', 5],
        ['sabado', 6],
        ['domingo', 7]
      ]);
      
      function getDayValue(day: string): number {
        return dayOrder.get(day.toLowerCase()) || 8;
      }
      
      const getCoursesByLocation = async (locationId: any) => {
        await dispatch(getCourses({ isActive: true, locationId }));
        setCoursesFilter({
          scheduleFilter: [],
          // packFilter: [],
        });
      };
      
      // const filterCourse = async () => {
      //   const resultadoFind = data?.courseEnrollmentsId && courses.find(curso => curso.id === data?.courseEnrollmentsId);
      
      //   resultadoFind && setCoursesFilter({
      //     ...coursesFilter,
      //     scheduleFilter:
      //       [
      //         ...resultadoFind
      //           ?.schedules
      //           ?.items,
      //       ],
      //   });
      // };
      
      function sortSchedulesByDayAndTime(schedules: any[]): any[] {
        return [...schedules].sort((a, b) => {
          const dayComparison = getDayValue(a.day) - getDayValue(b.day);
          if (dayComparison !== 0) {
            return dayComparison;
          }
          return a.startHour.localeCompare(b.startHour);
        });
      }
      
      function groupSchedulesByDay(schedules: any[]): { [key: string]: any[] } {
        const sortedSchedules = sortSchedulesByDayAndTime(schedules);
        return sortedSchedules.reduce((groups: { [key: string]: any[] }, schedule) => {
          const day = schedule.day;
          if (!groups[day]) {
            groups[day] = [];
          }
          groups[day].push(schedule);
          return groups;
        }, {});
      }
      
    // useEffect(() => {
      
    //   (async () => 
    //     Promise.all([
    //       await dispatch(getLocationsOnly()),
    //       getCoursesByLocation(data?.locationId )
          
    //     ])
    //   )()
    // }, [data?.locationId]);
    
  
    
    // useEffect(() => {
    //   const resultadoFind = data?.courseEnrollmentsId && courses.find(curso => curso.id === data?.courseEnrollmentsId);
      
    //   resultadoFind && setCoursesFilter({
    //     ...coursesFilter,
    //     scheduleFilter:
    //       [
    //         ...resultadoFind
    //           ?.schedules
    //           ?.items,
    //       ],
    //   });
    // }, [courses]);
    
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
            {/* <pre>{JSON.stringify(data, null, 2 )}</pre> */}
              
              {/* <pre>{JSON.stringify(courses, null, 2 )}</pre> */}
              {/* <pre>{JSON.stringify(data, null, 2 )}</pre> */}
              {/* <pre>dataNew==  {JSON.stringify(dataNew, null, 2 )}</pre> */}
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Reagendar Sesión</div>
                <div className="text-slate-500 mt-0.5  mb-12">del Alumno</div>
                <div className="bg-red-100 p-4 rounded-xl flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">
                            <p className="uppercase text-xl">Vigencia del pack</p>
                            <p className="text-[.8rem] text-slate-700">{data?.totalSessions} sesiones, {`${validityOfThePlan[data?.totalSessions]} días`}</p>
                          </div>
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      {/* <p className="text-[.8rem] mb-3">Inicio: {addDaysToDate(data?.date, 0)}</p>
                      <p className="text-[.8rem] mb-3">Término: <span className="text-[1rem] rounded-lg text-white bg-primary p-2">{addDaysToDate(data?.date, validityOfThePlan[data?.totalSessions])}</span>  </p> */}
                      
                    </div>
                  </div>
                
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Fecha sesión</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                          (Formato fecha año - mes - dia)
                        </div>
                      </div>
                    </label>
                    <div className="flex flex-row mt-3 xl:mt-0 w-[140] justify-center items-center">
                      <div className="relative">
                        <Lucide
                          icon="Calendar"
                          className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                        />
                        <Litepicker
                          value={String(dataNew.date).replace("T00:00:00.000Z", '')}
                          type="text"
                          name="studentBithday"
                          onChange={(e) =>
                            setDataNew({ ...dataNew, date: String(e.target.value).replace("T00:00:00.000Z", '') })
                          }
                          options={{
                            autoApply: true,
                            showWeekNumbers: false,
                            format: "YYYY-MM-DD",
                            singleMode: true,
                            // Formatear la fecha de salida como ISO 8601
                            setup: (picker) => {
                              picker.on("selected", (date1) => {
                                // Convertir a formato ISO 8601
                                const isoDate = date1.format(
                                  "YYYY-MM-DD"
                                );
                                // const isoDate = date1.format(
                                //   "YYYY-MM-DDTHH:mm:ss.SSSZ"
                                // );
                                console.log(
                                  "Fecha seleccionada (ISO 8601):",
                                  isoDate
                                );
                              });
                            },
                            dropdowns: {
                              minYear: new Date().getFullYear() - 2,
                              maxYear: new Date().getFullYear() + 1,
                              months: true,
                              years: true,
                            },
                          }}
                          className="px-6 py-3 pl-12 rounded-full mr-8 focus:z-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  
                  
                  <div className="p-4 rounded-xl flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                   
                    <div className="flex-1 w-full ">
                      <Button
                        key={`MODIFY-SESSION-`}
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          setModifyCourse(!modifyCourse)
                        }}
                        className={`shadow-none border m-0 p-2 mb-1 min-w-44 h-14 `}
                      >
                        <span className="group flex justify-center items-center text-xs rounded-md uppercase">
                          Modificar Cursos y Horario
                        </span>
                      </Button>
                      
                                          
                    </div>
                  </div>
                  
                  
                  { modifyCourse &&
                    
                    // {courseStatus === "idle" && 
                    <div className="bg-yellow-50 p-4 flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                      {/* <pre>modifyCourse= {JSON.stringify(modifyCourse)} {typeof modifyCourse}</pre> */}
                      
                      <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                        Seleccione la sede
                      </h3>
                      
                      <div className="flex flex-row justify-start flex-wrap p-4">aa
                      <FormSelect
                        key="SELECT-LOCATIONS-origin"
                        className="!box uppercase mr-3"
                        onChange={(e) =>{
                            setDataNew({ 
                              ...dataNew, 
                              locationId: e.target.value, 
                              locationIdUsed: e.target.value,
                            })
                            getCoursesByLocation(e.target.value)
                          }
                        }
                      >
                        <option value="" selected>
                          {`${"Sedes"} `}
                        </option>
                        {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <option
                            key={`${i}-LOCATIONS`}
                              value={item?.id}
                              selected={item?.id === dataNew.locationId && true}
                            >
                              {item.name}
                            </option>
                          ))}
                      </FormSelect>
                      </div>
                      
                      
                      <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                        Seleccione el Curso
                      </h3>
                      <div className="flex flex-row justify-start flex-wrap p-4">
                            {Array.isArray(courses) &&
                              courses.map(
                                (schedule, i) => (
                                  <>
                                    <Button
                                      key={`${i}-SCHEDULES-`}
                                      onClick={(
                                        event: React.MouseEvent
                                      ) => {
                                        event.preventDefault();
                                        setDataNew({
                                          ...dataNew,
                                          courseId: schedule?.id,
                                          
                                        });


                                        setCoursesFilter({
                                          // ...coursesFilter,
                                          scheduleFilter:
                                            [
                                              ...schedule
                                                ?.schedules
                                                ?.items,
                                            ],
                                          // packFilter: [
                                          //   ...schedule
                                          //     ?.sessionTypes
                                          //     ?.items,
                                          // ],
                                        });
                                      }}
                                      
                                      className={`shadow-none border m-0 p-2 mr-2 min-w-full lg:min-w-44 h-14 mb-2  ${
                                        schedule?.id ===
                                          dataNew?.courseId &&
                                        "bg-purple-200"
                                      }`}
                                    >
                                      <span className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                        <span className="-mt-px text-center">
                                          <p
                                            className={`text-center  text-xs text-slate-400  ${
                                              schedule?.id ===
                                                dataNew?.courseId &&
                                              "text-slate-600"
                                            }`}
                                          >
                                            {/* {
                                              schedule?.id
                                            } -  */}
                                            {
                                              schedule?.title
                                            }
                                          </p>
                                        </span>
                                      </span>
                                    </Button>
                                  </>
                                )
                              )}
                      </div>
                          <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                            Seleccione el Horario
                          </h3>
                          <div className="overflow-x-auto overflow-y-auto max-h-[300px] flex p-2">
                            {Array.isArray(coursesFilter?.scheduleFilter) && coursesFilter?.scheduleFilter.length === 0 && (
                              <p className="text-lg font-thin text-slate-400 text-center">
                                👻 Sin horarios disponibles = {coursesFilter?.scheduleFilter.length}
                              </p>
                            )}
                            {Array.isArray(coursesFilter?.scheduleFilter) && Object.entries(groupSchedulesByDay(coursesFilter?.scheduleFilter)).map(([day, schedules]) => (
                              <div key={day} className="flex flex-col mr-4">
                                <h4 className="text-sm font-medium text-slate-500 mb-2 text-center">{day.toUpperCase()}</h4>
                                <div className="flex flex-col">
                                  {coursesFilter?.scheduleFilter.map((schedule, i) => (
                                    <Button
                                      key={`${i}-SCHEDULES-`}
                                      onClick={(event: React.MouseEvent) => {
                                        event.preventDefault();
                                        setDataNew({
                                          ...dataNew,
                                          scheduleId: schedule?.id,
                                        });
                                        // setValueEnrrollment({
                                        //   key: "enrollmentScheduleId",
                                        //   value: schedule?.id,
                                        // });
                                        // setValueEnrrollment({
                                        //   key: "enrollmentCourseName",
                                        //   value: `${schedule?.day}-${schedule?.startHour}`,
                                        // });
                                      }}
                                      className={`shadow-none border m-0 p-2 mb-1 min-w-44 h-14 ${
                                        (schedule?.id === dataNew?.scheduleId && schedule?.day === data?.scheduleName) && "bg-green-200"
                                      }`}
                                    >
                                      <span className="group flex justify-center items-center text-xs rounded-md uppercase">
                                        <span className="-mt-px text-center">
                                          <p className={`text-center text-lg text-slate-400 ${
                                            schedule?.id === dataNew?.scheduleId && "text-slate-500"
                                          }`}>
                                            {schedule?.startHour}
                                          </p>
                                        </span>
                                      </span>
                                        <p>                                                              
                                            {/* <span className="text-[0.6rem]">{schedule?.id}</span> */}
                                            <span className="text-[0.6rem]">{schedule?.day}</span>
                                        </p>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>                              
                    </div>
                    </div>                    
                  }
                  
                  {
                  !modifyCourse &&
                  <div className=" border border-slate-100 rounded-md pt-4">
                    <div className="p-4 rounded-xl flex-col block pt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                      <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Sede inscrita</div>
                          </div>
                        </div>
                      </label>
                      <div className="flex-1 w-full mt-3 xl:mt-0">
                        <div className="flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                          <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                              {/* <p className="">{data?.locationId}</p>                                       */}
                              <FormSelect
                        key="SELECT-LOCATIONS"
                        className="!box uppercase mr-3"
                        onChange={(e) =>{
                            setDataNew({ 
                            ...dataNew, 
                            locationId: e.target.value,
                            locationIdUsed: e.target.value,
                        })
                            getCoursesByLocation(e.target.value)
                          }
                        }
                      >
                        <option value="" selected>
                          {`${"Sedes"} `}
                        </option>
                        {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <option
                            key={`${i}-LOCATIONS`}
                              value={item?.id}
                              selected={item?.id === dataNew.locationId && true}
                            >
                              {item.name}
                            </option>
                          ))}
                      </FormSelect>
                          </div>
                        </div>                      
                      </div>
                    </div>
                    <div className="p-4 rounded-xl flex-col block pt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                      <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Curso</div>
                          </div>
                        </div>
                      </label>
                      <div className="flex-1 w-full mt-3 xl:mt-0">
                        <div className="flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                          <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                              <p className="">{data?.courseName}</p>                                      
                          </div>
                        </div>                      
                      </div>
                    </div>
                    <div className="p-4 rounded-xl flex-col block pt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                      <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Horario</div>
                          </div>
                        </div>
                      </label>
                      <div className="flex-1 w-full mt-3 xl:mt-0">
                        <div className="flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                          <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                              <p className="uppercase">{data?.scheduleName}</p>                                        
                          </div>
                        </div>                      
                      </div>
                    </div>
                  </div>
                   }  
                  
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Sede usada</div>
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
                                setDataNew({ ...dataNew, locationIdUsed: item?.id })
                            }}                              
                            className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${item?.id === dataNew?.locationIdUsed && "bg-green-200"}`}>
                              <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                  
                                  {/* <p className="text-center line-clamp-1 text-xs text-slate-400">{item?.name}</p> */}
                                  <p className={`text-center line-clamp-1 text-xs text-slate-400  ${item?.id === dataNew?.locationIdUsed && "text-slate-500"}`}>{item?.name}</p>
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
                          <div className="font-medium">Estado</div>
                        </div>
                      </div>
                    </label>
                    {/* <pre>{JSON.stringify(statusSession, null, 2)}</pre> */}
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                        {Array.isArray(statusSession) &&
                          statusSession?.map((item, i) => (
                            <>
                            {/* <p className="text-center line-clamp-1 text-xs">{item?.id} | {dataNew?.locationId}</p> */}
                              <Button
                              key={`${i}-STATUS`}
                              onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              setDataNew({ ...dataNew, status: item?.id });
                              updateSession()
                              //  setDataSession({ ...session });
                              //  setSessionSlideover(true);
                            }}                              
                            className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${item?.id === dataNew?.status && "bg-green-300"}`}>
                              <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                  
                                  <p className={`text-center line-clamp-4 text-base text-slate-400  ${item?.id === dataNew?.status && "text-slate-500"}`}>{item?.name}</p>
                                  </span>
                              </span>
                              
                            </Button>
                            </>
                          ))}
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0 pb-24 xl:pb-0">
                    <div className="w-screen mt-3 xl:mt-0 fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 bg-slate-900/80 xl:w-full xl:static xl:px-0 xl:pb-0">
                      <Button
                        id="updtaSession"
                        key={`${"UPDATE_SESSION"}-span-buttons`} 
                        rounded
                        variant="primary"
                        className="w-full h-14 rounded-none px-4 py-4 font-light uppercase shadow-lg xl:h-auto xl:rounded xl:px-2 xl:py-2 xl:mx-2"
                        onClick={() => updateSession()}
                      >
                        Actualizar Sesión
                      </Button>
                    </div>
                  </div>
                  
                  
                  {/* <pre>sessionDetails= {JSON.stringify(sessionDetails, null, 2 )}</pre> */}
          
                  
                </div>
          </div>
        </>
    )
}