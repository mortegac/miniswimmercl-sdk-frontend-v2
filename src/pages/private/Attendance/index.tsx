import { useState, useEffect, useCallback } from "react";
import debounce from 'lodash/debounce';
import { Link } from "react-router-dom";
import clsx from "clsx";
import _, { now } from "lodash";

import Table from "@/components/Base/Table";
import { Slideover } from "@/components/Base/Headless";
import ListParams from "@/components/ListParams";
import Lucide from "@/components/Base/Lucide";
import {CalculateAge} from "@/components/CalculateAge";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getSessionDetails, selectSessionDetails, setSessionDetails } from "@/stores/SessionDetails/slice";
import { InputOptions } from "@/stores/SessionDetails/types";
import {FormInput, FormSelect } from "@/components/Base/Form";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getLocationsOnly, selectLocation } from '../../../stores/Locations/slice';

import {typeOfGender} from "@/pages/private/Students/components/Card";
import StudentList from "./studentList";

// function transformDate(dateString:string) {
//   try {
//     const parsedDate = parse(dateString, 'd MMM, yyyy', new Date());
//     return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    
//   } catch (error) {
//     return new Date(dateString)
//   }
// }

// function formatDateToISO(date:Date) {
//   const year = date.getUTCFullYear();
//   const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//   const day = String(date.getUTCDate()).padStart(2, '0');
//   const hours = String(date.getUTCHours()).padStart(2, '0');
//   const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//   const seconds = String(date.getUTCSeconds()).padStart(2, '0');
//   const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

//   return `${year}-${month}-${day}T00:00:00.000Z`;
// }
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
  
  return(
    <>
    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y mb-4">
          <div
            className={clsx([
              "relative zoom-in",
              "before:content-[''] before:w-[90%] ",
            ])}
          >
              <div className="p-5 box min-h-24 max-h-6 bg-green-200">
                <p className="truncate  text-lg text-slate-700">
                      <b className="text-4xl mr-2">{total}</b>{" "} Total de Alumnos
                      </p>
              </div>
          </div>
      </div>
      <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y mb-4">
          <div
            className={clsx([
              "relative zoom-in",
              "before:content-[''] before:w-[90%] ",
            ])}
          >
              <div className="p-5 box min-h-24 max-h-6 ">
                <p className="truncate  text-lg text-primary">
                      <b className="text-4xl mr-2">{data?.USED}</b>{" "} Asistentes
                      </p>
              </div>
          </div>
      </div>
      <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y mb-4">
          <div
            className={clsx([
              "relative zoom-in",
              "before:content-[''] before:w-[90%] ",
            ])}
          >
              <div className="p-5 box min-h-24 max-h-6 bg-slate-700">
                <p className="truncate  text-lg text-white">
                      <b className="text-4xl mr-2">{Number(total) - Number(data?.USED)}</b>{" "} Faltantes
                      </p>
              </div>
          </div>
      </div>
    
    </>
  )
  
}

function Main() {
  
  const [switcherSlideSessions, setSwitcherSlideSessions] = useState(false);
  const [switcherSlideStudent, setSwitcherSlideStudent] = useState(false);
   
  // const nowDate:Date = new Date();
  // const nowDate22 = FormatDate({
  //   date: nowDate.toISOString(),
  //   options: { month: "short", day: "numeric", year: "numeric"},
  // });
  
  // const utcDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
  // const utcDateString = utcDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  // console.log('Fecha en UTC:', utcDate.toISOString());
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

  const [dataStudent, setDataStudent] = useState({
    id:"",
    name:"",
    lastName:"",
    gender:"",
    birthdate:"",
  });
  const [searchTerm, setSearchTerm] = useState('');
  const {sessionDetails, resume, status } = useAppSelector(selectSessionDetails);
  const [filteredStudents, setFilteredStudents] = useState(sessionDetails);
  const {locationsList } = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  // dispatch(setBreadcrumb({first:"Asistencia", firstURL:"attendance"}));
  
  
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
    

    await dispatch(getSessionDetails({
      sessionDate: String(`${fullYear}-${month}-${day2}T00:00:00.000Z`), 
      locationId: date?.locationId
    }))
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
    
    await Promise.all([
      await dispatch(setSessionDetails({ 
        sessionId: params.sessionId, 
        status: params.status,
        locationIdUsed:date?.locationId
      })),
      await dispatch(getSessionDetails({
        sessionDate: String(date?.dateUtc), 
        locationId: date?.locationId
      })),
      setAtendanceId("")
      
    ]);
  }
  
  useEffect(() => { 
    (async () =>  await dispatch(getSessionDetails({
      sessionDate: String(date?.dateUtc), 
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
      <Slideover
        size="xl"
        key="Slide-Students"
        open={switcherSlideStudent}
        onClose={() => {
          setSwitcherSlideStudent(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setSwitcherSlideStudent(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Busque al alumno para ver sus sesiones</div>
              
                <div className="flex flex-col items-startgap-y-2">
              <div>
                
                <StudentList/>
              </div>  
              </div>  
                {/* <div className="flex items-center mt-8">

                  
                </div> */}
                {/* <pre>{JSON.stringify(dataStudent, null, 2 )}</pre> */}
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      
      
      <Slideover
        size="lg"
        key="Slide-Historial"
        open={switcherSlideSessions}
        onClose={() => {
          setSwitcherSlideSessions(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setSwitcherSlideSessions(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Detalle de sesiones</div>
                
                <div className="flex items-center mt-8">
                  <IcoGender gender={dataStudent?.gender || ""}/>
                  <div className="ml-3.5">
                    <a href="" className="font-medium whitespace-nowrap text-xl">
                      {dataStudent?.name || ""}{" "}{dataStudent?.lastName || ""}
                    </a>

                    <div className="mt-1 text-xs text-slate-500 whitespace-nowrap">
                    {/* {item?.student?.birthdate || ""} */}
                    <CalculateAge birthdate={String(dataStudent?.birthdate)} />
                    </div>
                  </div>
                </div>
                {/* <pre>{JSON.stringify(dataStudent, null, 2 )}</pre> */}
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
    {/* <pre>{JSON.stringify(date, null, 2)}</pre> */}
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
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
              
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-6">
            
            <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            </div>
          </div>
          
          <div className="flex flex-col justify-between md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className=" text-base font-medium group-[.mode--light]:text-white">
              Listado de asistencia: <b className="text-lg">{date?.dateShow}</b> 
            </div>
            
            {/* <Button variant="primary" rounded 
            className="px-4 py-3 border border-white" 
            onClick={() => setSwitcherSlideStudent(true)}
            >
              <Lucide
                icon="Search"
                className="w-4 h-4 stroke-[1] mr-4"
              />Buscar Alumno
            </Button> */}
          
          
           
          </div>
          
          <div className="flex flex-row justify-between items-center w-full mt-4">
            <div className="flex flex-row justify-start items-center w-full ">
              <div className="mr-4 w-96"><div className="relative">
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
                  </div></div>
              <div className="mr-4 w-80">
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
              
            </div>
            <div className="mr-4">
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
          </div>
          <div className="grid grid-cols-12 gap-6 mt-5">
            { resume && <Resume data={resume} total={sessionDetails?.length}/>}
            
          </div>
          
          <div className="mt-2 overflow-auto lg:overflow-visible">
 
          {/* { status === "loading" &&   <div className="flex justify-center items-center w-full h-10"><LoadingIcon
                    color="white"
                    icon="oval"
                    className="w-10 h-10 mt-10"
                  /></div>} */}
          {/* { status === "idle" && */}
           {
              Array.isArray(sessionDetails) &&
              (sessionDetails.length === 0 ? (
                <div className="flex justify-center items-center w-ful">
                  <span className="text-lg mr-4 text-slate-400">😴</span>{" "}
                  <span className="text-lg">Sin sesiones encontradas</span>
                </div>
              ) : (
                <Table className="border-spacing-y-[10px] border-separate">
              <Table.Tbody>
                
                { Array.isArray(filteredStudents) &&
        [...filteredStudents]
          .sort((a:any, b:any) => {
            
            // const nameComparison = a.student?.name.localeCompare(b.student?.name);
            // if (nameComparison === 0) { // Si los nombres son iguales, ordenamos por apellido
            //   return a.student?.lastName.localeCompare(b.student?.lastName);
            // }
            // return nameComparison;
            if (a.status === "USED" && b.status !== "USED") return 1;
            if (a.status !== "USED" && b.status === "USED") return -1;
            
            // Si tienen el mismo status, ordenamos por nombre
            const nameComparison = a.student?.name.localeCompare(b.student?.name);
            
            // Si los nombres son iguales, ordenamos por apellido
            if (nameComparison === 0) {
              return a.student?.lastName.localeCompare(b.student?.lastName);
            }
            
            return nameComparison;
            
          })
          .map((item: any, i: number) => {
                 
                    return(     
                    <Table.Tr key={item.id} 
                    className={`box
                      ${atendanceId === item?.id && "bg-yellow-100"}
                      ${atendanceId !== item?.id && item?.status === "USED" && "bg-green-100"}
                      `}>
                      
                      
                      
                      <Table.Td className={``}>
                        <div className="flex items-center">
                          <IcoGender gender={item?.student?.gender || ""}/>
                          <div className="ml-3.5">
                            <p className="font-medium whitespace-nowrap text-xl">
                              {item?.student?.name || ""}{" "}{item?.student?.lastName || ""}
                            </p>
                            <div className="mt-1 text-xs text-slate-500 whitespace-nowrap">
                              <CalculateAge birthdate={String(item?.student?.birthdate)} />
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td className={``}>
                        <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                          Tipo de sesión
                        </div>
                        <div className="ml-1.5 whitespace-nowrap text-lg">
                          {item?.status === "RECOVERED" && "SESION RECUPERADA"}
                          {item?.status === "ACTIVE" && "VIGENTE"}
                          {item?.status === "USED" && "UTILIZADA"}
                          {item?.status === "DELETED" && "ELIMINADA"}
                        </div>
                        {/* <small>{item?.status}</small> */}
                        <p className="text-xs font-thin" >Sesión: { formatDateToISOShort(new Date(item?.date))}</p>
                        
                      </Table.Td>
                      <Table.Td className={``}>
                      {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                      { item?.locationId && item?.locationId !=="" && <>
                          <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                            Sede
                          </div>  
                          <p className="text-xs font-thin" >{item?.locationId}</p>
                          
                          
                        </>
                      }
                       
                      </Table.Td>
                      <Table.Td className={``}>
                      {item.status==="ACTIVE" &&
                      <div className="flex flex-col justify-start items-start ">
                        {/* <div className="w-[100%] mb-2">
                          <ListParams
                          key={item.id}
                            list={locationsList}
                            text={""}
                            value={locationSelected || ""}
                            isLoading={false}
                            
                            fn={(e)=>setLocationSelected(e.target.value)}
                            handleCreate={(e)=>console.log(e.target.value)}
                            name={"location"}
                          />                          
                        </div> */}
                        {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                        <Button variant="soft-danger" rounded 
                        className="w-[85%] px-4 py-3" 
                        onClick={() => updateSession({
                          sessionId: item.id,
                          status: "USED",
                          locationIdUsed:date?.locationId,
                        })}
                        >MARCAR PRESENTE</Button>
                      </div>
                     }
                    {item.status==="RECOVERED" &&
                    <div className="flex flex-col justify-start items-start ">
                    <div className="w-[100%] mb-2">
                      <ListParams
                      key={item.id}
                        list={locationsList}
                        text={""}
                        value={locationIdSelected || ""}
                        isLoading={false}
                        
                        fn={(e)=>setLocationIdSelected(e.target.value)}
                        handleCreate={(e)=>console.log(e.target.value)}
                        name={"location"}
                      />                          
                    </div>
                    <Button variant="soft-danger" rounded 
                    className="w-[85%] px-4 py-3" 
                    onClick={() => updateSession({
                      sessionId: item.id,
                      status: "USED",
                      locationIdUsed:locationIdSelected,
                    })}
                    >MARCAR PRESENTE</Button>
                  </div>
                    }
                    {item?.locationIdUsed && item?.status === "USED" && <>
                            <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                            Utilizada en:
                            </div>  
                            <p className="text-xs font-thin" >{item?.locationIdUsed}</p>
                          </>
                    }
                      </Table.Td>
                    
                      {/* <Table.Td className={`relative py-4 ${item?.status === "USED" ? "bg-green-100": "bg-white"}`}>
                  <div className="flex items-center justify-center ">
                    <Menu className="h-5 ">
                      <Menu.Button className="w-5 h-5 text-slate-500">
                        <Lucide
                          icon="MoreVertical"
                        />
                      </Menu.Button>
                      <Menu.Items className="w-52">
                        <Menu.Item 
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                             setDataStudent({
                              id: item?.student?.id,
                              name:item?.student?.name,
                              lastName:item?.student?.lastName,
                              gender:item?.student?.gender,
                              birthdate:item?.student?.birthdate,
                            })
                            setSwitcherSlideSessions(true);
                          }}>
                            <Lucide
                              icon="Grid2x2"
                              className="w-4 h-4 mr-2"
                            />{" "}
                            Ver Sesiones
                          </Menu.Item>
                        <Menu.Item 
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            setDataStudent({
                              id: item?.student?.id,
                              name:item?.student?.name,
                              lastName:item?.student?.lastName,
                              gender:item?.student?.gender,
                              birthdate:item?.student?.birthdate,
                            })
                            setSwitcherSlideSessions(true);
                          }}>
                            <Lucide
                              icon="User"
                              className="w-4 h-4 mr-2"
                            />{" "}
                            Datos Alumno
                          </Menu.Item>
                      </Menu.Items>
                    </Menu> 
                  </div>
                </Table.Td>*/}
                    </Table.Tr>
              )})}
              </Table.Tbody>
            </Table>
              ))
    
          }
        
            
          </div>
        
        </div>
        
          
        {/* </div> */}
      </div>
    }
    </>
  );
}

export default Main;
