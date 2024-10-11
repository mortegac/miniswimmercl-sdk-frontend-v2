import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { parse, format } from 'date-fns';
import _ from "lodash";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Table from "@/components/Base/Table";
import { Slideover } from "@/components/Base/Headless";

import { Menu, Popover } from "@/components/Base/Headless"
import {CalculateAge} from "@/components/CalculateAge";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import {FormatDate} from "@/utils/dateHandler"

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getSessionDetails, selectSessionDetails, setSessionDetails } from "@/stores/SessionDetails/slice";
import { InputOptions } from "@/stores/SessionDetails/types";
import { setBreadcrumb } from '@/stores/breadcrumb';
import {typeOfGender} from "@/pages/private/Students/components/Card";


function transformDate(dateString:string) {
  const parsedDate = parse(dateString, 'd MMM, yyyy', new Date());
  return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
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
  

  
  
  const nowDate = new Date();
  const nowDate22 =  FormatDate({
    date: String(nowDate),
    options: { month: "short", day: "numeric", year: "numeric"},
  })
  // console.log("---newDate---", formatDateToISO(nowDate))
  const [date, setDate] = useState(nowDate22);
  const {sessionDetails, status } = useAppSelector(selectSessionDetails);
  const dispatch = useAppDispatch();
  dispatch(setBreadcrumb({first:"Asistencia", firstURL:"attendance"}));
  
  
  async function updateDate(dateStr:any){
    setDate(dateStr);
    const newDate = transformDate(dateStr)
    // console.log("---newDate---", newDate)
    await getSessions(newDate)
  }
  async function getSessions(dateSTR:string){
    return await dispatch(getSessionDetails({ 
      // status: "ACTIVE",
      sessionDate: String(dateSTR)
    }))
  };
  
  async function updateSession(params:InputOptions){
    const newDate = transformDate(date)
    await Promise.all([
      await dispatch(setSessionDetails({ sessionId: params.sessionId, status: params.status, })),
      await dispatch(getSessionDetails({sessionDate: String(newDate) }))
      // await dispatch(getSessionDetails({ status: "ACTIVE"}))
    ]);
  }
  
  useEffect(() => { (async () => await getSessions(formatDateToISO(nowDate)) )(); }, []);
  
  // primea vez 2024-10-10T00:00:00.000Z
  //            2024-10-11T00:00:00.000Z
  
  return (
    <>
        <Slideover
        size="sm"
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
                <div className="text-slate-500 mt-0.5  mb-12">
                  Estudiante XX
                </div>
                
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
    </Slideover>
    {/* <pre>{JSON.stringify(sessionDetails[0], null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
              
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-6">
            
            <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Link
              to="/students"
              // state={{ id: data.id }}
              className="px-8 py-3 border border-slate-200 rounded-full"
            ><span className="text-white">Sesiones alumno</span></Link>
            <Link
              to="/quick-registration"
              // state={{ id: data.id }}
              className="px-8 py-3 border border-slate-200 rounded-full bg-white/80"
            ><span className="text-primary">Nueva Inscripción</span></Link>
            
            </div>
          </div>
          
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className=" text-base font-medium group-[.mode--light]:text-white">
              Listado de asistencia: <b className="text-lg">{date}</b>
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
                      // const date = new Date(item.date);
                      // const formattedDate = format(
                      //   new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()+1)),
                      //   "dd-MMMM-yyyy"
                      // );
                      // const utcDate = utcToZonedTime(new Date("2024-07-23T00:00:00.000Z"), 'UTC');
                      // const formattedDate = format(utcDate, "dd-MMMM-yyyy");

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
                            {/* {item?.student?.birthdate || ""} */}
                            <CalculateAge birthdate={String(item?.student?.birthdate)} />
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      {/* <Table.Td className="w-60 box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600"> */}
                      <Table.Td className={`${item?.status === "USED" && "bg-green-100"} box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600`}>
                        <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                          fecha sesión
                        </div>
                       {
                        formatDateToISOShort(new Date(item?.date))
                        // item?.date
                       }
                        {/* {FormatDate({
                            date: item?.date,
                            options: { month: "long", day: "numeric"},
                          })
                        } */}
                        {
                          
                          
                        // format(new Date(item?.date), "dd-MMMM-yyyy")
                        }
                        {/* <div>{item?.date}</div> */}
                          {/* <div className="ml-1.5 whitespace-nowrap">
                          {item?.status === "RECOVERED" && "SESION RECUPERADA"}
                          {item?.status === "ACTIVE" && "VIGENTE"}
                          </div> */}
                       
                      </Table.Td>
                      {/* <Table.Td className="w-60 box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600"> */}
                      <Table.Td className={`${item?.status === "USED" && "bg-green-100"} box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600`}>
                        <div className="mb-1 text-xs text-slate-500 whitespace-nowrap">
                          Tipo de sesión
                        </div>  
                        <div className="ml-1.5 whitespace-nowrap text-lg">
                          {item?.status === "RECOVERED" && "SESION RECUPERADA"}
                          {item?.status === "ACTIVE" && "VIGENTE"}
                          {item?.status === "USED" && "UTILIZADA"}
                        </div>
                        
                      </Table.Td>
                  
                      {/* <Table.Td className="w-44 box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600"> */}
                      <Table.Td className={`${item?.status === "USED" && "bg-green-100"} box shadow-[5px_3px_5px_#00000005] first:border-l last:border-r first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 dark:bg-darkmode-600`}>
                      {item.status==="ACTIVE" &&
                      <Button variant="soft-danger" rounded className="w-48 px-4 py-3" 
                      onClick={() => updateSession({
                        sessionId: item.id,
                        status: "USED",
                      })}
                      >MARCAR PRESENTE</Button>
                     }
                    {item.status==="RECOVERED" &&
                      <Button variant="soft-danger" rounded className="w-48 px-4 py-3"
                      onClick={() => updateSession({
                        sessionId: item.id,
                        status: "USED",
                      })}
                      >MARCAR PRESENTE</Button>
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
                            // setStudentListId(item?.student?.id)
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
                            // setStudentListId(item?.student?.id)
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
