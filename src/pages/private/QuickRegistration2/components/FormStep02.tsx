import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Base/Button";
import Litepicker from "@/components/Base/Litepicker";
import Alert from "@/components/Base/Alert";
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
import { setSessionDetails } from "@/stores/SessionDetails/slice";


function convertirFecha(fechaString: string): Date {
  // Asumimos que la fecha viene en formato "dd/mm/yyyy"
  console.log("---fechaString--", fechaString)
  
  const [dia, mes, anio] = fechaString.split('/');
  
  // Creamos una nueva fecha en formato "yyyy-mm-dd"
  return new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
}
function calcularEdad(fechaNacimientoString: string): { años: number; meses: number } {
  const fechaNacimiento = convertirFecha(fechaNacimientoString);
  
  console.log("---fechaNacimiento--", fechaNacimiento)
  
  const hoy = new Date();
  let años = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let meses = hoy.getMonth() - fechaNacimiento.getMonth();

  if (meses < 0 || (meses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    años--;
    meses += 12;
  }

  meses = meses % 12;

  return { años, meses };
}


function tiempoTranscurrido(fechaString: string): { años: number; meses: number } {
  // Parsear la fecha de entrada
  const fecha = new Date(fechaString);

  // Fecha actual
  const ahora = new Date();

  // Calcular la diferencia
  let años = ahora.getFullYear() - fecha.getFullYear();
  let meses = ahora.getMonth() - fecha.getMonth();

  // Ajustar si los meses son negativos
  if (meses < 0 || (meses === 0 && ahora.getDate() < fecha.getDate())) {
    años--;
    meses += 12;
  }

  return { años, meses };
}
export const FormStep02 = ({ onChangeSetStore }: any) => {
  const [birthday, setBirthday] = useState({month:"", years:""})
  const {genders, cityOfResidence, relationship} = useAppSelector(selectParameters);
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
    guardianRelation,
  } = enrollment;
  const dispatch = useAppDispatch();
  
  
  

  
  // const [dateOfBirth, setDateOfBirth] = useState<string>();
  function transformDate(isoDate:string) {
    const date = new Date(isoDate);
    
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = date.getUTCFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  async function setDateBirthday(e:any){
    // fecha en formato ISO 8601 ("2016-07-15T04:00:00.000Z") 

    console.log("e>>> ", e)
    
    const date:string= new Date(e.target.value).toISOString()
    const getBirthday:any = tiempoTranscurrido(e.target.value)
    setBirthday({month:getBirthday.meses , years:getBirthday.años});
    
    const event = {
      target:{
        name:"studentBithday",
        value:transformDate(date),
        type: "text",
      },
      preventDefault:()=>null,
    }
    onChangeSetStore({...e, ...event})
    console.log("e>>> ", event)
    
  }
  
  
  // function edad(dateChild:string) { return calcularEdad(dateChild)}
  
  
  useEffect(() => {
    dispatch(getParameters({ key: "TYPEOFGENDERS" }));
    dispatch(getParameters({ key: "CITYOFRESIDENCE" }));
    dispatch(getParameters({ key: "TYPEOFRELATIONSHIP" }));
    return () => {};
  }, []);

  
  return (
    <>
      <HeaderTitle
        title={"Información del Alumno"}
        description={"Paso 2"}
      
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
                <div className="flex flex-row mt-3 xl:mt-0 w-[140] justify-center items-center">    
                  <div className="relative">
                    <Lucide
                      icon="Calendar"
                      className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                    />
                    <Litepicker value={studentBithday} type="text" name="studentBithday" 
                      onChange={(e)=>setDateBirthday(e)}
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
                      className="px-6 py-3 pl-12 rounded-full mr-8 focus:z-10"
                    />    
              </div>
              <Alert variant="soft-secondary" className=" ml-6 flex items-center justify-center rounded-full mb-2 w-full">
                <div className=" uppercase font-thin text-slate-900">
                  { `${birthday.years} años, ${birthday.month} meses`}
                </div>
              </Alert>
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
                    value={studentGender || ""}
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
                    value={studentResidence || ""}
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
                    placeholder={"josefina@swimmer.com"}
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
                      {/* <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                        Requerido
                      </div> */}
                    </div>
                    {/* <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Ingrese un teléfono válido de contacto
                    </div> */}
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
                  </div>
                </div>
              </div>
              <div className="bg-purple-100 px-8 py-4 rounded-full flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
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
                  value={guardianRelation || ""}
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
