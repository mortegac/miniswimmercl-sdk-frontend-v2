import React, { useState, useEffect, useRef } from "react";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './phone.css'


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
import { selectEnrollment, getGuardian} from "@/stores/Enrollment/slice";
import { setStudent, selectStudent } from "@/stores/Students/slice";
import {
  selectParameters,
  getParameters,
} from "@/stores/Parameters/slice";
// import { setSessionDetails } from "@/stores/SessionDetails/slice";
import { format } from '@formkit/tempo';


function convertirFecha(fechaString: string): Date {
  // Asumimos que la fecha viene en formato "dd/mm/yyyy"
  // console.log("---fechaString--", fechaString)
  
  const [dia, mes, anio] = fechaString.split('/');
  
  // Creamos una nueva fecha en formato "yyyy-mm-dd"
  return new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
}

function calcularEdad(fechaNacimientoString: string): { años: number; meses: number } {
  const fechaNacimiento = convertirFecha(fechaNacimientoString);
  
  // console.log("---fechaNacimiento--", fechaNacimiento)
  
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



export const FormStep02 = ({ onChangeSetStore, setStudentSlide }: any) => {
  const [error, setError] = useState<any>(null);
  const [phoneInput, setPhoneInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  const [birthday, setBirthday] = useState({month:"", years:""})
  const {genders, cityOfResidence, relationship} = useAppSelector(selectParameters);
  
  const {student}= useAppSelector(selectStudent);
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
    guardianEmail,
    guardianName,
  } = enrollment;
  const dispatch = useAppDispatch();
  
  
  
  function transformDate(isoDate:string) {
    const date = new Date(isoDate);
    
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = date.getUTCFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  function convertirYValidarAISO(fechaString:string) {
    // 1. Validar el formato DD/MM/YYYY con una expresión regular.
    const formatoValido = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(fechaString);
    if (!formatoValido) {
      console.error("Error: El formato debe ser DD/MM/YYYY.");
      return null;
    }
  
    // 2. Descomponer la fecha en día, mes y año.
    const partes = fechaString.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10); // El mes se obtiene como 1-12
    const anio = parseInt(partes[2], 10);
  
    // 3. Crear el objeto Date. IMPORTANTE: el mes en el constructor es 0-indexed (0=Enero, 11=Diciembre).
    const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  
    // 4. Validar que la fecha es real (ej. no es 31/02/2023).
    // Si JavaScript ajustó la fecha (ej. 31/02 se convirtió en 03/03), los valores no coincidirán.
    if (fecha.getUTCFullYear() !== anio || fecha.getUTCMonth() !== mes - 1 || fecha.getUTCDate() !== dia) {
      console.error("Error: La fecha es inválida (ej. 31 de febrero).");
      return null;
    }
  
    // 5. Devolver la fecha en formato ISOString.
    return fecha.toISOString();
  }
  
  async function setDateBirthday(e: any) {
    const isoString: string | null = convertirYValidarAISO(e.target.value);
    
    if (!isoString) {
      console.error("Fecha inválida");
      return;
    }
    
    const getBirthday: any = tiempoTranscurrido(isoString);
    setBirthday({ month: getBirthday.meses, years: getBirthday.años });
    
    const event = {
      target: {
        name: "studentBithday",
        value: transformDate(isoString),
        type: "text",
      },
      preventDefault: () => null,
    };
    onChangeSetStore({ ...e, ...event });
    console.log("e>>> ", event);
  }
  
  const validatePhoneNumber = (value:any) => {
    setPhoneInput(value);
    
    if (!value) {
      setError('El número de teléfono es requerido');
      setIsValid(false);
      return;
    }

    try {
      if (isValidPhoneNumber(value)) {
        setError('');
        setIsValid(true);
        
        const event = {
          target:{
            name:"studentPhone",
            value:value,
            type: "text",
          },
          preventDefault:()=>null,
        }      
        onChangeSetStore({...event})
        
      } else {
        setError('Número de teléfono inválido');
        setIsValid(false);
      }
    } catch (err) {
      setError('Error al validar el número');
      setIsValid(false);
    }
  };
  
  
  
   async function saveData(){
    
    console.log(`
      VALIDACIONES:
      studentName = ${studentName !== "" && "Falta el nombre"}
      studentBithday = ${studentBithday !== "" && "Falta Fecha de nacimiento"}
      studentResidence = ${studentResidence !== "" && "Falta la residencia"}
      studentGender = ${studentGender !== "" && "Falta el genero"}
      guardianRelation = ${guardianRelation !== "" && "Falta el Residencia del apoderado"}
      `)
    
    studentName !== "" && studentBithday !== "" && studentResidence !== "" && studentEmail !== "" && studentGender !== "" && guardianRelation &&
        await Promise.all([
          await dispatch(setStudent({
            name: studentName,
            lastName: studentLastName,
            birthdate: studentBithday,
            placeOfResidence: studentResidence,
            contactPhone: studentPhone,
            emailPhone: studentEmail,
            gender: studentGender,
            idUser: studentEmail,
            relation: guardianRelation,
          })),
          await dispatch(getGuardian({userEmail:guardianEmail})),
          setStudentSlide(false),
        ]);
      
    }
    
    
    
  useEffect(() => {
    dispatch(getParameters({ key: "TYPEOFGENDERS" }));
    dispatch(getParameters({ key: "CITYOFRESIDENCE" }));
    dispatch(getParameters({ key: "TYPEOFRELATIONSHIP" }));
    return () => {};
  }, []);

  
    
 
  // }
  
  return (
    <>
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
  <div className="w-full sm:w-auto">
    <div className="flex flex-col">
      <h3 className="text-xl font-medium">Creación de un nuevo Alumno</h3>
      <span className="text-base font-light mt-2">Ingrese los datos para continuar</span>
    </div>
  </div>
  <div className="w-full sm:w-auto flex flex-col justify-end items-end bg-primary/20 rounded-xl p-4">
    <p>Apoderado: <b>{guardianName}</b></p>
    <p>{guardianEmail}</p>
  </div>
</div>
        <div className="flex flex-col pt-5 mt-5 sm:flex-row xl:items-center first:mt-0 first:pt-0">
          <label className="mb-2 sm:mr-5 sm:text-right sm:w-60 xl:mr-14">
            <div className="flex items-center">
              <div className="font-medium">Nombres y apellidos</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Requerido
              </div>
            </div>
          </label>
          <div className="flex-1 w-full mt-3 xl:mt-0">
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
              <FormInput
                type="text"
                className="w-full md:w-auto px-6 py-3 rounded-full focus:z-10"
                placeholder="Nicole"
                aria-describedby="studentName"
                name="studentName"
                value={studentName}
                onChange={onChangeSetStore}
              />
              <FormInput
                type="text"
                className="w-full md:w-auto px-6 py-3 rounded-full focus:z-10"
                placeholder="Ortega"
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
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3 xl:mt-0">
                <div className="relative w-full sm:w-auto">
                  <Lucide
                    icon="Calendar"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                  />
                  <Litepicker 
                    value={studentBithday} 
                    type="text" 
                    name="studentBithday" 
                    onChange={(e)=>setDateBirthday(e)}
                    options={{
                      format: 'DD/MM/YYYY', 
                      autoApply: true,
                      showWeekNumbers: false,
                      dropdowns: {
                        minYear: 1930,
                        maxYear: null,
                        months: true,
                        years: true,
                      },
                    }}
                    className="px-6 py-3 pl-12 rounded-full w-full sm:w-auto focus:z-10"
                  />    
                </div>
                  <Alert 
                    variant="soft-secondary" 
                    className="flex items-center justify-center rounded-full w-full sm:w-auto"
                  >
                    <div className="uppercase font-thin text-slate-900 text-nowrap overflow-hidden text-ellipsis">
                      {`${birthday.years} años, ${birthday.month} meses`}
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
              
              {/* PARENTESCO */}
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Relación con el alumno</div>
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                <ListParams
                  list={relationship}
                  text={guardianRelation}
                  value={guardianRelation || ""}
                  isLoading={false}
                  fn={onChangeSetStore}
                  handleCreate={(value) => null }
                  name={"guardianRelation"}
                />
                </div>
              </div>
              
              
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Email</div>
                      
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
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <div className="flex flex-col items-center md:flex-row">
                    {/* <FormInput
                      type="text"
                      className="px-6 py-3 rounded-full mr-8 focus:z-10"
                      placeholder={users.fakeUsers()[0].phone}
                      aria-describedby="studentPhone"
                      name="studentPhone"
                      value={studentPhone}
                      onChange={onChangeSetStore}
                    /> */}
                     <>
                    <PhoneInput
                        international
                        defaultCountry="CL"
                        name="guardianPhone"
                        value={studentPhone}
                        onChange={validatePhoneNumber}
                        className=" px-6 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                        error={error}
                      />
                  { error && <p className="text-red-500 mt-2">{error}</p>}
                  </>
                  </div>
                </div>
              </div>
              
              
              <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium"></div>
                    </div>
                  </div>
                </label>
                <div className="flex-1 w-full mt-3 xl:mt-0">
                  <div className="flex flex-col items-center md:flex-row mb-10">
                    <Button
                      rounded
                      variant="primary"
                      className="border border-slate-200 px-8 py-3 w-full xl:w-96"
                      onClick={() => saveData()}
                    >
                      <Lucide icon="Plus" className="w-6 h-6 mr-2" />{" "}
                      Grabar y continuar
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* <pre>{JSON.stringify(enrollment, null, 2 )}</pre> */}
    </>
  );
};