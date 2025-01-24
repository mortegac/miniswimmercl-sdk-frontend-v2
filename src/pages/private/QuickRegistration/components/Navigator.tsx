import clsx from "clsx";
import Breadcrumb from "@/components/Base/Breadcrumb";
import type { ReactElement } from 'react';

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectEnrollment, setStep } from "@/stores/Enrollment/slice";

export function Navigator(): ReactElement {
    const dispatch = useAppDispatch();
    const { 
      currentStep,
      enrollment,
    } = useAppSelector(selectEnrollment);

    const {
      enrollmentLocationName,
      enrollmentScheduleName,
      enrollmentCourseName,
      enrollmentPackName
    } = enrollment;
    
    
    return (
      <>
        <div className="flex flex-col lg:items-center lg:flex-row gap-y-2 my-3 bg-slate-100 p-4 rounded-xl sm:rounded-2xl lg:rounded-full">
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
              <div className={`${currentStep === 1 ? "bg-primary text-white" : "bg-transparent text-slate-500"} border rounded-full`}>
                <div className="flex items-center justify-center w-10 h-10 cursor-pointer"
                onClick={() => dispatch(setStep(1))}
                >
                  1
                </div>
              </div>
              <span className="ml-3.5 text-slate-500 font-medium whitespace-nowrap group-[.active]:text-current ">
              Sede
              </span>
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
              <div className={`${currentStep === 2 ? "bg-primary text-white" : "bg-transparent text-slate-500"} border rounded-full`}>
                <div className="flex items-center justify-center w-10 h-10 cursor-pointer"
                onClick={() => dispatch(setStep(2))}
                >
                  2
                </div>
              </div>
              <span className="ml-3.5 text-slate-500 font-medium whitespace-nowrap group-[.active]:text-current ">
              Curso
              </span>
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
              {/* <div className="bg-white border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary group-[.active]:text-slate-500 group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15]"> */}
              <div className={`${currentStep === 3 ? "bg-primary text-white" : "bg-transparent text-slate-500"} border rounded-full`}>
                <div className="flex items-center justify-center w-10 h-10 cursor-pointer"
                onClick={() => dispatch(setStep(3))}
                >
                  3
                </div>
              </div>
              <span className="ml-3.5 text-slate-500 font-medium whitespace-nowrap group-[.active]:text-current ">
              Horarios y sesiones
              </span>
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
              {/* <div className="bg-white border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary group-[.active]:text-slate-500 group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15]"> */}
              <div className={`${currentStep === 4 ? "bg-primary text-white" : "bg-transparent text-slate-500"} border rounded-full`}>
                <div className="flex items-center justify-center w-10 h-10 cursor-pointer"
                onClick={() => dispatch(setStep(4))}
                >
                  4
                </div>
              </div>
              <span className="ml-3.5 text-slate-500 font-medium whitespace-nowrap group-[.active]:text-current ">
              Fecha de Inicio
              </span>
            </div>
          </div>
          
        </div>
        <div className="ml-4">
          <Breadcrumb className="flex-1 hidden xl:block">
            <Breadcrumb.Link className="uppercase font-thin" active={true}>
              {enrollmentLocationName || ''}
            </Breadcrumb.Link>
            <Breadcrumb.Link className="uppercase font-normal" active={true}>
              {enrollmentScheduleName || ''}
            </Breadcrumb.Link>
            
            <Breadcrumb.Link className="uppercase font-normal" active={true}>
              {enrollmentCourseName || ''}
            </Breadcrumb.Link>
            
            <Breadcrumb.Link className="uppercase font-thin" active={true}>
              {enrollmentPackName || ''}
            </Breadcrumb.Link>
          </Breadcrumb>
        </div>
        {/* <pre>{JSON.stringify(enrollment, null, 2)}</pre> */}
      </>
    );
  }