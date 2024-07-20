import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";
import ListParams from "@/components/ListParams";
import users from "@/fakers/users";
import { HeaderTitle } from "./HeaderTitle";
import _ from "lodash";
import Lucide from "@/components/Base/Lucide";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectEnrollment, setDataEnroll} from "@/stores/Enrollment/slice";
import {
  selectParameters,
  getParameters,
} from "@/stores/Parameters/slice";

export const FormStep02 = ({ onChangeSetStore }: any) => {
  const {genders, cityOfResidence} = useAppSelector(selectParameters);
  const {enrollment}= useAppSelector(selectEnrollment);
  const {
    studentId,
    studentName,
    studentLastName,
    studentBithday,
    studentGender,
    studentResidence,
    studentEmail,
    studentPhone,
  } = enrollment;
  const dispatch = useAppDispatch();
  
  
  
  
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  
  async function setDateBirthday(e:any){
    const date:string= new Date(e.target.value).toISOString()
    const event = {
      target:{
        name:"studentBithday",
        value:date,
        type: "text",
      },
      preventDefault:()=>null,
    }
    onChangeSetStore({...e, ...event})
    console.log("e>>> ", event)
    
  }
  
  
  useEffect(() => {
    dispatch(getParameters({ key: "TYPEOFGENDERS" }));
    dispatch(getParameters({ key: "CITYOFRESIDENCE" }));
    return () => {};
  }, []);
  
  
  return (
    <>
      <HeaderTitle
        title={"Información del Alumno"}
        description={"Paso 2"}
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
                      <div className="font-medium">Nombres y apellidos</div>
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
                      placeholder={"Nicole"}
                      aria-describedby="studentName"
                      name="studentName"
                      value={studentName}
                      onChange={onChangeSetStore}
                    />
                    <FormInput
                      type="text"
                      className="px-6 py-3 rounded-full mr-8 focus:z-10"
                      placeholder={"Ortega"}
                      aria-describedby="studentLastName"
                      name="studentLastName"
                      value={studentLastName}
                      onChange={onChangeSetStore}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Fecha de nacimiento</div>
                      <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        Requerido
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Información requerida para calcular la edad del alumno
                    </div>
                  </div>
                </label>
                <div className="flex-1 mt-3 xl:mt-0 max-w-44">    
                  <div className="relative">
                <Lucide
                  icon="Calendar"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                />
                
              {/* <Litepicker value={dateOfBirth} onChange={(e)=> { */}
              <Litepicker value={studentBithday} type="text" name="studentBithday" 
              onChange={(e)=>setDateBirthday(e)}
              // onChange={(event:any)=> {
              //         // setDate(e.target.value);
              //         // setDateOfBirth(e.target.value);
              //         const name = {e:{target:{lala:"studentBithday"}}}
              //         onChangeSetStore({ ...name })
              //         //   e:{ target:{
              //         //   value:event.target.value, 
              //         //   name:studentBithday, 
              //         //   type:"text"
              //         // } }
              //         }}
                    options={{
                      autoApply: true,
                      showWeekNumbers: false,
                      dropdowns: {
                        minYear: 1990,
                        maxYear: null,
                        months: true,
                        years: true,
                      },
                    }}
                    // className="pl-12 rounded-full"
                    className="px-6 py-3 pl-12 rounded-full mr-8 focus:z-10"
                    />
                    
                    
                    
              </div>
                </div>
              </div>
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Sexo</div>
                    </div>
                    {/* <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Select your gender from the options.
                    </div> */}
                  </div>
                </label>
                
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <ListParams
                    list={genders}
                    text={studentGender}
                    value={studentGender}
                    name={"studentGender"}
                    isLoading={false}
                    fn={onChangeSetStore}
                    handleCreate={(value) => null }
                  />
                  </div>
              
              </div>
              
              {/* COMUNA DE RESIDENCIA */}
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Comuna de residencia</div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                      Lugar donde vive el alumno
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <ListParams
                    list={cityOfResidence}
                    text={studentResidence}
                    value={studentResidence}
                    name={"studentResidence"}
                    isLoading={false}
                    fn={onChangeSetStore}
                    handleCreate={(value) => null }
                  />
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
                     Ingrese un email válido de contacto
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <FormInput
                    type="text"
                    placeholder={users.fakeUsers()[0].email}
                    className="px-6 py-3 rounded-full mr-8 focus:z-10"
                    aria-describedby="studentEmail"
                    name="studentEmail"
                    value={studentEmail}
                    onChange={onChangeSetStore}
                  />
                </div>
              </div>
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Teléfono de contacto</div>
                      <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        Requerido
                      </div>
                    </div>
                    <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Ingrese un teléfono válido de contacto
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <div className="flex flex-col items-center md:flex-row">
                    <FormInput
                      type="text"
                      className="px-6 py-3 rounded-full mr-8 focus:z-10"
                      placeholder={users.fakeUsers()[0].phone}
                      aria-describedby="studentPhone"
                      name="studentPhone"
                      value={studentPhone}
                      onChange={onChangeSetStore}
                    />
                    {/* <FormSelect className="md:w-36 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                      <option value="office">Office</option>
                      <option value="home">Home</option>
                    </FormSelect> */}
                  </div>
                  {/* <a
                    className="flex items-center mt-3.5 -mb-1 font-medium text-primary"
                    href=""
                  >
                    <Lucide className="w-4 h-4 stroke-[1.3] mr-1" icon="Plus" />
                    Add phone
                  </a> */}
                </div>
              </div>
              
    </>
  );
};
