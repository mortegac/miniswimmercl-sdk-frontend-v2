import React, { useState, useEffect } from "react";

import Button from "@/components/Base/Button";
// import Lucide from "@/components/Base/Lucide";
// import { Loading } from "@/components/Base/LoadingIcon";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";

// import {
//   selectVehiclesManagment,
//   incrementByAmount,
// } from "../../../../stores/vehiclesManagmentSlice";

interface Props {
  hasEdition: boolean;
}
const RegistrationWizard: React.FC<Props> = ({ hasEdition }) => {
  const [status, setStatus] = useState("loading");
  // export const RegistrationWizard = (prop: { hasEdition: boolean }) => {
  const dispatch = useAppDispatch();

  // const vehiclesManagment = useAppSelector(selectVehiclesManagment);
  // const { vehicle, id } = vehiclesManagment;

  // useEffect(() => {
  //   setStatus("idle");
  //   return () => {};
  // }, []);

  return (
    <>
      {/* {vehicle.currentStep <= 9 && ( */}
        <>
          <div className="py-10 mt-5 intro-y box sm:py-20">
            <>
              <div
                className={`${
                  hasEdition === true
                    ? "before:primary"
                    : "before:bg-slate-100"
                } mb-6 relative before:hidden before:lg:block before:absolute before:w-[69%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before: flex flex-col lg:flex-row justify-center px-5 sm:px-20`}
              >
                <div className="z-10 flex items-center flex-1 intro-x lg:text-center lg:block">
                  <Button
                    onClick={() => alert("PRESS")
                      // dispatch(incrementByAmount(1))
                      
                    }
                    className={`${
                    "bg-slate-200 border-slate-200 text-slate-500"
                    } w-10 h-10 rounded-full`}
                    // className={`${
                    //   vehicle.currentStep === 1 || vehicle.currentStep === 2
                    //     ? hasEdition === true
                    //       ? "primary border-slate-200 text-slate-500"
                    //       : "bg-primary border-primary text-white"
                    //     : " text-slate-500 bg-slate-100"
                    // } w-10 h-10 rounded-full`}
                  >
                    1
                  </Button>
                  <div className="ml-3 text-base font-medium lg:w-32 lg:mt-3 lg:mx-auto">
                    Apoderado
                  </div>
                  <span className="text-xs">Información de contacto</span>
                </div>
                <div className="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
                  <Button
                    onClick={() => alert("PRESS")
                      // dispatch(incrementByAmount(3))
                    }
                    className={`${
                     "bg-slate-200 border-slate-200 text-slate-500"
                    } w-10 h-10 rounded-full`}
                    //   vehicle.currentStep === 3 || vehicle.currentStep === 4
                    //     ? hasEdition === true
                    //       ? "primary border-slate-200 text-slate-500"
                    //       : "bg-primary border-primary text-white"
                    //     : " text-slate-500 bg-slate-100"
                    // } w-10 h-10 rounded-full`}
                  >
                    2
                  </Button>
                  <div className="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                    Alumno
                  </div>
                  <span className="text-xs">Información de contacto</span>
                </div>
                <div className="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
                  <Button
                    onClick={() => alert("PRESS")
                      // dispatch(incrementByAmount(5))
                    }
                    className={`${
                      "bg-primary border-slate-200 text-white"
                         
                    } w-10 h-10 rounded-full`}
                    //   vehicle.currentStep === 5 || vehicle.currentStep === 6
                    //     ? hasEdition === true
                    //       ? "primary border-slate-200 text-slate-500"
                    //       : "bg-primary border-primary text-white"
                    //     : " text-slate-500 bg-slate-100"
                    // } w-10 h-10 rounded-full`}
                  >
                    3
                  </Button>
                  <div className="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                    Inscripción
                  </div>
                  <span className="text-xs">Incripción en un curso</span>
                </div>
               
              </div>
             
            </>
          </div>
        </>
      {/* )} */}
    </>
  );
};

const _RegistrationWizard = React.memo(RegistrationWizard);
export default _RegistrationWizard;
