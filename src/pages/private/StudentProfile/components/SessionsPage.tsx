import {useState, useEffect} from "react";
import clsx from "clsx";
import _, { iteratee } from "lodash";


import Table from "@/components/Base/Table";
import Lucide from "@/components/Base/Lucide";
import { Slideover } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import {formatDateUTC, formatCurrency} from "@/utils/helper";
import {typeOfSession} from "@/utils/dictionary";
import {SessionList} from "./SessionList";
import LoadingIcon from "@/components/Base/LoadingIcon";

export function SessionsPage(props:any) {
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
  const {data, studentId, status } = props;

    return <>
     {/* SESIONES */}
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
            <SessionList 
              data={dataSession} 
              studentId={studentId} 
              setSessionSlideover={setSessionSlideover}
            />
           
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      {/* <pre>{JSON.stringify(data?.enrollments?.items[0].id, null, 2)}</pre> */}
     <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
                  <div className="col-span-12">
                    <div className="flex flex-col gap-y-7">
                      <div className="flex flex-col p-5 box ">
                        <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                          Historial de sesiones
                        </div>
                        { status === "loading" && 
                          <div className="flex justify-center items-start text-center h-56">
                            <div className="w-16 h-16">
                              <LoadingIcon
                                color="purple"
                                icon="three-dots"
                                className="w-10 h-10 mt-10"
                              />
                            </div>
                          </div>
                        }
                          <div className="overflow-auto xl:overflow-visible text-base">
                         { status === "idle" && 
                         <>
                          <Table className="border-b border-slate-200/60">
                          <Table.Thead>
                          <Table.Tr>
                              <Table.Td className="w-36 text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                              Fecha
                              </Table.Td>
                              <Table.Td className="w-1 text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                              
                              </Table.Td>
                              <Table.Td className=" w-24 text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                              Estado
                              </Table.Td>
                              <Table.Td className=" w-42 text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                              Sede
                              </Table.Td>
                              <Table.Td className=" w-96 text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                              Horario
                              </Table.Td>
                              <Table.Td className=" w-10 text-left py-4 font-medium  border-t bg-slate-50 border-slate-200/60 text-slate-500"></Table.Td>
                          </Table.Tr>
                          </Table.Thead>
                          </Table>
                                { Array.isArray(data?.enrollments?.items) && 
                                [...data?.enrollments?.items]
                                .sort((a, b) => {
                                  const ad = new Date(a.startDate);
                                  const bd = new Date(b.startDate);
                                  return ad > bd ? -1 : ad < bd ? 1 : 0;
                                })
                                .map((item:any, index:number)=>{
                                    
                                    return <>
                                    {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                                     <Table className="border-b border-slate-200/60">
                                     {/* <Table.Thead>
                                      <Table.Tr className="bg-slate-500">
                                      <Table.Td className="h-[0.2]"></Table.Td>
                                      <Table.Td className="h-[0.2]"></Table.Td>
                                      <Table.Td className="h-[0.2]"></Table.Td>
                                      <Table.Td className="h-[0.2]"></Table.Td>
                                      <Table.Td className="h-[0.2]"></Table.Td>
                                      <Table.Td className="h-[0.2]"></Table.Td>
                                      </Table.Tr>
                                      </Table.Thead> */}
                                      <Table.Tbody>
                                      {Array.isArray(item?.sessionDetails?.items) &&
                                      [...item?.sessionDetails?.items]
                                      .sort((a, b) => {
                                        const ad = new Date(a.date);
                                        const bd = new Date(b.date);
                                        return ad < bd ? -1 : ad < bd ? 1 : 0;
                                      })
                                      .map(
                                        (session: any, i: any) => {
                                          // const dateSession:string = formatDateUTC(session?.modifiedByDate);
                                          const daySchedule: string =  item?.scheduleName.split(" ")[0]
                                          return session && Object.keys(session).length > 0 ? (
                                          <>  
                                          {/* <pre>{JSON.stringify(item, null, 2 )}</pre> */}
                                          {/* <pre>{JSON.stringify(session, null, 2 )}</pre> */}
                                          {/* <pre>{JSON.stringify(item?.scheduleId, null, 2 )}</pre> */}
                                          
                                          <Table.Tr key={index} className={`[&_td]:last:border-b-0 `} > 
                                            
                                            <Table.Td className="w-36 py-4 border-dashed">
                                              <span className=" text-sm">{formatDateUTC(session?.date)}</span>
                                            </Table.Td>
                                            <Table.Td className="w-1 py-4 border-dashed text-center">
                                              <span className="min-w-3 min-h-2  max-w-3 max-h-2 px-2 py-1 rounded-full text-white bg-slate-400 text-[0.74rem]">{session?.sessionNumber}</span>
                                            </Table.Td>
                                            <Table.Td className="w-24 py-4 border-dashed">
                                              <span
                                                  className={clsx([
                                                      "group flex justify-center items-center text-xs rounded-md border  mr-2 mb-1",
                                                      // "bg-slate-700 text-white",
                                                      session?.status === "ACTIVE" &&  "bg-green-50 font-thin ",
                                                      session?.status === "USED" &&  "bg-red-50 border-red-200",
                                                      session?.status === "RECOVERED" &&  "bg-blue-50 border-blue-200",
                                                      session?.status === "DELETED" &&  "bg-slate-200 border-slate-200 text-slate-500",
                                                      
                                                      "w-28 h-10",
                                                  ])}
                                                  >
                                                  <span className="text-center">
                                                    <p className="text-sm">{typeOfSession[session?.status || ""]}</p>
                                                  </span>
                                              </span>
                                            </Table.Td>
                                            <Table.Td className="w-42  py-4 border-dashed">
                                              <p className="text-sm pb-2 font-thin"><b className="pr-2">Creada:</b>{session?.locationId}</p>
                                              <p className="text-sm"><b className="pr-4">Usada:</b>{session?.locationIdUsed}</p>
                                            </Table.Td>
                                            <Table.Td className="w-96  py-4 border-dashed text-left">
                                              <p className="text-sm text-slate-400">{item?.courseEnrollmentsId}</p>
                                              <p className="text-sm text-slate-400">{item?.scheduleName}</p>
                                              {/* <p className="text-sm text-slate-400">{session?.modifiedBy}</p>
                                              <p className="text-sm text-slate-400">{dateSession !== "01-ENE-1800" && dateSession}</p> */}
                                            </Table.Td>
                                            <Table.Td className="w-10 py-4 border-dashed">
                                              <div className="flex flex-row">
                                                <Button
                                                  variant="primary"
                                                  
                                                  onClick={() => {
                                                    setSessionSlideover(true);
                                                    setDataSession({
                                                      ...session, 
                                                      courseEnrollmentsId: item?.courseEnrollmentsId || "",
                                                      scheduleId: item?.scheduleId || "",
                                                      studentId:studentId, 
                                                      enrollmentId: item?.id, 
                                                      startDate:item?.startDate,
                                                      scheduleName: daySchedule 
                                                    })
                                                  }}
                                                ><span className="text-sm uppercase">Editar</span></Button>
                                              </div>
                                            </Table.Td>
                                            
                                        </Table.Tr>
                                          </>
                                          ) : null
                                        }
                                      )}                                    
                                      </Table.Tbody>
                                      </Table>
                                    </>
                                })}
                         </>
                         }
                        </div>
                      </div>
                    
                    </div>
                  </div>
                  {/* </Table>        */}
    </div>
    </>
  }