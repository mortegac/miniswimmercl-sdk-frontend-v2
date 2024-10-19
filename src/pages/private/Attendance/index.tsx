import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { parse, format } from 'date-fns';
import _, { now } from "lodash";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Table from "@/components/Base/Table";
import { Slideover } from "@/components/Base/Headless";

import ListParams from "@/components/ListParams";
// import {FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Menu, Popover } from "@/components/Base/Headless"
import {CalculateAge} from "@/components/CalculateAge";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import {FormatDate} from "@/utils/dateHandler"

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getSessionDetails, selectSessionDetails, setSessionDetails } from "@/stores/SessionDetails/slice";
import { InputOptions } from "@/stores/SessionDetails/types";
import {FormInput, FormSelect } from "@/components/Base/Form";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getLocationsOnly, selectLocation } from '../../../stores/Locations/slice';

import {typeOfGender} from "@/pages/private/Students/components/Card";
import StudentList from "./studentList";

function transformDate(dateString:string) {
  try {
    const parsedDate = parse(dateString, 'd MMM, yyyy', new Date());
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    
  } catch (error) {
    return new Date(dateString)
  }
}

function formatDateToISO(date:Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day}T00:00:00.000Z`;
}
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
function Main() {
  
  const [switcherSlideSessions, setSwitcherSlideSessions] = useState(false);
  const [switcherSlideStudent, setSwitcherSlideStudent] = useState(false);
  
  
  // const [searchTerm, setSearchTerm] = useState('');
  //   // Manejador para el cambio en el input
  //   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     // const term = event.target.value;
  //     // setSearchTerm(term);
  //     // debouncedFilter(term);
  //   };
  
  const nowDate = new Date();
  const nowDate22 =  FormatDate({
    date: String(nowDate),
    options: { month: "short", day: "numeric", year: "numeric"},
  })
  // console.log("---newDate---", formatDateToISO(nowDate))
  const [date, setDate] = useState(nowDate22);
  const [locationSelected, setLocationSelected] = useState("");
  const [locationIdSelected, setLocationIdSelected] = useState("");
  const [dataStudent, setDataStudent] = useState({
    id:"",
    name:"",
    lastName:"",
    gender:"",
    birthdate:"",
  });
  const {sessionDetails, status } = useAppSelector(selectSessionDetails);
  const {locationsList } = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  dispatch(setBreadcrumb({first:"Asistencia", firstURL:"attendance"}));
  
  
  async function updateDate(dateStr:any){
    setDate(dateStr);
    const newDate = transformDate(dateStr)
    // console.log("---newDate---", newDate)
    await getSessions({
      dateSTR: String(newDate), 
      idLocation:locationIdSelected
    })
  }
  
  interface Params {
    dateSTR?:string;  
    idLocation?:string;  
  }
  
  function isValidDate(date: any): date is Date {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
  async function getSessions(param:Params){
    const {dateSTR, idLocation} = param;
    const dateAttendence = dateSTR && new Date(dateSTR);
    return await Promise.all([
      // await dispatch(getSessionDetails({ 
      //   // status: "ACTIVE",
      //   // sessionDate: formatDateToISO(dateAttendence),
      //   isValidDate(dateAttendence) ? dateAttendence : new Date(),
      //   ...(idLocation && { locationId: idLocation })
      // }))
      await dispatch(getSessionDetails({ 
        sessionDate: formatDateToISO(isValidDate(dateAttendence) ? dateAttendence : new Date()),
        ...(idLocation !== "" && { locationId: idLocation })
      }))
      
      // locationId:idLocation
    ])
    
    
    
  };
  
  async function updateSession(params:InputOptions){
    // const newDate = transformDate(date)
    
     /** TODO: 
      * Validar locationIdUsed:locationSelected que no se encunetre vacio  
      * */
    await Promise.all([
      await dispatch(setSessionDetails({ 
        sessionId: params.sessionId, 
        status: params.status,
        locationIdUsed:locationSelected })),
      await dispatch(getSessionDetails({
        sessionDate: formatDateToISO(new Date(date)),
        ...(locationIdSelected !== "" && { locationId: locationIdSelected })
      }))
      // await dispatch(getSessionDetails({ status: "ACTIVE"}))
    ]);
  }
  
  useEffect(() => { 
    (async () => await getSessions({dateSTR:formatDateToISO(nowDate), idLocation:locationIdSelected}))() 
    dispatch(getLocationsOnly())
  }, []);

  
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
    {/* <pre>{JSON.stringify(locationSelected, null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
              
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-6">
            
            <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            {/* <Link
              to="/students"
              // state={{ id: data.id }}
              className="px-8 py-3 border border-slate-200 rounded-full"
            ><span className="text-white">Sesiones alumno</span></Link>
            <Link
              to="/quick-registration"
              // state={{ id: data.id }}
              className="px-8 py-3 border border-slate-200 rounded-full bg-white/80"
            ><span className="text-primary">Nueva Inscripción</span></Link>
             */}
            
            
            
            </div>
          </div>
          
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className=" text-base font-medium group-[.mode--light]:text-white">
              Listado de asistencia: <b className="text-lg">{date}</b>
              <p  className="text-sm font-thin">Sede: {locationIdSelected && locationIdSelected} {!locationIdSelected && "Todas"}</p>
            </div>
           
              <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
              
                <div className="relative">
                  <Lucide
                    icon="Calendar"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
                  />
                  
                <Litepicker value={date} onChange={(e)=> {
                      // setDate(e.target.value);
                      updateDate(e.target.value)
                      }}
                      options={{
                        autoApply: true,
                        showWeekNumbers: false,
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }}
                      className="pl-12 rounded-full"
                      />
                      
                      
                      
                </div>
                <Button variant="primary" rounded 
              className="px-4 py-3 border border-white" 
              onClick={() => setSwitcherSlideStudent(true)}
              >
                <Lucide
                  icon="Search"
                  className="w-4 h-4 stroke-[1] mr-4"
                />Buscar Alumno
              </Button>
              </div>
              
           
            {/* </div> */}
          </div>
          <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
              {/* <div>
                <div className="relative">
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
                      className="pl-9 sm:w-64 rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                      name="guardianEmail"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                </div>
              </div> */}
              <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                <Popover className="inline-block">
                  {({ close }) => (
                    <>
                      <Popover.Button
                        as={Button}
                        variant="outline-secondary"
                        className="w-full sm:w-auto bg-white"
                      >
                        <Lucide
                          icon="ArrowDownWideNarrow"
                          className="stroke-[1.3] w-4 h-4 mr-2"
                        />
                        Filtros
                        {/* <div className="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full bg-slate-100">

                        </div> */}
                      </Popover.Button>
                      <Popover.Panel placement="bottom-end">
                        <div className="p-2">
                          <div>
                            <div className="text-left text-slate-500">
                              Sede
                            </div>
                            <FormSelect className="flex-1 mt-2 w-56" 
                              onChange={
                                (e)=>{
                                  setLocationIdSelected(e.target.value)
                                  getSessions({dateSTR: String(date), idLocation:e.target.value})
                                }
                                }>
                              <option key={""} value={""} selected={locationIdSelected==="" && true}>Todos</option>
                              <option key={"COLEGIO-JOHN-ANDREWS"} value={"COLEGIO-JOHN-ANDREWS"}  selected={locationIdSelected==="COLEGIO-JOHN-ANDREWS" && true}>COLEGIO-JOHN-ANDREWS</option>
                              <option key={"CLUB-PATO-CORNEJO"} value={"CLUB-PATO-CORNEJO"}  selected={locationIdSelected==="CLUB-PATO-CORNEJO" && true}>CLUB-PATO-CORNEJO</option>
                              <option key={"MI-CLUB-PREMIUM"} value={"MI-CLUB-PREMIUM"}  selected={locationIdSelected==="MI-CLUB-PREMIUM" && true}>MI-CLUB-PREMIUM</option>
                              <option key={"VITACURA-PISCINA-MUNICIPAL"} value={"VITACURA-PISCINA-MUNICIPAL"}  selected={locationIdSelected==="VITACURA-PISCINA-MUNICIPAL" && true}>VITACURA-PISCINA-MUNICIPAL</option>
                            </FormSelect>
                          </div>
                        </div>
                      </Popover.Panel>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          <div className="mt-2 overflow-auto lg:overflow-visible">
 
          { status === "loading" &&   <div className="flex justify-center items-center w-full h-10"><LoadingIcon
                    color="white"
                    icon="oval"
                    className="w-10 h-10 mt-10"
                  /></div>}
          {
            status === "idle" &&
              Array.isArray(sessionDetails) &&
              (sessionDetails.length === 0 ? (
                <div className="flex justify-center items-center w-full text-center mt-8 h-24 box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600">
                  <span className="text-lg mr-4 text-slate-400">😴</span>{" "}
                  <span className="text-lg">Sin sesiones encontradas</span>
                </div>
              ) : (
                <Table className="border-spacing-y-[10px] border-separate">
              <Table.Tbody>
                
                { Array.isArray(sessionDetails) &&
                    sessionDetails.map((item: any, i: number) => {
                 
                    return(     
                    <Table.Tr key={item.id} className={`bg-slate-500 ${item?.status === "USED" && "bg-green-100"}`}>
                      <Table.Td className={`${item?.status === "USED" && "bg-green-100"} box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600`}>
                        <div className="flex items-center">
                          <IcoGender gender={item?.student?.gender || ""}/>
                          <div className="ml-3.5">
                            <a href="" className="font-medium whitespace-nowrap text-xl">
                              {item?.student?.name || ""}{" "}{item?.student?.lastName || ""}
                            </a>
                            <div className="mt-1 text-xs text-slate-500 whitespace-nowrap">
                              <CalculateAge birthdate={String(item?.student?.birthdate)} />
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td className={`${item?.status === "USED" && "bg-green-100"} box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600`}>
                        <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                          Tipo de sesión
                        </div>
                        <div className="ml-1.5 whitespace-nowrap text-lg">
                          {item?.status === "RECOVERED" && "SESION RECUPERADA"}
                          {item?.status === "ACTIVE" && "VIGENTE"}
                          {item?.status === "USED" && "UTILIZADA"}
                        </div>
                        <p className="text-xs font-thin" >Sesión: { formatDateToISOShort(new Date(item?.date))}</p>
                        
                      </Table.Td>
                      <Table.Td className={`${item?.status === "USED" && "bg-green-100"} box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600`}>
                      {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                      { item?.locationId && item?.locationId !=="" && <>
                          <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                            Sede
                          </div>  
                          <p className="text-xs font-thin" >{item?.locationId}</p>
                          
                          
                        </>
                      }
                       
                      </Table.Td>
                      <Table.Td className={`${item?.status === "USED" && "bg-green-100"} box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600`}>
                      {item.status==="ACTIVE" &&
                      <div className="flex flex-col justify-start items-start ">
                        <div className="w-[100%] mb-2">
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
                        </div>
                        {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                        <Button variant="soft-danger" rounded 
                        className="w-[85%] px-4 py-3" 
                        onClick={() => updateSession({
                          sessionId: item.id,
                          status: "USED",
                          locationIdUsed:locationSelected,
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
                        value={locationSelected || ""}
                        isLoading={false}
                        
                        fn={(e)=>setLocationSelected(e.target.value)}
                        handleCreate={(e)=>console.log(e.target.value)}
                        name={"location"}
                      />                          
                    </div>
                    <Button variant="soft-danger" rounded 
                    className="w-[85%] px-4 py-3" 
                    onClick={() => updateSession({
                      sessionId: item.id,
                      status: "USED",
                      locationIdUsed:locationSelected,
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
                    
                      <Table.Td className={`relative py-4 ${item?.status === "USED" ? "bg-green-100": "bg-white"}`}>
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
                </Table.Td>
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
    </>
  );
}

export default Main;
