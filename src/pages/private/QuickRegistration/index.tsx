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
// import { HeaderTitle } from "./components/HeaderTitle";
import { ResumenTransactions } from "./components/ResumenTransactions";
import { Navigator } from "./components/Navigator";

import LoadingIcon from "@/components/Base/LoadingIcon";
import { FormStep01 } from "./components/FormStep01";
import { IcoSvg } from "./components/Gender";
import { RelationList } from "./components/RelationList";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";

import {
  selectEnrollment,
  setDataEnroll,
  setDataStudent,
  setEnrollment,
  setStep,
} from "@/stores/Enrollment/slice";

import {
  selectAuth,
  getUser,
  setApoderado,
  cleanDataUser,
} from "@/stores/Users/slice";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getStudent } from "@/stores/Students/slice";
import { selectCourse, getCourses } from "@/stores/Courses/slice";
import { getShoppingCart } from "@/stores/ShoppingCarts/slice";
import { FormStep02 } from "./components/FormStep02";
import { Step05Resume } from "./components/Step05Resume";

interface CourseFilter {
  // courses: any[];
  scheduleFilter: any[];
  packFilter: any[];
}
// interface ScheduleFilter{ [];}

function Main() {
  const [sessionSlideover, setSessionSlideover] = useState(false);
  const [studentSlide, setStudentSlide] = useState(false);
  const [dataNew, setDataNew] = useState({
    id: "",
    locationId: "",
    courseId: "",
    scheduleId: "",
    packId: "",
    studentId: "",
    studentName: "",
    studentAge: {
      años: 0,
      meses: 0,
    },
    studentGender: "",
  });
  const [coursesFilter, setCoursesFilter] = useState<CourseFilter>({
    // courses: [],
    scheduleFilter: [],
    packFilter: [],
  });

  const [scheduleFilter, setScheduleFilter] = useState<any>([]);
  const [packFilter, setPackFilter] = useState<any>([]);
  const [isSaved, setIsSaved] = useState<any>({ state: false});
  const { currentStep, enrollment } = useAppSelector(selectEnrollment);
  
  // const {id, name, email, users }= useAppSelector(selectAuth);
  const user = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  // const {email}= useAppSelector(selectAuth);
  const { locations } = useAppSelector(selectLocation);
  const { courses, status } = useAppSelector(selectCourse);
  const {
    guardianId,
    studentId,
    guardianEmail,
    guardianPhone,
    enrollmentStartDate
    // guardianName,
    // guardianRelation,
  } = enrollment;
  

  function transformDate(isoDate:string) {
    const date = new Date(isoDate);
    
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = date.getUTCFullYear();
  
    return `${month}-${day}-${year}`;
  }
  

  const onSetNewStudent = async (userEmail: any) => {
    const event = {
      target: {
        name: "guardianId",
        value: userEmail,
        type: "text",
      },
      preventDefault: () => null,
    };
    Promise.all([
      onChangeSetStore({ ...event }),
      dispatch(
        setDataStudent({
          id: "",
          name: "",
          lastName: "",
          birthday: "",
          gender: "",
          residence: "",
          email: guardianEmail,
          phone: guardianPhone,
        })
      ),
      setStudentSlide(true),
    ]);
  };
  const onChangeSetStore = async (e: any) => {
    // console.log(">>. e >>>", e)
    let valueForm: any;
    if (e.target.type === "checkbox") {
      valueForm = Boolean(e.target.checked);
    } else if (e.target.type === "number") {
      valueForm = Number(e.target.value);
    } else {
      valueForm =
        e.target.name === "guardianEmail"
          ? String(
              e.target.value
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
          : String(e.target.value)
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
    }
    e.preventDefault();

    dispatch(
      setDataEnroll({
        key: e.target.name,
        value: valueForm,
      })
    );
  };

  const getCoursesByLocation = async (locationId: any) => {
    await dispatch(getCourses({ isActive: true, locationId }));
    setCoursesFilter({
      scheduleFilter: [],
      packFilter: [],
    });
  };
  
  type SetValueEnrollmentParams = {
    key: string;
    value: string;
  };
  function setValueEnrrollment({ key, value }: SetValueEnrollmentParams): void {
    // Asumimos que dispatch está disponible en el scope, si no, deberías pasarlo como parámetro
    dispatch(
      setDataEnroll({
        key,
        value
      })
    );
  }
  
  
  const setStudent = async (e: any) => {
    console.log("--e--", e);
    setSessionSlideover(!sessionSlideover);
    setDataNew({
      ...dataNew,
      ...e,
      // scheduleId: e?.scheduleId,
      // studentId: e?.studentId,
      // studentName: e?.studentName,
      // studentAge: e?.studentAge,
      // studentGender: e?.studentGender,
    });
    setValueEnrrollment({key:"studentId", value: e?.studentId || ""})
  };
  
  async function setDate(e:any){
    // fecha en formato ISO 8601 ("2016-07-15T04:00:00.000Z") 

    // console.log("e>>> ", e)
    
    const date:string= new Date(e.target.value).toISOString()
    setValueEnrrollment({key:"enrollmentStartDate", value:transformDate(date)})

    
  }
  
  async function setEnrollmentCourse() {
    
    setIsSaved({ state: true })
    enrollment?.guardianId && 
    enrollment?.studentId  && 
    enrollment?.enrollmentStartDate && 
    enrollment?.enrollmentSessionTypeId && 
    enrollment?.enrollmentScheduleId && 
    enrollment?.enrollmentCourseId  && 
    await Promise.all([
      await dispatch(
        setEnrollment({
          userId: enrollment?.guardianId,
          studentId: enrollment?.studentId,
          enrollmentStartDate: enrollment?.enrollmentStartDate,
          enrollmentSessionTypeId: enrollment?.enrollmentSessionTypeId,
          enrollmentScheduleId: enrollment?.enrollmentScheduleId,
          enrollmentCourseId: enrollment?.enrollmentCourseId
        })),
      await dispatch(getUser({userEmail:enrollment?.guardianId})),
      // dispatch(setStep(4))
    ]);
    
    !enrollment?.guardianId && 
    !enrollment?.studentId  && 
    !enrollment?.enrollmentStartDate && 
    !enrollment?.enrollmentSessionTypeId && 
    !enrollment?.enrollmentScheduleId && 
    !enrollment?.enrollmentCourseId  && alert("Debe seleccionar todos los datos para continuar")
    
    setIsSaved({ state: false })
      dispatch(setStep(5))
    // setSelectedModal(false);
    
  }

  useEffect(() => {
    (async () => await dispatch(getLocationsOnly()))();
    // (async () => await dispatch(getCourses({isActive:true})))();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     const coursesData = courses.filter(course => course.locationCoursesId === dataNew?.locationId);
  //     const schedulesData = courses.find(course => course.id === dataNew?.courseId);
  //     const packSessionsData = courses.find(course => course.id === dataNew?.courseId);

  //     // coursesFilter?.courses[0]?.sessionTypes?.items

  //     setCoursesFilter({
  //       courses: [...coursesData],
  //       schedules: schedulesData ? schedulesData?.schedules?.items || [] : [],
  //       packSessions: packSessionsData ? packSessionsData?.sessionTypes?.items || [] : [],
  //     });

  //   })();
  //   (async () => await dispatch(getCourses({isActive:true})))();
  // }, [dataNew?.locationId]);

  return (
    <>
      {/* STUDENTS */}
      <Slideover
        size="xl"
        key="Slide-studnets22"
        open={studentSlide}
        onClose={() => {
          setStudentSlide(false);
        }}
      >
        <Slideover.Panel className="w-80 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setStudentSlide(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0 px-6">
            {/* <pre>{JSON.stringify(dataNew, null, 2)}</pre> */}
            <div className="grid grid-cols-12 gap-y-10 gap-x-6">
              <div className="col-span-12">
                <div className="grid grid-cols-12 gap-y-10 gap-x-6 mt-4">
                  <div className="col-span-12">
                    <FormStep02
                      onChangeSetStore={onChangeSetStore}
                      setStudentSlide={setStudentSlide}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      {/* INSCRIPCION */}
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
                          <IcoSvg gender={dataNew?.studentGender || ""} />
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
                        {dataNew?.studentAge && dataNew?.studentAge.años > 100
                          ? "SIN EDAD"
                          : `${dataNew?.studentAge?.años || ""} años, ${
                              dataNew?.studentAge?.meses || ""
                            } meses`}
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
                          <>
                          <div className="flex flex-col w-full">
                            
                              <Navigator/> 
                            
                            <div className="grid grid-cols-12 mt-3.5">
                              <div className="col-span-12 xl:col-span-12">
                                <div className="">
                                  <div className="px-5">
                                    {currentStep === 1 &&
                                      // <div className="flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                      <div className="flex-row pt-0 mt-2 flex-wrap">
                                        <div className=" -mb-30 -ml-8 -mr-8 relative">
                                          <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                                            Seleccione la sede
                                          </h3>
                                          <div className="flex flex-row justify-start flex-wrap p-4">
                                          {/* <div className="overflow-x-auto flex p-2"> */}
                                            {Array.isArray(locations) &&
                                              locations?.map((item, i) => (
                                                <>
                                                  <Button
                                                    key={`${i}-LOCATIONS-USED`}
                                                    onClick={(
                                                      event: React.MouseEvent
                                                    ) => {
                                                      event.preventDefault();
                                                      getCoursesByLocation(
                                                        item?.id
                                                      );
                                                      setDataNew({
                                                        ...dataNew,
                                                        locationId: item?.id,
                                                      });
                                                      
                                                      setValueEnrrollment({
                                                        key:"enrollmentLocationName", 
                                                        value:item?.name
                                                      })
                                                      dispatch(setStep(2))
                                                    }}
                                                    className={`shadow-none border m-0 p-2 mr-2 min-w-full lg:min-w-44 h-20 mb-2  ${
                                                      item?.id ===
                                                        dataNew?.locationId &&
                                                      "bg-slate-300 "
                                                    }`}
                                                  >
                                                    <span className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                                      <span className="-mt-px text-center">
                                                        <p
                                                          className={`text-center  text-xs text-slate-400  ${
                                                            item?.id ===
                                                              dataNew?.locationId &&
                                                            "text-slate-500"
                                                          }`}
                                                        >
                                                          {item?.name}
                                                        </p>
                                                      </span>
                                                    </span>
                                                  </Button>
                                                </>
                                              ))}
                                          </div>
                                        </div>
                                      </div>
                                    }

                                    {currentStep === 2 &&
                                      <div className="flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                        <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                                          <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                                            Seleccione el Curso
                                          </h3>
                                          {/* <div className="overflow-x-auto flex p-2"> */}
                                          <div className="flex flex-row justify-start flex-wrap p-4">
                                            {status === "loading" && (
                                              <div className="flex justify-center items-center w-full h-12">
                                                <LoadingIcon
                                                  color="#AE5EAB"
                                                  icon="three-dots"
                                                  className="w-10 h-10 mt-10"
                                                />
                                              </div>
                                            )}

                                            {status === "idle" && (
                                              <>
                                                {Array.isArray(courses) &&
                                                  courses.map((schedule, i) => (
                                                    <>
                                                      <Button
                                                        key={`${i}-SCHEDULES-`}
                                                        onClick={(
                                                          event: React.MouseEvent
                                                        ) => {
                                                          event.preventDefault();
                                                          setDataNew({
                                                            ...dataNew,
                                                            courseId:
                                                              schedule?.id,
                                                          });
                                                         
                                                          setValueEnrrollment({
                                                            key:"enrollmentCourseId", 
                                                            value:schedule?.id
                                                          })
                                                          setValueEnrrollment({
                                                            key:"enrollmentScheduleName", 
                                                            value:schedule?.title
                                                          })
                                                          dispatch(setStep(3))

                                                          // setScheduleFilter([...schedule?.schedules?.items])
                                                          // setPackFilter([...schedule?.sessionTypes?.items])

                                                          setCoursesFilter({
                                                            ...coursesFilter,
                                                            scheduleFilter: [
                                                              ...schedule?.schedules
                                                                ?.items,
                                                            ],
                                                            packFilter: [
                                                              ...schedule
                                                                ?.sessionTypes
                                                                ?.items,
                                                            ],
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
                                                                  dataNew?.scheduleId &&
                                                                "text-slate-600"
                                                              }`}
                                                            >
                                                              {schedule?.title}
                                                            </p>
                                                          </span>
                                                        </span>
                                                      </Button>
                                                      {/* <pre>{JSON.stringify(schedule, null, 2 )}</pre> */}
                                                    </>
                                                  ))}
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    } 
                                    {currentStep === 3 &&
                                    <>
                                      <div className="flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                        <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                                          <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                                            Seleccione el Horario
                                          </h3>
                                          <div className="overflow-x-auto flex p-2">
                                            {/* <pre>{JSON.stringify(setPackFilter, null, 2 )}</pre> */}
                                            {Array.isArray(
                                              coursesFilter?.scheduleFilter
                                            ) &&
                                              coursesFilter?.scheduleFilter
                                                .length === 0 && (
                                                <p className="text-lg font-thin text-slate-400 text-center ">
                                                  👻 Sin horarios disponibles ={" "}
                                                  {scheduleFilter.length}
                                                </p>
                                              )}
                                            {Array.isArray(
                                              coursesFilter?.scheduleFilter
                                            ) &&
                                              coursesFilter?.scheduleFilter?.map(
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
                                                          scheduleId: schedule?.id,
                                                        });
                                                        setValueEnrrollment({
                                                          key:"enrollmentScheduleId", 
                                                          value:schedule?.id
                                                        })
                                                        setValueEnrrollment({
                                                          key:"enrollmentCourseName", 
                                                          value:`${schedule?.day}-${schedule?.startHour}`
                                                        })
                                                        
                                                      }}
                                                      className={`shadow-none border m-0 p-2 mr-2 mb-1 min-w-44 h-14  ${
                                                        schedule?.id ===
                                                          dataNew?.scheduleId &&
                                                        "bg-green-200"
                                                      }`}
                                                    >
                                                      <span className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                                        <span className="-mt-px text-center">
                                                          <p
                                                            className={`text-center  text-xs text-slate-400  ${
                                                              schedule?.id ===
                                                                dataNew?.scheduleId &&
                                                              "text-slate-500"
                                                            }`}
                                                          >
                                                            {schedule?.day}
                                                          </p>
                                                          <p
                                                            className={`text-center  text-lg text-slate-400  ${
                                                              schedule?.id ===
                                                                dataNew?.scheduleId &&
                                                              "text-slate-500"
                                                            }`}
                                                          >
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
                                      <div className="flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                        <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                                          <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                                            Seleccione el Pack
                                          </h3>
                                          {/* <pre>{JSON.stringify(packFilter, null, 2 )}</pre> */}
                                          <div className="overflow-x-auto flex p-2">
                                            {Array.isArray(
                                              coursesFilter?.packFilter
                                            ) &&
                                              coursesFilter?.packFilter.length ===
                                                0 && (
                                                <p className="text-lg font-thin text-slate-400 text-center ">
                                                  👻 Sin horarios disponibles ={" "}
                                                  {scheduleFilter.length}
                                                </p>
                                              )}
                                            {/* {Array.isArray(
                                              coursesFilter?.packFilter
                                            ) &&
                                              coursesFilter?.packFilter?.map */}
                                              
                                      {Array.isArray(coursesFilter?.packFilter) &&
                                              [...coursesFilter?.packFilter]
                                                .sort((a:any, b:any) => {
                                                  // const ad = new Date(a.startDate);
                                                  // const bd = new Date(b.startDate);
                                                  // return ad > bd ? -1 : ad < bd ? 1 : 0;
                                                  if (a.sessionType?.totalSessions !== b.sessionType?.totalSessions) {
                                                    return a.sessionType?.totalSessions - b.sessionType?.totalSessions;
                                                  }
                                                  // Then sort by sessionType id
                                                  return (a.sessionType?.id || '').localeCompare(b.sessionType?.id || '');
                                                })
                                                .map
                                              (
                                                (pack, i) => (
                                                  <>
                                                    <Button
                                                      key={`${i}-PACK-`}
                                                      onClick={(
                                                        event: React.MouseEvent
                                                      ) => {
                                                        event.preventDefault();
                                                        setDataNew({
                                                          ...dataNew,
                                                          packId:
                                                            pack?.sessionType?.id,
                                                        });
                                                        setValueEnrrollment({
                                                          key:"enrollmentSessionTypeId", 
                                                          value:pack?.sessionType?.id
                                                        })
                                                        setValueEnrrollment({
                                                          key:"enrollmentPackName", 
                                                          value:`Pack ${pack?.sessionType?.totalSessions} clases`
                                                        })
                                                        dispatch(setStep(4))
                                                      }}
                                                      className={`shadow-none border m-0 p-2 mr-2 mb-1 min-w-44 h-20  ${
                                                        pack?.sessionType?.id ===
                                                          dataNew?.packId &&
                                                        "bg-yellow-200"
                                                      }`}
                                                    >
                                                      <span className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                                        <span className="-mt-px text-center">
                                                          <p
                                                            className={`text-center  text-xs text-slate-400  ${
                                                              pack?.sessionType
                                                                ?.id ===
                                                                dataNew?.packId &&
                                                              "text-slate-500"
                                                            }`}
                                                          > 
                                                            {!pack?.sessionType?.id.includes("CAMBIO-SEDE") && "Pack"}
                                                            {pack?.sessionType?.id.includes("CAMBIO-SEDE") &&  <span className="text-[.6rem] bg-slate-200 rounded-xl text-slate-800 font-thin  p-1">CAMBIO-SEDE</span>}
                                                          </p>
                                                          <p
                                                            className={`text-center  text-lg text-slate-400  ${
                                                              pack?.sessionType
                                                                ?.id ===
                                                                dataNew?.packId &&
                                                              "text-slate-500"
                                                            }`}
                                                          >
                                                            {
                                                              pack?.sessionType
                                                                ?.totalSessions
                                                            }{" "}
                                                            Clases
                                                          </p>
                                                          <p
                                                            className={`text-center text-[.8rem] pt-2 text-slate-400  ${
                                                              pack?.sessionType
                                                                ?.id ===
                                                                dataNew?.packId &&
                                                              "text-slate-500"
                                                            }`}
                                                          >
                                                            {"$ "}
                                                            {
                                                              pack?.sessionType
                                                                ?.amount
                                                            }
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
                                    </>
                                    }

                                    {currentStep === 4 &&  
                                      <div className="flex-col block pt-0 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                        <div className=" -mb-30 -ml-8 -mr-8 relative overflow-auto">
                                          <h3 className="text-left ml-4 mb-0 font-semibold text-lg">
                                            Fecha de Inicio
                                          </h3>
                                          {/* <pre>{JSON.stringify(packFilter, null, 2 )}</pre> */}
                                          <div className="relative">
                                            <Lucide
                                              icon="Calendar"
                                              className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                                            />
                                            <Litepicker value={enrollmentStartDate} type="text" name="enrollmentStartDate" 
                                              onChange={(e)=>setDate(e)}
                                              options={{
                                                autoApply: true,
                                                showWeekNumbers: false,
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
                                          {/* <div className="overflow-x-auto flex p-2">
                                          CALENDAR
                                          </div> */}
                                        </div>
                                      </div>
                                    }
                                    
                                  </div>

                                  {currentStep === 4 &&  
                                    <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                      <div className="flex-1 w-full mt-3 xl:mt-0">
                                        <Button
                                          key={`${"UPDATE_SESSION"}-span-buttons`}
                                          rounded
                                          variant="primary"
                                          className={`w-full px-2 py-2  mx-2 font-light uppercase `}
                                          onClick={()=>setEnrollmentCourse()}
                                          disabled = {isSaved.state}
                                        >
                                          {isSaved.state && <LoadingIcon icon="puff" color="#FFFFFF" className="mr-2 w-8 h-8" />}
                                          Inscribir Curso
                                        </Button>
                                      </div>
                                    </div>
                                  }
                                  
                                  {currentStep === 5 &&  
                                    <div className="flex-col block xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                                      <div className="flex-1 w-full xl:mt-0">
                                        <Step05Resume/>
                                      </div>
                                    </div>
                                  }
                                  
                                </div>
                              {/* <p><pre>guardianId= {JSON.stringify(enrollment?.guardianId, null, 2 )}</pre></p>
                              <p><pre>studentId = {JSON.stringify(enrollment?.studentId, null, 2 )}</pre></p>
                              <p><pre>enrollmentStartDate = {JSON.stringify(enrollment?.enrollmentStartDate, null, 2 )}</pre></p>
                              <p><pre>enrollmentSessionTypeId = {JSON.stringify(enrollment?.enrollmentSessionTypeId, null, 2 )}</pre></p>
                              <p><pre>enrollmentScheduleId = {JSON.stringify(enrollment?.enrollmentScheduleId, null, 2 )}</pre></p>
                              <p><pre>enrollmentCourseId = {JSON.stringify(enrollment?.enrollmentCourseId, null, 2 )}</pre></p>
                              

  
                              <p><pre>enrollmentLocationName = {JSON.stringify(enrollment?.enrollmentLocationName, null, 2 )}</pre></p>
                              <p><pre>enrollmentPackName = {JSON.stringify(enrollment?.enrollmentPackName, null, 2 )}</pre></p>
                              <p><pre>enrollmentScheduleName = {JSON.stringify(enrollment?.enrollmentScheduleName, null, 2 )}</pre></p>
                              <p><pre>enrollmentCourseName = {JSON.stringify(enrollment?.enrollmentCourseName, null, 2 )}</pre></p>
                               */}
                              
                              
                              </div>

                            </div>
                          </div>
                            
                            
                          </>
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
          <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
            <div className="col-span-12 xl:col-span-8 box">
              {/* FORM */}
              <div className="flex flex-col justify-between box  p-10 space-y-4 ">
                <div className="flex flex-col justify-start ">
                  <FormStep01
                    onChangeSetStore={onChangeSetStore}
                    onSetNewStudent={onSetNewStudent}
                  />
                </div>
              </div>
            </div>

            {guardianId && (
              <div className="relative col-span-12 row-start-1 xl:col-start-9 xl:col-span-4">
                <div className="flex flex-col sticky top-[6.2rem] gap-y-7">
                  <div className="flex flex-col p-5 bg-[#F7F7F7] border-success rounded-xl min-h-96">
                    <div className="px-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center w-full">
                          <h3 className="text-xl text-slate-500 font-medium">
                            Carros de compra
                          </h3>
                          <a
                            href=""
                            className="text-primary"
                            onClick={async (e) => {
                              e.preventDefault();
                              await dispatch(
                                getShoppingCart({
                                  userId: guardianId || "",
                                  status: "PENDING",
                                })
                              );
                            }}
                          >
                            <Lucide icon="RefreshCcw" className="w-6 h-6" />
                          </a>
                        </div>

                        <span className="text-sm font-light text-slate-400 mt-2">
                          Pendiente de pago
                        </span>
                      </div>
                    </div>
                    <div className=" relative overflow-auto h-80 ">
                    <div className="overflow-x-auto flex p-2">
                      <ResumenTransactions userId={guardianId} />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col box  p-10  mt-4">
            <div className="flex flex-row justify-between">
              {!guardianId && (
                <h2 className="font-thin text-xl">🥹 Sin Estudiantes</h2>
              )}
              {guardianId && (
                <>
                  <h2 className="font-thin text-xl">Estudiantes asociados</h2>
                  <Button
                    rounded
                    variant="soft-primary"
                    className="border border-slate-200 px-1 py-1 flex justify-center items-center -mr-8"
                    onClick={() => {
                      setStudentSlide(true);

                      dispatch(
                        setDataStudent({
                          id: "",
                          name: "",
                          lastName: "",
                          birthday: "",
                          gender: "",
                          residence: "",
                          email: guardianEmail,
                          phone: guardianPhone,
                        })
                      );
                    }}
                  >
                    <Lucide icon="Plus" className="w-8 h-9 ml-2 mr-2" />
                    <span className="text-sm">Nuevo Alumno</span>
                  </Button>
                </>
              )}
            </div>

            <div className="">
              {status === "loading" && (
                <div className="flex justify-center items-center w-full h-48">
                  <LoadingIcon
                    color="#AE5EAB"
                    icon="oval"
                    className="w-10 h-10 mt-10"
                  />
                </div>
              )}

              {/* <pre>enrollment = {JSON.stringify(enrollment?.relationships?.items[0].student?.enrollments?.items, null, 2 )}</pre> */}
              <div className="mt-4 py-10 -mb-30 -ml-8 -mr-8 relative overflow-auto">
                <div className="overflow-x-auto flex">
                  {status === "idle" && enrollment?.relationships && (
                    <RelationList
                      students={enrollment?.relationships}
                      setDataStudent={setStudent}
                    />
                  )}
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(users?.relationships?.items, null, 2)}</pre> */}
    </>
  );
}

export default Main;
