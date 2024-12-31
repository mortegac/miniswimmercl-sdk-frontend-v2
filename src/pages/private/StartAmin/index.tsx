import React, { useEffect, useState, useId } from "react";
import _, { isArray } from "lodash";
import clsx from "clsx";
// import Lucide from "../../../base-components/Lucide";\
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import {
  formatCurrency,
  calculateCurrentDate,
} from "@/utils/helper";
// import LoadingIcon from "../../../base-components//LoadingIcon";

// import EconomicComponent from "./Economic";

import { FilterBar } from "@/components/FilterBar";
import IconStatus from "@/components/IconStatus";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getLocations, selectLocation } from "@/stores/Locations/slice";
import { getStudents, selectEnrollment } from "@/stores/Enrollment/slice";

import EnrollmentsList from "./EnrollmentsList";

const currentYear = calculateCurrentDate().year;
const currentMonth = calculateCurrentDate().month;


import { FilterUseState } from "./types";

function StartAdmin() {
  const dispatch = useAppDispatch();
  const id = useId();
  const {locations, status } = useAppSelector(selectLocation);

  const { resume } = useAppSelector(selectEnrollment);
  
  const [residenceList, setResidenceList] = useState();
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

  
  useEffect(() => { (async () => await dispatch(getLocations()))(); }, []);
  useEffect(() => {
    dispatch(getStudents({ 
      month: filter.month,
      year: filter.year,
      locationId: filter.locationId,
    }));
  }, [filter]);
  
  
  useEffect(() => {
    setFilter({
      ...filter,
      locationId: locations[0]?.id || "",
    });

    const data: any =
    locations && transformResidenceData(locations);
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
                Dashboard Administrador
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
                  locations={residenceList}
                  hasDate={true}
                  onlyDate={true}
                />
              </div>
             
              {/* <p><pre>{JSON.stringify(resume, null, 2)}</pre></p> */}

 
              
              <div className="  col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in ",
                    "before:content-[''] before:w-[90%] ",
                  ])}
                >
                  <div className="p-5 box min-h-72 bg-slate-200  max-h-72">
                  <div className="flex items-center justify-center w-12 h-12 border rounded-full border-primary/10 bg-primary/10">
                    <Lucide
                      icon="ShoppingBag"
                      className="w-6 h-6 text-primary fill-primary/10"
                    />
                  </div>
                    <div className="mt-6 text-3xl font-medium leading-8">
                      {resume.unpaidCount}{" "}
                      <span className="mt-1 text-base text-slate-500">
                        Incripciones sin pago
                      </span>
                    </div>
                    {/* <div className="flex flex-col mt-4">
                      {Array.isArray(resume?.unpaidCourses) && resume?.unpaidCourses.map((course:any, index:number) => 
                      <div className="flex justify-between  border-t border-slate-300 p-2">
                        <h5>{course?.title}</h5>
                        <span>{0}</span>
                      </div>
                      )}
                      
                    </div> */}
                    {/* <div className="absolute bottom-3 right-6 flex justify-center items-center">
                    
                      <a
                          className="flex items-center pt-2 mt-4 font-medium text-primary"
                          href=""
                        >
                        Ver detalle
                          <Lucide icon="ArrowRight" className="w-4 h-4 ml-1.5" />
                        </a>
                    </div> */}
                  </div>
                </div>
              </div>
              
              <div className="  col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in ",
                    "before:content-[''] before:w-[90%] ",
                  ])}
                >
                  <div className="p-5 box bg-primary min-h-72  max-h-72">
                    <div className="flex items-center justify-center w-12 h-12 border rounded-full border-white/10 bg-white/10">
                      <Lucide
                        icon="ShoppingBag"
                        className="w-6 h-6 text-white fill-white/10"
                      />
                    </div>
                    <div className="mt-6 text-3xl font-medium leading-8 text-white">
                      {`$ ${formatCurrency(resume?.totalAmountPaid)}`}
                      <p className="mt-1 text-base text-white">
                        Pagos recibidos
                      </p>
                    </div>
                    {/* <div className="flex flex-col mt-4">
                      <div className="flex justify-between  border-t border-slate-300 p-2">
                        <h5 className="text-white">Bebes</h5>
                        <span className="text-white">{"$ "}{600000}</span>
                      </div>
                      <div className="flex justify-between  border-t border-slate-300 p-2">
                        <h5 className="text-white">Niños</h5>
                        <span className="text-white">{"$ "}{300000}</span>
                      </div>
                      <div className="flex justify-between  border-t border-slate-300 p-2">
                        <h5 className="text-white">Clases particulares</h5>
                        <span className="text-white">{"$ "}{200000}</span>
                      </div>
                    </div> */}
                    {/* <div className="absolute bottom-3 right-6 flex justify-center items-center">
                    
                    <a
                        className="flex items-center pt-2 mt-4 font-medium text-white"
                        href=""
                      >
                      Ver detalle
                        <Lucide icon="ArrowRight" className="w-4 h-4 ml-1.5" />
                      </a>
                  </div> */}
                  </div>
                </div>
              </div>
        
              
              <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap p-5">
              
              {/* <div className="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap p-5"> */}
                <div className="text-slate-500 mt-0.5 text-center font-light text-2xl">
                  <p className="text-3xl mb-8 text-left">
                    Listado de Inscritos
                  </p>
                  <EnrollmentsList {...filter}  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartAdmin;
