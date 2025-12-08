import { useState, useEffect, useCallback,Fragment } from "react";
import debounce from 'lodash/debounce';
import { Link } from "react-router-dom";
import clsx from "clsx";
import _, { now } from "lodash";

import { Tab } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import { Slideover } from "@/components/Base/Headless";
import ListParams from "@/components/ListParams";
import Lucide from "@/components/Base/Lucide";
import {CalculateAge} from "@/components/CalculateAge";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getSessionQuotev2, selectSessionDetails, setSessionDetails, getSessionByLocationAndDate } from "@/stores/SessionDetails/slice";
import { InputOptions } from "@/stores/SessionDetails/types";
import {FormInput, FormSelect } from "@/components/Base/Form";

import { getLocationsOnly, selectLocation } from '../../../stores/Locations/slice';

const MAX_QUOTE = 7;

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



function Main() {
  let currentScheduleId:string | null = null;
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
          
  
  const [date, setDate] = useState({
    dateChile: String(selectedDate),
    dateShow: String(`${day2}-${month}-${fullYear}`),
    dateUtc: String(`${fullYear}-${month}-${day2}T00:00:00.000Z`),
    dateMonth: String(`${fullYear}-${month}`), // Formato YYYY-MM para el Litepicker
    firstDayOfMonthUtc: firstDayUtc,
    lastDayOfMonthUtc: lastDayUtc,
    locationId: "",
  });

  const [atendanceId, setAtendanceId] = useState("");
  const [locationIdSelected, setLocationIdSelected] = useState("");

  const [searchTerm, setSearchTerm] = useState('');
  const [showAllDates, setShowAllDates] = useState(false); // Estado para controlar si se muestran todos los registros
  const {sessionDetails, resume, status } = useAppSelector(selectSessionDetails);
  const [filteredStudents, setFilteredStudents] = useState(sessionDetails);
  const {locationsList } = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  
  // Diccionario para traducir estados al español
  const statusTranslations: { [key: string]: string } = {
    'ACTIVE': 'ACTIVA',
    'RECOVERED': 'RECUPERADA',
    'USED': 'USADA',
    'DELETED': 'ELIMINADA',
  };
  
  // Función helper para traducir estados
  const translateStatus = (status: string): string => {
    return statusTranslations[status] || status;
  };
  
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
  
  // Función helper para comparar si una fecha es menor o igual a hoy
  const isDateLessOrEqualToday = (dateString: string): boolean => {
    if (!dateString) return false;
    try {
      const dateObj = new Date(dateString + 'T00:00:00.000Z');
      if (isNaN(dateObj.getTime())) return false;
      
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      dateObj.setUTCHours(0, 0, 0, 0);
      
      return dateObj.getTime() <= today.getTime();
    } catch (e) {
      return false;
    }
  };
  
  // Función helper para comparar si una fecha es mayor o igual a hoy
  const isDateGreaterOrEqualToday = (dateString: string): boolean => {
    if (!dateString) return false;
    try {
      const dateObj = new Date(dateString + 'T00:00:00.000Z');
      if (isNaN(dateObj.getTime())) return false;
      
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      dateObj.setUTCHours(0, 0, 0, 0);
      
      return dateObj.getTime() >= today.getTime();
    } catch (e) {
      return false;
    }
  };
  
  // Función para filtrar, ordenar y generar objetos únicos
  const getUniqueScheduleStrings = () => {
    if (!Array.isArray(sessionDetails)) return [];
    
    // Ordenar primero por schedule.day y luego por schedule.startHour
    const sorted = [...sessionDetails].sort((a: any, b: any) => {
      // Comparar por día
      const dayA = a?.schedule?.day || '';
      const dayB = b?.schedule?.day || '';
      const dayComparison = dayA.localeCompare(dayB);
      if (dayComparison !== 0) return dayComparison;
      
      // Si los días son iguales, comparar por hora
      const hourA = a?.schedule?.startHour || '';
      const hourB = b?.schedule?.startHour || '';
      return hourA.localeCompare(hourB);
    });
    
    // Crear un Map para agrupar por combinación única y contar estados
    const uniqueMap = new Map<string, { 
      dayClass: string; 
      descriptionClass: string;
      activeAndRecovered: number;
      used: number;
    }>();
    
    sorted.forEach((item: any) => {
      const day = item?.schedule?.day || '';
      const startHour = item?.schedule?.startHour || '';
      const description = item?.course?.description || '';
      const status = item?.status || '';
      
      // Crear clave única
      const uniqueKey = `${day}-${startHour}-${description}`;
      
      // Si no existe, crear el objeto inicial
      if (!uniqueMap.has(uniqueKey)) {
        uniqueMap.set(uniqueKey, {
          dayClass: `${day} ${startHour}`,
          descriptionClass: description,
          activeAndRecovered: 0,
          used: 0
        });
      }
      
      // Obtener el objeto y actualizar contadores
      const scheduleObject = uniqueMap.get(uniqueKey)!;
      
      // Contar según el status
      if (status === "ACTIVE" || status === "RECOVERED") {
        scheduleObject.activeAndRecovered += 1;
      } else if (status === "USED") {
        scheduleObject.used += 1;
      }
    });
    
    // Retornar array de objetos únicos con conteos
    return Array.from(uniqueMap.values());
  };
  
  const uniqueScheduleStrings = getUniqueScheduleStrings();
  
  // Función para agrupar sessionDetails por fecha (calendario mensual)
  const getGroupedSessions = () => {
    if (!Array.isArray(sessionDetails)) return [];
    
    // Primero agrupar por fecha, luego por course.id y schedule.id
    const dateMap = new Map<string, Map<string, {
      courseId: string;
      courseTitle: string;
      scheduleId: string;
      scheduleDay: string;
      scheduleStartHour: string;
      statusCount: { [key: string]: number };
      total: number;
      students: Array<{
        name: string;
        lastName: string;
        status: string;
      }>;
    }>>();
    
    sessionDetails.forEach((item: any) => {
      // Extraer la fecha del item (formato esperado: YYYY-MM-DD o similar)
      const itemDate = item?.date || '';
      let dateKey = '';
      
      // Intentar parsear la fecha
      if (itemDate) {
        try {
          const dateObj = new Date(itemDate);
          if (!isNaN(dateObj.getTime())) {
            const year = dateObj.getUTCFullYear();
            const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getUTCDate()).padStart(2, '0');
            dateKey = `${year}-${month}-${day}`;
          }
        } catch (e) {
          // Si falla, usar la fecha tal cual
          dateKey = itemDate.split('T')[0] || itemDate;
        }
      }
      
      if (!dateKey) return;
      
      const courseId = item?.course?.id || '';
      const scheduleId = item?.schedule?.id || '';
      const status = item?.status || '';
      
      // Crear clave única combinando course.id y schedule.id para esta fecha
      const uniqueKey = `${courseId}-${scheduleId}`;
      
      // Inicializar el Map para esta fecha si no existe
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, new Map());
      }
      
      const scheduleMap = dateMap.get(dateKey)!;
      
      // Si no existe, crear el objeto inicial
      if (!scheduleMap.has(uniqueKey)) {
        scheduleMap.set(uniqueKey, {
          courseId: courseId,
          courseTitle: item?.course?.title || '',
          scheduleId: scheduleId,
          scheduleDay: item?.schedule?.day || '',
          scheduleStartHour: item?.schedule?.startHour || '',
          statusCount: {},
          total: 0,
          students: []
        });
      }
      
      // Obtener el objeto y actualizar contadores
      const group = scheduleMap.get(uniqueKey)!;
      
      // Contar todos los tipos de status
      if (status) {
        group.statusCount[status] = (group.statusCount[status] || 0) + 1;
      }
      group.total += 1;
      
      // Agregar información del estudiante
      const studentName = item?.student?.name || '';
      const studentLastName = item?.student?.lastName || '';
      if (studentName || studentLastName) {
        // Verificar si el estudiante ya existe para evitar duplicados
        const studentExists = group.students.some(
          s => s.name === studentName && s.lastName === studentLastName
        );
        if (!studentExists) {
          group.students.push({
            name: studentName,
            lastName: studentLastName,
            status: status || ''
          });
        }
      }
    });
    
    // Ahora agrupar por fecha, luego por courseTitle y scheduleDay
    const result: Array<{
      date: string;
      dateFormatted: string;
      courses: Array<{
        courseId: string;
        courseTitle: string;
        days: Array<{
          scheduleDay: string;
          schedules: Array<{
            scheduleId: string;
            scheduleStartHour: string;
            statusCount: { [key: string]: number };
            total: number;
            students: Array<{
              name: string;
              lastName: string;
              status: string;
            }>;
          }>;
          dayStatusCount: { [key: string]: number };
          dayTotal: number;
        }>;
        totalStatusCount: { [key: string]: number };
        grandTotal: number;
      }>;
      dateStatusCount: { [key: string]: number };
      dateTotal: number;
    }> = [];
    
    // Procesar cada fecha
    dateMap.forEach((scheduleMap, dateKey) => {
      const courseMap = new Map<string, {
        courseId: string;
        courseTitle: string;
        days: Map<string, {
          scheduleDay: string;
          schedules: Array<{
            scheduleId: string;
            scheduleStartHour: string;
            statusCount: { [key: string]: number };
            total: number;
            students: Array<{
              name: string;
              lastName: string;
              status: string;
            }>;
          }>;
          dayStatusCount: { [key: string]: number };
          dayTotal: number;
        }>;
        totalStatusCount: { [key: string]: number };
        grandTotal: number;
      }>();
      
      // Agrupar por courseTitle y luego por scheduleDay dentro de esta fecha
      Array.from(scheduleMap.values()).forEach((schedule) => {
        const courseTitle = schedule.courseTitle;
        const scheduleDay = schedule.scheduleDay;
        
        if (!courseMap.has(courseTitle)) {
          courseMap.set(courseTitle, {
            courseId: schedule.courseId,
            courseTitle: courseTitle,
            days: new Map(),
            totalStatusCount: {},
            grandTotal: 0
          });
        }
        
        const courseGroup = courseMap.get(courseTitle)!;
        
        // Agrupar por día
        if (!courseGroup.days.has(scheduleDay)) {
          courseGroup.days.set(scheduleDay, {
            scheduleDay: scheduleDay,
            schedules: [],
            dayStatusCount: {},
            dayTotal: 0
          });
        }
        
        const dayGroup = courseGroup.days.get(scheduleDay)!;
        
        // Agregar el schedule al array del día
        dayGroup.schedules.push({
          scheduleId: schedule.scheduleId,
          scheduleStartHour: schedule.scheduleStartHour,
          statusCount: schedule.statusCount,
          total: schedule.total,
          students: schedule.students
        });
        
        // Sumar los status counts al total del día
        Object.entries(schedule.statusCount).forEach(([status, count]) => {
          dayGroup.dayStatusCount[status] = (dayGroup.dayStatusCount[status] || 0) + count;
        });
        dayGroup.dayTotal += schedule.total;
        
        // Sumar los status counts al total del curso
        Object.entries(schedule.statusCount).forEach(([status, count]) => {
          courseGroup.totalStatusCount[status] = (courseGroup.totalStatusCount[status] || 0) + count;
        });
        
        courseGroup.grandTotal += schedule.total;
      });
      
      // Ordenar schedules dentro de cada día
      courseMap.forEach((courseGroup) => {
        courseGroup.days.forEach((dayGroup) => {
          dayGroup.schedules.sort((a, b) => 
            a.scheduleStartHour.localeCompare(b.scheduleStartHour)
          );
        });
      });
      
      // Convertir days Map a array ordenado por día
      const courses = Array.from(courseMap.values()).map((courseGroup) => ({
        ...courseGroup,
        days: Array.from(courseGroup.days.values()).sort((a, b) => 
          a.scheduleDay.localeCompare(b.scheduleDay)
        )
      })).sort((a, b) => a.courseTitle.localeCompare(b.courseTitle));
      
      // Calcular totales de la fecha
      const dateStatusCount: { [key: string]: number } = {};
      let dateTotal = 0;
      
      courses.forEach((course) => {
        Object.entries(course.totalStatusCount).forEach(([status, count]) => {
          dateStatusCount[status] = (dateStatusCount[status] || 0) + count;
        });
        dateTotal += course.grandTotal;
      });
      
      // Formatear fecha para mostrar (DIA SEMANA dia, MES, año)
      const dateObj = new Date(dateKey + 'T00:00:00.000Z');
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      
      // Días de la semana en español
      const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];
      
      // Meses en español
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const month = months[dateObj.getUTCMonth()];
      
      const dateFormatted = `${dayOfWeek} ${day}, ${month}, ${year}`;
      
      result.push({
        date: dateKey,
        dateFormatted: dateFormatted,
        courses: courses,
        dateStatusCount: dateStatusCount,
        dateTotal: dateTotal
      });
    });
    
    // Ordenar por fecha
    return result.sort((a, b) => a.date.localeCompare(b.date));
  };
  
  const groupedSessions = getGroupedSessions();
  
  // Filtrar groupedSessions según showAllDates
  const filteredGroupedSessions = showAllDates 
    ? groupedSessions 
    : groupedSessions.filter((dateGroup) => isDateGreaterOrEqualToday(dateGroup.date));
  
 
    
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
    

    await dispatch(getSessionByLocationAndDate({
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
  
  interface Params {
    dateSTR?:string;  
    idLocation?:string;  
  }
  

  
  useEffect(() => { 
    
    console.log("----date?.dateUtc---", date)
    const dateFormated: string = String(date?.firstDayOfMonthUtc).replace("T00:00:00.000Z", "");
    const dateFormatedEnd: string = String(date?.lastDayOfMonthUtc).replace("T00:00:00.000Z", "");
    
    
    
    
    // const dateFormated: string = String(date?.dateUtc).replace("T00:00:00.000Z", "");
    
    (async () =>  await dispatch(getSessionQuotev2({
      sessionDate: String(date?.firstDayOfMonthUtc), 
      sessionDateEnd: String(date?.lastDayOfMonthUtc), 
      locationId: date?.locationId
    }))
  )()
  }, [date]);
  
  useEffect(() => { 
    locationsList.length === 0 && dispatch(getLocationsOnly())
  }, [])
  
  useEffect(() => { setFilteredStudents( [...sessionDetails]); }, [sessionDetails]);
  
  return (
    <>
     
    {/* <pre>{JSON.stringify(sessionDetails, null, 2)}</pre> */}
    {date?.locationId==="" && 
      <>
        <div className="p-1.5 box flex flex-col ">
          <div className="flex flex-col items-center justify-center pt-20 pb-28">
            <Lucide
              icon="Hotel"
              className="w-20 h-20 text-theme-1/20 fill-theme-1/5 stroke-[0.5]"
            />
            <div className="mt-5 text-xl font-medium">
              Seleccione la sede para continuar
            </div>
          <div className=" flex flex-wrap justify-center items-center mt-8">
            { Array.isArray(locationsList) && locationsList.map((location:any, index:number)=>
              <>
              {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}
              { location?.value !== "" && 
                  <Button
                  key={`BUTTON-LOCATION${index}`}
                        onClick={() => 
                          setDate({...date, locationId:location?.value})
                        }
                        
                        className={` mx-1 my-1 rounded-full p-0 w-80 h-16 mr-6 mb-6
                          bg-slate-200 border-slate-300 text-slate-700
                        `}
                      >
                        <div className={`text-center px-2`}>
                          {location?.value}
                        </div>
                  </Button>
              }
              
              </>
            )}
                          </div>
        </div>
      </div>
      </>
    }
    {date?.locationId!=="" && 
      <>
        <div className=" text-base font-medium group-[.mode--light]:text-white mb-4 uppercase">
          Listado de cupos: <b className="text-lg hidden md:contents ">{formatMonthYear(date?.firstDayOfMonthUtc || '')}</b> 
        </div>
        
       
        
        <div id="boxResume" className="flex flex-col justify-start md:flex-row flex-start gap-2">
          <div className="flex flex-col justify-start items-start">
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
          <div className="flex flex-row justify-start items-center flex-start ">
            <div className=" w-16">
              <div className="relative">
                <Lucide
                  icon="Calendar"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
                />
                
                <Litepicker 
                  value={date?.dateMonth} 
                  onChange={(e: any) => {
                    // Litepicker puede devolver el valor directamente o como objeto
                    const dateValue = e?.target?.value || e?.value || e;
                    if (dateValue) {
                      updateDate(dateValue);
                    }
                  }}
                  options={{
                    autoApply: true,
                    singleMode: true,
                    showWeekNumbers: false,
                    format: 'YYYY-MM',
                    numberOfMonths: 1,
                    numberOfColumns: 1,
                    dropdowns: {
                      minYear: 2024,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  className="pl-12 rounded-lg text-xl"
                />
              </div>
            </div>
            <b className="text-lg text-white ml-4 block md:hidden">{date?.dateShow}</b> 
            
          </div>
      </div>
       
           
            
            <div className="mt-2 overflow-auto lg:overflow-visible">
              {/* <pre>{JSON.stringify(sessionDetails, null, 2 )}</pre> */}

            {
                Array.isArray(sessionDetails) &&
                (sessionDetails.length === 0 ? (
                  <div className="flex justify-center items-center">
                    <span className="text-lg text-slate-400">😴</span>{" "}
                    <span className="text-lg">Sin sesiones encontradas</span>
                  </div>
                ) : (
               <>
                {/* Barra de navegación de meses */}
        <div className="flex items-center justify-center gap-4 mb-4 bg-white py-4">
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
          
          <Button
            onClick={() => setShowAllDates(!showAllDates)}
            className={`px-4 py-2 border ${
              showAllDates 
                ? 'bg-primary text-white border-primary hover:bg-primary/90' 
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Lucide 
              icon={showAllDates ? "EyeOff" : "Eye"} 
              className="w-4 h-4 mr-2" 
            />
            {showAllDates ? 'Ocultar Pasados' : 'Mostrar Todos'}
          </Button>
        </div>
                {/* Calendario mensual: agrupado por fecha */}
                {Array.isArray(filteredGroupedSessions) && filteredGroupedSessions.length === 0 ? (
                  <div className="flex justify-center items-center py-8">
                    <span className="text-lg text-slate-400">No hay sesiones para mostrar</span>
                  </div>
                ) : (
                  filteredGroupedSessions.map((dateGroup, dateIndex) => (
                  <div key={`${dateGroup.date}-${dateIndex}`} className="mb-8 p-4 box">
                    {/* Encabezado del día */}
                    <div className="mb-4 border-b-2 border-primary pb-3">
                      <h2 className="text-2xl font-bold text-slate-700 mb-1">
                        {dateGroup.dateFormatted}
                      </h2>
                      
                                            <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(dateGroup.dateStatusCount).map(([status, count]) => (
                          <div 
                            key={status} 
                            className="px-3 py-1 bg-slate-200 rounded-lg border border-slate-400"
                          >
                            <span className="text-xs font-medium text-slate-700 uppercase">
                              {translateStatus(status)}:
                            </span>
                            <span className="ml-2 text-sm font-bold text-slate-800">
                              {count}
                            </span>
                          </div>
                        ))}
                        <div className="px-3 py-1 bg-primary/20 rounded-lg border border-primary/40">
                          <span className="text-xs font-medium text-primary uppercase">
                            Total Día:
                          </span>
                          <span className="ml-2 text-sm font-bold text-primary">
                            {dateGroup.dateTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lista de cursos para este día */}
                    <div className="space-y-6">
                      {Array.isArray(dateGroup.courses) && dateGroup.courses.map((courseGroup, courseIndex) => (
                        <div 
                          key={`${courseGroup.courseId}-${courseIndex}`} 
                          className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <div className="mb-3 border-b border-slate-300 pb-2">
                            <h3 className="text-xl font-semibold text-slate-700">
                              {courseGroup.courseTitle}
                              <span className="ml-2 text-sm font-normal text-slate-500">
                                ({courseGroup.courseId})
                              </span>
                            </h3>
                          </div>
                          
                          {/* Lista de días de la semana agrupados para este curso */}
                          <div className="space-y-4">
                            {Array.isArray(courseGroup.days) && courseGroup.days.map((dayGroup, dayIndex) => (
                              <div 
                                key={`${dayGroup.scheduleDay}-${dayIndex}`}
                                className="p-3 bg-white rounded-lg border border-slate-300"
                              >
                                <h4 className="text-base font-semibold text-slate-600 mb-2 uppercase">
                                  {dayGroup.scheduleDay}
                                </h4>
                                
                                {/* Lista de horarios para este día - Tabla */}
                                <div className="ml-4 mt-2 overflow-x-auto">
                                  <Table>
                                    <Table.Thead>
                                      <Table.Tr>
                                        <Table.Th className="text-xs font-semibold text-slate-700 uppercase">
                                          Horario
                                        </Table.Th>
                                        {/* {Array.from(new Set(
                                          dayGroup.schedules.flatMap(s => Object.keys(s.statusCount))
                                        )).sort().map((status) => (
                                          <Table.Th key={status} className="text-xs font-semibold text-slate-700 uppercase">
                                            {translateStatus(status)}
                                          </Table.Th>
                                        ))} */}
                                        <Table.Th className="text-xs font-semibold text-slate-700 uppercase">
                                          Alumnos
                                        </Table.Th>
                                        <Table.Th className="text-xs font-semibold text-slate-700 uppercase">
                                          Total
                                        </Table.Th>
                                        <Table.Th className="text-xs font-semibold text-slate-700 uppercase">
                                          Cupos Disponibles
                                        </Table.Th>
                                      </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                      {dayGroup.schedules.map((schedule, scheduleIndex) => {
                                        const availableQuotes = MAX_QUOTE - schedule.total;
                                        const isNegative = availableQuotes < 0;
                                        const isLowTotal = schedule.total < 3;
                                        
                                        return (
                                          <Table.Tr 
                                            key={`${schedule.scheduleId}-${scheduleIndex}`}
                                            className={isLowTotal ? 'bg-red-50' : ''}
                                          >
                                            <Table.Td className={`text-sm font-medium ${isLowTotal ? 'text-red-700' : 'text-slate-600'}`}>
                                              {schedule.scheduleStartHour}
                                            </Table.Td>
                                           
                                            {/* {Array.from(new Set(
                                              dayGroup.schedules.flatMap(s => Object.keys(s.statusCount))
                                            )).sort().map((status) => (
                                              <Table.Td key={status} className="text-sm text-center font-semibold text-slate-800">
                                                {schedule.statusCount[status] || 0}
                                              </Table.Td>
                                            ))} */}
                                            <Table.Td className={`text-sm text-left ${isLowTotal ? 'text-red-700' : ''}`}>
                                              <div className="space-y-1">
                                                {schedule.students && schedule.students.length > 0 ? (
                                                  schedule.students.map((student, studentIndex) => (
                                                    <div key={studentIndex} className={`flex justify-between items-center ${isLowTotal ? 'text-red-700' : 'text-slate-800'}`}>
                                                      <span>
                                                      
                                                        {studentIndex + 1}. {student.status && (() => {
                                                          const translatedStatus = translateStatus(student.status);
                                                          const isActivaOrRecuperada = translatedStatus === 'ACTIVA' || translatedStatus === 'RECUPERADA';
                                                          const isDatePastOrToday = isDateLessOrEqualToday(dateGroup.date);
                                                          
                                                          let statusClasses = '';
                                                          if (isActivaOrRecuperada) {
                                                            // Si la fecha es menor o igual a hoy: rojo
                                                            // Si la fecha es mayor a hoy: verde
                                                            statusClasses = isDatePastOrToday 
                                                              ? 'bg-red-200/50 text-red-800' 
                                                              : 'bg-green-100 text-green-800';
                                                          } else {
                                                            // Para otros estados, mantener la lógica actual
                                                            statusClasses = isLowTotal 
                                                              ? 'bg-red-100 text-red-800' 
                                                              : 'bg-slate-100 text-slate-700';
                                                          }
                                                          
                                                          return (
                                                            <b className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded ${statusClasses}`}>
                                                              {translatedStatus}
                                                            </b>
                                                          );
                                                        })()} {student.name} {student.lastName}
                                                      </span>
                                                    </div>
                                                  ))
                                                ) : (
                                                  <span className={isLowTotal ? 'text-red-400 italic' : 'text-slate-400 italic'}>Sin estudiantes</span>
                                                )}
                                                {/* <div className="flex justify-center items-center text-xs font-semibold text-slate-600 bg-slate-300 rounded-full max-w-20  px-2 py-2 mt-1 pt-1 border-t border-slate-200">
                                                  Total: {schedule.total}
                                                </div> */}
                                              </div>
                                            </Table.Td>
                                            <Table.Td className={`w-20 text-sm font-medium ${isLowTotal ? 'text-red-700 font-bold' : 'text-slate-600'}`}>
                                            {schedule.total}
                                            </Table.Td>
                                            <Table.Td className={`w-28 text-sm text-center font-bold ${isNegative ? 'text-red-600' : isLowTotal ? 'text-red-700' : 'text-slate-900'}`}>
                                              {availableQuotes}
                                            </Table.Td>
                                          </Table.Tr>
                                        );
                                      })}
                                    </Table.Tbody>
                                  </Table>
                                </div>
                                
                                {/* Totales del día de la semana */}
                                <div className="mt-2 pt-2 border-t border-slate-200">
                                  <div className="flex flex-wrap gap-2">
                                    <div className="px-2 py-1 bg-slate-300 rounded border border-slate-500">
                                      <span className="text-xs font-medium text-slate-800 uppercase">
                                        Total:
                                      </span>
                                      <span className="ml-1 text-xs font-bold text-slate-900">
                                        {dayGroup.dayTotal}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Totales del curso */}
                          {/* <div className="mt-3 pt-3 border-t border-slate-300">
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(courseGroup.totalStatusCount).map(([status, count]) => (
                                <div 
                                  key={status} 
                                  className="px-3 py-1.5 bg-slate-200 rounded-lg border border-slate-400"
                                >
                                  <span className="text-xs font-medium text-slate-700 uppercase">
                                    {translateStatus(status)}:
                                  </span>
                                  <span className="ml-2 text-sm font-bold text-slate-800">
                                    {count}
                                  </span>
                                </div>
                              ))}
                              <div className="px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/30">
                                <span className="text-xs font-medium text-primary uppercase">
                                  Total Curso:
                                </span>
                                <span className="ml-2 text-sm font-bold text-primary">
                                  {courseGroup.grandTotal}
                                </span>
                              </div>
                            </div>
                          </div> */}
                          
                        </div>
                      ))}
                    </div>
                  </div>
                  ))
                )}
                </>
                ))
      
            }
          
              
            </div>

      </>
    }
    </>
  );
}

export default Main;
