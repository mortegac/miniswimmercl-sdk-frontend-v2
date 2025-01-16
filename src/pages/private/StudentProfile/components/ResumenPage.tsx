import clsx from "clsx";
import _ from "lodash";



import Lucide from "@/components/Base/Lucide";
import { FormCheck } from "@/components/Base/Form";
import activities from "@/fakers/activities";
import users from "@/fakers/users";
import messages from "@/fakers/messages";
import events from "@/fakers/events";
import projectDetails from "@/fakers/project-details";
import Button from "@/components/Base/Button";
import {typeOfRelationship} from "@/utils/dictionary";
import {formatDateUTC, formatCurrency} from "@/utils/helper";
import { cleanSentVar } from '@/stores/EmailsSent/slice';
import LoadingIcon from "@/components/Base/LoadingIcon";





export function ResumenPage(props:any) {
    
    const {data, edad, status } = props;
        
    return <>
     <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
                  <div className="col-span-12 xl:col-span-8">
                    <div className="flex flex-col gap-y-7">
                      <div className="flex flex-col p-5 box ">
                        <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                          Historial de inscripciones en Cursos
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
                        { status === "idle" && <>
                          <div className="-my-3">
                            <div className="relative overflow-hidden before:content-[''] before:absolute before:w-px before:bg-slate-200/60 before:left-0 before:inset-y-0 before:dark:bg-darkmode-400 before:ml-[14px]">
                              { Array.isArray(data?.enrollments?.items) && 
                              [...data?.enrollments?.items]
                              .sort((a, b) => {
                                const ad = new Date(a.startDate);
                                const bd = new Date(b.startDate);
                                return ad > bd ? -1 : ad < bd ? 1 : 0;
                              })
                              .map((item:any, index:number)=>{
                                  
                                  return <>
                                  <div
                                    className={clsx([
                                      "mb-3 last:mb-0 relative",
                                      "mb-8",
                                      // "first:before:content-[''] first:before:h-1/2 first:before:w-5 first:before:bg-white first:before:absolute",
                                      "last:after:content-[''] last:after:h-1/2 last:after:w-5 last:after:bg-white last:after:absolute last:after:bottom-0",
                                    ])}
                                    key={index}
                                  >
                                      <div className="flex flex-row justify-start items-center">
                                          <div className="h-3 w-4 bg-slate-700 ml-2 rounded-full"></div>
                                          <span
                                              className={clsx([
                                                  "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                                  "bg-slate-700 text-white",
                                                  "w-36",
                                              ])}
                                              >
                                              <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                              <span className="-mt-px">
                                              {item?.startDate}
                                              </span>
                                          </span>
                                          <span
                                              className={clsx([
                                                  "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                                  // "bg-slate-700 text-white",
                                                  item?.wasPaid && "text-success bg-success/10 font-thin ",
                                                  !item?.wasPaid && "text-black bg-red-300 font-semibold ",
                                                  "w-56",
                                              ])}
                                              >
                                              <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                              <span className="-mt-px">
                                              {item?.wasPaid && "PAGADO"}
                                              {!item?.wasPaid && "PENDIENTE DE PAGO"}
                                              </span>
                                          </span>
                                          <div className="w-full border-b border-dashed"></div>
                                      </div>
                                      
                                      
                                    <div
                                      className={clsx([
                                        "px-4 py-3 ml-8",
                                      //   "before:content-[''] before:ml-1 before:absolute before:w-5 before:h-5 before:bg-slate-200 before:rounded-full before:inset-y-0 before:my-auto before:left-0 before:dark:bg-darkmode-300 before:z-10",
                                      //   "after:content-[''] after:absolute after:w-1.5 after:h-1.5 after:bg-slate-500 after:rounded-full after:inset-y-0 after:my-auto after:left-0 after:ml-[11px] after:dark:bg-darkmode-200 after:z-10",
                                      ])}
                                    >
                                      <a
                                        href=""
                                        className="font-medium text-slate-500"
                                      >
                                      {item?.courseEnrollmentsId}
                                      </a>
                                      
                                      <div className="mt-1.5 text-xs text-slate-500">
                                        {"$ "}{formatCurrency(item?.amountPaid)}
                                      </div>
                                      
                                      <div className="flex flex-col  flex-wrap sm:flex-row items-center gap-y-1.5 mt-1.5 leading-relaxed text-slate-500 text-[0.8rem]">
                                      
                                        {Array.isArray(item?.sessionDetails?.items) &&
                                        [...item?.sessionDetails?.items]
                                        .sort((a, b) => {
                                          const ad = new Date(a.date);
                                          const bd = new Date(b.date);
                                          return ad < bd ? -1 : ad < bd ? 1 : 0;
                                        })
                                        .map(
                            (session: any, i: any) => (
                              <>
                              {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
                              {/* 
                              <pre>{JSON.stringify(item?.id, null, 2)}</pre> */}
                              <div  className=" relative">
                                <span
                                    className={clsx([
                                        "group flex justify-center items-center text-xs rounded-md border pt-4 mr-2 mb-1",
                                        // "bg-slate-700 text-white",
                                        session?.status === "ACTIVE" &&  "bg-green-50 font-thin ",
                                        session?.status === "USED" &&  "bg-red-50 border-red-200",
                                        session?.status === "RECOVERED" &&  "bg-blue-50 border-blue-200",
                                        session?.status === "DELETED" &&  "bg-slate-200 border-slate-200 text-slate-500",
                                        
                                        "w-32 h-16",
                                    ])}
                                    >
                                    <span className="-mt-px text-center">
                                    {session?.status === "ACTIVE" && (
                                      <>
                                        <small className=" text-xs font-semibold">
                                          {formatDateUTC(session?.date)}
                                        </small>
                                        <p className="text-sm"></p>
                                      </>
                                    )}
                                    {session?.status != "ACTIVE" && (
                                      <>
                                        <small className="line-through text-xs">
                                          {formatDateUTC(session?.date)}
                                        </small>
                                          <p className=" text-[0.74rem]">{session?.status}</p>
                                      </>
                                    )}
                                    <p className="text-center line-clamp-1 text-[0.54rem]">{session?.locationId}</p>
                                    </span>
                                </span>
                                <span className=" text-center w-5 h4 absolute -top-1 left-1 bg-slate-400 text-white rounded-full text-[0.74rem]">{session?.sessionNumber}</span>
                                </div>                            </>
                            )
                          )}
                                      </div>
                                    
                                    
                                    
                                    </div>
                                  </div>     
                                  </>
                              })}
                              
                            </div>
                          </div>
                         </>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="relative col-span-12 row-start-1 xl:col-start-9 xl:col-span-4">
                    <div className="sticky flex flex-col top-[6.2rem] gap-y-7">
  
                      <div className="flex flex-col p-5 box ">
                        <div className="pb-5 mb-5 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                          Perfil
                        </div>
                        <div className="flex flex-col gap-8">
                          <div>
                            <div className="text-xs uppercase text-slate-500">
                              Datos Personales
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
                            { status === "idle" && 
                              <div className="mt-3.5">
                                <div className="flex items-center">
                                  <Lucide
                                    icon="Clipboard"
                                    className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                  />
                                  <span className="w-40">Nombre:</span> {`${data?.name} ${data?.middleName} ${data?.lastName}`}
                                </div>
                                <div className="flex items-center mt-3">
                                  <Lucide
                                    icon="Calendar"
                                    className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                  />
                                  <span className="w-40">Fecha de Nacimiento:</span>{data?.birthdate}
                                </div>
                                <div className="flex items-center mt-3">
                                  <Lucide
                                    icon="User"
                                    className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                  />
                                  <span className="w-40">Edad:</span>{ data?.birthdate && edad.años > 100 ? "SIN EDAD":`${edad?.años || ""} años, ${edad?.meses || ""} meses`}
                                </div>
                                <div className="flex items-center mt-3">
                                  <Lucide
                                    icon="Hotel"
                                    className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                  />
                                  <span className="w-40">Comuna:</span>{data?.placeOfResidence}
                                </div>
                                <div className="flex items-center mt-3">
                                  <Lucide
                                    icon="Phone"
                                    className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                  />
                                  <span className="w-40">Teléfono:</span>{data?.contactPhone}
                                </div>
                                <div className="flex items-center mt-3">
                                  <Lucide
                                    icon="Mail"
                                    className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                  />
                                  <span className="w-40">Email:</span>{data?.emailPhone}
                                </div>
                                
                                
                                
                              
                              
                              </div>
                            }
                          </div>
                          { status === "idle" &&   
                            <div>
                              <div className="text-xs uppercase text-slate-500 mb-4">
                                Apoderados
                              </div>
                              {Array.isArray(data?.relationships?.items) &&
                            data?.relationships?.items.map(
                              (relation: any, i: any) => (
                                  <div className="py-2 border-b border-t">
                                      <p className=" font-thin text-sm text-left text-slate-10">
                                          
                                      <span className=" font-mono">
                                      {typeOfRelationship[relation?.relationType]}
                                      </span>{" "}
                                      {relation?.user?.name}{" "}
                                      <p className="mt-1">
                                      
                                      
                                      <span className="mt-1 flex flex-row">
                                      <><Lucide icon="Mail" className=" w-4 h-4 text-success mr-2" /> {relation?.user?.id}</>
                                      </span>
                                      <span className="mt-1 flex flex-row">
                                      { relation?.user?.contactPhone && 
                                      <><Lucide icon="PhoneOutgoing" className=" w-4 h-4 text-success mr-2" /> {relation?.user?.contactPhone}</>
                                      }
                                      { !relation?.user?.contactPhone && 
                                      <><Lucide icon="PhoneOff" className=" w-4 h-4 text-red-500 mr-2" /> {relation?.user?.contactPhone}</>
                                      }
                                      </span>
                                      </p>
                                      </p>    
                                  </div>
                              )
                            )}
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
    </div>
    {/* <pre>data= {JSON.stringify(data, null, 2)}</pre> */}
    </>
  }