import React, { useEffect, useState, useId, useCallback } from "react";
import debounce from 'lodash/debounce';
import _, { isArray } from "lodash";
import clsx from "clsx";
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
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getCourseStudent, selectCourse } from "@/stores/Courses/slice";

import EnrollmentsList from "./EnrollmentsList";
import EnrollmentsListGroupBy from "./EnrollmentsListGroupBy";

const currentDay = calculateCurrentDate().day;
const currentYear = calculateCurrentDate().year;
const currentMonth = calculateCurrentDate().month;

import { FilterUseState } from "./types";

function Resume(props:any) {
  const {data, total} = props;
  const [switcherSlideRemember, setSwitcherSlideRemember] = useState(false);
  
  return(
    <>
          <Slideover
        size="lg"
        key="Slide-Students"
        open={switcherSlideRemember}
        onClose={() => {
          setSwitcherSlideRemember(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setSwitcherSlideRemember(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Enviar recordatio de pago vía Whastapp</div>
              
                <div className="flex flex-col items-startgap-y-2">
              <div>
                
                {/* <StudentList/> */}
              </div>  
              </div>  
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y mb-4">
          <div
            className={clsx([
              "relative zoom-in",
              "before:content-[''] before:w-[90%] ",
            ])}
          >
              <div className="p-5 box min-h-60 max-h-6">
                {/* <div className="flex">
                  <IconStatus subType={"returns"} />
                </div> */}
                <p className="truncate  text-lg text-primary">
                      <b className="text-4xl mr-2">{total}</b>{" "}Inscripciones en total
                      </p>
                    
                      <div className="mt-6 text-sm font-medium leading-8 flex flex-col ">
                        { Array.isArray(data) && data.map((item:any, i)=>
                        <>
                            <div className="flex flex-row justify-between">
                                  <p className="truncate hover:text-clip">
                                    {item?.location}
                                  </p>                
                                  <p className="hover:text-clip">
                                    {item?.totalEnrollments}
                                  </p>                
                            </div>
                        </>
                        )}
                      
                      </div>
              </div>
          </div>
      </div>
      <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y mb-4">
          <div
            className={clsx([
              "relative zoom-in",
              "before:content-[''] before:w-[90%] ",
            ])}
          >
              <div className="p-5 box min-h-60 max-h-6">
              <p className="truncate  text-lg text-primary">Detalle por <b className="text-4xl mr-2">curso</b>
                      </p>
                      <div className="mt-4 overflow-auto h-40 relative max-w-sm mx-auto flex flex-col divide-y dark:divide-slate-200/5">
                      { Array.isArray(data) && data.map((item:any, i)=>
                      <div className="mt-6 text-sm font-medium leading-8 flex flex-col ">
                        <p className=" font-thin text-lg mb-4">{item?.location}</p>
                      { Array.isArray(item?.courseDetails) && item?.courseDetails.map((course:any, i:number)=>
                      <>
                          <div className="flex flex-row justify-between">
                                <p className="w-56 truncate hover:text-clip text-sm font-normal">
                                  {course?.courseId}
                                </p>                
                                <p className="hover:text-clip">
                                  {course?.enrollments}
                                </p>                
                          </div>
                      </>
                      )}
                      
                    </div>
                      )}
                    </div>
                      
              </div>
          </div>
      </div>
    </>
  )
  
}
function CourseStudentData() {
  const dispatch = useAppDispatch();
  // const id = useId();
  const { locations } = useAppSelector(selectLocation);
  const { courses, status, resumeByLocation, resumeByLocationTotal  } = useAppSelector(selectCourse);
  // const { resume } = useAppSelector(selectEnrollment);

  // const [residenceList, setResidenceList] = useState();

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

  // const [searchSlideover, setSearchSlideover] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(courses);

  const sortStudents = (a: any, b: any) => {
    // const aSessionsCount = a.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    // const bSessionsCount = b.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    
    // if (aSessionsCount > 0 && bSessionsCount === 0) return -1;
    // if (aSessionsCount === 0 && bSessionsCount > 0) return 1;
    return 1;
  };
  
    // Función para filtrar estudiantes
    const filterStudents = (term: string) => {
      const filtered = courses.filter((item:any) => {
      // console.log("--student--", item)
        return item?.student?.name.toLowerCase().includes(term.toLowerCase()) ||
        item?.student?.lastName.toLowerCase().includes(term.toLowerCase())
      }
        // student.middleName.toLowerCase().includes(term.toLowerCase())
      );
      
      // setFilteredStudents(filtered);
      setFilteredStudents( [...filtered].sort(sortStudents));
    };
  
  useEffect(() => {
    (async () => await dispatch(getLocationsOnly()))();
  }, []);
  
  useEffect(() => { setFilteredStudents( [...courses]); }, [courses]);
  
  
  
  useEffect(() => {
    dispatch(
      getCourseStudent({
        day: filter.day,
        month: filter.month,
        year: filter.year,
        wasPaid: filter.wasPaid,
        locationId: filter.locationId,
        // wasDeleted: filter.wasDeleted,
      })
    );
  }, [filter]);

  useEffect(() => {
    setFilter({
      ...filter,
      locationId: locations[0]?.id || "",
    });

    // const data: any = locations && transformResidenceData(locations);
    // setResidenceList(data);
  }, [locations]);

  return (
    <>

      {/* <pre>{JSON.stringify(resumeByLocation, null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-12">
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Listado de Alumnos por curso
              </h2>
              <Button
                className=" bg-primary flex items-center ml-auto text-white shadow-none border-2 rounded-full min-w-40 min-h-12"
                    onClick={async (e:any) => {
                      e.preventDefault();
                      await  dispatch(
                        getCourseStudent({
                          day: filter.day,
                          month: filter.month,
                          year: filter.year,
                          wasPaid: filter.wasPaid,
                          locationId: filter.locationId,
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
              
              {/* } */}
              {/* </a> */}
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
                <FilterBar
                  filter={filter}
                  setFilter={setFilter}
                  locations={locations}
                  hasDate={true}
                  onlyDate={true}
                />
                </div>              
                  { resumeByLocation && <Resume data={resumeByLocation}  total={resumeByLocationTotal}/>}
              <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap ">
                <div className="text-slate-500 mt-0.5 text-center font-light text-2xl">
                { status === "loading" &&   <div className="w-16 h-16"><LoadingIcon
                    color="white"
                    icon="oval"
                    className="w-10 h-10 mt-10"
                /></div>}
                  { status === "idle" && <EnrollmentsList {...filter} courses={filteredStudents} />}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseStudentData;
