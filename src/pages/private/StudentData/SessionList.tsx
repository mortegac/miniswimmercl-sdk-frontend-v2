import React, { useEffect, useState, Fragment, useMemo } from "react";
import _ from "lodash";
import Toastify from "toastify-js";

import {formatDateUTCShort} from "@/utils/helper";
import Notification from "@/components/Base/Notification";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import Tippy from "@/components/Base/Tippy";
import Litepicker from "@/components/Base/Litepicker";
import { FormSelect } from "@/components/Base/Form";

import { useAppSelector, useAppDispatch } from "../../../stores/hooks";
import {
  getStudents,
  selectEnrollment,
} from "../../../stores/Enrollment/slice";
import { selectAuth} from "@/stores/Users/slice";
import { setOneSessionDetail, selectSessionDetails, getSessionDetails } from "@/stores//SessionDetails/slice";
import { selectLocation } from "@/stores/Locations/slice";

// function formatDateUTCShort(dateString: string): string {
//     const date = new Date(dateString);
  
//     const day = date.getUTCDate().toString().padStart(2, "0");
//     const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
//     const year = date.getUTCFullYear();
  
//     return `${day}-${typeOfMonth[month]}`;
//   }

export function SessionList(props: any) {
    const {enrollmentId, sessionId, studentId } = props;
    const [data, setData] = useState({
        // SEND REMMENBER PAYMENT
        enrollmentId:"", 
        cartId:"", 
        phoneNumber:"", 
        clientName:"", 
        clientId:"", 
        studentId:"",
        
        
        date: "",
        location: "",
        status: "",
        sessionId:"",
      });
      const dispatch = useAppDispatch();
      
      const {email}= useAppSelector(selectAuth);
      const {sessionDetails}= useAppSelector(selectSessionDetails);
      const { locations, status } = useAppSelector(selectLocation);
      
      
      
      async function deleteSession(sessionId:string){
    
    await dispatch(
        setOneSessionDetail({
          sessionId:sessionId,
          status: "DELETED",
          userModifyId:email,
        }))
        
        await  dispatch(getSessionDetails(
            {
                studentId:studentId, 
                enrollmentId:enrollmentId
            }))
        
        // await Promise.all([
        //   await dispatch(
        //     setOneSessionDetail({
        //       sessionId:sessionId,
        //       status: "DELETED",
        //       userModifyId:email,
        //     })),
        //   await  dispatch(getSessionDetails(
        //     {
        //         studentId:studentId, 
        //         enrollmentId:enrollmentId
        //     }))
        
        // ])
        
    }
      async function updateSession(){
    
        await Promise.all([
          await dispatch(
            setOneSessionDetail({
              sessionId:data?.sessionId,
              status:data?.status,
              locationIdUsed:data?.location,
              sessionDate:data?.date,
              userModifyId:email,
            })),
          await  dispatch(getSessionDetails(
            {
                studentId:studentId, 
                enrollmentId:enrollmentId
            }))
        
        ])
        
        const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
        successEl.classList.remove("hidden");
        Toastify({
          node: successEl,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      }
     
      function handleSession(session: any) {
        // setSession({ ...session });
        setData({
          ...data,
          date: String(session.date).replace("T00:00:00.000Z", ''),
          location: session.locationId,
          status: session.status,
          sessionId: session?.id
        });
      }
      
    useEffect(() => {
        (async () => await dispatch(getSessionDetails(
            {
                studentId:studentId, 
                enrollmentId:enrollmentId
            })))();
      }, []);
    return(
        <>
         <div className="flex flex-col">
              {/* <pre>{JSON.stringify(props, null, 2 )}</pre> */}
              
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Reagendar Sesión</div>
                <div className="text-slate-500 mt-0.5  mb-12">del Alumno</div>
                
                
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Fecha sesión</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                          (Formato fecha año - mes - dia)
                        </div>
                      </div>
                    </label>
                    <div className="flex flex-row mt-3 xl:mt-0 w-[140] justify-center items-center">
                      <div className="relative">
                        <Lucide
                          icon="Calendar"
                          className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                        />
                        <Litepicker
                          value={data.date}
                          type="text"
                          name="studentBithday"
                          onChange={(e) =>
                            setData({ ...data, date: String(e.target.value).replace("T00:00:00.000Z", '') })
                          }
                          options={{
                            autoApply: true,
                            showWeekNumbers: false,
                            format: "YYYY-MM-DD",
                            singleMode: true,
                            // Formatear la fecha de salida como ISO 8601
                            setup: (picker) => {
                              picker.on("selected", (date1) => {
                                // Convertir a formato ISO 8601
                                const isoDate = date1.format(
                                  "YYYY-MM-DD"
                                );
                                // const isoDate = date1.format(
                                //   "YYYY-MM-DDTHH:mm:ss.SSSZ"
                                // );
                                console.log(
                                  "Fecha seleccionada (ISO 8601):",
                                  isoDate
                                );
                              });
                            },
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
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Sede</div>
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormSelect
                        className="!box uppercase mr-3"
                        onChange={(e) =>
                          setData({ ...data, location: e.target.value })
                        }
                      >
                        <option value="" selected>
                          {`${"Sedes"} `}
                        </option>
                        {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <option
                              key={i}
                              value={item?.id}
                              selected={item?.id === data.location && true}
                            >
                              {item.name}
                            </option>
                          ))}
                      </FormSelect>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Estado</div>
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormSelect
                        className="!box uppercase mr-3"
                        onChange={(e) =>
                          setData({ ...data, status: e.target.value })
                        }
                      >
                       
                            <option
                              key={"STATUS-01"}
                              value={"ACTIVE"}
                              selected={"ACTIVE" === data.status && true}
                            >
                              {"ACTIVA"}
                            </option>
                            <option
                              key={"STATUS-02"}
                              value={"USED"}
                              selected={"USED" === data.status && true}
                            >
                              {"USADA"}
                            </option>
                            <option
                              key={"STATUS-03"}
                              value={"RECOVERED"}
                              selected={"RECOVERED" === data.status && true}
                            >
                              {"RECUPERADA"}
                            </option>
                            <option
                              key={"STATUS-04"}
                              value={"DELETED"}
                              selected={"DELETED" === data.status && true}
                            >
                              {"ELIMINADA"}
                            </option>
                      </FormSelect>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                   
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <Button
                            key={`${"UPDATE_SESSION"}-span-buttons`} 
                            rounded
                            variant="primary"
                            className={`w-full px-2 py-2  mx-2 font-light uppercase `}
                            onClick={()=>updateSession()}
                          >Actualizar Sesión</Button>
                    </div>
                  </div>
                  
                  
                  {/* <pre>sessionDetails= {JSON.stringify(sessionDetails, null, 2 )}</pre> */}
                  <div className=" overflow-auto xl:overflow-visible text-base mt-16">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Fecha
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Pack
              </Table.Td>
              <Table.Td className=" py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-left">
                Estado
              </Table.Td>
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Sede
              </Table.Td>
            
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500"></Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
          {Array.isArray(sessionDetails) &&
              sessionDetails.map((item: any, index) => {
                return (
                  <Table.Tr
                    key={index}
                    className={`[&_td]:last:border-b-0 ${
                        item?.status === "ACTIVE" && "bg-white"
                    }  ${item?.status !== "ACTIVE" && "bg-red-50"}`}
                  >
                    <Table.Td className=" py-4 border-dashed w-22">
                      <div className="flex items-center">
                        <div className=" text-sm">
                          {formatDateUTCShort(item?.date)}
                        </div>
                      </div>
                      {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                    </Table.Td>
                   

                    <Table.Td className=" py-4 border-dashed">
                      <div className="font-thin text-sm text-left"> 
                      {item?.sessionNumber} de {item?.totalSessions}</div>
                    </Table.Td>

                    <Table.Td className=" py-4 border-dashed w-12">
                      <div className="flex items-start justify-start flex-col">
                        <p className={` mx-1 my-1 rounded-full p-0`}>
                          {item?.status}
                        </p>
                      </div>
                    </Table.Td>
                    <Table.Td className=" py-4 border-dashed">
                      <div className="font-thin text-sm text-left"> 
                      Creada:<b>{item?.locationId}</b></div>
                      <div className="font-thin text-sm text-left"> 
                      Usada:<b>{item?.locationIdUsed}</b></div>
                    </Table.Td>
                    
                    <Table.Td className=" m-0">
                      <div className="flex flex-row">
                           <>
                            <Button
                              rounded
                              className="mr-2 px-2 py-2 border border-slate-200 hover:bg-green-300"
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                handleSession(item)
                              }}
                            >
                              <Tippy  content="Editar Sesión">
                                <Lucide icon="CheckCircle" className="text-green-700" />{" "}
                              </Tippy>
                            </Button>
                            <Button
                              rounded
                              className="mr-2 px-2 py-2 border border-slate-200 hover:bg-red-300"
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                deleteSession(item?.id);
                              }}
                            >
                              <Tippy  content="Eliminar sesión">
                                <Lucide icon="X" className="text-red-400" />{" "}
                              </Tippy>
                            </Button>
                           </>                
                      </div>
                    </Table.Td>
                  </Table.Tr>
                  
                );
              })}
          </Table.Tbody>
        </Table>
        <p className="p-4">Total sesiones: {Array.isArray(sessionDetails) && sessionDetails.length}</p>
      </div>
                  
                </div>
              </div>

        </>
    )
}