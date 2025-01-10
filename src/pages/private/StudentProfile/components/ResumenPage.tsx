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






export function ResumenPage(props:any) {
    
    const {data, edad } = props;
  
    return <>
     <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
                  <div className="col-span-12 xl:col-span-8">
                    <div className="flex flex-col gap-y-7">
                      <div className="flex flex-col p-5 box ">
                        <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                          Historial de inscripciones en Cursos
                        </div>
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
                                                "w-32",
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
                                                "w-32",
                                            ])}
                                            >
                                            <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                            <span className="-mt-px">
                                            {item?.wasPaid && "PAGADO"}
                                            {!item?.wasPaid && "PENDIENTE"}
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
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-y-1.5 mt-1.5 leading-relaxed text-slate-500 text-[0.8rem]">
                                     
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
                            {/* <pre>{JSON.stringify(item?.student?.id, null, 2)}</pre>
                            <pre>{JSON.stringify(item?.id, null, 2)}</pre> */}
                              <Button
                                // onClick={() => handleSession({
                                //   studentId: item?.student?.id,
                                //   enrollmentId: item?.id,                                  
                                //   sessionId: session?.id
                                // })}
                                className={` mx-1 my-1 rounded-full p-0 w-40
                                  ${session?.status === "ACTIVE" && " bg-green-50"}
                                  ${session?.status === "USED" && " bg-red-50 border-red-200"}
                                  ${session?.status === "RECOVERED" && " bg-blue-50 border-blue-200"}
                                  ${session?.status === "DELETED" && " bg-slate-500 border-slate-200 text-slate-100"}
                                `}
                              >
                                <div className={`text-center px-2`}>
                                  {session?.status === "ACTIVE" && (
                                    <>
                                      <small className="">
                                        {formatDateUTC(session?.date)}
                                        
                                      </small>
                                    </>
                                  )}
                                  {session?.status != "ACTIVE" && (
                                    <>
                                      <small className="line-through">
                                        {formatDateUTC(session?.date)}
                                      </small>
                                        <p className="text-sm">{session?.status}</p>
                                    </>
                                  )}
                                  <p className="text-left"> <small className="">{session?.locationId}</small></p>
                                  {/* <p> <small className="">Usada:{session?.locationIdUsed}</small></p> */}
                                  
                                </div>
                              </Button>
                            </>
                          )
                        )}
                                    </div>
                                   
                                  
                                   
                                  </div>
                                </div>     
                                </>
                            })}
                            
                          </div>
                        </div>
                      </div>
                      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-6">
                        <div className="flex flex-col p-5 box ">
                          <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                            Carros de compra asociados
                          </div>
                          <div className="flex flex-col gap-5">
                            {_.take(messages.fakeMessages(), 5).map(
                              (faker, fakerKey) => (
                                <div className="flex items-center" key={fakerKey}>
                                  <div className="relative w-12 h-12">
                                    <div className="w-full h-full overflow-hidden rounded-full image-fit border-[3px] border-slate-200/70">
                                      <img
                                        alt="Tailwise - Admin Dashboard Template"
                                        src={faker.sender.photo}
                                      />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 mb-1 mr-1 border border-white rounded-full bg-success box"></div>
                                  </div>
                                  <div className="ml-3.5">
                                    <div className="font-medium">
                                      {faker.sender.name}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                      {faker.content}
                                    </div>
                                  </div>
                                  <div className="relative ml-auto w-7 h-7">
                                    <FormCheck.Input
                                      type="checkbox"
                                      value="checked"
                                      className="absolute z-10 w-full h-full opacity-0 peer"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center m-auto text-white transition-all border rounded-full opacity-0 w-7 h-7 bg-theme-1/80 border-theme-1 peer-checked:opacity-100">
                                      <Lucide
                                        icon="MailCheck"
                                        className="stroke-[1.5] w-3 h-3"
                                      />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center m-auto transition-all border rounded-full w-7 h-7 peer-hover:rotate-180 text-primary border-theme-1/20 bg-theme-1/5 peer-checked:opacity-0 peer-hover:bg-theme-1/10">
                                      <Lucide
                                        icon="MailPlus"
                                        className="stroke-[1.5] w-3 h-3"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                          <Button
                            variant="primary"
                            className="w-full mt-5 bg-white  text-primary border-primary/20 hover:bg-primary/20"
                          >
                            View All Messages
                            <Lucide
                              icon="ArrowRight"
                              className="stroke-[1.3] w-4 h-4 ml-2"
                            />
                          </Button>
                        </div>
                        <div className="flex flex-col p-5 box ">
                          <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                            Transacciones
                          </div>
                          <div className="flex flex-col gap-5">
                            {_.take(events.fakeEvents(), 5).map(
                              (faker, fakerKey) => (
                                <div className="flex items-center" key={fakerKey}>
                                  <div className="relative w-12 h-12">
                                    <div className="flex items-center justify-center w-full h-full overflow-hidden border-2 rounded-full border-slate-200/40 bg-theme-1/5">
                                      <Lucide
                                        icon={faker.icon}
                                        className="w-4 h-4 text-theme-1 fill-theme-1/10"
                                      />
                                    </div>
                                  </div>
                                  <div className="ml-3.5">
                                    <div className="font-medium">
                                      {faker.title}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                      {faker.location}
                                    </div>
                                  </div>
                                  <div className="relative ml-auto w-7 h-7">
                                    <FormCheck.Input
                                      type="checkbox"
                                      value="checked"
                                      className="absolute z-10 w-full h-full opacity-0 peer"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center m-auto text-white transition-all border rounded-full opacity-0 w-7 h-7 bg-theme-1/80 border-theme-1 peer-checked:opacity-100">
                                      <Lucide
                                        icon="Check"
                                        className="stroke-[1.5] w-3 h-3"
                                      />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center m-auto transition-all border rounded-full w-7 h-7 peer-hover:rotate-180 text-primary border-theme-1/20 bg-theme-1/5 peer-checked:opacity-0 peer-hover:bg-theme-1/10">
                                      <Lucide
                                        icon="Plus"
                                        className="stroke-[1.5] w-3 h-3"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                          <Button
                            variant="primary"
                            className="w-full mt-5 bg-white border-dashed text-primary border-primary/20 hover:bg-primary/20"
                          >
                            View All Events
                            <Lucide
                              icon="ArrowRight"
                              className="stroke-[1.3] w-4 h-4 ml-2"
                            />
                          </Button>
                        </div>
                      </div> */}
                    
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
                                  icon="Calendar"
                                  className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                />
                                <span className="w-40">Edad:</span>{ data?.birthdate && edad.años > 100 ? "SIN EDAD":`${edad?.años || ""} años, ${edad?.meses || ""} meses`}
                              </div>
                              <div className="flex items-center mt-3">
                                <Lucide
                                  icon="Calendar"
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
                          </div>
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
                       
                        </div>
                      </div>
                    </div>
                  </div>
    </div>
    {/* <pre>data= {JSON.stringify(data, null, 2)}</pre> */}
    </>
  }