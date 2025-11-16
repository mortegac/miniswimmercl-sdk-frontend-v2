import { useState, useEffect, useCallback,Fragment } from "react";
import debounce from 'lodash/debounce';
import { Link } from "react-router-dom";
import clsx from "clsx";
import _, { now } from "lodash";

import { Tab } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import { Slideover } from "@/components/Base/Headless";
import ListParams from "@/components/ListParams";
import Lucide from "@/components/Base/Lucide";
import {CalculateAge} from "@/components/CalculateAge";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getSessionDetails, selectSessionDetails, setSessionDetails, getSessionByLocationAndDate } from "@/stores/SessionDetails/slice";
import { InputOptions } from "@/stores/SessionDetails/types";
import {FormInput, FormSelect } from "@/components/Base/Form";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getLocationsOnly, selectLocation } from '../../../stores/Locations/slice';

import {typeOfGender} from "@/pages/private/Students/components/Card";
import StudentList from "./studentList";

function formatDateToISOShort(date:Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

  return `${day}-${month}-${year}`;
}

interface Props {
  gender: string;  
}

const IcoGender: React.FC<Props> = ({gender}) => {
  const IcoSvg = typeOfGender[String(gender)] || typeOfGender[""]
  return<IcoSvg/>
}


function Resume(props:any) {
  const {data, total} = props;
  
  return <div id="boxResume" className="flex flex-col">
        <div className="flex flex-row justify-between items-center gap-2">
          <div id="boxStudents" className="p-2 box min-h-24 max-h-6 bg-green-200 flex flex-col justify-center items-center min-w-24   w-full sm:w-1/3 ">
            <p className="truncate  text-lg text-slate-700">
              <b className="text-4xl mr-2">{total}</b>{" "}
            </p>
            <p className="truncate  text-sm text-slate-700">Alumnos</p>
          </div>
          
          <div id="boxAttennd" className="p-2 box min-h-24 max-h-6 bg-white flex flex-col justify-center items-center min-w-24   w-full sm:w-1/3 ">
            <p className="truncate  text-lg text-primary">
            <b className="text-4xl mr-2">{data?.USED || 0}</b>
            </p>
            <p className="truncate  text-sm text-slate-700">Asistentes</p>
          </div>
          
          <div id="boxLess" className="p-2 box min-h-24 max-h-6 bg-slate-700 flex flex-col justify-center items-center min-w-24   w-full sm:w-1/3 ">
            <p className="truncate  text-lg text-white">
            <b className="text-4xl mr-2">
            {(Number(total) || 0) - (Number(data?.USED) || 0)}</b>
            </p>
            <p className="truncate  text-sm text-white">Faltantes</p>
          </div>
          
        </div>    
      </div>
}

function Main() {
  let currentScheduleId:string | null = null;
  const selectedDate = new Date();
  const day2 = String(selectedDate.getDate()).padStart(2, '0');
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const fullYear = String(selectedDate.getFullYear());
          
  
  const [date, setDate] = useState({
    dateChile: String(selectedDate),
    dateShow: String(`${day2}-${month}-${fullYear}`),
    dateUtc: String(`${fullYear}-${month}-${day2}T00:00:00.000Z`),
    locationId: "",
  });

  const [atendanceId, setAtendanceId] = useState("");
  const [locationIdSelected, setLocationIdSelected] = useState("");

  const [searchTerm, setSearchTerm] = useState('');
  const {sessionDetails, resume, status } = useAppSelector(selectSessionDetails);
  const [filteredStudents, setFilteredStudents] = useState(sessionDetails);
  const {locationsList } = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();  
  
  const sortStudents = (a: any, b: any) => {
    // const aSessionsCount = a.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    // const bSessionsCount = b.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    
    // if (aSessionsCount > 0 && bSessionsCount === 0) return -1;
    // if (aSessionsCount === 0 && bSessionsCount > 0) return 1;
    return 1;
  };
  
  // Función para filtrar estudiantes
  const filterStudents = (term: string) => {
    const filtered = sessionDetails.filter((item:any) => {
    // console.log("--student--", item)
      return item?.student?.name.toLowerCase().includes(term.toLowerCase()) ||
      item?.student?.lastName.toLowerCase().includes(term.toLowerCase())
    }
      // student.middleName.toLowerCase().includes(term.toLowerCase())
    );
    
    // setFilteredStudents(filtered);
    setFilteredStudents( [...filtered].sort(sortStudents));
  };
  
   // Creamos una versión debounced de la función de filtrado
   const debouncedFilter = useCallback(
    debounce((term: string) => filterStudents(term), 300),
    [sessionDetails] // Dependencia del array de estudiantes
  );
  
    // Manejador para el cambio en el input
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      setSearchTerm(term);
      debouncedFilter(term);
    };
    
  async function updateDate(dateStr:any){
    
    const selectedDate = new Date(dateStr);
    
    console.log("---dateStr---", dateStr)
    
    const day2 = String(selectedDate.getDate()).padStart(2, '0');
    // const day = String(selectedDate.getDay() + 1).padStart(2, '0');
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const fullYear = String(selectedDate.getFullYear());

    setDate({
      ...date,
      dateChile: String(selectedDate), //newDateChile
      dateUtc: String(`${fullYear}-${month}-${day2}T00:00:00.000Z`),
      dateShow: String(`${day2}-${month}-${fullYear}`),
    });
    

    await dispatch(getSessionByLocationAndDate({
      sessionDate: String(`${fullYear}-${month}-${day2}`), 
      locationId: date?.locationId
    }))
    // await dispatch(getSessionDetails({
    //   sessionDate: String(`${fullYear}-${month}-${day2}T00:00:00.000Z`), 
    //   locationId: date?.locationId
    // }))
  }
  
  interface Params {
    dateSTR?:string;  
    idLocation?:string;  
  }
  
  function isValidDate(date: any): date is Date {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
   
  async function updateSession(params:InputOptions){
    setAtendanceId(params.sessionId || "")
    
    // 2025-09-25T00:00:00.000Z
    const dateFormated: string = String(date?.dateUtc).replace("T00:00:00.000Z", "");
    
    await Promise.all([
      await dispatch(setSessionDetails({ 
        sessionId: params.sessionId, 
        status: params.status,
        locationIdUsed:date?.locationId,
        date:params?.date
      })),
      await dispatch(getSessionByLocationAndDate({
        sessionDate: dateFormated, 
        locationId: date?.locationId
      })),
      setAtendanceId("")
      
    ]);
  }
  
  useEffect(() => { 
    const dateFormated: string = String(date?.dateUtc).replace("T00:00:00.000Z", "");
    
    (async () =>  await dispatch(getSessionByLocationAndDate({
      sessionDate: String(dateFormated), 
      locationId: date?.locationId
    }))
  )()
  }, [date]);
  
  useEffect(() => { 
    locationsList.length === 0 && dispatch(getLocationsOnly())
  }, [])
  
  useEffect(() => { setFilteredStudents( [...sessionDetails]); }, [sessionDetails]);
  
  return (
    <>
     
    {/* <pre>{JSON.stringify(sessionDetails, null, 2)}</pre> */}
    {date?.locationId==="" && 
      <>
        <div className="p-1.5 box flex flex-col ">
          <div className="flex flex-col items-center justify-center pt-20 pb-28">
            <Lucide
              icon="Hotel"
              className="w-20 h-20 text-theme-1/20 fill-theme-1/5 stroke-[0.5]"
            />
            <div className="mt-5 text-xl font-medium">
              Seleccione la sede para continuar
            </div>
          <div className=" flex flex-wrap justify-center items-center mt-8">
            { Array.isArray(locationsList) && locationsList.map((location:any, index:number)=>
              <>
              {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}
              { location?.value !== "" && 
                  <Button
                  key={`BUTTON-LOCATION${index}`}
                        onClick={() => 
                          setDate({...date, locationId:location?.value})
                        }
                        
                        className={` mx-1 my-1 rounded-full p-0 w-80 h-16 mr-6 mb-6
                          bg-slate-200 border-slate-300 text-slate-700
                        `}
                      >
                        <div className={`text-center px-2`}>
                          {location?.value}
                        </div>
                  </Button>
              }
              
              </>
            )}
                          </div>
        </div>
      </div>
      </>
    }
    {date?.locationId!=="" && 
      <>
        <div className=" text-base font-medium group-[.mode--light]:text-white mb-4 uppercase">
          Listado de asistencia: <b className="text-lg hidden md:contents ">{date?.dateShow}</b> 
        </div>
        <div id="boxResume" className="flex flex-col justify-start md:flex-row flex-start gap-2">
          <div className="flex flex-col  justify-start items-center relative ">
            <Lucide
              icon="Search"
              className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
            />
            <FormInput
                formInputSize="lg"
                placeholder="Buscar alumnos..."
                aria-label="name" 
                aria-describedby="input-group-name"
                type="text"
                tabIndex={1} 
                // className="bg-white/[0.12] text-white w-[350px] flex items-center py-2 px-3.5 border-transparent  cursor-pointer hover:bg-white/[0.15] transition-colors duration-300 hover:duration-100 focus:z-10"
                className="pl-9 w-full rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                name="guardianEmail"
                value={searchTerm}
                onChange={handleSearchChange}
              />
          </div>
          <div className="flex flex-col justify-start items-start">
            <ListParams
              key={"LIST_LOCATIONS"}
              list={locationsList}
              text={""}
              value={date?.locationId || ""}
              isLoading={false}
              fn={(e)=>setDate({...date, locationId:e.target.value})}
              handleCreate={(e)=>console.log(e.target.value)}
              name={"location"}
            />
          </div>
          <div className="flex flex-row justify-start items-center flex-start ">
            <div className=" w-16">
              <div className="relative">
                <Lucide
                  icon="Calendar"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
                />
                
                <Litepicker value={date?.dateChile} 
                  onChange={(e)=> {
                    updateDate(e.target.value);    
                    }}
                    options={{
                      autoApply: true,
                      singleMode: true, // Cambia a false si necesitas selección de rango
                      showWeekNumbers: true,
                      // format: 'DD-MM-YYYY',
                      // format: 'YYYY-MM-DD',
                      
                      dropdowns: {
                        minYear: 2024,
                        maxYear: null,
                        months: true,
                        years: false,
                      },
                    }}
                    className="pl-12 rounded-lg text-xl"
                />
              </div>
            </div>
            <b className="text-lg text-white ml-4 block md:hidden">{date?.dateShow}</b> 
            
          </div>
      </div>
        
        {/* <div className="grid grid-cols-12">
          <div className="col-span-12">           */}
            <div>
            <div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              { resume && <Resume data={resume} total={sessionDetails?.length}/>}
              
            </div>
            
            <div className="mt-2 overflow-auto lg:overflow-visible">
            
          
             
              
              
              
            {
                Array.isArray(sessionDetails) &&
                (sessionDetails.length === 0 ? (
                  <div className="flex justify-center items-center">
                    <span className="text-lg text-slate-400">😴</span>{" "}
                    <span className="text-lg">Sin sesiones encontradas</span>
                  </div>
                ) : (
               <>
                  
                  <Tab.Group
        className="mt-10"
        // selectedIndex={selectedIndex}
        // onChange={setSelectedIndex}
      >
        <div className="flex flex-col 2xl:items-center 2xl:flex-row gap-y-3">
          <Tab.List
            variant="boxed-tabs"
            className="flex-col sm:flex-row w-full xl:w-[580px] mr-auto bg-white box rounded-[0.6rem] border-slate-200"
          >
            <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
              <Tab.Button
                className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                as="button"
              >
                Listado Alumnos
              </Tab.Button>
            </Tab>
            <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
              <Tab.Button
                className="w-full xl:w-52 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                as="button"
              >
                Asistencia Registrada
              </Tab.Button>
            </Tab>
            
          </Tab.List>
        
        </div>
        <Tab.Panels>
          {/* LISTADO DE ALUMNOS */}
          <Tab.Panel>
            
          { Array.isArray(filteredStudents) &&
          [...filteredStudents]
            .filter((item: any) => item?.status !== "USED")
            .sort((a:any, b:any) => {
              if (a.scheduleId === "SIN-SCHEDULE" && b.scheduleId !== "SIN-SCHEDULE") return 1;
              if (a.scheduleId !== "SIN-SCHEDULE" && b.scheduleId === "SIN-SCHEDULE") return -1;

              if (a.status === "USED" && b.status !== "USED") return 1;
              if (a.status !== "USED" && b.status === "USED") return -1;
              
                // Convert start hours to Date objects for comparison
              const timeA = a.schedule?.startHour ? new Date(`1970/01/01 ${a.schedule.startHour}`) : new Date(0);
              const timeB = b.schedule?.startHour ? new Date(`1970/01/01 ${b.schedule.startHour}`) : new Date(0);
              const timeComparison = timeA.getTime() - timeB.getTime();
              if (timeComparison !== 0) return timeComparison;
              
              // Then compare scheduleId
              const scheduleIdComparison = a.scheduleId.localeCompare(b.scheduleId);
              if (scheduleIdComparison !== 0) return scheduleIdComparison;
              
              return a.student?.name.localeCompare(b.student?.name);  
            })
            .map((item: any, i: number) => {
              const showLocationId = item.scheduleId !== currentScheduleId;
              if (showLocationId) {
                currentScheduleId = item.scheduleId;
              }
              const filteredArray = item?.student?.enrollments?.items?.filter((enrollment:any) => enrollment.id === item?.enrollmentSessionDetailsId);

                      return(  
                        <div key={`${i}-SCHEDULES`} className={`${item?.status === "USED" && "bg-slate-300/20 px-4 py-4  mt-24"} max-w-[580px]`}>
                        { showLocationId &&
                          item?.courseId !== "SIN-CURSO" &&
                          <>
                            {item?.status === "USED" && <h3 className="text-3xl font-thin leading-none">Sesiones Utilizadas</h3>}
                            <div className={`flex flex-row justify-between items-center px-4 py-2 mb-2 mt-10 w-full min-w-[200px] overflow-x-auto md:overflow-visible 
                              ${item?.status !== "USED" && "bg-slate-700 text-white"}
                             
                            rounded-full`}>
                              <p className="text-sm md:text-xl font-medium leading-none uppercase whitespace-nowrap">
                              {`${item?.schedule?.day}-${item?.schedule?.startHour}`}
                              </p>
                              <p className="text-sm md:text-lg font-semibold leading-none uppercase whitespace-nowrap" >{item?.course?.description}</p>
                            </div>
                          </>
                        }
                        { showLocationId &&
                          item?.courseId === "SIN-CURSO" &&
                          <div className="w-full mt-12 max-w-[580px]">
                            <h2 className="mt-3 text-xl font-medium leading-none text-slate-600 my-2 uppercase">
                            Sesión sin horarios asignado
                            </h2>
                          </div>
                        }
                      
                        <div id="newCard" className={`
                        ${!filteredArray[0]?.wasPaid && "bg-red-300" } 
                        ${item?.totalSessions ===1 && "bg-green-200"}
                         ${item?.status === "USED" && "bg-slate-300"}
                         
                        flex flex-col box  w-full max-w-[580px] mb-4 relative min-h-[220px]`}>
                        {!filteredArray[0]?.wasPaid && 
                          <span className="absolute bottom-0 left-0 w-full z-20 py-2 px-2 text-sm  text-center text-white bg-red-500 rounded-b-xl">PENDIENTE DE PAGO</span>                       
                        }
                          <div id="btnAttendance" className="absolute top-0 right-0 w-24 md:w-36 bg-primary border-primary bg-opacity-20 border-opacity-5 text-primary rounded-r-lg h-full flex items-center justify-center z-10">
                            
                            <Button  
                                    className={`px-4 py-3 w-full h-full bg-primary/70 ${item?.status === "USED" && "bg-slate-300"} text-slate-700`} 
                                    
                                    onClick={() => updateSession({
                                      sessionId: item.id,
                                      status: "USED",
                                      date: item?.date,
                                      locationIdUsed:date?.locationId,
                                    })}
                                    disabled={item?.status === "USED"}
                                    >{item?.status !== "USED" && "MARCAR PRESENTE"}
                            </Button>
                        </div>
            
             
                        <p id="name" className="px-4 py-5 font-medium text-lg truncate md:text-xl pr-24 md:pr-36"> {item?.student?.name || ""}{" "}{item?.student?.lastName || ""}
                          <span className="block text-left w-full"><CalculateAge birthdate={String(item?.student?.birthdate)} /></span>                          
                        </p>
                        
                        <div className={`flex flex-row pr-24 md:pr-36 px-4 ${!filteredArray[0]?.wasPaid && "bg-red-300" }`}>
                        
                          <div id="A" className="flex flex-col justify-start items-start sm:w-[120px] ">
                          <Link
                            to="/admin-student"
                            state={{ id: item?.student?.id }}
                            
                          >
                            <div className="hidden md:block">
                              <IcoGender gender={item?.student?.gender || ""}/>
                            </div>
                            
                            {/* <p className="text-left mb-2 w-full"><CalculateAge birthdate={String(item?.student?.birthdate)} /></p> */}
                            
                            <div className="text-lg  justify-start items-start flex-col  flex md:hidden">
                            {item?.totalSessions ===1 && 
                              <span className="bg-green-600 text-white py-1 px-2 rounded-full text-sm mb-2">CLASE DE PRUEBA</span>}
                          
                              <p className="bg-slate-300 text-slate-600 py-1 px-2 rounded-full text-sm mb-2">
                                {item?.status === "RECOVERED" && "SESION RECUPERADA"}
                                {item?.status === "ACTIVE" && "SESION VIGENTE"}
                                {item?.status === "USED" && "SESION UTILIZADA"}
                                {item?.status === "DELETED" && "ELIMINADA"}
                              </p>
                                
                                
                                <p className="text-xs font-thin  hidden md:block" >{ formatDateToISOShort(new Date(item?.date))}</p>
                                { item?.locationId && item?.locationId !=="" && <>
                              </>
                            }
                              </div>  
                          </Link>
                          </div>
                          
                          <div id="B" className=" pl-4 sm:pl-0  w-[50%] hidden md:flex">
                            <div className="text-lg flex justify-start items-start flex-col">
                            {item?.totalSessions ===1 && 
                              <span className="bg-green-600 text-white py-1 px-2 rounded-full text-sm mb-2">CLASE DE PRUEBA</span>}
                          
                              <p className=" bg-slate-300 text-slate-600 py-1 px-2 rounded-full text-sm mb-2">
                                {item?.status === "RECOVERED" && "SESION RECUPERADA"}
                                {item?.status === "ACTIVE" && "SESION VIGENTE"}
                                {item?.status === "USED" && "SESION UTILIZADA"}
                                {item?.status === "DELETED" && "ELIMINADA"}
                              </p>
                                
                                
                                <p className="text-xs font-thin  hidden md:block" >{ formatDateToISOShort(new Date(item?.date))}</p>
                                { item?.locationId && item?.locationId !=="" && <>
                              </>
                            }
                              </div>  
                          </div>
                          
                          
                        </div>
                        
                      </div>
                        </div>
                )})}
          </Tab.Panel>
          
          {/* Asistencia Registrada */}
          <Tab.Panel>
            <p className="pt-6 pb-2 text-xl text-slate-900">Alumnos con asistencia registrada</p>
          { Array.isArray(filteredStudents) &&
          [...filteredStudents]
            .filter((item: any) => item?.status === "USED")
            .sort((a:any, b:any) => {
              if (a.scheduleId === "SIN-SCHEDULE" && b.scheduleId !== "SIN-SCHEDULE") return 1;
              if (a.scheduleId !== "SIN-SCHEDULE" && b.scheduleId === "SIN-SCHEDULE") return -1;

              if (a.status === "USED" && b.status !== "USED") return 1;
              if (a.status !== "USED" && b.status === "USED") return -1;
              
                // Convert start hours to Date objects for comparison
              // const timeA = a.schedule?.startHour ? new Date(`1970/01/01 ${a.schedule.startHour}`) : new Date(0);
              // const timeB = b.schedule?.startHour ? new Date(`1970/01/01 ${b.schedule.startHour}`) : new Date(0);
              // const timeComparison = timeA.getTime() - timeB.getTime();
              // if (timeComparison !== 0) return timeComparison;
              
              // Then compare scheduleId
              // const scheduleIdComparison = a.scheduleId.localeCompare(b.scheduleId);
              // if (scheduleIdComparison !== 0) return scheduleIdComparison;
              
              return a.student?.name.localeCompare(b.student?.name);  
            })
            .map((item: any, i: number) => {
              const showLocationId = item.scheduleId !== currentScheduleId;
              if (showLocationId) {
                currentScheduleId = item.scheduleId;
              }
              const filteredArray = item?.student?.enrollments?.items?.filter((enrollment:any) => enrollment.id === item?.enrollmentSessionDetailsId);

                      return(  
                        <div key={`${i}-SCHEDULES`} className={`${item?.status === "USED" && "bg-slate-300/20 px-0 py-2"} max-w-[580px]`}>
                      
                      
                        <div
                          id="newCardAttendece"
                          className={`
                          ${!filteredArray[0]?.wasPaid && "bg-red-300"} 
                          ${item?.totalSessions === 1 && "bg-green-200"}
                          ${item?.status === "USED" && "bg-slate-200"}
                          flex flex-row box w-full max-w-[580px] min-h-[130px] relative pl-10 pr-2`}
                        >
                          {/* Número correlativo absoluto a la izquierda */}
                          <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-9 bg-slate-500 text-white text-sm font-semibold rounded-l-xl">
                            {i + 1}
                          </div>

                          {!filteredArray[0]?.wasPaid && 
                            <span className="absolute bottom-0 left-0 w-full z-20 py-2 px-2 text-sm  text-center text-white bg-red-500 rounded-b-xl">PENDIENTE DE PAGO</span>                       
                          }
            
             
                          <p id="name" className="px-4 py-5 font-medium text-lg w-[60%] "> {item?.student?.name || ""}{" "}{item?.student?.lastName || ""}
                            <span className="block text-left "><CalculateAge birthdate={String(item?.student?.birthdate)} /></span>    
                            {item?.totalSessions ===1 && 
                              <span className="bg-green-600 text-white py-1 px-2 rounded-full text-sm mb-2">CLASE DE PRUEBA</span>}                      
                          </p>
                          
                          <div id="name" className="px-2 py-2 font-medium text-sm  border-l-2 w-[35%] ">
                            <span className="block  w-full uppercase  text-right py-4">
                                {`${item?.schedule?.day}-${item?.schedule?.startHour}`}
                            </span>                          
                            <span className="block  text-right w-full uppercase font-thin">
                            {item?.course?.description} 
                                </span>     
                          </div>
                      
                        
                        </div>
                        </div>
                )})}
          </Tab.Panel>
          
          
        </Tab.Panels>
      </Tab.Group>
                  
                  
                
                
                
                </>
                ))
      
            }
          
              
            </div>
          
          </div>
          
            
          {/* </div> */}
        </div>
      </>
    }
    </>
  );
}

export default Main;
