import {useState, useEffect} from "react";
import clsx from "clsx";
import _, { iteratee } from "lodash";


import { FormSelect } from "@/components/Base/Form";

import Table from "@/components/Base/Table";
import Lucide from "@/components/Base/Lucide";
import { Slideover } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import {formatDateUTC, formatCurrency} from "@/utils/helper";
import {typeOfSession} from "@/utils/dictionary";
import {SessionList} from "./SessionList";
import LoadingIcon from "@/components/Base/LoadingIcon";

import { InputOptions } from "@/stores/SessionDetails/types";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getSessionDetails, selectSessionDetails, setSessionDetails, getSessionByStudent } from "@/stores/SessionDetails/slice";
import location from '@/assets/json/location.json';


const validityOfThePlan: any = {
  "1": "1 Clase",
  "4": "Mensual",
  "12": "Trimestral",
  "24": "Semestral"
}

export function Content(props:any) {
  const { dataSessions, statusFilter, studentId } = props;
  const [atendanceId, setAtendanceId] = useState("");
  const [sessionSlideover, setSessionSlideover] = useState(false);
  const [dataSession, setDataSession] = useState({
    id: "",
    sessionNumber: "",
    date: "",
    month: "",
    year: "",
    status: "",
    location: "",
    locationIdUsed: "",
    studentId: "",
    enrollmentId: "",
    startDate: "",
  });
  
  const dispatch = useAppDispatch();
  
  
  
  async function updateSession(params:InputOptions){
    setAtendanceId(params.sessionId || "")
    await Promise.all([
      await dispatch(setSessionDetails({ 
        sessionId: params.sessionId, 
        status: "USED",
        locationId:params?.locationId,
        locationIdUsed:params?.locationId,
        date:params?.date
      })),
      
      // await dispatch(getSessionDetails({
      //   sessionDate: String(date?.dateUtc), 
      //   locationId: date?.locationId
      // })),
      await dispatch(getSessionByStudent({
        studentId:studentId, 
        status:"ACTIVE"
      })),
      setAtendanceId("")
      
    ]);
  }
  
  return(
    <>
      <Slideover
        size="xl"
        key="Slide-sessions333"
        open={sessionSlideover}
        onClose={() => {
          setSessionSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
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
          <Slideover.Description className="p-0">
            {/* <pre>dataSession=={JSON.stringify(dataSession, null, 2 )}</pre> */}
            <SessionList 
              data={dataSession} 
              studentId={studentId} 
              setSessionSlideover={setSessionSlideover}
            />
           
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      
      <div className="overflow-auto xl:overflow-visible text-base">
      {/* { status === "idle" &&  */}
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
          <Table.Tr>
              <Table.Td className=" text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Fecha
              </Table.Td>
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              
              </Table.Td>
              <Table.Td className="  text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Estado
              </Table.Td>
              <Table.Td className="  text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Sede
              </Table.Td>
              <Table.Td className="  text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Horario
              </Table.Td>
              <Table.Td className="  text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Plan
              </Table.Td>
              <Table.Td className="  text-left py-4 font-medium  border-t bg-slate-50 border-slate-200/60 text-slate-500"></Table.Td>
          </Table.Tr>
          </Table.Thead>

            { Array.isArray(dataSessions) && 
            [...dataSessions]
            .sort((a, b) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0;
                const dateB = b.date ? new Date(b.date).getTime() : 0;
                return dateA - dateB; // Orden descendente (más reciente primero)
              
              })
              //   const ad = new Date(a.startDate);
              //   const bd = new Date(b.startDate);
              //   return ad > bd ? -1 : ad < bd ? 1 : 0;
            .map((item:any, index:number)=>
              <>
                  {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                  <Table.Tr key={index} 
                    className={`[&_td]:last:border-b-0 
                      ${item?.totalSessions === 1 && "bg-slate-100"}
                      ${atendanceId === item?.id && "bg-yellow-100"}
                      `
                    } >
                    <Table.Td className="w-36 py-4 border-dashed">
                      <span className=" text-sm">{formatDateUTC(item?.date)}</span>
                    </Table.Td>
                    <Table.Td className="w-1 py-4 border-dashed text-center">
                      <span className="min-w-3 min-h-2  max-w-3 max-h-2 px-2 py-1 rounded-full text-white bg-slate-400 text-[0.74rem]">{item?.sessionNumber}</span>
                    </Table.Td>
                    <Table.Td className="w-24 py-4 border-dashed">
                      <span
                          className={clsx([
                              "group flex justify-center items-center text-xs rounded-md border  mr-2 mb-1",
                              // "bg-slate-700 text-white",
                              item?.status === "ACTIVE" &&  "bg-green-50 font-thin ",
                              item?.status === "USED" &&  "bg-red-50 border-red-200",
                              item?.status === "RECOVERED" &&  "bg-blue-50 border-blue-200",
                              item?.status === "DELETED" &&  "bg-slate-200 border-slate-200 text-slate-500",
                              
                              "w-28 h-10",
                          ])}
                          >
                          <span className="text-center">
                            <p className="text-sm">{typeOfSession[item?.status || ""]}</p>
                          </span>
                      </span>
                    </Table.Td>
                    <Table.Td className="w-42  py-4 border-dashed">
                      <p className="text-sm pb-2 font-thin"><b className="pr-2">Creada:</b>{item?.locationId}</p>
                      <p className="text-sm"><b className="pr-4">Usada:</b>{item?.locationIdUsed}</p>
                    </Table.Td>
                    <Table.Td className="w-56  py-4 border-dashed text-left">
                      <p className="text-sm text-slate-400">{item?.course?.title}</p>
                      <p className="text-sm text-slate-400">{item?.schedule?.day}-{item?.schedule?.startHour}</p>
                    </Table.Td>
                    <Table.Td className="w-20  py-4 border-dashed text-left">
                      <p className="text-sm text-slate-400">{validityOfThePlan[item?.totalSessions]}</p>
                    </Table.Td>
                    <Table.Td className="w-10 py-4 border-dashed">
                      <div className="flex flex-row">
                        {
                          statusFilter &&
                            <Button
                              className="mr-2 w-full border-primary/80 border-2"
                              onClick={() => {
                                  updateSession({
                                    sessionId: item?.id, 
                                    status: item?.status,
                                    locationId:item?.locationId,
                                    locationIdUsed:item?.locationId,
                                    date:item?.date
                                  })
                                }}
                            ><Lucide className="w-10 h-10 sm:w-8 sm:h-8 stroke-[1] text-primary" icon="Check" /><p className="text-[.7rem]  uppercase text-primary/80">
                              Marcar Presente</p>
                            </Button>
                        }
                        {/* <pre>id= {JSON.stringify(item?.id, null, 2)}</pre>
                        <pre>{JSON.stringify(dataSession, null, 2)}</pre> */}
                        <Button
                          // variant="primary"
                          className="bg-slate-200"
                          
                           onClick={() => {
                             setSessionSlideover(true);
                             setDataSession({
                               ...item, 
                               studentId:studentId, 
                               enrollmentId: item?.enrollmentSessionDetailsId, 
                               startDate:item?.date,
                               totalSessions:item?.totalSessions,
                              
                               courseId: item?.courseId || "",
                               courseName: item?.course?.title || "",
                               scheduleId: item?.scheduleId || "",
                               scheduleName: `${item?.schedule?.day} ${item?.schedule?.startHour}` || "",
                               locationIdUsed: item?.locationIdUsed==="" && item?.locationId
                              
                             })
                           }}
                        ><span className="text-sm uppercase">Editar</span></Button>
                      </div>
                    </Table.Td>
                  </Table.Tr>                                            
            </>   
              )
              }
            
              {/* //  return item && Object.keys(item).length > 0 ? 
              // : null */}
        </Table>
      {/* // } */}
      </div>
    </>
  )
}
export function SessionsPage(props:any) {
  const [statusFilter, setStatusFilter] = useState({status: true, text:"ACTIVE"});
  
  const {data, studentId } = props;
  
  const { status, sessionDetails } = useAppSelector(selectSessionDetails);
  // function flattenAndSortSessionItems(data: any[]): any[] {
  //   // 1. Unir todos los arrays 'items' en uno solo
  //   const allItems = data.reduce((acc, curr) => {
  //     if (curr.sessionDetails && curr.sessionDetails.items) {
  //       acc.push(...curr.sessionDetails.items);
  //     }
  //     return acc;
  //   }, [] as any[]);
  
  //   // 2. Filtrar los items donde el status no sea "USED"
  //   const filteredItems = allItems.filter((item:any) => item.status !== "USED");
  
  //   // 3. Ordenar el array resultante por la propiedad 'date' de la más nueva a la más antigua
  //   filteredItems.sort((a:any, b:any) => {
  //     return new Date(b.date).getTime() - new Date(a.date).getTime();
  //   });
  
  //   return filteredItems;
  // }
  async function changeStatus(state:string){
    
    const newState = statusFilter.status === true ? "DELETED" : "ACTIVE"
    setStatusFilter({status: !statusFilter.status, text:state})
    if (studentId) {
      await dispatch(getSessionByStudent({studentId:studentId, status:state}))
    }
  }

    const dispatch = useAppDispatch();
    
    useEffect(() => {
      const loadStudentData = async () => {
        if (studentId) {
          await dispatch(getSessionByStudent({studentId:studentId, status:"ACTIVE"}))
        }
      };
      
      loadStudentData();
    }, [studentId, dispatch]);
    
    return <>
    {/* <pre>statusFilter = {JSON.stringify(statusFilter, null, 2 )}</pre> */}
    {/* <pre>sessionDetails = {JSON.stringify(sessionDetails, null, 2 )}</pre> */}
     {/* SESIONES */}
     
      {/* <pre>{ dataSessions && JSON.stringify(dataSessions, null, 2)}</pre> */}
        <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
          <div className="col-span-12">
            <div className="flex flex-col gap-y-7">
              <div className="flex flex-col p-5 box min-h-[600px]">
               
               <div className="flex flex-row justify-between">
                <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem] uppercase">
                  <h2 className="text-2xl uppercase">{statusFilter.status === true ? "Sesiones Activas": "Historial de Sesiones utilizadas"}</h2>
                  
                </div>
                <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                  Estado:
                <FormSelect
                        key="SELECT-LOCATIONS"
                        className="!box uppercase mr-3"
                        onChange={(e) =>{
                            // setDataNew({ ...dataNew, locationId: e.target.value })
                            changeStatus(e.target.value)
                          }
                        }
                      >
                        <option
                          key={`ACTIVE-STATUS`}
                          value="ACTIVE"
                          selected={"ACTIVE" === statusFilter?.text && true}
                        >Sesiones Activas
                        </option>
                        <option
                          key={`DELETED-STATUS`}
                          value="DELETED"
                          selected={"DELETED" === statusFilter?.text && true}
                        >Sesiones Utilizadas
                        </option>
                      </FormSelect>
                </div>
               </div>
               
                { status === "loading" && 
                <div className="absolute top-8 left-0 w-full">
                  <div className="flex justify-center items-start text-center h-56">
                    <div className="w-16 h-16">
                      <LoadingIcon
                        color="purple"
                        icon="three-dots"
                        className="w-10 h-10 mt-10"
                      />
                    </div>
                  </div>
                </div>
                }
                
                <Content 
                  dataSessions={sessionDetails}
                  status={status}
                  studentId={studentId}
                  statusFilter={statusFilter.status}
                />
                
              </div>
            
            </div>
          </div>
        </div>
    </>
  }