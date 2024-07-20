import React, { useState, useEffect, useRef } from "react";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";

import { HeaderTitle } from "./HeaderTitle";
import ListParams from "@/components/ListParams";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectEnrollment, setDataEnroll} from "@/stores/Enrollment/slice";
// import { setBreadcrumb } from '@/stores/breadcrumb';
import {
  selectParameters,
  getParameters,
} from "@/stores/Parameters/slice";

export const FormStep01 = ({ onChangeSetStore }: any) => {
  const {relationship} = useAppSelector(selectParameters);
  const {enrollment}= useAppSelector(selectEnrollment);
  const {
    guardianId,
    guardianEmail,
    guardianName,
    guardianRelation,
  } = enrollment;
  const dispatch = useAppDispatch();
  // dispatch(setBreadcrumb({first:"Proceso de inscripción rápida", firstURL:"leads", second:"Apoderado"}));
  
  useEffect(() => {
    dispatch(getParameters({ key: "TYPEOFRELATIONSHIP" }));
    return () => {};
  }, []);
  
  return (
    <>
      <HeaderTitle
        title={"Información del Apoderado"}
        description={"Paso 1"}
        hasVisibleBrand={false}
        vehicle={{
          typeOfVehicle: "",
          brand: "",
          model: "",
        }}
      />

      <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Nombre completo</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Requerido
              </div>
            </div>
            {/* <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Enter your full legal name as it appears on your official
              identification.
            </div> */}
          </div>
        </label>
        <div className="flex-1 w-full mt-3 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
          <FormInput
              type="text"
              className="px-6 py-3 rounded-full mr-8 focus:z-10"
              placeholder={"Alma"}
              aria-describedby="guardianName"
              name="guardianName"
              value={guardianName}
              onChange={onChangeSetStore}
            />
          </div>
        </div>
      </div>
      
      <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Email</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Requerido
              </div>
            </div>
            <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Este campo en necesario para asociar al cuidador con el niño
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-3 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
            <FormInput
              type="text"
              className="px-6 py-3 rounded-full mr-8 focus:z-10"
              placeholder={"alma@guaguita.com"}
              aria-describedby="guardianEmail"
              name="guardianEmail"
              value={guardianEmail}
              onChange={onChangeSetStore}
            />
          </div>
        </div>
      </div>
      
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Parentesco</div>
                      <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        Requerido
                      </div>
                    </div>
                    {/* <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Choose your department or division from the list of
                      available options.
                    </div> */}
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0 mr-8">
                {/* guardianRelation */}
                <ListParams
                  list={relationship}
                  text={guardianRelation}
                  value={guardianRelation}
                  isLoading={false}
                  fn={onChangeSetStore}
                  handleCreate={(value) => null }
                  name={"guardianRelation"}
                />
              {/* {errors.typeOfVehicle && (
                <div className="mt-2 text-danger">
                  {typeof errors.typeOfVehicle === "string" &&
                    errors.typeOfVehicle}
                </div>
              )} */}
                </div>
              </div>
    </>
  );
};
