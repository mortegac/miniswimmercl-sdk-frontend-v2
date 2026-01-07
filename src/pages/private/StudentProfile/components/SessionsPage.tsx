import {useState, useEffect} from "react";
import clsx from "clsx";
import _, { iteratee } from "lodash";

import Litepicker from "@/components/Base/Litepicker";


import { FormSelect, FormCheck } from "@/components/Base/Form";

import { Menu } from "@/components/Base/Headless";
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
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getSessionDetails, selectSessionDetails, setSessionDetails, setOneSessionDetail, setSessionMasive, getSessionByStudent } from "@/stores/SessionDetails/slice";
import { getSchedulesByLocationAndCourse, selectSchedules } from "@/stores/Schedule/slice";
import { selectAuth } from "@/stores/Users/slice";

// import location from '@/assets/json/location.json';
// import { Schedule } from '../../../../stores/Courses/types';


const validityOfThePlan: any = {
  "1": "1 Clase",
  "4": "Mensual",
  "12": "Trimestral",
  "24": "Semestral"
}

// Función helper para obtener el día de la semana en formato de 3 letras
const getDayOfWeekShort = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysOfWeek[date.getUTCDay()];
  } catch (e) {
    return "";
  }
};

export function Content(props:any) {
  const { dataSessions, statusFilter, studentId } = props;
  const [atendanceId, setAtendanceId] = useState("");
  const [newSchedules, setNewSchedules] = useState({
    scheduleId: "",
    courseId: "",
    locationId: "PENALOLEN-COMUNIDAD-ECOLOGICA",
  });
  
  
  const [sessionSlideover, setSessionSlideover] = useState(false);
  const [slideAdmin, setSlideAdmin] = useState(false);
  const [idLocation, setIdLocation] = useState("PENALOLEN-COMUNIDAD-ECOLOGICA");
  const [dataSession, setDataSession] = useState({})
  // const [dataSession, setDataSession] = useState({
  //   id: "",
  //   sessionNumber: "",
  //   date: "",
  //   month: "",
  //   year: "",
  //   status: "",
  //   location: "",
  //   locationIdUsed: "",
  //   studentId: "",
  //   enrollmentId: "",
  //   startDate: "",
  // });
  const [selectedSlots, setSelectedSlots] = useState<any[]>([]);
  
  const dispatch = useAppDispatch();
  
  
  const { locations, status } = useAppSelector(selectLocation);
  const { schedules } = useAppSelector(selectSchedules);
  const { emailAuth } = useAppSelector(selectAuth);
  

  
  async function updateSession(params:InputOptions){
    setAtendanceId(params.sessionId || "")
    console.log("updateSession(params): ", params)
    await Promise.all([
      // await dispatch(setSessionDetails({ 
      await dispatch(setSessionDetails({ 
        ...params,
        modifiedBy: emailAuth,
        
        // sessionId: params.sessionId, 
        // status: params.status || "USED",
        // locationId:params?.locationId,
        // locationIdUsed:params?.locationId,
        // date:params?.date,
        // sessionDate: params?.date
      })),
      
      // await dispatch(getSessionDetails({
      //   sessionDate: String(date?.dateUtc), 
      //   locationId: date?.locationId
      // })),
      await dispatch(getSessionByStudent({
        studentId:studentId, 
        status:statusFilter?.text || "ACTIVE"
      })),
      setAtendanceId("")
      
    ]);
  }
  
  const handleLocations = async (    
    locationId: string,
  ) => {
    await dispatch(getSchedulesByLocationAndCourse({ locationId: locationId }));
    setIdLocation(locationId)
    
  };
  const handleTimeSlotClick = async (
    data: any,
    isChecked: boolean
  ) => {
    if (isChecked) {
      // Si se marca el checkbox, agregarlo
      const isAlreadySelected = selectedSlots.some(
        (slot) => slot.sessionId === data.id || slot.id === data.id
      );

      if (!isAlreadySelected) {
        setSelectedSlots((prev) => [...prev, { 
          ...data,
          sessionId: data.id || data.sessionId
        }]);
      }
    } else {
      // Si se desmarca el checkbox, eliminarlo
      setSelectedSlots((prev) => prev.filter(
        (slot) => (slot.sessionId !== data.id && slot.id !== data.id)
      ));
    }
  };
  
  const handleClose = () => {
    setSlideAdmin(false);
  };
   // Función para remover un slot del array
  const handleRemoveSlot = (id: string) => {
    setSelectedSlots((prev) => {
      const filtered = prev.filter((slot) => slot.sessionId !== id);
      // Si el array queda vacío, cerrar el slideover
      if (filtered.length === 0) {
        handleClose();
      }
      return filtered;
    });
  };

  // Función para actualizar la fecha de un slot
  const handleDateChange = (sessionId: string, newDate: string) => {
    setSelectedSlots((prev) => {
      return prev.map((slot) => {
        if (slot.sessionId === sessionId) {
          // Formatear la fecha con T00:00:00.000Z para mantener consistencia
          const formattedDate = `${newDate}T00:00:00.000Z`;
          return {
            ...slot,
            date: formattedDate,
            dateString: formattedDate,
          };
        }
        return slot;
      });
    });
  };
  
   // Función para remover un slot del array
  const handleModifiedSchedule = async () => {
    
    
    await dispatch(setSessionMasive({
      sessions: [...selectedSlots],
      newCourseId: newSchedules?.courseId,
      newScheduleId: newSchedules?.scheduleId,
      newLocationId: newSchedules?.locationId,
    }))
    
    // Limpiar selectedSlots después de procesar
    setSelectedSlots([]);
    
    handleClose() 
    
    if (studentId) {
      await dispatch(getSessionByStudent({studentId:studentId, status:"ACTIVE"}))
    }
  };
  
  
    
// getSchedulesByLocationAndCourse({ locationId: "1", courseId: "1" });
useEffect(() => {
  const loadScheduleData = async () => {
    // if (state?.id) {
      await dispatch(getSchedulesByLocationAndCourse({ locationId: idLocation }));
    // }
  };
  
  loadScheduleData();
}, []);
// }, [state?.id, dispatch]);

  return(
    <>
          {/* MODIFICACION MASIVA SESIONES */}
      <Slideover staticBackdrop open={slideAdmin} onClose={handleClose}>
        <Slideover.Panel>
          <a
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              handleClose();
            }}
            className="absolute top-0 left-0 right-auto mt-4 -ml-12"
            href="#"
          >
            <Lucide icon="X" className="w-8 h-8 text-slate-400" />
          </a>
          <Slideover.Title className={``}>
            <h2 className="mr-auto text-base font-medium">Detalles del Slot</h2>
          </Slideover.Title>
          <Slideover.Description>
            {/* <pre>{JSON.stringify(newSchedules, null, 2)}</pre> */}
            <div className="mb-4 flex flex-row flex-wrap gap-6 justify-between">
              {Array.isArray(selectedSlots) &&
                selectedSlots.map((schedule: any, index) => (
                  <>
                    <div
                    key={schedule.sessionId}
                    className="relative min-w-[46%] flex flex-col items-start justify-between"
                    >
                    <button 
                      className="absolute w-8 h-8 px-1 py-1 top-3 right-3 z-10 rounded-full bg-red-400 hover:bg-black text-white"
                      onClick={() => handleRemoveSlot(schedule.sessionId)}
                    >
                        <Lucide
                          icon="X"
                          className="w-6 h-6 my-auto  stroke-[1.3]"
                        />
                    </button>
                      {/* <pre>{JSON.stringify(schedule, null, 2)}</pre> */}
                      <div
                        id="scheduleButton"
                        // className={`relative group w-full px-4 py-4 border rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200 text-white hover:text-slate-700 border-black bg-primary/80`}
                        className={` flex flex-col justify-start items-start w-full px-4 py-4 rounded-lg shadow-lg  text-slate-700  border-black bg-slate-200/80`}
                        // 
                      >
                        {/* <div className="relative w-40"> */}
                        {/* TODO: 
                        * FEATURE: CAMBIAR FECHA
                        */}
                        {/* <div className="mt-1 text-xl text-slate-800  mb-1">{schedule?.dateString}</div> */}
                        {/* <div className="flex flex-row justify-start items-center">
                          <span className="mr-6">Fecha:</span>
                          <div className="relative w-40">
                            <Lucide
                              icon="Calendar"
                              className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                            />
                            <Litepicker
                              value={String(schedule?.dateString || schedule?.date || '').replace("T00:00:00.000Z", '')}
                              type="text"
                              name={`date-${schedule.sessionId}`}
                              onChange={(e) => {
                                const newDate = String(e.target.value).replace("T00:00:00.000Z", '');
                                if (newDate && schedule.sessionId) {
                                  handleDateChange(schedule.sessionId, newDate);
                                }
                              }}
                              options={{
                                autoApply: true,
                                showWeekNumbers: false,
                                format: "YYYY-MM-DD",
                                singleMode: true,
                                // Formatear la fecha de salida como ISO 8601
                                setup: (picker) => {
                                  picker.on("selected", (date1) => {
                                    // Convertir a formato ISO 8601
                                    const isoDate = date1.format("YYYY-MM-DD");
                                    if (schedule.sessionId) {
                                      handleDateChange(schedule.sessionId, isoDate);
                                    }
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
                        </div> */}
                        <div className="flex flex-row justify-start items-start">
                          <span className="mr-6">Fecha:</span>
                          <span className="relative w-40 font-semibold">
                          {String(schedule?.dateString || schedule?.date || '').replace("T00:00:00.000Z", '')}
                          </span>
                        </div>
                        <div className="flex flex-row justify-start items-start px-4 py-4">
                          <span className="uppercase bg-slate-300 text-slate-700 rounded-full px-3 py-2 mr-2">
                            {schedule?.schedule?.day || 'N/A'} {schedule?.schedule?.startHour || ''}
                          </span>
                          <span className="uppercase bg-slate-300 text-slate-700 rounded-full px-3 py-2 ">
                          {schedule?.course?.title || 'Sin curso'} 
                          </span>
                        </div>
                        
                        <div className="flex flex-row justify-start items-start ">
                          <span className="uppercase border-2 border-slate-300 text-slate-700 rounded-full px-3 py-2 mr-2">
                          {schedule?.locationId}
                          </span>
                          <span className="uppercase bg-green-500/45 text-slate-700 rounded-full px-3 py-2 ">
                          {typeOfSession[schedule?.status || ""]}
                          </span>
                        </div>
                      
                        
                        {/* <p className="min-w-96 uppercase">{schedule?.course?.title} 
                          <span className="uppercase bg-slate-700 rounded-full ml-4 px-2 py-2">
                            {schedule?.schedule.day} {schedule?.schedule.startHour}
                          </span>
                        </p> */}
                        
    
    {/* course.title
    
    schedule.startHour */}
                        
                        {/* <p className="uppercase mt-4">{schedule?.locationId} <span className="uppercase mt-4 bg-primary text-white rounded-full px-2 py-3 ">{typeOfSession[schedule?.status || ""]}</span></p>
                        <Lucide
                          icon="X"
                          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-2 right-2 bg-white rounded-full p-1"
                        /> */}
                      </div>
                    </div>
                  </>
                ))}
            </div>
            {status === "loading" && (
              <div className="w-full flex justify-center items-center h-[350px]">
                <LoadingIcon
                  icon="puff"
                  color="rgb(86, 193, 0)"
                  className="m-8 h-20"
                />
              </div>
            )}
            
              <label className="inline-block mb-2 mt-5 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Sede:</div>
                  </div>
                </div>
              </label>
            <div className="flex-col block pt-2 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <div className="flex-1 w-full mt-3 xl:mt-0 ">
                  {Array.isArray(locations) &&
                    locations?.map((item, i) => (
                      <>
                        <Button
                        key={`${i}-LOCATIONS-USED`}
                        onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        handleLocations( item?.id )
                        setNewSchedules({
                          ...newSchedules ,
                          locationId: item?.id,
                        })
                        // setIdLocation( item?.id )
                      }} 
                      // className={`shadow-none border m-0 p-0  px-5 mr-2 mb-1  h-12`}                             
                      className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${item?.id === idLocation && "bg-green-200"}`}
                      >
                        <span
                            className="group flex justify-center items-center text-xs rounded-md uppercase ">
                            <span className="-mt-px text-center">
                            
                            {/* <p className="text-center line-clamp-1 text-xs text-slate-400">{item?.name}</p> */}
                            <p className={`text-center line-clamp-1 text-xs text-slate-400 `} >{item?.name}</p>
                            {/* <p className={`text-center line-clamp-1 text-xs text-slate-400  ${item?.id === dataNew?.locationIdUsed && "text-slate-500"}`}>{item?.name}</p> */}
                            </span>
                        </span>
                        
                      </Button>
                      </>
                    ))}
              </div>
            </div>
            
            <label className="inline-block mb-2 mt-5 sm:mb-0 sm:mr-5 sm:text-right  xl:mr-14">
                <div className="text-left">
                  <div className="flex flex-col items-start">
                    <div className="font-medium">Cursos en</div>
                    <p className="bg-slate-200 px-4 py-3 rounded-full">{idLocation}</p>
                  </div>
                </div>
              </label>
            <div className="flex-col block pt-2 mt-2 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <div className="flex-1 w-full mt-3 xl:mt-0 ">
                <FormSelect
                 key="SELECT-SCHEDULES"
                 className="!box uppercase mr-3"
                 onChange={(e) =>{
                    const selectedScheduleId = e.target.value;
                    // Buscar el schedule seleccionado en el array para obtener el courseSchedulesId
                    const selectedSchedule = schedules?.find((item: any) => item?.id === selectedScheduleId);
                    
                    setNewSchedules({
                      ...newSchedules,
                      scheduleId: selectedScheduleId,
                      courseId: selectedSchedule?.courseSchedulesId || "",
                    });
                   }
                 }
               >
                
                  {Array.isArray(schedules) &&
                    schedules
                      .filter((item: any) => item?.isActive !== false)
                      .sort((a: any, b: any) => {
                        // Ordenar por day
                        const dayCompare = (a?.day || "").localeCompare(b?.day || "");
                        if (dayCompare !== 0) return dayCompare;
                        
                        // Si los días son iguales, ordenar por startHour
                        const hourCompare = (a?.startHour || "").localeCompare(b?.startHour || "");
                        if (hourCompare !== 0) return hourCompare;
                        
                        // Si las horas son iguales, ordenar por courseSchedulesId
                        return (a?.courseSchedulesId || "").localeCompare(b?.courseSchedulesId || "");
                      })
                      .map((item: any, i: number) => (
                        <option
                          key={`${i}-SCHEDULES`}
                          value={item?.id}
                        >
                          {`${item?.day} - ${item?.startHour} - ${item?.courseSchedulesId}`}
                        </option>
                      ))}
                    </FormSelect>
              </div>
            </div>
                    
          </Slideover.Description>
          <Slideover.Footer>
            {/* Botón sticky al final de la pantalla */}
            <div className=" w-full bg-white border-t border-gray-200 p-4 flex justify-center">
              <button
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-[#d0155a] transition-colors duration-200"
                onClick={() => handleModifiedSchedule()}
              >
                MODIFICAR SESIONES SELECCIONADAS
              </button>
            </div>
          </Slideover.Footer>
        </Slideover.Panel>
      </Slideover>
      
      
    
    
      <Slideover
        size="xl"
        key="Slide-sessions333"
        open={sessionSlideover}
        onClose={() => {
          setSessionSlideover(false);
        }}
      >
        <Slideover.Panel className="w-screen sm:w-full rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e:any) => {
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
              schedules={schedules}
            />
           
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      
      {selectedSlots.length > 0 && (
        <button
          id="selected"
          onClick={() => setSlideAdmin(true)}
          className="fixed top-1/2 -right-20 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-200 font-medium "
        >
          <p className="px-4 py-2 font-normal flex flex-col justify-between">
            {" "}
            SESIONES SELECCIONADOS{" "}
            <b className="text-2xl mt-2">{selectedSlots.length}</b>
          </p>
        </button>
      )}
      
      {/* <pre>{JSON.stringify(selectedSlots, null, 2 )}</pre> */}
      <div className="overflow-auto xl:overflow-visible text-base">
      {/* { status === "idle" &&  */}
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
          <Table.Tr>
              <Table.Td className=" text-left font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              
              </Table.Td>
              {/* <Table.Td className=" text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Fecha
              </Table.Td> */}
              {/* <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              
              </Table.Td> */}
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
              <Table.Td className="  text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Modificado por
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
            .map((item:any, index:number)=>
              <>
                  {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                  <Table.Tr key={index} 
                    className={`[&_td]:last:border-b-0 
                      ${item?.totalSessions === 1 && "bg-slate-100"}
                      ${atendanceId === item?.id && "bg-yellow-100"}
                      `
                    }
                    >
                    <Table.Td className="w-4 py-4 border-dashed">
                      
                      <div className="flex items-center justify-center">
                        {(["RECOVERED", "ACTIVE"].includes(item?.status) || 
                          (item?.status === "USED" && emailAuth === "hi@manuelo.dev")) && (
                          <FormCheck.Input
                            type="checkbox"
                            checked={selectedSlots.some(
                              (slot) => slot.id === item?.id
                            )}
                            onChange={(e) => {
                              e.stopPropagation(); // Evitar que se ejecute el onClick del Table.Tr
                              const isChecked = e.target.checked;
                              handleTimeSlotClick(
                                {
                                  ...item,
                                  dateString: formatDateUTC(item?.date) || "",
                                  sessionId: item?.id
                                },
                                isChecked
                              );
                            }}
                          />
                        )}
                      </div>
                    </Table.Td>
                    {/* <Table.Td className="w-72 py-4 border-dashed">
                        <p className="font-semibold mr-2">{getDayOfWeekShort(item?.date)}</p>
                      <p className=" text-sm">
                        {formatDateUTC(item?.date)}
                      </p>
                    </Table.Td> */}
                    {/* <Table.Td className="w-1 py-4 border-dashed text-center">
                      <span className="min-w-3 min-h-2  max-w-3 max-h-2 px-2 py-1 rounded-full text-white bg-slate-400 text-[0.74rem]">{item?.sessionNumber}</span>
                    </Table.Td> */}
                    <Table.Td className="w-24 py-4 border-dashed">
                    <p className="font-thin mr-2">{getDayOfWeekShort(item?.date)}</p>
                      <b className=" text-sm">
                        {formatDateUTC(item?.date)}
                      </b>
                      
                      <p
                          className={clsx([
                              "group flex justify-center items-center text-xs rounded-md border  mt-2",
                              // "bg-slate-700 text-white",
                              item?.status === "ACTIVE" &&  "bg-green-50 font-thin ",
                              item?.status === "USED" &&  "bg-red-50 border-red-200",
                              item?.status === "RECOVERED" &&  "bg-blue-50 border-blue-200",
                              item?.status === "DELETED" &&  "bg-slate-200 border-slate-200 text-slate-500",
                              "w- h-10",
                          ])}
                          >
                          <span className="text-center">  
                            <span className="mr-3 min-w-3 min-h-2  max-w-3 max-h-2 px-2 py-1 rounded-full text-white bg-slate-400 text-[0.74rem]">{item?.sessionNumber}</span>
                            <span className="text-sm">{typeOfSession[item?.status || ""]}</span>
                          </span>
                      </p>
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
                    <Table.Td className="w-20  py-4 border-dashed text-left">
                      <p className="text-[0.7rem] text-slate-400">{item?.modifiedBy}</p>
                      <p className="text-[0.7rem] text-slate-400">
                        {item?.modifiedByDate 
                          ? new Date(item.modifiedByDate).toLocaleString('es-CL', {
                              timeZone: 'America/Santiago',
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })
                          : ''}
                      </p>
                    </Table.Td>
                    <Table.Td className="w-10 py-4 border-dashed">
                      <div className="flex flex-row">
                        {
                          statusFilter &&
                            <Button
                              className="mr-2 w-full border-primary/80 border-2"
                              onClick={() => {
                                  updateSession({
                                    ...item,
                                    status: "USED",
                                  })
                                }}
                            ><Lucide className="w-10 h-10 sm:w-8 sm:h-8 stroke-[1] text-primary" icon="Check" /><p className="text-[.7rem]  uppercase text-primary/80">
                              Marcar Presente</p>
                            </Button>
                        }
                        {/* <pre>id= {JSON.stringify(item, null, 2)}</pre> */}
                        {/* 
                        <pre>{JSON.stringify(dataSession, null, 2)}</pre> */}
                        <Button
                          // variant="primary"
                          className="bg-slate-200"
                          
                           onClick={() => {
                             setSessionSlideover(true);
                             setDataSession({
                               ...item, 
                               scheduleName: `${item?.schedule?.day} ${item?.schedule?.startHour}` || "",
                               locationIdUsed: item?.locationIdUsed==="" && item?.locationId,
                               studentId:studentId, 
                               enrollmentSessionDetailsId: item?.enrollmentSessionDetailsId, 
                               wasEmailSent: false,
                              })
                              // startDate:item?.date,
                              // totalSessions:item?.totalSessions,
                             
                              // courseId: item?.courseId || "",
                              // courseName: item?.course?.title || "",
                              // scheduleId: item?.scheduleId || "",
                           }}
                        ><span className="text-sm uppercase">Editar</span></Button>
                         <div className="flex items-center justify-center">
                        <Menu className="h-5">
                          <Menu.Button className="w-5 h-5 text-slate-500"
                          >
                            <Lucide
                              icon="MoreVertical"
                              className="w-15 h-15 stroke-slate-400/70 fill-slate-400/70"
                            />
                          </Menu.Button>
                         <Menu.Items className="w-40">
                            {/* <Menu.Item 
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
                            >
                              <Lucide
                                icon="WalletCards"
                                className="w-4 h-4 mr-2"
                              />{" "}
                              Editar
                            </Menu.Item> */}


                            <Menu.Item
                            onClick={() => {
                              updateSession({
                                ...item, 
                                status: "DELETED",
                              })
                              
                              // updateSession({
                              //   sessionId: item?.id, 
                              //   status: "DELETED",
                              //   locationId:item?.locationId,
                              //   locationIdUsed:item?.locationId,
                              //   date:item?.date
                              // })
                            }}
                            >
                              <Lucide icon="X" className="w-4 h-4 mr-2" />
                              Eliminar
                            </Menu.Item>
                          </Menu.Items> 
                        </Menu>
                      </div>
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
  const { emailAuth } = useAppSelector(selectAuth);
  
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
  
        <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
          <div className="col-span-12">
            <div className="flex flex-col gap-y-7">
              <div className="flex flex-col p-5 box min-h-[600px]">
               
               <div className="flex flex-row justify-between">
                <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem] uppercase">
                  <h2 className="text-2xl uppercase">
                    {statusFilter.text === "ACTIVE" && "Sesiones Disponibles"}
                    {statusFilter.text === "USED" && "Sesiones Usadas"}
                    {statusFilter.text === "DELETED" && "Sesiones Eliminadas"}
                    {/* {emailAuth === "hi@manuelo.dev" && ( */}
                    {(emailAuth === "hi@manuelo.dev" || emailAuth === "loreto.gonzález.or@gmail.com") &&
                      <span className="ml-4 p-2 bg-red-400 text-white rounded-full text-sm">ADMIN</span>
                    }
                  </h2>
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
                          key={`USED-STATUS`}
                          value="USED"
                          selected={"USED" === statusFilter?.text && true}
                        >Sesiones Utilizadas
                        </option>
                        <option
                          key={`DELETED-STATUS`}
                          value="DELETED"
                          selected={"DELETED" === statusFilter?.text && true}
                        >Sesiones Eliminadas
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