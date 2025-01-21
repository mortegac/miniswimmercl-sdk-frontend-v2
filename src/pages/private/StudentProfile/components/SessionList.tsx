import React, { useEffect, useState, Fragment, useMemo } from "react";
import _ from "lodash";
import Toastify from "toastify-js";

import {formatDateUTCShort} from "@/utils/helper";
import {statusSession} from "@/utils/dictionary";
import Notification from "@/components/Base/Notification";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import { FormSelect } from "@/components/Base/Form";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth} from "@/stores/Users/slice";
import { setOneSessionDetail, selectSessionDetails, getSessionDetails } from "@/stores//SessionDetails/slice";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getStudent } from "@/stores/Students/slice";

// function formatDateUTCShort(dateString: string): string {
//     const date = new Date(dateString);
  
//     const day = date.getUTCDate().toString().padStart(2, "0");
//     const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
//     const year = date.getUTCFullYear();
  
//     return `${day}-${typeOfMonth[month]}`;
//   }

// const statusSession:any=[
//   { id:"ACTIVE", name:"ACTIVA" },
//   { id:"USED", name:"USADA" },
//   { id:"RECOVERED", name:"REAGENDADA" },
//   { id:"DELETED", name:"ELIMINADA" },
// ]
export function SessionList(props: any) {
    const {studentId, data, setSessionSlideover } = props;

    const [dataNew, setDataNew] = useState({
        id: data?.id,
        sessionNumber: data?.sessionNumber,
        date: data?.date.replace("T00:00:00.000Z", ""),
        currentSession: data?.date,
        month: data?.month,
        year: data?.year,
        status: data?.status,
        locationId: data?.locationId,
        locationIdUsed: data?.locationIdUsed,
        studentId: data?.studentId,
        enrollmentId: data?.enrollmentId,
      });
      const dispatch = useAppDispatch();
      const {email}= useAppSelector(selectAuth);
      const { locations, status } = useAppSelector(selectLocation);
      
  
      async function updateSession(){
    
        const validation: boolean = dataNew?.id && dataNew?.status && dataNew?.locationId && dataNew?.locationIdUsed && dataNew?.date
        
        validation && await Promise.all([
          await dispatch(
            setOneSessionDetail({
              sessionId:dataNew?.id,
              status:dataNew?.status,
              locationId:dataNew?.locationId,
              locationIdUsed:dataNew?.locationIdUsed,
              sessionDate:dataNew?.date,
              currentSession:dataNew?.currentSession,
              userModifyId:email,
              studentId:dataNew?.studentId,
              enrollmentId:dataNew?.enrollmentId,
            })),
            dispatch(getStudent({ studentId })),
            setSessionSlideover(false)
          // await  dispatch(getSessionDetails(
          //   {
          //       studentId:studentId, 
          //       enrollmentId:enrollmentId
          //   }))
        
        ])
        
        !validation && alert("Debe seleccionar todos los campos ")
        
        if(validation ){
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
      }
     
      // function handleSession(session: any) {
      //   // setSession({ ...session });
      //   setDataNew({
      //     ...dataNew,
      //     date: String(session.date).replace("T00:00:00.000Z", ''),
      //     locationId: session.locationId,
      //     status: session.status,
      //     id: session?.id
      //   });
      // }

    
    useEffect(() => {
      (async () => await dispatch(getLocationsOnly()))();
    }, []);
    
    return(
        <>
          <Notification
          id="success-notification-content"
          className="flex hidden"
          >
            <Lucide icon="CheckCircle" className="text-success" />
            <div className="ml-4 mr-4">
              <div className="font-medium">Sesión actualizada</div>
              <div className="mt-1 text-slate-500">
                correctamente
              </div>
            </div>
          </Notification>
          <div className="flex flex-col">
              <pre>{JSON.stringify(data, null, 2 )}</pre>
              
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
                          value={dataNew.date}
                          type="text"
                          name="studentBithday"
                          onChange={(e) =>
                            setDataNew({ ...dataNew, date: String(e.target.value).replace("T00:00:00.000Z", '') })
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
                          <div className="font-medium">Sede Inscrita</div>
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormSelect
                        key="SELECT-LOCATIONS"
                        className="!box uppercase mr-3"
                        onChange={(e) =>
                          setDataNew({ ...dataNew, locationId: e.target.value })
                        }
                      >
                        <option value="" selected>
                          {`${"Sedes"} `}
                        </option>
                        {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <option
                            key={`${i}-LOCATIONS`}
                              value={item?.id}
                              selected={item?.id === dataNew.locationId && true}
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
                          <div className="font-medium">Sede usada</div>
                        </div>
                      </div>
                    </label>
                    
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                        {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <>
                              <Button
                              key={`${i}-LOCATIONS-USED`}
                              onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                                setDataNew({ ...dataNew, locationIdUsed: item?.id })
                            }}                              
                            className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${item?.id === dataNew?.locationIdUsed && "bg-green-200"}`}>
                              <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                  
                                  {/* <p className="text-center line-clamp-1 text-xs text-slate-400">{item?.name}</p> */}
                                  <p className={`text-center line-clamp-1 text-xs text-slate-400  ${item?.id === dataNew?.locationIdUsed && "text-slate-500"}`}>{item?.name}</p>
                                  </span>
                              </span>
                              
                            </Button>
                            </>
                          ))}
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
                    {/* <pre>{JSON.stringify(statusSession, null, 2)}</pre> */}
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                        {Array.isArray(statusSession) &&
                          statusSession?.map((item, i) => (
                            <>
                            {/* <p className="text-center line-clamp-1 text-xs">{item?.id} | {dataNew?.locationId}</p> */}
                              <Button
                              key={`${i}-STATUS`}
                              onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              setDataNew({ ...dataNew, status: item?.id })
                              //  setDataSession({ ...session });
                              //  setSessionSlideover(true);
                            }}                              
                            className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${item?.id === dataNew?.status && "bg-green-300"}`}>
                              <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                  
                                  <p className={`text-center line-clamp-4 text-base text-slate-400  ${item?.id === dataNew?.status && "text-slate-500"}`}>{item?.name}</p>
                                  </span>
                              </span>
                              
                            </Button>
                            </>
                          ))}
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
          
                  
                </div>
          </div>
        </>
    )
}