import React, { useEffect, useState, useId } from "react";
import _, { isArray } from "lodash";
import clsx from "clsx";
// import Lucide from "../../../base-components/Lucide";\
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

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

const currentYear = calculateCurrentDate().year;
const currentMonth = calculateCurrentDate().month;

import { FilterUseState } from "./types";

function StudentData() {
  const dispatch = useAppDispatch();
  const id = useId();
  const { locations, status } = useAppSelector(selectLocation);

  const { resume } = useAppSelector(selectEnrollment);

  const [residenceList, setResidenceList] = useState();

  const [groupByEmail, setGroupByEmail] = useState(false);
  const [filter, setFilter] = useState<FilterUseState>({
    locationId: "",
    month: currentMonth,
    year: currentYear,
    state: "",
  });

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
  useEffect(() => {
    dispatch(
      getStudents({
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
      {/* <pre>{JSON.stringify(locations, null, 2)}</pre> */}
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

              <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap ">
                <div className="text-slate-500 mt-0.5 text-center font-light text-2xl">
                  { groupByEmail && <EnrollmentsListGroupBy{...filter} />}
                  { !groupByEmail && <EnrollmentsList {...filter} />}
                  
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
