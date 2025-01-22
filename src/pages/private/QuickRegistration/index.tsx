import React, { useEffect, useState, Fragment, useMemo } from "react";
import Lucide from "@/components/Base/Lucide";
import users from "@/fakers/users";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";
import { Tab } from "@/components/Base/Headless";
import clsx from "clsx";
import _ from "lodash";
import { Slideover } from "@/components/Base/Headless";


import LoadingIcon from "@/components/Base/LoadingIcon";
import {FormStep01} from "./components/FormStep01";
import {IcoSvg} from "./components/Gender";
import {RelationList} from "./components/RelationList";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";

import { selectEnrollment, setDataEnroll, setStep} from "@/stores/Enrollment/slice";
import { selectAuth, getUser, setApoderado, cleanDataUser} from "@/stores/Users/slice";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getStudent } from "@/stores/Students/slice";
import { selectCourse, getCourses} from "@/stores/Courses/slice";


interface CourseFilter {
  courses: any[];
  schedules: any[];
  packSessions: any[];
}

function Main() {
  
  const [sessionSlideover, setSessionSlideover] = useState(false);
  const {currentStep, status, enrollment} = useAppSelector(selectEnrollment);
  const {id, name, email, users }= useAppSelector(selectAuth);
  const [dataNew, setDataNew] = useState({
    id: "",
    locationId: "",
    courseId: "",
    scheduleId: "",
    packId: "",
    studentId: "",
    studentName: "",
    studentAge: {
      años:0,
      meses:0,
    },
    studentGender: "",
  });
  const [coursesFilter, setCoursesFilter] = useState<CourseFilter>({
    courses: [],
    schedules: [],
    packSessions: [],
  });

  const user = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  // const {email}= useAppSelector(selectAuth);
  const { locations } = useAppSelector(selectLocation);
  const {courses } = useAppSelector(selectCourse);
  const setDataStudent = async (e: any) => {
    
    console.log("--e--", e)
    setSessionSlideover(!sessionSlideover)
    setDataNew({
      ...dataNew,
      ...e,
      // scheduleId: e?.scheduleId,
      // studentId: e?.studentId,
      // studentName: e?.studentName,
      // studentAge: e?.studentAge,
      // studentGender: e?.studentGender,
    });
  }
  const onChangeSetStore = async (e: any) => {
    // console.log(">>. e >>>", e)
    let valueForm: any;
    if (e.target.type === "checkbox") {
      valueForm = Boolean(e.target.checked);
    } else if (e.target.type === "number") {
      valueForm = Number(e.target.value);
    } else {
      valueForm = e.target.name === "guardianEmail"? String(e.target.value.trim().toLowerCase()) :String(e.target.value);
    }
    e.preventDefault();

    dispatch(
      setDataEnroll({
        key: e.target.name,
        value: valueForm,
      })
    );
  };
  
  useEffect(() => {
    (async () => await dispatch(getLocationsOnly()))();
    (async () => await dispatch(getCourses({isActive:true})))();
  }, []);
  useEffect(() => {
    (async () => {
      const coursesData = courses.filter(course => course.locationCoursesId === dataNew?.locationId);
      const schedulesData = courses.find(course => course.id === dataNew?.courseId);
      const packSessionsData = courses.find(course => course.id === dataNew?.courseId);

      // coursesFilter?.courses[0]?.sessionTypes?.items
      
      setCoursesFilter({
        courses: [...coursesData],
        schedules: schedulesData ? schedulesData?.schedules?.items || [] : [],
        packSessions: packSessionsData ? packSessionsData?.sessionTypes?.items || [] : [],
      });
      
    })();
    (async () => await dispatch(getCourses({isActive:true})))();
  }, [dataNew?.locationId]);
  
  return (
    <>
         {/* SESIONES */}
         <Slideover
        size="xl"
        key="Slide-sessions333"
        open={sessionSlideover}
        onClose={() => {
          setSessionSlideover(false);
        }}
      >
        <Slideover.Panel className="w-80 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setSessionSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0 px-6">
           {/* <pre>{JSON.stringify(dataNew, null, 2)}</pre> */}
              <div className="grid grid-cols-12 gap-y-10 gap-x-6">
                <div className="col-span-12">
                  <div className="p-1.5 box flex flex-col ">
                    <div className="h-20 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
                      <div
                        className={clsx([
                          "w-full h-full relative overflow-hidden",
                          "before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]",
                          "after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]",
                        ])}
                      ></div>
                      <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-3">
                        <div className="w-full h-full overflow-hidden border-[6px] box border-white rounded-full image-fit">
                          <div className="flex justify-center items-center">
                          <IcoSvg gender={dataNew?.studentGender || ""}/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[0.6rem] bg-slate-50 pt-16 pb-6">
                      <div className="flex items-center justify-center text-xl font-medium">
                        {`${dataNew?.studentName}`}
                       
                      </div>
                    
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-5 mt-2.5">
                        <div className="flex items-center text-slate-500">
                          <Lucide
                            icon="User"
                            className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                          />
                          {/* {`${dataNew?.studentAge}`} */}
                          { dataNew?.studentAge && dataNew?.studentAge.años > 100 ? "SIN EDAD":`${dataNew?.studentAge?.años || ""} años, ${dataNew?.studentAge?.meses || ""} meses`}
                        </div>
                       
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-y-10 gap-x-6 mt-4">
      <div className="col-span-12">
        <Tab.Group>
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-xl font-medium text-slate-500 group-[.mode--light]:text-white">
              Proceso de inscripción
            </div>
            <Tab.List
              variant="boxed-tabs"
              className="w-auto md:ml-auto bg-white box rounded-[0.6rem] border-slate-200 group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!border-transparent"
            >
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[0.12] group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent">
                <Tab.Button
                  className="w-full md:w-24 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                  as="button"
                >
                  Grupales
                </Tab.Button>
              </Tab>
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[0.12] group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent">
                <Tab.Button
                  className="w-full md:w-24 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                  as="button"
                >
                  Particulares
                </Tab.Button>
              </Tab>
              
            </Tab.List>
          </div>
          <Tab.Panels className="mt-3.5">
            <Tab.Panel className="flex flex-col xl:flex-row gap-2 p-1.5 leading-relaxed">
             
            
            <div className="grid grid-cols-12 mt-3.5">
                        <div className="col-span-12 xl:col-span-12">
                              <div className="">
                                <div className="px-5">
                                    <div className="px-5">
                <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                    <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                      Seleccione la sede</h3>
                    <div className="overflow-x-auto flex p-2">
                      {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <>
                              <Button
                                key={`${i}-LOCATIONS-USED`}
                                onClick={(event: React.MouseEvent) => {
                                  event.preventDefault();
                                  setDataNew({ ...dataNew, locationId: item?.id })
                                }}                              
                                className={`shadow-none border m-0 p-2 mr-2 mb-1 min-w-44 h-20  ${item?.id === dataNew?.locationId && "bg-slate-300 "}`}>
                                <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                    <p className={`text-center  text-xs text-slate-400  ${item?.id === dataNew?.locationId && "text-slate-500"}`}>{item?.name}</p>
                                  </span>
                                </span>
                                
                              </Button>
                            </>
                          )
                      )}

                    </div>
                  </div>
                </div>
            </div>
                                    
                                    <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                      <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                                        <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                                          Seleccione el curso</h3>
                                        <div className="overflow-x-auto flex p-2">
                                          {Array.isArray(coursesFilter?.courses) &&
                                            coursesFilter?.courses?.map((item, i) => (
                                                <>
                                                  <Button
                                                    key={`${i}-LOCATIONS-USED`}
                                                    onClick={(event: React.MouseEvent) => {
                                                    event.preventDefault();
                                                      setDataNew({ ...dataNew, courseId: item?.id })
                                                    }}                            
                                                    className={`shadow-none border m-0 p-2 mr-2 mb-1 min-w-44 h-20  ${item?.id === dataNew?.courseId && "bg-green-200"}`}>
                                                    <span
                                                      className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                                      <span className="-mt-px text-center">
                                                        <p className={`text-center  text-[0.9rem] text-slate-400  ${item?.id === dataNew?.courseId && "text-slate-500"}`}>
                                                          {item?.title}
                                                        </p>
                                                      </span>
                                                    </span>
                                                    
                                                  </Button>
                                                </>
                                              )
                                          )}

                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                      <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                                        <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                                          Seleccione el Horario</h3>
                                        <div className="overflow-x-auto flex p-2">
                                        {Array.isArray(coursesFilter?.packSessions) &&
                                            coursesFilter?.schedules?.map((schedule, i) => (
                                                <>
                                                  <Button
                                                      key={`${i}-SCHEDULES-`}
                                                      onClick={(event: React.MouseEvent) => {
                                                      event.preventDefault();
                                                        setDataNew({ ...dataNew, scheduleId: schedule?.id })
                                                    }}                           
                                                    className={`shadow-none border m-0 p-2 mr-2 mb-1 min-w-44 h-20  ${schedule?.id === dataNew?.scheduleId && "bg-purple-200"}`}>
                                                    <span
                                                      className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                                      <span className="-mt-px text-center">
                                                        <p className={`text-center  text-xs text-slate-400  ${schedule?.id === dataNew?.scheduleId && "text-slate-500"}`}>
                                                        {schedule?.day}
                                                        </p>
                                                        <p className={`text-center  text-lg text-slate-400  ${schedule?.id === dataNew?.scheduleId && "text-slate-500"}`}>
                                                        {schedule?.startHour}
                                                        </p>
                                                      </span>
                                                    </span>
                                                    
                                                  </Button>
                                                </>
                                              )
                                          )}

                                        </div>
                                      </div>
                                    </div>
                                      
                                    <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                      <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                                        <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                                        Seleccione el Pack</h3>
                                        <div className="overflow-x-auto flex p-2">
                                        {Array.isArray(coursesFilter?.packSessions) &&
                                            coursesFilter?.packSessions?.map((pack, i) => (
                                                <>
                                                  <Button
                                                      key={`${i}-PACK-`}
                                                      onClick={(event: React.MouseEvent) => {
                                                      event.preventDefault();
                                                        setDataNew({ ...dataNew, packId: pack?.sessionType?.id })
                                                    }}                           
                                                    className={`shadow-none border m-0 p-2 mr-2 mb-1 min-w-44 h-20  ${pack?.sessionType?.id === dataNew?.packId && "bg-yellow-200"}`}>
                                                    <span
                                                      className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                                      <span className="-mt-px text-center">
                                                        <p className={`text-center  text-xs text-slate-400  ${pack?.sessionType?.id === dataNew?.packId && "text-slate-500"}`}>
                                                        Pack
                                                        </p>
                                                        <p className={`text-center  text-lg text-slate-400  ${pack?.sessionType?.id === dataNew?.packId && "text-slate-500"}`}>
                                                        {pack?.sessionType?.totalSessions}{" "} Clases
                                                        </p>
                                                      </span>
                                                    </span>
                                                    
                                                  </Button>
                                                </>
                                              )
                                          )}

                                        </div>
                                      </div>
                                    </div>
                                </div>
                                
                                  
                                    {/* <pre>{JSON.stringify(dataNew, null, 2 )}</pre> 
                                    <pre>{JSON.stringify(coursesFilter, null, 2 )}</pre> */}
                              

                                    
                                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                  
                                    <div className="flex-1 w-full mt-3 xl:mt-0">
                                    <Button
                                            key={`${"UPDATE_SESSION"}-span-buttons`} 
                                            rounded
                                            variant="primary"
                                            className={`w-full px-2 py-2  mx-2 font-light uppercase `}
                                            // onClick={()=>updateSession()}
                                          >Incribir Curso</Button>
                                    </div>
                                  </div>
                              </div>
                        </div>
                      </div>
             
            </Tab.Panel>
            <Tab.Panel className="p-5 leading-relaxed"></Tab.Panel>
          
          </Tab.Panels>
        </Tab.Group>
      </div>
                </div>
              </div>
              </div>
          
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12 sm:col-span-10 sm:col-start-2">
          
   
          {/* FORM */}
            <div className="flex flex-col justify-between box  p-10 space-y-4 ">
              <div className="flex flex-col justify-start ">
              { status === "loading" &&
                <div className="flex justify-center items-center w-full h-48"><LoadingIcon
                  color="#AE5EAB"
                  icon="oval"
                  className="w-10 h-10 mt-10"
                /></div>
              }
              
              { status === "idle" &&
                <FormStep01 onChangeSetStore={onChangeSetStore}/>
              }
              </div>
            </div>
          {/* </div> */}
          <div className="flex flex-col box  p-10  mt-4">
            <div className="flex flex-row justify-between">
              <h2 className="font-thin text-xl">Estudiantes asociados</h2>
              <Button
                rounded
                variant="soft-primary"
                className="border border-slate-200 px-1 py-1 flex justify-center items-center -mr-8"
                // className="border border-slate-200 px-0 py-1 text-center"
                // onClick={()=>dataValidate()}
                
                
              >
                {/* <Lucide icon="Plus" className="w-8 h-9 ml-2 mr-2" /> */}
                <Lucide icon="Plus" className="w-8 h-9 ml-2 mr-2" />
                <span className="text-sm">Nuevo Alumno</span>
                {/* { guardianId === "" ? "Grabar y crear Alumno" :"Crear nuevo Alumno"} */}
            </Button>
            </div>
            
            <div className="">
              { user.status === "loading" &&
                    <div className="flex justify-center items-center w-full h-48"><LoadingIcon
                      color="#AE5EAB"
                      icon="oval"
                      className="w-10 h-10 mt-10"
                    /></div>
              }
              
              
                  <div className="mt-4 py-10 -mb-30 -ml-8 -mr-8 relative overflow-auto">
                      <div className="overflow-x-auto flex">
                        
                        { user.status === "idle" 
                          && users?.relationships 
                          && <RelationList students={users?.relationships} setDataStudent={setDataStudent}/> }    
                      
                      </div>
                  </div>
            </div>
            
          <div>
          </div>
          </div>
         
        </div>
      </div>
      {/* <pre>{JSON.stringify(users?.relationships?.items, null, 2)}</pre> */}
    </>
  );
}

export default Main;
