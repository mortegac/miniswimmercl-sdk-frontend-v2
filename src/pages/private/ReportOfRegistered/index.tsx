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
// import { getCourseStudent, selectCourse } from "@/stores/Courses/slice";


import { getSessionDetails, selectSessionDetails, setSessionDetails } from "@/stores/SessionDetails/slice";


import SessionsList from "./SessionsList";
// import EnrollmentsListGroupBy from "./EnrollmentsListGroupBy";

const currentDay = calculateCurrentDate().day;
const currentYear = calculateCurrentDate().year;
const currentMonth = calculateCurrentDate().month;

import { FilterUseState } from "./types";

function Resume(props:any) {
  const {data, total} = props;
  
  return(
    <>
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
  const {sessionDetails, resume, status } = useAppSelector(selectSessionDetails);
  // const { courses, status, resumeByLocation, resumeByLocationTotal  } = useAppSelector(selectCourse);
  // const { resume } = useAppSelector(selectEnrollment);

  // const [residenceList, setResidenceList] = useState();

  // const [groupByEmail, setGroupByEmail] = useState(true);
  const selectedDate = new Date();
  const day2 = String(selectedDate.getDate()).padStart(2, '0');
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const fullYear = String(selectedDate.getFullYear());
          
  
  const [date, setDate] = useState({
    dateChile: String(selectedDate),
    dateShow: String(`${day2}-${month}-${fullYear}`),
    dateUtc: String(`${fullYear}-${month}-${day2}T00:00:00.000Z`),
    locationId: "",
  });
  const [filter, setFilter] = useState<FilterUseState>({
    locationId: "",
    day: "",
    month: currentMonth,
    year: currentYear,
    state: "",
    wasPaid: "true",
    // wasDeleted: "",
  });

  
  useEffect(() => {
    (async () => await dispatch(getLocationsOnly()))();
  }, []);
    
  useEffect(() => { 
    (async () =>  await dispatch(getSessionDetails({
      sessionDate: String(date?.dateUtc), 
      locationId: date?.locationId
    }))
  )()
  }, [date]);
  
  return (
    <>

      {/* <pre>{JSON.stringify(resumeByLocation, null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 2xl:col-span-12">
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Control de cupos por curso
              </h2>
              <Button
                className=" bg-primary flex items-center ml-auto text-white shadow-none border-2 rounded-full min-w-40 min-h-12"
                    onClick={async (e:any) => {
                      e.preventDefault();
                      await dispatch(getSessionDetails({
                        sessionDate: String(date?.dateUtc), 
                        locationId: date?.locationId
                      }))
                      
                      // await  dispatch(
                      //   getCourseStudent({
                      //     day: filter.day,
                      //     month: filter.month,
                      //     year: filter.year,
                      //     wasPaid: filter.wasPaid,
                      //     locationId: filter.locationId,
                      //   })
                      // );
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
                  {/* { resumeByLocation && <Resume data={resumeByLocation}  total={resumeByLocationTotal}/>} */}
                  {/* <pre>{JSON.stringify(sessionDetails, null, 2)}</pre> */}
              <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap ">
                <div className="text-slate-500 mt-0.5 text-center font-light text-2xl">
                { status === "loading" &&   <div className="w-16 h-16"><LoadingIcon
                    color="white"
                    icon="oval"
                    className="w-10 h-10 mt-10"
                /></div>}
                  { status === "idle" && <SessionsList {...filter} sessions={sessionDetails} />}
                  
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
