import {useEffect, useState, Fragment} from "react";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";

import Calendar from "@/components/Calendar";


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getCourses, selectCourse } from "@/stores/Courses/slice";
import { getSessionQuote, selectSessionDetails } from "@/stores/SessionDetails/slice";


function Main() {
  
  const {sessionDetails, sessionDetailsQuote} = useAppSelector(selectSessionDetails);
  const dispatch = useAppDispatch();
  
  
  // dispatch(setBreadcrumb({first:"Listado de cursos", firstURL:"courses"}));
  
  useEffect(() => { (async () => await dispatch(getSessionQuote({})))(); }, []);

  

  return (
    <>
     {/* <pre>{JSON.stringify(sessionDetailsQuote, null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className=" text-base font-medium group-[.mode--light]:text-white">
              Listado de Cursos
            </div>
            <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto mb-8">
              <Button
                rounded
                variant="primary"
                className="px-8 py-3 border border-slate-200"
                onClick={()=>dispatch(getSessionQuote({locationId:"CLUB-PATO-CORNEJO"}))}
              >
                <span className="text-border-slate-200">Lo Barnechea</span>
              </Button>
              <Button
                rounded
                variant="primary"
                className="px-8 py-3 border border-slate-200"
                onClick={()=>dispatch(getSessionQuote({locationId:"VITACURA-PISCINA-MUNICIPAL"}))}
              >
                <span className="text-border-slate-200">Vitacura</span>
              </Button>
              <Button
                rounded
                variant="primary"
                className="px-8 py-3 border border-slate-200"
                onClick={()=>dispatch(getSessionQuote({locationId:"COLEGIO-JOHN-ANDREWS"}))}
              >
                <span className="text-border-slate-200">John Andrews</span>
              </Button>
              <Button
                rounded
                variant="primary"
                className="px-8 py-3 border border-slate-200"
                onClick={()=>dispatch(getSessionQuote({locationId:"MI-CLUB-PREMIUM"}))}
              >
                <span className="text-border-slate-200">Mi Club</span>
              </Button>
             
            </div>
          </div>
         
        </div>
      </div>
      <div className="w-full bg-white p-4"><Calendar data={sessionDetailsQuote}/></div>
    </>
  );
}

export default Main;
