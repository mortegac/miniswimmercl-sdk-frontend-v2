import Lucide from "@/components/Base/Lucide";
import users from "@/fakers/users";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";
import { useState } from "react";
import clsx from "clsx";
import _ from "lodash";


import LoadingIcon from "@/components/Base/LoadingIcon";
import {FormStep01} from "./components/FormStep01";
import { FormStep02 } from "./components/FormStep02";
import { FormStep03 } from "./components/FormStep03";
import { FormStep04 } from "./components/FormStep04";
import { NavigationBar } from "./components/NavigationBar";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { selectEnrollment, setDataEnroll} from "@/stores/Enrollment/slice";



const typeOfForm: any = {
  ["0"]: FormStep01,
  ["1"]: FormStep01,
  ["2"]: FormStep02,
  ["3"]: FormStep03,
  ["4"]: FormStep04,
};


function Main() {
  
  const {currentStep, status, enrollment} = useAppSelector(selectEnrollment);
  
  const FormStep = typeOfForm[String(currentStep)] || typeOfForm[0];
  const dispatch = useAppDispatch();
  dispatch(setBreadcrumb({first:"Proceso de inscripción rápida", firstURL:"leads"}));
  
  const onChangeSetStore = async (e: any) => {
    console.log(">>. e >>>", e)
    let valueForm: any;
    if (e.target.type === "checkbox") {
      valueForm = Boolean(e.target.checked);
    } else if (e.target.type === "number") {
      valueForm = Number(e.target.value);
    } else {
      valueForm = String(e.target.value);
    }
    e.preventDefault();

    dispatch(
      setDataEnroll({
        key: e.target.name,
        value: valueForm,
      })
    );
  };
  
  return (
    <>
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12 sm:col-span-10 sm:col-start-2">
          
        {/* WIZARD */}
        { currentStep !== 4 && 
          <div className="flex flex-col lg:items-center lg:flex-row gap-y-2">
            <div
              className={clsx([
                "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group active",
                "after:hidden before:hidden after:lg:block before:lg:block",
                "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20",
                "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20",
                "last:after:hidden after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20",
                "first:before:hidden before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20",
              ])}
            >
              <div className="flex items-center">
                {/* <div className="bg-white border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary group-[.active]:text-white group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15]"> */}
                <div className={`${currentStep === 1 ? "bg-white" : "bg-transparent text-white"} border rounded-full`}>
                  <div className="flex items-center justify-center w-10 h-10">
                    1
                  </div>
                </div>
                <div className="ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current [.group.mode--light_.group.active_&]:!text-slate-100">
                  Información del apoderado
                </div>
              </div>
            </div>
            <div
              className={clsx([
                "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group",
                "after:hidden before:hidden after:lg:block before:lg:block",
                "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20",
                "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20",
                "last:after:hidden after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20",
                "first:before:hidden before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20",
              ])}
            >
              <div className="flex items-center">
                {/* <div className="bg-white border rounded-full "> */}
                <div className={`${currentStep === 2 ? "bg-white" : "bg-transparent text-white"} border rounded-full`}>
                  <div className="flex items-center justify-center w-10 h-10">
                    2
                  </div>
                </div>
                <div className="ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current [.group.mode--light_.group.active_&]:!text-slate-100">
                Información del Alumno
                </div>
              </div>
            </div>
            <div
              className={clsx([
                "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group",
                "after:hidden before:hidden after:lg:block before:lg:block",
                "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20",
                "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20",
                "last:after:hidden after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20",
                "first:before:hidden before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20",
              ])}
            >
              <div className="flex items-center">
                {/* <div className="bg-white border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary group-[.active]:text-white group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15]"> */}
                <div className={`${currentStep === 3 ? "bg-white" : "bg-transparent text-white"} border rounded-full`}>
                  <div className="flex items-center justify-center w-10 h-10">
                    3
                  </div>
                </div>
                <div className="ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current [.group.mode--light_.group.active_&]:!text-slate-100">
                  Incripción en el curso
                </div>
              </div>
            </div>
          </div>
        }
        
          {/* FORM */}
            <div className="flex flex-col justify-between box min-h-[800px] p-10 space-y-4 mt-8 ">
              <div className="flex flex-col justify-start ">
              {/* <pre>currentStep = {JSON.stringify({currentStep})}</pre> */}
              
              { status === "loading" &&
                <div className="flex justify-center items-center w-full h-48"><LoadingIcon
                  color="#AE5EAB"
                  icon="oval"
                  className="w-10 h-10 mt-10"
                /></div>
              }
              
              { status === "idle" &&
                <FormStep onChangeSetStore={onChangeSetStore}/>
              }
              </div>
              <div className="flex flex-col justify-end  h-16">
                <NavigationBar />
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
      {/* <pre>{JSON.stringify(enrollment, null, 2)}</pre> */}
    </>
  );
}

export default Main;
