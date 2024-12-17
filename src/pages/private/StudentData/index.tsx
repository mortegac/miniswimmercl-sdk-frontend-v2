import React, { useEffect, useState, useId, useCallback } from "react";
import debounce from 'lodash/debounce';
import _, { isArray } from "lodash";
import clsx from "clsx";
// import Lucide from "../../../base-components/Lucide";\
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import {FormInput, FormSelect } from "@/components/Base/Form";
import { formatCurrency, calculateCurrentDate } from "@/utils/helper";
// import LoadingIcon from "../../../base-components//LoadingIcon";

// import EconomicComponent from "./Economic";

import { FilterBar } from "@/components/FilterBar";
import IconStatus from "@/components/IconStatus";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getLocations, selectLocation } from "@/stores/Locations/slice";
import { getStudents, selectEnrollment } from "@/stores/Enrollment/slice";

import EnrollmentsList from "./EnrollmentsList";
import EnrollmentsListGroupBy from "./EnrollmentsListGroupBy";

const currentDay = calculateCurrentDate().day;
const currentYear = calculateCurrentDate().year;
const currentMonth = calculateCurrentDate().month;

import { FilterUseState } from "./types";

function StudentData() {
  const dispatch = useAppDispatch();
  const id = useId();
  const { locations, status } = useAppSelector(selectLocation);
  const { enrollments } = useAppSelector(selectEnrollment);
  // const { resume } = useAppSelector(selectEnrollment);

  const [residenceList, setResidenceList] = useState();

  const [groupByEmail, setGroupByEmail] = useState(false);
  const [filter, setFilter] = useState<FilterUseState>({
    locationId: "",
    day: currentDay,
    month: currentMonth,
    year: currentYear,
    state: "",
  });

  const [searchTerm, setSearchTerm] = useState('');
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
        locationId: filter.locationId,
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
      {/* <pre>{JSON.stringify(filter, null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-12">
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Administrador inscripciones Alumno
              </h2>
              <a href="" className="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Actualizar
              </a>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
                <FilterBar
                  filter={filter}
                  setFilter={setFilter}
                  residences={residenceList}
                  hasDate={true}
                  onlyDate={true}
                />
                <Button
                  rounded
                  className="px-2 py-2 border bg-white border-slate-400 hover:bg-slate-300"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    setGroupByEmail(!groupByEmail);
                  }}
                >
                  <Lucide icon="User" className="text-slate-400" />
                  <span className="mx-4 upp">Agrupar por apoderado</span>
                </Button>
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
                  { groupByEmail && <EnrollmentsListGroupBy {...filter} enrollments={filteredStudents}/>}
                  { !groupByEmail && <EnrollmentsList {...filter} enrollments={filteredStudents} />}
                  
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
