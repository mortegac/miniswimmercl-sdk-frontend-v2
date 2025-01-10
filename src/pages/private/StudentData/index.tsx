import React, { useEffect, useState, useId, useCallback } from "react";
import debounce from 'lodash/debounce';
import _, { isArray } from "lodash";
import Table from "@/components/Base/Table";
import Tippy from "@/components/Base/Tippy";
import LoadingIcon from "@/components/Base/LoadingIcon";
// import Lucide from "../../../base-components/Lucide";\
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import {FormInput, FormSelect } from "@/components/Base/Form";
import { formatCurrency, calculateCurrentDate } from "@/utils/helper";
import { Slideover } from "@/components/Base/Headless";

import { FilterBar } from "@/components/FilterBar";
import IconStatus from "@/components/IconStatus";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getLocations, selectLocation } from "@/stores/Locations/slice";
import { getStudents, selectEnrollment } from "@/stores/Enrollment/slice";
import { getStudentsSearchName,  selectStudent } from "@/stores/Students/slice";

import EnrollmentsList from "./EnrollmentsList";
import EnrollmentsListGroupBy from "./EnrollmentsListGroupBy";

const currentDay = calculateCurrentDate().day;
const currentYear = calculateCurrentDate().year;
const currentMonth = calculateCurrentDate().month;

const typeOfRelationship: any = {
  [""]: "",
  ["NONE"]: "",
  ["FATHER"]: "Padre",
  ["MOTHER"]: "Madre",
  ["OTHER"]: "Otro",
  ["GRANDFATHER"]: "Abuelo",
  ["GRANDMOTHER"]: "Abuela",
  ["UNCLE"]: "Tio",
  ["AUNT"]: "Tia",
  ["FAMILYS_FRIEND"]: "Amigo familia",
  ["Primo/a"]: "",
};

import { FilterUseState } from "./types";

function convertirFecha(fechaString: string): Date {
  // Asumimos que la fecha viene en formato "dd/mm/yyyy"
  const [dia, mes, anio] = fechaString.split('/');
  
  // Creamos una nueva fecha en formato "yyyy-mm-dd"
  return new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
}
function calcularEdad(fechaNacimientoString: string): { años: number; meses: number } {
  const fechaNacimiento = convertirFecha(fechaNacimientoString);
  const hoy = new Date();
  let años = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let meses = hoy.getMonth() - fechaNacimiento.getMonth();

  if (meses < 0 || (meses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    años--;
    meses += 12;
  }

  meses = meses % 12;

  return { años, meses };
}

function StudentSearchList(props:any) {
  
  const {list, searchText, setSearchSlideover} = props;
  const dispatch = useAppDispatch();
  
    
      const highlightText = (text:string, search:string) => {
        if (!search) return text;
        
        const parts = text.split(new RegExp(`(${search})`, 'gi'));
        return parts.map((part, index) => 
          part.toLowerCase() === search.toLowerCase() 
            ? <span key={index} className="bg-yellow-200">{part}</span>
            : part
        );
      };
    
   return(
    <>
          {/* <pre>{JSON.stringify(sortedEnrollments, null, 2 )}</pre> */}
      <div className="overflow-auto xl:overflow-visible text-base px-4">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Nombres
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Apoderados
              </Table.Td>
              
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500"></Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
              {/* {Array.isArray(list) && */}
              {Array.isArray(list) &&
        [...list]
          .sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name);
            // Si los nombres son iguales, ordenar por apellido
            if (nameCompare === 0) {
              return a.lastName.localeCompare(b.lastName);
            }
            return nameCompare;
          })
          .map((item: any, index) => {
            const fullName = `${item?.name} ${item?.lastName}`;
            const edad = item?.birthdate && calcularEdad(String(item?.birthdate === "" ? "1800/01/01":item?.birthdate));
  
          return (
                <Table.Tr
                    key={index}
                    className={`[&_td]:last:border-b-0 bg-white`}
                  > 
                    <Table.Td className=" py-4 border-dashed w-56 ">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p>{highlightText(fullName, searchText)}</p>
                          {/* <p className="text-sm font-thin py-1">{ `${item?.birthdate}`}</p> */}
                          { item?.birthdate && edad.años > 100 ? "SIN EDAD":`${edad?.años || ""} años, ${edad?.meses || ""} meses`}
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td className=" py-4 border-dashed w-60 ">
                      <div className="flex items-center flex-col justify-start">
                      {Array.isArray(item?.relationships?.items) &&
                          item?.relationships?.items.map(
                            (relation: any, i: any) => (
                              <p className=" font-thin text-sm text-left text-slate-10 border-b pb-2">
                                { !relation?.user?.contactPhone &&   <p className="font-dm-sans text-sm font-thin text-left">
                                {item?.student?.contactPhone}
                              </p>}
                                <span className=" text-left  font-mono">
                                  {typeOfRelationship[relation?.relationType]}
                                </span>{" "}
                                {relation?.user?.name}{" "}
                                <p className="mt-1  text-left ">
                                  {relation?.user?.id}{" "}
                                </p>
                              </p>
                            )
                          )}
                      </div>
                    </Table.Td>
                    
                    <Table.Td className=" m-0  w-60">
                      <div className="flex flex-row">
                      
                            <>
                            <Button
                              rounded
                              className=" px-4 mr-2 py-2 border border-primary hover:bg-purple-500 flex flex-col"
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                dispatch(
                                  getStudents({
                                    studentId:item?.id
                                  })
                                );
                                setSearchSlideover(false);
                              }}
                            >
                              {/* <Tippy  content="Eliminar inscripción"> */}
                              <div className="flex flex-row">
                                <Lucide icon="Check" className="text-primary mr-4" />{" "}<span className="text-primary">Seleccionar</span>
                              </div>
                              {/* </Tippy> */}
                            </Button>
                            </>
                       
                      </div>
                    </Table.Td>
                  </Table.Tr>
          );
        })}
          </Table.Tbody>
        </Table>
      </div>
    </>
   )
}

function StudentData() {
  const dispatch = useAppDispatch();
  const id = useId();
  const { locations } = useAppSelector(selectLocation);
  const { students } = useAppSelector(selectStudent);
  const { enrollments, status } = useAppSelector(selectEnrollment);
  // const { resume } = useAppSelector(selectEnrollment);

  const [residenceList, setResidenceList] = useState();

  // const [groupByEmail, setGroupByEmail] = useState(true);
  const [filter, setFilter] = useState<FilterUseState>({
    locationId: "",
    day: "",
    month: currentMonth,
    year: currentYear,
    state: "",
    wasPaid: "true",
    // wasDeleted: "",
  });

  
  const [searchSlideover, setSearchSlideover] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermStudent, setSearchTermStudent] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(enrollments);

  const sortStudents = (a: any, b: any) => {
    // const aSessionsCount = a.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    // const bSessionsCount = b.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    
    // if (aSessionsCount > 0 && bSessionsCount === 0) return -1;
    // if (aSessionsCount === 0 && bSessionsCount > 0) return 1;
    return 1;
  };
  
    // Función para filtrar estudiantes
    const filterStudents = (term: string) => {
      const filtered = enrollments.filter((item:any) => {
      // console.log("--student--", item)
        return item?.student?.name.toLowerCase().includes(term.toLowerCase()) ||
        item?.student?.lastName.toLowerCase().includes(term.toLowerCase())
      }
        // student.middleName.toLowerCase().includes(term.toLowerCase())
      );
      
      // setFilteredStudents(filtered);
      setFilteredStudents( [...filtered].sort(sortStudents));
    };
  // Creamos una versión debounced de la función de filtrado
  const debouncedFilter = useCallback(
    debounce((term: string) => filterStudents(term), 300),
    [enrollments] // Dependencia del array de estudiantes
  );

  // Manejador para el cambio en el input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedFilter(term);
  };
  
  const handleSearchChangeStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTermStudent(term);
    
    dispatch(getStudentsSearchName({ 
      name: term,
    }))
    // debouncedFilter(term);
  };
  
  function transformResidenceData(
    locations: any
  ): { id: string; name: string }[] {
    return locations.map((item: any) => ({
      id: item?.id,
      name: `${item?.name}`,
    }));
  }

  useEffect(() => {
    (async () => await dispatch(getLocations()))();
  }, []);
  
  useEffect(() => { setFilteredStudents( [...enrollments]); }, [enrollments]);
  
  
  
  useEffect(() => {
    dispatch(
      getStudents({
        day: filter.day,
        month: filter.month,
        year: filter.year,
        wasPaid: filter.wasPaid,
        // locationId: filter.locationId,
        // wasDeleted: filter.wasDeleted,
      })
    );
  }, [filter]);

  useEffect(() => {
    setFilter({
      ...filter,
      locationId: locations[0]?.id || "",
    });

    const data: any = locations && transformResidenceData(locations);
    setResidenceList(data);
  }, [location]);

  return (
    <>
        {/* SEARCH STUDENTS */}
        <Slideover
        size="xl"
        key="Slide-HSearchStudent33"
        open={searchSlideover}
        onClose={() => {
          setSearchSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setSearchSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
                <div className="px-8 pt-6 pb-8">
                  <div className="text-base font-medium">Búsqueda de Alumnos</div>
                  <div className="text-slate-500 mt-0.5  mb-2">Ingrese el nombre de Alumno</div>
                  
                  
                    <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <div className="relative">
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                      />
                      <FormInput
                          formInputSize="lg"
                          placeholder="Ingrese el nombre a buscar..."
                          aria-label="name" 
                          aria-describedby="input-group-name"
                          type="text"
                          tabIndex={1} 
                          className="pl-9 w-96 rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                          name="studentName"
                          value={searchTermStudent}
                          onChange={handleSearchChangeStudents}
                        />
              </div>
                    </div>
                </div>
                {/* <pre>term : {searchTermStudent}</pre> */}
                <StudentSearchList 
                  list={students} searchText={searchTermStudent}
                  setSearchSlideover={setSearchSlideover}
                />
                {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}
            </div>


          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      {/* <pre>{JSON.stringify(enrollments[3], null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-12">
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Administrador inscripciones Alumno
              </h2>
              <Button
                className=" bg-primary flex items-center ml-auto text-white shadow-none border-2 rounded-full min-w-40 min-h-12"
                    onClick={async (e:any) => {
                      e.preventDefault();
                      await  dispatch(
                        getStudents({
                          day: filter.day,
                          month: filter.month,
                          year: filter.year,
                          wasPaid: filter.wasPaid,
                        })
                      );
                    }}
                    >                    
                   {status === "loading" ? <div className="w-14 h-7"><LoadingIcon
                    color="#FFFFFF"
                    icon="three-dots"
                    className=""
                  /></div>: <><Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" />ACTUALIZAR</>}
                  
                  </Button>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
                <FilterBar
                  filter={filter}
                  setFilter={setFilter}
                  locations={residenceList}
                  hasDate={true}
                  onlyDate={true}
                />
                <div>
                  {/* <Button
                    rounded
                    className="mr-4 px-2 py-2 border bg-white border-slate-400 hover:bg-slate-300"
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault();
                      setGroupByEmail(!groupByEmail);
                    }}
                  >
                    <Lucide icon="User" className="text-slate-400" />
                    <span className="mx-4 upp">Desagrupar</span>
                  </Button> */}
                  <Button
                    rounded
                    className="px-2 py-2 border bg-white border-slate-400 hover:bg-slate-300"
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault();
                      setSearchSlideover(true);
                    }}
                  >
                    <Lucide icon="Search" className="text-slate-400" />
                    <span className="mx-4 upp">Buscar apoderado</span>
                  </Button>
                  
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                  />
                   <FormInput
                      formInputSize="lg"
                      placeholder="Buscar alumnos..."
                      aria-label="name" 
                      aria-describedby="input-group-name"
                      type="text"
                      tabIndex={1} 
                      // className="bg-white/[0.12] text-white w-[350px] flex items-center py-2 px-3.5 border-transparent  cursor-pointer hover:bg-white/[0.15] transition-colors duration-300 hover:duration-100 focus:z-10"
                      className="pl-9 sm:w-64 rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                      name="guardianEmail"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                </div>
              </div>
              
              <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap ">
                <div className="text-slate-500 mt-0.5 text-center font-light text-2xl">
                  <EnrollmentsListGroupBy {...filter} enrollments={filteredStudents}/>
                  {/* { groupByEmail && <EnrollmentsListGroupBy {...filter} enrollments={filteredStudents}/>}
                  { !groupByEmail && <EnrollmentsList {...filter} enrollments={filteredStudents} />} */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentData;
