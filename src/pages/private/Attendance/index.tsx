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
  
  // Función para filtrar, ordenar y generar objetos únicos
  const getUniqueScheduleStrings = () => {
    if (!Array.isArray(sessionDetails)) return [];
    
    // Ordenar primero por schedule.day y luego por schedule.startHour
    const sorted = [...sessionDetails].sort((a: any, b: any) => {
      // Comparar por día
      const dayA = a?.schedule?.day || '';
      const dayB = b?.schedule?.day || '';
      const dayComparison = dayA.localeCompare(dayB);
      if (dayComparison !== 0) return dayComparison;
      
      // Si los días son iguales, comparar por hora
      const hourA = a?.schedule?.startHour || '';
      const hourB = b?.schedule?.startHour || '';
      return hourA.localeCompare(hourB);
    });
    
    // Crear un Map para agrupar por combinación única y contar estados
    const uniqueMap = new Map<string, { 
      dayClass: string; 
      descriptionClass: string;
      activeAndRecovered: number;
      used: number;
    }>();
    
    sorted.forEach((item: any) => {
      const day = item?.schedule?.day || '';
      const startHour = item?.schedule?.startHour || '';
      const description = item?.course?.description || '';
      const status = item?.status || '';
      
      // Crear clave única
      const uniqueKey = `${day}-${startHour}-${description}`;
      
      // Si no existe, crear el objeto inicial
      if (!uniqueMap.has(uniqueKey)) {
        uniqueMap.set(uniqueKey, {
          dayClass: `${day} ${startHour}`,
          descriptionClass: description,
          activeAndRecovered: 0,
          used: 0
        });
      }
      
      // Obtener el objeto y actualizar contadores
      const scheduleObject = uniqueMap.get(uniqueKey)!;
      
      // Contar según el status
      if (status === "ACTIVE" || status === "RECOVERED") {
        scheduleObject.activeAndRecovered += 1;
      } else if (status === "USED") {
        scheduleObject.used += 1;
      }
    });
    
    // Retornar array de objetos únicos con conteos
    return Array.from(uniqueMap.values());
  };
  
  const uniqueScheduleStrings = getUniqueScheduleStrings();  
  
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
    
    // Validar que dateStr no sea null, undefined o vacío
    if (!dateStr) {
      console.error("---dateStr es inválido---", dateStr);
      return;
    }
    
    // Mapeo de meses en español (abreviados y completos)
    const mesesEspanol: { [key: string]: number } = {
      'ene': 1, 'enero': 1,
      'feb': 2, 'febrero': 2,
      'mar': 3, 'marzo': 3,
      'abr': 4, 'abril': 4,
      'may': 5, 'mayo': 5,
      'jun': 6, 'junio': 6,
      'jul': 7, 'julio': 7,
      'ago': 8, 'agosto': 8,
      'sep': 9, 'septiembre': 9,
      'oct': 10, 'octubre': 10,
      'nov': 11, 'noviembre': 11,
      'dic': 12, 'diciembre': 12
    };
    
    // Intentar parsear la fecha de diferentes formas
    let selectedDate: Date;
    
    // Si dateStr ya es un objeto Date
    if (dateStr instanceof Date) {
      selectedDate = dateStr;
    } 
    // Si es un string, intentar parsearlo
    else if (typeof dateStr === 'string') {
      // Si viene en formato "1 dic, 2025" o similar (español)
      const formatoEspanol = /^(\d{1,2})\s+([a-záéíóúñ]+),?\s+(\d{4})$/i.exec(dateStr.trim());
      if (formatoEspanol) {
        const [, day, monthName, year] = formatoEspanol;
        const monthNum = mesesEspanol[monthName.toLowerCase()];
        if (monthNum) {
          selectedDate = new Date(Date.UTC(parseInt(year), monthNum - 1, parseInt(day), 0, 0, 0, 0));
        } else {
          selectedDate = new Date(dateStr);
        }
      }
      // Si viene en formato YYYY-MM-DD, parsearlo directamente
      else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        selectedDate = new Date(dateStr + 'T00:00:00.000Z');
      }
      // Si viene en formato DD-MM-YYYY, convertirlo
      else if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        const [day, month, year] = dateStr.split('-');
        selectedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      }
      // Intentar parseo estándar
      else {
        selectedDate = new Date(dateStr);
      }
    }
    // Si es un número (timestamp)
    else if (typeof dateStr === 'number') {
      selectedDate = new Date(dateStr);
    }
    // Fallback
    else {
      selectedDate = new Date(dateStr);
    }
    
    // Validar que la fecha sea válida
    if (isNaN(selectedDate.getTime())) {
      console.error("---Fecha inválida---", dateStr, selectedDate);
      return;
    }
    
    console.log("---dateStr---", dateStr, "---selectedDate---", selectedDate);
    
    const day2 = String(selectedDate.getUTCDate()).padStart(2, '0');
    const month = String(selectedDate.getUTCMonth() + 1).padStart(2, '0');
    const fullYear = String(selectedDate.getUTCFullYear());
    
    // Formatear fecha en formato requerido: YYYY-MM-DD
    const dateFormated = `${fullYear}-${month}-${day2}`;

    setDate({
      ...date,
      dateChile: selectedDate.toISOString(), //newDateChile
      dateUtc: String(`${dateFormated}T00:00:00.000Z`),
      dateShow: String(`${day2}-${month}-${fullYear}`),
    });
    

    await dispatch(getSessionByLocationAndDate({
      sessionDate: dateFormated, 
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
    console.log("--updateSession--", params)
    await Promise.all([
      await dispatch(setSessionDetails({ 
        ...params,
        // sessionId: params.sessionId, 
        // status: params.status,
        // locationIdUsed:date?.locationId,
        // date:params?.date
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
                
                <Litepicker 
                  value={date?.dateChile} 
                  onChange={(e: any) => {
                    // Litepicker puede devolver el valor directamente o como objeto
                    const dateValue = e?.target?.value || e?.value || e;
                    if (dateValue) {
                      updateDate(dateValue);
                    }
                  }}
                  options={{
                    autoApply: true,
                    singleMode: true,
                    showWeekNumbers: true,
                    format: 'YYYY-MM-DD',
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
       {/* Asistencia  */}
            <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
              <Tab.Button
                className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                as="button"
              >
                Listado Alumnos
              </Tab.Button>
            </Tab>
            
        {/* Orden de Clases      */}
            <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
              <Tab.Button
                className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                as="button"
              >
                Orden de Clases
              </Tab.Button>
            </Tab>
            
        {/* Asistencia registrada */}
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
                             bg-slate-700 text-white
                             ${item?.course?.description === "PERSONALIZADO" && "bg-purple-600/30 text-slate-700"}
                             rounded-full`}>
                              
                              {/* ${item?.status !== "USED" && "bg-slate-700 text-white"} */}
                              {/* bg-slate-700 text-white  */}
                              
                              { item?.course?.description !== "PERSONALIZADO" && <>
                              <p className="text-sm md:text-xl font-medium leading-none uppercase whitespace-nowrap">
                                  {`${item?.schedule?.day}-${item?.schedule?.startHour}`}
                              </p>
                              <p className="text-sm md:text-lg font-semibold leading-none uppercase whitespace-nowrap" >{item?.course?.description}</p>
                              
                              </>  
                                        }
                                        
                                         { item?.course?.description === "PERSONALIZADO" && <p
                                            className={""}
                                              >
                                              <span className="px-6 py-2 uppercase text-lg w-full  text-slate-700">
                                              {item?.course?.description}
                                              </span>
                                          </p>
                                        }
                                        
                              
                            
                              
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
                                      // sessionId: item.id,
                                      ...item,
                                      status: "USED",
                                      // date: item?.date,
                                      // locationIdUsed:date?.locationId,
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
            {/* <pre>{JSON.stringify(uniqueScheduleStrings, null, 2 )}</pre> */}
            
          <div className="col-span-12 xl:col-span-6">
                    <div className="flex flex-col gap-y-7">
                      <div className="flex flex-col p-5  ">
                        <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                          Clases de hoy
                        </div>
                        <div className="-my-3">
                          <div className="relative overflow-hidden before:content-[''] before:absolute before:w-px before:bg-slate-500/30 before:left-0 before:inset-y-0 before:dark:bg-darkmode-400 before:ml-[18px]">
                            { Array.isArray(uniqueScheduleStrings) && 
                            [...uniqueScheduleStrings]
                            .map((item:any, index:number)=>{
                                
                                return <>
                                {/* <pre>{JSON.stringify(item, null, 2 )}</pre> */}
                                <div
                                  className={clsx([
                                    "mb-8 last:mb-0 relative",
                                  ])}
                                  key={index}
                                >
                                    <div className="flex flex-col justify-start items-start">
                                        <div className="flex flex-row justify-start items-center w-full  ">
                                          <div className="h-5 w-5 bg-slate-700 ml-2 rounded-full"></div>
                                          
                                          { item?.descriptionClass !== "PERSONALIZADO" && <p
                                            className={clsx([
                                                  "bg-pink-200 min-w-96 group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                                  "bg-slate-400/30 text-slate-700 ",
                                                  "w-48",
                                              ])}
                                              >
                                              <span className="px-6 py-2 uppercase text-lg w-full">
                                              {item?.dayClass}
                                              </span>
                                          </p>
                                        }
                                        
                                         { item?.descriptionClass === "PERSONALIZADO" && <p
                                            className={clsx([
                                                  "min-w-96 group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                                  "bg-purple-600/30 text-slate-700 ",
                                                  "w-48",
                                              ])}
                                              >
                                              <span className="px-6 py-2 uppercase text-lg w-full">
                                              {item?.descriptionClass}
                                              </span>
                                          </p>
                                        }
                                          
                                        </div>
                                        { item?.descriptionClass !== "PERSONALIZADO" && <div className="px-4 py-2 ml-8 ">
                                          <p className="text-sm font-medium text-slate-600 uppercase ">
                                            {item?.descriptionClass}
                                          </p>
                                        </div>
                                        }
                                        
                                        <div className="px-4 py-2 ml-8 flex flex-row justify-center items-center ">
                                          <span className="text-sm font-medium text-slate-800 uppercase py-2 px-4 bg-red-300/35 mr-4 rounded-full">
                                            <i className=" font-thin">Faltantes:</i> <b className="text-lg ml-4">{item?.activeAndRecovered}</b>
                                          </span>
                                          <span className="text-sm font-medium text-slate-800  uppercase py-2 px-4 bg-slate-300  rounded-full">
                                            <i className=" font-thin">Asistentes:</i> <b className="text-lg ml-4">{item?.used}</b>
                                          </span>
                                        </div>
                                    </div>
                                    
{/*                                     
                                    <div
                                    className={clsx([
                                      "px-4 py-3 ml-8",
                                    ])}
                                  >
                                    <a
                                      href=""
                                      className="font-medium text-slate-500"
                                    >
                                     
                                     asas
                                    </a>
                                    
                                    <div className="mt-1.5 text-xs text-slate-500">
                                      <p>
                                        
                                        <span className="mr-4">{item?.glosa}</span>
                                        <span className="mr-4">{item?.card_number && "xxxxxx-"} {item?.card_number}</span>
                                        <span className="mr-4 font-thin"> {item?.usersPaymentTransactionsId}</span>
                                      </p>
                                    </div>
                                  </div>
                                   */}
                                  
                                  
                                  
                                </div>     
                                </>
                            })}
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
