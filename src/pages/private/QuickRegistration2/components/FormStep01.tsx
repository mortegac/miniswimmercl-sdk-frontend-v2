import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";
import users from "@/fakers/users";
import { HeaderTitle } from "./HeaderTitle";
import _ from "lodash";
import Lucide from "@/components/Base/Lucide";

export const FormStep01 = ({ onChangeSetStore }: any) => {
  const [dateOfBirth, setDateOfBirth] = useState<string>();
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
                      className="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10"
                      placeholder={users.fakeUsers()[0].name.split(" ")[0]}
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
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <FormSelect>
                      <option key={"fakerKey"} value={""}>Padre</option>
                      <option key={"fakerKey"} value={""}>Madre</option>
                  </FormSelect>
                </div>
              </div>
    </>
  );
};
