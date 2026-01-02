
import LoadingIcon from "@/components/Base/LoadingIcon";
import {FormInput} from "@/components/Base/Form";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import ListParams from "@/components/ListParams";

import { calcularEdad, convertirFecha } from "@/utils/dateHandler";import { useState, useEffect } from "react";
import { formatDateUTC } from "@/utils/helper";
import {typeOfSession} from "@/utils/dictionary";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';

import { getEnrollmentsExpiring, selectEnrollment } from "@/stores/Enrollment/slice"; 
import { getLocationsOnly, selectLocation } from '../../../stores/Locations/slice';

function Content(props: any) {
  const {sessions} = props;
  const dispatch = useAppDispatch();
  
  // Validar que sessions sea un array
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return (
      <div className="overflow-auto xl:overflow-visible">
        <Table className="border-b border-slate-200/60">
          <Table.Tbody>
            <Table.Tr>
              <Table.Td colSpan={10} className="py-8 text-center text-slate-500">
                No hay inscripciones por vencer
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
    );
  }
  
  // Ordenar sesiones por date y luego por sessionDetailStudentId
  const sortedSessions = [...sessions].sort((a: any, b: any) => {
    // Primero ordenar por fecha
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    
    if (dateA !== dateB) {
      return dateA - dateB;
    }
    
    // Si las fechas son iguales, ordenar por sessionDetailStudentId
    const studentIdA = a.sessionDetailStudentId || "";
    const studentIdB = b.sessionDetailStudentId || "";
    return studentIdA.localeCompare(studentIdB);
  });
  
  // Agrupar sesiones por sessionDetailStudentId para mostrar información del estudiante
  const sessionsByStudent: { [key: string]: any[] } = {};
  
  sortedSessions.forEach((session: any) => {
    const studentId = session.sessionDetailStudentId;
    if (studentId) {
      if (!sessionsByStudent[studentId]) {
        sessionsByStudent[studentId] = [];
      }
      sessionsByStudent[studentId].push(session);
    }
  });
  
  // Convertir a array y ordenar por la primera fecha de cada estudiante
  const groupedSessions = Object.keys(sessionsByStudent).map((studentId) => {
    const studentSessions = sessionsByStudent[studentId];
    const firstSession = studentSessions[0];
    
    return {
      studentId,
      studentName: firstSession.name || "",
      studentLastName: firstSession.lastName || "",
      contactPhone: firstSession.contactPhone || "",
      emailPhone: firstSession.emailPhone || "",
      studentBirthdate: firstSession.birthdate || "",
      sessions: studentSessions,
      course: firstSession.course || "",
      courseId: firstSession.courseId || "",
      totalSessions: firstSession.totalSessions || 0,
      // Calcular estadísticas
      totalActive: studentSessions.filter((s: any) => 
        s.status === 'ACTIVE' || s.status === 'RECOVERED'
      ).length,
      
      // inLastMonth: studentSessions.filter((s: any) => {
      //   const today = new Date();
      //   const oneMonthAgo = new Date(today);
      //   oneMonthAgo.setDate(today.getDate() - 30);
      //   const sessionDate = new Date(s.date);
      //   return (s.status === 'ACTIVE' || s.status === 'RECOVERED') &&
      //          sessionDate >= oneMonthAgo && sessionDate <= today;
      // }).length
    };
  });
  
  // Ordenar grupos primero por totalActive (descendente) y luego por fecha (ascendente)
  groupedSessions.sort((a: any, b: any) => {
    // Primero ordenar por totalActive (mayor a menor)
    if (a.totalActive !== b.totalActive) {
      return a.totalActive - b.totalActive;
    }
    
    // Si totalActive es igual, ordenar por fecha (más antiguos primero)
    const dateA = a.sessions[0]?.date ? new Date(a.sessions[0].date).getTime() : 0;
    const dateB = b.sessions[0]?.date ? new Date(b.sessions[0].date).getTime() : 0;
    
    return dateA - dateB;
  });
  
  return (
    <>
      <div className="overflow-auto xl:overflow-visible">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Estudiante
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Curso
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Sesiones Activas
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Detalle Sesiones
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Total Sesiones
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {groupedSessions.length > 0 ? (
              groupedSessions.map((group: any, index: number) => {
                const activeSessions = group.sessions.filter((s: any) => 
                  s.status === 'ACTIVE' || s.status === 'RECOVERED'
                );
                const edad:any = group.studentBirthdate && calcularEdad(String(group.studentBirthdate === "" ? "1800/01/01":group.studentBirthdate));
  
                return (
                  <Table.Tr key={group.studentId || index} 
                  className={`[&_td]:last:border-b-0
                  ${group.totalActive === 1 && "bg-danger/10 border-slate-300 border-b"}
                  `}>
                    <Table.Td className="py-4 border-dashed">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium">
                            {group.studentName} {group.studentLastName}
                          </div>
                          <div className="text-xs text-slate-500">
                            { group.studentBirthdate && edad?.años > 100 ? "SIN EDAD":`${edad?.años || ""} años, ${edad?.meses || ""} meses`}
                          </div>
                          <div className="text-xs text-slate-500 pt-2">
                          {group.emailPhone}
                          </div>
                          <div className="text-xs text-slate-500 pt-1">
                          {group.contactPhone}
                          </div>
                         
                          
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td className="py-4 border-dashed text-center">
                      <div className="text-sm">
                        {group.course || "-"}
                      </div>
                    </Table.Td>
                    <Table.Td className="py-4 border-dashed text-center">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${group.totalActive < 4 ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"}
                      `}>
                        {group.totalActive}
                      </div>
                    </Table.Td>
                    <Table.Td className="py-4 border-dashed">
                      <div className="flex flex-col gap-1 max-w-xs">
                        {activeSessions && activeSessions.length > 0 ? (
                          activeSessions.map((session: any, sessionIndex: number) => {
                            return (
                              <div 
                                key={`${session.sessionDetailStudentId}-${sessionIndex}`}
                                className={clsx([
                                  "relative group flex flex-col justify-center items-center text-xs rounded-md border pt-4 mr-2 mb-1",
                                  session?.status ===
                                    "ACTIVE" &&
                                    "bg-green-50 font-thin ",
                                  session?.status ===
                                    "USED" &&
                                    "bg-red-50 border-red-200",
                                  session?.status ===
                                    "RECOVERED" &&
                                    "bg-blue-50 border-blue-200",
                                  session?.status ===
                                    "DELETED" &&
                                    "bg-slate-200 border-slate-200 text-slate-500",
                                ])}
                                title={`Fecha: ${session.date}, Estado: ${session.status}, Sesión: ${session.sessionNumber}/${session.totalSessions}`}
                              >
                                <span className="font-medium"> {formatDateUTC(session.date)}</span>
                                {/* <span className="ml-1 text-slate-500">( {typeOfSession[session?.status || ""]})</span> */}
                                {session.scheduleDay && session.scheduleStartHour && (
                                  <p className="ml-1 text-slate-400 text-xs">
                                    {session.scheduleDay} {session.scheduleStartHour}
                                  </p>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </div>
                    </Table.Td>
                    <Table.Td className="py-4 border-dashed text-center">
                      <div className="text-sm">
                        {group.totalSessions}
                      </div>
                    </Table.Td>
                   
                  </Table.Tr>
                );
              })
            ) : (
              <Table.Tr>
                <Table.Td colSpan={10} className="py-8 text-center text-slate-500">
                  No hay inscripciones por vencer
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}

function Main() {
  const selectedDate = new Date();
  const day2 = String(selectedDate.getDate()).padStart(2, '0');
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const fullYear = String(selectedDate.getFullYear());
   // Calcular primer y último día del mes actual en UTC
   const now = new Date();
   const firstDayOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
   const lastDayOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));
   
   const firstDayUtc = firstDayOfMonth.toISOString();
   const lastDayUtc = lastDayOfMonth.toISOString();
         
  const [showAllDates, setShowAllDates] = useState(false); // Estado para controlar si se muestran todos los registros
  const [date, setDate] = useState({
    dateChile: String(selectedDate),
    dateShow: String(`${day2}-${month}-${fullYear}`),
    dateUtc: String(`${fullYear}-${month}-${day2}T00:00:00.000Z`),
    dateMonth: String(`${fullYear}-${month}`), // Formato YYYY-MM para el Litepicker
    firstDayOfMonthUtc: firstDayUtc,
    lastDayOfMonthUtc: lastDayUtc,
    locationId: "PENALOLEN-COMUNIDAD-ECOLOGICA",
  });
  
  const {locationsList, locations } = useAppSelector(selectLocation);
  const {enrollmentsExpiring, status} = useAppSelector(selectEnrollment);
  const dispatch = useAppDispatch();
  // dispatch(setBreadcrumb({first:"Inscripciones por Vencer", firstURL:"enrollments-expiring"}));

    // Función helper para formatear mes y año
    const formatMonthYear = (dateString: string): string => {
      if (!dateString) return '';
      try {
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) return dateString;
        
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const month = months[dateObj.getUTCMonth()];
        const year = dateObj.getUTCFullYear();
        
        return `${month} ${year}`;
      } catch (e) {
        return dateString;
      }
    };
  
  async function updateDate(dateStr:any){
    
    // Validar que dateStr no sea null, undefined o vacío
    if (!dateStr) {
      console.error("---dateStr es inválido---", dateStr);
      return;
    }
    
    // Mapeo de meses en español (abreviados y completos)
    const mesesEspanol: { [key: string]: number } = {
      'ene': 1, 'enero': 1,
      'feb': 2, 'febrero': 2,
      'mar': 3, 'marzo': 3,
      'abr': 4, 'abril': 4,
      'may': 5, 'mayo': 5,
      'jun': 6, 'junio': 6,
      'jul': 7, 'julio': 7,
      'ago': 8, 'agosto': 8,
      'sep': 9, 'septiembre': 9,
      'oct': 10, 'octubre': 10,
      'nov': 11, 'noviembre': 11,
      'dic': 12, 'diciembre': 12
    };
    
    // Intentar parsear la fecha de diferentes formas
    let selectedDate: Date;
    
    // Si dateStr ya es un objeto Date
    if (dateStr instanceof Date) {
      selectedDate = dateStr;
    } 
    // Si es un string, intentar parsearlo
    else if (typeof dateStr === 'string') {
      // Si viene en formato "1 dic, 2025" o similar (español)
      const formatoEspanol = /^(\d{1,2})\s+([a-záéíóúñ]+),?\s+(\d{4})$/i.exec(dateStr.trim());
      if (formatoEspanol) {
        const [, day, monthName, year] = formatoEspanol;
        const monthNum = mesesEspanol[monthName.toLowerCase()];
        if (monthNum) {
          selectedDate = new Date(Date.UTC(parseInt(year), monthNum - 1, parseInt(day), 0, 0, 0, 0));
        } else {
          selectedDate = new Date(dateStr);
        }
      }
      // Si viene en formato YYYY-MM (solo mes y año), usar el primer día del mes
      else if (/^\d{4}-\d{2}$/.test(dateStr)) {
        selectedDate = new Date(dateStr + '-01T00:00:00.000Z');
      }
      // Si viene en formato YYYY-MM-DD, parsearlo directamente
      else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        selectedDate = new Date(dateStr + 'T00:00:00.000Z');
      }
      // Si viene en formato DD-MM-YYYY, convertirlo
      else if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        const [day, month, year] = dateStr.split('-');
        selectedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      }
      // Intentar parseo estándar
      else {
        selectedDate = new Date(dateStr);
      }
    }
    // Si es un número (timestamp)
    else if (typeof dateStr === 'number') {
      selectedDate = new Date(dateStr);
    }
    // Fallback
    else {
      selectedDate = new Date(dateStr);
    }
    
    // Validar que la fecha sea válida
    if (isNaN(selectedDate.getTime())) {
      console.error("---Fecha inválida---", dateStr, selectedDate);
      return;
    }
    
    console.log("---dateStr---", dateStr, "---selectedDate---", selectedDate);
    
    const day2 = String(selectedDate.getUTCDate()).padStart(2, '0');
    const month = String(selectedDate.getUTCMonth() + 1).padStart(2, '0');
    const fullYear = String(selectedDate.getUTCFullYear());
    
    // Formatear fecha en formato requerido: YYYY-MM-DD
    const dateFormated = `${fullYear}-${month}-${day2}`;
    
    // Recalcular primer y último día del mes de la fecha seleccionada en UTC
    const firstDayOfMonth = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), 1, 0, 0, 0, 0));
    const lastDayOfMonth = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth() + 1, 0, 23, 59, 59, 999));
    const firstDayUtc = firstDayOfMonth.toISOString();
    const lastDayUtc = lastDayOfMonth.toISOString();

    setDate({
      ...date,
      dateChile: selectedDate.toISOString(), //newDateChile
      dateUtc: String(`${dateFormated}T00:00:00.000Z`),
      dateShow: String(`${day2}-${month}-${fullYear}`),
      dateMonth: String(`${fullYear}-${month}`), // Formato YYYY-MM para el Litepicker
      firstDayOfMonthUtc: firstDayUtc,
      lastDayOfMonthUtc: lastDayUtc,
    });
    

    await dispatch(getEnrollmentsExpiring({
      sessionDate: dateFormated, 
      locationId: date?.locationId
    }))
    // await dispatch(getSessionDetails({
    //   sessionDate: String(`${fullYear}-${month}-${day2}T00:00:00.000Z`), 
    //   locationId: date?.locationId
    // }))
  }
   // Función para navegar al mes anterior
   const navigateToPreviousMonth = async () => {
    if (!date?.firstDayOfMonthUtc) return;
    
    const currentDate = new Date(date.firstDayOfMonthUtc);
    const previousMonth = new Date(Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth() - 1,
      1,
      0, 0, 0, 0
    ));
    
    const year = previousMonth.getUTCFullYear();
    const month = String(previousMonth.getUTCMonth() + 1).padStart(2, '0');
    const dateMonthStr = `${year}-${month}`;
    
    await updateDate(dateMonthStr);
  };
  
  // Función para navegar al mes siguiente
  const navigateToNextMonth = async () => {
    if (!date?.firstDayOfMonthUtc) return;
    
    const currentDate = new Date(date.firstDayOfMonthUtc);
    const nextMonth = new Date(Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth() + 1,
      1,
      0, 0, 0, 0
    ));
    
    const year = nextMonth.getUTCFullYear();
    const month = String(nextMonth.getUTCMonth() + 1).padStart(2, '0');
    const dateMonthStr = `${year}-${month}`;
    
    await updateDate(dateMonthStr);
  };
  
  async function handleSearchChange(){
    await dispatch(getEnrollmentsExpiring({
      sessionDate: date.dateUtc?.split('T')[0] || undefined,
      locationId: date?.locationId || undefined
    }));
  }
  
  useEffect(() => { 
    (async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const dateFormated = `${year}-${month}-${day}`;
      
      await dispatch(getEnrollmentsExpiring({
        sessionDate: dateFormated,
        locationId: date?.locationId || undefined
      }));
    })(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  useEffect(() => { 
    locationsList.length === 0 && dispatch(getLocationsOnly())
  }, [])
  
  return (
    <>
     <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col ">
          
          <h2 className="text-2xl pb-4 font-medium group-[.mode--light]:text-white">Inscripciones por Vencer</h2>
        
          <div className="flex-1 justify-start w-full flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            
            {/* Barra de navegación de meses */}
            <div className="flex items-center justify-between px-6 gap-4 mb-4 bg-white py-4">
              <div className="flex items-center justify-start">
                <div className="w-96">
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
                <Button
                  onClick={navigateToPreviousMonth}
                  className="px-4 py-2 bg-slate-200 border border-slate-300 text-slate-700 hover:bg-slate-300"
                >
                  <Lucide icon="ChevronLeft" className="w-5 h-5" />
                </Button>
                
                <div className="text-lg font-semibold text-slate-700 min-w-[200px] text-center">
                  {formatMonthYear(date?.firstDayOfMonthUtc || '')}
                </div>
                
                <Button
                  onClick={navigateToNextMonth}
                  className="px-4 py-2 bg-slate-200 border border-slate-300 text-slate-700 hover:bg-slate-300"
                >
                  <Lucide icon="ChevronRight" className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="">
                <Button
                  rounded
                  variant="primary"
                  className="px-8 py-3 border border-slate-200"
                  onClick={async () => {
                    await handleSearchChange();
                  }}
                >
                  <Lucide icon="RefreshCcw" className="w-4 h-4 mr-2" />
                  <span className="text-border-slate-200 font-dm-sans">Actualizar</span>
                </Button>
              </div>
              
              
            </div>
          
          </div>
         
        </div>
        {/* <pre>{JSON.stringify(enrollmentsExpiring, null, 2 )}</pre> */}
        <div className="flex flex-col gap-8 mt-3.5">
          <div className="flex flex-col box min-h-screen">
          
            
                { status === "loading" && <div className="flex justify-center"><div className="w-16 h-16"><LoadingIcon
                  color="#AE5EAB"
                  icon="oval"
                  className="w-10 h-10 mt-10"
                /></div></div>}
                
                { status === "idle" && <Content sessions={enrollmentsExpiring} />}
                
         
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Main;
