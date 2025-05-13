import React, { useState, useId } from "react";
// import { Link } from "react-router-dom";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Alert from '@/components/Base/Alert';
import { Dialog } from "@/components/Base/Headless";

import { Course } from '@/stores/Courses/types';

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectEnrollment, setDataEnroll, setEnrollment, setStep } from "@/stores/Enrollment/slice";
import { selectAuth, getUser} from "@/stores/Users/slice";


import Litepicker from "@/components/Base/Litepicker";

const typeOfCourse: any = {
  [""]: "",
  ["CHILDREN"]: "Niños",
  ["BABIES"]: "Bebés",
};

function changeName(name:string){
  return typeOfCourse[String(name)] || typeOfCourse[""];
}

function convertirFecha(fechaString: string): Date {
  // Asumimos que la fecha viene en formato "dd/mm/yyyy"
  const [dia, mes, anio] = fechaString.split('/');
  
  // Creamos una nueva fecha en formato "yyyy-mm-dd"
  return new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
}
function calcularEdad(fechaNacimientoString: string): { años: number; meses: number } {
  const fechaNacimiento = convertirFecha(fechaNacimientoString);
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




interface Props {
  courses: Course;
  
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



const CardCourses: React.FC<Props> = ({courses}) => {
  const id = useId();
  const [isSaved, setIsSaved] = useState<any>({ state: false});
  
  const [startSession, setStartSession] = useState({date:"", month:"", years:""})
  const [selectedModal, setSelectedModal] = useState(false)
  const [option, selectedOption] = useState({id:"", selected:false})
  const [optionDay, selectedOptionDay] = useState({id:"", selected:false})
  
  
  const {email}= useAppSelector(selectAuth);
  const {enrollment, sessions, currentStep, cartId} = useAppSelector(selectEnrollment);
  const dispatch = useAppDispatch();

  function transformDate(isoDate:string) {
    const date = new Date(isoDate);
    
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = date.getUTCFullYear();
  
    return `${month}-${day}-${year}`;
  }
  
  async function setDateBirthday(e:any){
    // fecha en formato ISO 8601 ("2016-07-15T04:00:00.000Z") 

    // console.log("e>>> ", e)
    
    const date:string= new Date(e.target.value).toISOString()
    const getBirthday:any = tiempoTranscurrido(e.target.value)
    setStartSession({ date:e.target.value, month:getBirthday.meses , years:getBirthday.años});
    
    const event = {
      target:{
        name:"studentBithday",
        value:transformDate(date),
        type: "text",
      },
      preventDefault:()=>null,
    }
    setValueEnrrollment({key:"enrollmentStartDate", value:transformDate(date)})
    // console.log("e>>> ", event)
    
  }
  
  
  type SetValueEnrollmentParams = {
    key: string;
    value: string;
  };
  
  function setValueEnrrollment({ key, value }: SetValueEnrollmentParams): void {
    // Asumimos que dispatch está disponible en el scope, si no, deberías pasarlo como parámetro
    dispatch(
      setDataEnroll({
        key,
        value
      })
    );
  }
  async function setEnrollmentCourse() {
    
    setIsSaved({ state: true })
    enrollment?.guardianId && 
    enrollment?.studentId  && 
    enrollment?.enrollmentStartDate && 
    enrollment?.enrollmentSessionTypeId && 
    enrollment?.enrollmentScheduleId && 
    enrollment?.enrollmentCourseId  && 
    await Promise.all([
      await dispatch(
        setEnrollment({
          userId: enrollment?.guardianId,
          studentId: enrollment?.studentId,
          enrollmentStartDate: enrollment?.enrollmentStartDate,
          enrollmentSessionTypeId: enrollment?.enrollmentSessionTypeId,
          enrollmentScheduleId: enrollment?.enrollmentScheduleId,
          enrollmentCourseId: enrollment?.enrollmentCourseId
        })),
      await dispatch(getUser({userEmail:email})),
      dispatch(setStep(4))
    ]);
    
    !enrollment?.guardianId && 
    !enrollment?.studentId  && 
    !enrollment?.enrollmentStartDate && 
    !enrollment?.enrollmentSessionTypeId && 
    !enrollment?.enrollmentScheduleId && 
    !enrollment?.enrollmentCourseId  && alert("Debe seleccionar todos los datos para continuar")
    
    setIsSaved({ state: false })
    setSelectedModal(false);
    
  }
  
  return (
    <>
    
    
      {/* <pre>{JSON.stringify(courses.gender, null, 2)}</pre> */}

        <Dialog key={`${courses.id}-span-options-modal`}  size="lg" open={selectedModal} onClose={()=> {
            setSelectedModal(false);
            }}
            >
            <Dialog.Panel>
                <div className="p-5 text-center">
                    {/* <Lucide icon="XCircle" className="w-16 h-16 mx-auto mt-3 text-warning" /> */}
                    <div className="mt-5 text-3xl">Proceso de inscripción</div>

                    <div className="mt-10 flex flex-col justify-center">
                      <span className="my-2 text-lg text-slate-500">
                      Seleccione el pack de sessiones
                      </span>
                      <div className="mt-2 flex flex-row justify-center">
                        {/* <pre>{JSON.stringify(courses?.sessionTypes?.items, null, 2)}</pre> */}
                      { Array.isArray(courses?.sessionTypes?.items) &&
                        courses?.sessionTypes?.items.map((item: any, i: number) =>
                        option?.id===item?.sessionType?.id && option?.selected === true ?
                        <span key={`${i}-span-options`} className="rounded-full px-4 py-2 border border-slate-200 mx-2 font-light bg-slate-400 text-white">{item?.sessionType?.name}</span>
                        :<Button
                            key={`${i}-span-buttons`} 
                            rounded
                            variant="outline-secondary"
                            className={`px2 py-2 border border-slate-200 mx-2 font-light `}
                            onClick={()=>{
                              selectedOption(
                              {
                                id:item?.sessionType.id, 
                                selected:true
                              }
                              );
                              setValueEnrrollment({key:"enrollmentSessionTypeId", value:item?.sessionType?.id})
                              setValueEnrrollment({key:"enrollmentSessionTypeName", value:item?.sessionType?.name})
                            }
                          }
                          >{item?.sessionType?.name}</Button>
                        
                      )
                      }
                      </div>
                    </div>
                    <div className="my-4 border-t border-slate-200/60"></div>
                    
                    <div className=" flex flex-col justify-center">
                      <span className="mt-2 text-lg text-slate-500">Seleccione el día de la clase</span>
                      <div className="mt-2 flex flex-row justify-center">
                        {/* <pre>{JSON.stringify(courses?.schedules?.items, null, 2)}</pre> */}
                        { Array.isArray(courses?.schedules?.items) &&
                          courses?.schedules?.items.map((item: any, i: number) =>
                          optionDay?.id===item?.id && optionDay?.selected === true ?
                          <span key={`${i}-span-options-schedules`}  className="rounded-full px-4 py-2 border border-slate-200 mx-2 font-light bg-slate-400 text-white">{item?.day}{" "}{item?.startHour}</span>
                          :
                          <Button
                          key={`${i}-span-options-button-schedules`} 
                              rounded
                              variant="outline-secondary"
                              className={`px2 py-2 border border-slate-200 mx-2 font-light `}
                              onClick={()=>{
                                selectedOptionDay(
                                  {
                                    id:item?.id, 
                                    selected:true
                                  }
                                )
                                setValueEnrrollment({key:"enrollmentScheduleId", value:item?.id})
                                setValueEnrrollment({key:"enrollmentScheduleName", value:`${item?.day} ${item?.startHour}`})
                              }
                            }
                          >{item?.day}{" "}{item?.startHour}</Button>
                          )}
                      </div>
                    </div>
                    <div className="my-4 border-t border-slate-200/60"></div>
                    
                    <div className=" flex flex-col justify-center">
                      <span className="mt-2 text-lg text-slate-500">Seleccione el día de la clase</span>
                      <div className="mt-2 flex flex-row justify-center">
                        <div className="relative">
                          <Lucide
                            icon="Calendar"
                            className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                          />
                          <Litepicker value={startSession.date} type="text" name="enrollmentStartDate" 
                            onChange={(e)=>setDateBirthday(e)}
                            options={{
                              autoApply: true,
                              showWeekNumbers: false,
                              dropdowns: {
                                minYear: new Date().getFullYear() - 2,
                                maxYear: new Date().getFullYear() + 1,
                                months: true,
                                years: true,
                              },
                            }}
                            className="px-6 py-3 pl-12 rounded-full mr-8 focus:z-10"
                          />    
                        </div>
                      </div>
                    </div>
                </div>
                <div className="p-5 text-primary text-center border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="px-5 pb-8 text-center">
                      <Button rounded type="button" variant="primary" onClick={()=> {
                          setEnrollmentCourse();
                          // setSelectedModal(false);
                          }}
                          disabled = {isSaved.state}
                          className="px-12 py-4"
                          >
                          {isSaved.state && <LoadingIcon icon="puff" color="#FFFFFF" className="mr-2 w-8 h-8" />}
                          Inscribir
                      </Button>
                  </div>
                  {/* Listado de sessiones creadas
                  <pre>sessions = {JSON.stringify(sessions)}</pre>
                  <pre>cartId = {JSON.stringify(cartId)}</pre> */}
                </div>
            </Dialog.Panel>
        </Dialog>
        <div
          key={`${id}-${courses.id}`}
          className=" intro-y w-[48%] mb-6"
        >
        <div
          key={`${id}-${courses.id}`}
          className="h-full"
          // onClick={(event: React.MouseEvent) => {
          //   event.preventDefault();
          //   alert("hiu");
          //   // dispatch(getUsersAccess(user.id))
          //   // setButtonModalPreview(true);
          // }}
        >
          <div>
            <div className={`px-4 box h-[220px] cursor-pointer`} >
              <div className="flex flex-row items-center justify-center border-1">
                {/* <div className="flex flex-col items-center justify-center p-4 h-40 border-r-4"> */}
                <div className="flex flex-col items-center justify-center p-4 ">
                  
                  {courses?.AgeGroupType === "BABIES" && <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_450_4227)">
                      <path d="M40.8452 38.7301C40.8245 38.7927 40.8036 38.8555 40.7829 38.9182C39.8487 41.7337 36.6256 43.0354 33.9844 41.6847C26.6248 37.9205 19.6205 29.1667 16.1823 21.6494C14.9485 18.9517 16.39 15.7886 19.2439 14.9787C19.3075 14.9607 19.3709 14.9426 19.4345 14.9246C21.7371 14.2711 24.1543 15.4119 25.1529 17.5872C27.6666 23.0629 33.0754 30.1496 38.4356 32.9008C40.5652 33.9935 41.5991 36.4583 40.8452 38.7301Z" fill="#FFDDCF"/>
                      <path d="M38.4356 32.9008C35.1406 31.2096 32.2523 28.865 29.9313 26.0381C27.525 28.4529 25.4804 31.0992 23.7982 33.9778C26.6987 37.1004 30.1393 39.7182 33.9844 41.6848C36.6255 43.0357 39.8487 41.7339 40.7827 38.9184C40.8035 38.8557 40.8244 38.7929 40.8451 38.7302C41.5991 36.4586 40.5652 33.9938 38.4356 32.9008Z" fill="#FFCBBE"/>
                      <path d="M46.1718 62.1505C37.3534 59.0491 29.584 54.0725 23.0793 47.359C25.2955 39.3449 29.6405 32.5615 35.9938 27.1973C44.8119 30.2987 52.5812 35.2751 59.0861 41.9886C56.8701 50.0029 52.5251 56.7863 46.1718 62.1505Z" fill="#FFDDCF"/>
                      <path d="M35.9938 27.1973C33.2145 29.5439 30.8296 32.1432 28.8383 34.9946C30.1373 40.1785 33.3705 44.925 38.271 48.0641C43.6152 51.4873 49.8671 52.3106 55.5031 50.8524C57.0171 48.1025 58.2123 45.1487 59.0861 41.9888C52.551 35.2436 44.8535 30.3132 35.9938 27.1973Z" fill="#FFCBBE"/>
                      <path d="M79.8135 71.4083V53.9178C79.8135 51.5472 78.1865 49.4679 75.8739 48.9466C70.7215 47.7851 68.9649 45.1777 61.084 45.1777C50.9447 45.1777 50.9447 49.4943 40.8056 49.4943C30.6667 49.4943 30.6667 45.1777 20.528 45.1777C12.4033 45.1777 10.789 47.9495 5.25108 49.0509C2.88072 49.5223 1.18652 51.6244 1.18652 54.0412V71.4084C1.18652 74.2227 3.46797 76.5042 6.28225 76.5042H74.7178C77.532 76.5042 79.8135 74.2227 79.8135 71.4083Z" fill="#CEEAFB"/>
                      <path d="M71.3437 37.5111C77.6631 27.6392 74.6261 14.413 64.5604 7.96947C54.4946 1.52595 41.2118 4.30521 34.8924 14.1771C28.573 24.049 31.61 37.2753 41.6757 43.7188C51.7415 50.1623 65.0243 47.383 71.3437 37.5111Z" fill="#FFDDCF"/>
                      <path d="M36.306 57.6128C36.306 54.7266 36.7419 51.9422 37.5503 49.3212C30.521 48.5171 29.4462 45.1777 20.528 45.1777C12.4033 45.1777 10.789 47.9495 5.25108 49.0509C2.88072 49.5221 1.18652 51.6242 1.18652 54.0411V71.4083C1.18652 74.2226 3.46797 76.504 6.28225 76.504H43.6041C39.0697 71.5141 36.306 64.8862 36.306 57.6128Z" fill="#A3DEFE"/>
                      <path d="M47.5124 29.1915C47.5124 19.1003 53.64 10.4408 62.3771 6.72963C52.6524 1.96265 40.7827 5.0106 34.9124 14.1751C28.5886 24.0478 31.6228 37.2783 41.6894 43.7262C45.9316 46.4435 50.7457 47.5225 55.3697 47.1227C50.5389 42.6656 47.5124 36.2825 47.5124 29.1915Z" fill="#FFCBBE"/>
                      <path d="M58.3745 17.6783C65.2702 22.0953 70.4655 27.7859 73.3713 33.5025C76.7751 24.3084 73.3399 13.5795 64.5898 7.97488C55.8397 2.37022 44.6576 3.73598 37.7291 10.6724C44.1371 10.9216 51.4787 13.2612 58.3745 17.6783Z" fill="#FFDDCF"/>
                      <path d="M58.3745 17.6783C65.2702 22.0953 70.4655 27.7859 73.3713 33.5025C76.7751 24.3084 73.3399 13.5795 64.5898 7.97488C55.8397 2.37022 44.6576 3.73598 37.7291 10.6724C44.1371 10.9216 51.4787 13.2612 58.3745 17.6783Z" fill="#EC9ED2"/>
                      <path d="M43.092 27.9816C44.1028 26.4026 43.3148 24.0935 41.3319 22.8242C39.349 21.5548 36.9222 21.8059 35.9113 23.385C34.9005 24.9641 35.6885 27.2731 37.6714 28.5425C39.6543 29.8118 42.0812 29.5607 43.092 27.9816Z" fill="#EDA1AB"/>
                      <path d="M62.3778 6.7294C54.0233 2.63383 44.086 4.30762 37.7291 10.6718C42.3336 10.8509 47.42 12.1093 52.4768 14.4421C55.0326 11.0808 58.4397 8.40208 62.3778 6.7294Z" fill="#E889C8"/>
                      <path d="M62.5463 40.4455C63.5572 38.8664 62.7691 36.5574 60.7863 35.288C58.8034 34.0187 56.3765 34.2698 55.3657 35.8489C54.3548 37.4279 55.1428 39.737 57.1257 41.0063C59.1086 42.2757 61.5355 42.0246 62.5463 40.4455Z" fill="#EDA1AB"/>
                      <path d="M54.2788 12.9434L64.9011 19.7432L62.559 23.402L51.9367 16.6022L54.2788 12.9434Z" fill="#9A7BCF"/>
                      <path d="M50.9503 19.1403L46.9616 16.5854C45.6374 15.7373 45.2515 13.9764 46.0997 12.6522L47.548 10.391C48.3961 9.06683 50.1571 8.68098 51.4813 9.5291L55.47 12.0841C56.7942 12.9322 57.1801 14.6932 56.3319 16.0173L54.8836 18.2785C54.0354 19.6025 52.2745 19.9884 50.9503 19.1403Z" fill="#B49CDC"/>
                      <path d="M64.1389 27.5887L60.1501 25.0337C58.826 24.1856 58.4401 22.4246 59.2883 21.1004L60.7366 18.8392C61.5847 17.5151 63.3457 17.1292 64.6699 17.9773L68.6586 20.5323C69.9828 21.3805 70.3686 23.1414 69.5205 24.4656L68.0722 26.7268C67.224 28.0509 65.4631 28.4368 64.1389 27.5887Z" fill="#6E6F80"/>
                      <path d="M54.8917 11.7134L51.4815 9.5291C50.1573 8.68098 48.3964 9.06683 47.5483 10.391L46.0999 12.6522C45.2518 13.9764 45.6376 15.7373 46.9618 16.5854L49.9696 18.512C51.2113 15.9656 52.8838 13.6683 54.8917 11.7134Z" fill="#585966"/>
                      <path d="M42.7565 25.2364C42.9547 25.3634 43.1762 25.424 43.3953 25.424C43.7862 25.424 44.1691 25.2308 44.3956 24.8772L45.2908 23.4798C45.6442 22.9282 45.4834 22.1943 44.9316 21.8409C44.3797 21.4874 43.6459 21.6482 43.2925 22.2001L42.3974 23.5975C42.044 24.149 42.2047 24.8829 42.7565 25.2364Z" fill="black"/>
                      <path d="M49.8128 31.0377C50.5211 31.4915 51.3374 31.7255 52.1623 31.7255C52.5725 31.7255 52.9851 31.6675 53.3873 31.5502C54.0163 31.3663 54.3772 30.7074 54.1933 30.0784C54.0095 29.4494 53.3507 29.0885 52.7216 29.2722C52.1693 29.4337 51.5757 29.3486 51.0929 29.0395C50.61 28.7302 50.2848 28.2263 50.2003 27.6573C50.1042 27.0091 49.5012 26.5612 48.8525 26.6576C48.2042 26.7536 47.7567 27.357 47.8529 28.0053C48.0378 29.2531 48.7522 30.3583 49.8128 31.0377Z" fill="black"/>
                      <path d="M59.9477 36.193C60.146 36.32 60.3675 36.3806 60.5867 36.3806C60.9776 36.3806 61.3605 36.1874 61.5869 35.8339C62.0349 35.1344 62.1836 34.3024 62.006 33.491C61.8281 32.6796 61.345 31.986 60.6456 31.538C59.946 31.09 59.114 30.9413 58.3028 31.1191C57.4915 31.2967 56.7978 31.7799 56.3499 32.4795C55.9965 33.0311 56.1572 33.765 56.709 34.1185C57.2607 34.4719 57.9946 34.3111 58.3482 33.7592C58.5673 33.4175 59.0237 33.3172 59.3657 33.5363C59.7078 33.7554 59.8077 34.212 59.5888 34.554C59.235 35.1056 59.3959 35.8395 59.9477 36.193Z" fill="black"/>
                      <path d="M76.1353 47.7825C74.4026 47.3919 73.0851 46.8312 71.6904 46.2377C70.1117 45.5658 68.4958 44.8789 66.2795 44.4433C68.6973 42.7827 70.7677 40.6542 72.3661 38.1595C73.2087 36.8447 73.9123 35.4367 74.4581 33.9728C74.4662 33.9545 74.4738 33.9358 74.4814 33.9159C78.1674 24.1656 74.1901 12.5836 65.2294 6.96928C65.1998 6.94998 65.1699 6.93163 65.1403 6.91249C56.3089 1.183 44.2127 2.41382 36.927 9.79178C36.9216 9.79669 36.9167 9.80223 36.9115 9.80729C36.8941 9.82406 36.8768 9.84099 36.8605 9.8587C35.7547 10.9677 34.7632 12.202 33.9135 13.5278C33.8566 13.6167 33.8004 13.7057 33.7449 13.795C33.3989 14.3515 33.5698 15.0832 34.1262 15.429C34.683 15.7749 35.4146 15.6042 35.7602 15.0476C35.8098 14.9679 35.8599 14.8883 35.9112 14.8086C36.5826 13.7609 37.3525 12.778 38.2043 11.8802C40.2896 11.9976 42.4562 12.3408 44.6694 12.9049C44.4397 13.5882 44.3981 14.323 44.5563 15.0452C44.7868 16.0976 45.4135 16.9973 46.3209 17.5787L50.3113 20.1338C50.9794 20.5611 51.7318 20.7663 52.4779 20.7663C53.3531 20.7663 54.2184 20.4825 54.9281 19.9445L57.7484 21.7507C57.3917 23.3566 58.046 25.0884 59.5097 26.0261C59.5097 26.0261 63.4958 28.5794 63.4985 28.5809C64.3716 29.1402 65.5243 29.3466 66.5374 29.1247C67.2608 28.9662 67.9122 28.6205 68.4374 28.1252C69.8733 29.8981 71.0916 31.7221 72.0702 33.5673C71.6091 34.7216 71.0376 35.8334 70.3675 36.8792C68.3917 39.9633 65.6087 42.4213 62.31 44.0072C61.9164 43.9926 61.5057 43.985 61.0835 43.985C56.4099 43.985 53.7555 44.8717 51.3032 45.8893C48.1373 45.5492 45.0403 44.4584 42.3291 42.7216C41.3445 42.0913 40.4117 41.3786 39.5562 40.6029C36.5509 37.88 34.4347 34.3762 33.4351 30.4681C33.4328 30.458 33.4304 30.4477 33.4277 30.4376C33.2144 29.601 33.054 28.7515 32.9509 27.9116C32.6112 25.1636 32.8341 22.4411 33.6134 19.8195C33.8001 19.1914 33.4422 18.5308 32.8142 18.3441C32.1858 18.1571 31.5255 18.5153 31.3388 19.1435C30.8264 20.8671 30.5304 22.6293 30.4486 24.4123C28.8226 21.9318 27.1592 18.7391 26.2309 16.7167C24.9771 13.9843 21.9825 12.5925 19.1177 13.4051L18.9197 13.4611C17.2332 13.9397 15.8445 15.127 15.1095 16.7185C14.3702 18.3196 14.3678 20.1599 15.1033 21.7674C17.4326 26.8602 21.6912 33.7709 25.8218 37.5613C24.6634 39.6162 23.6748 41.7975 22.8716 44.0678C22.1296 44.0125 21.3558 43.9849 20.5281 43.9849C15.2166 43.9849 12.5262 45.1301 9.9244 46.2377C8.41119 46.8819 6.98166 47.4903 5.01899 47.8806C2.1109 48.4592 0 51.047 0 54.0342V71.4016C0 74.8656 2.81823 77.6839 6.28225 77.6839H56.2119C56.8672 77.6839 57.3985 77.1528 57.3985 76.4973C57.3985 75.8419 56.8672 75.3108 56.2119 75.3108H6.28225C4.12673 75.3108 2.37305 73.5571 2.37305 71.4016V54.0342C2.37305 52.1757 3.6806 50.5666 5.48205 50.2083C7.68551 49.77 9.29633 49.0844 10.8542 48.4212C13.3466 47.3603 15.7009 46.3581 20.5283 46.3581C21.6268 46.3581 22.6183 46.409 23.5607 46.5139C26.4743 46.8352 28.2848 47.6057 30.2016 48.4217C32.8034 49.5289 35.494 50.6738 40.8053 50.6738C46.1197 50.6738 48.8112 49.5272 51.4143 48.4182C51.5894 48.3435 51.7645 48.269 51.9395 48.1953C54.3281 47.1901 56.6649 46.3581 61.0838 46.3581C61.579 46.3581 62.0568 46.3687 62.5061 46.39C66.4045 46.5672 68.5208 47.4677 70.7611 48.4212C72.1917 49.0301 73.6711 49.6596 75.613 50.0975C77.3594 50.4916 78.627 52.0953 78.627 53.9107V71.4016C78.627 73.5571 76.8733 75.3108 74.7178 75.3108H61.7491C61.0938 75.3108 60.5625 75.8419 60.5625 76.4973C60.5625 77.1528 61.0938 77.6839 61.7491 77.6839H74.7178C78.1818 77.6839 81 74.8658 81 71.4016V53.9107C81 50.9959 78.9541 48.4187 76.1353 47.7825ZM69.8634 26.1232L70.5195 25.099C71.7192 23.2261 71.1715 20.7263 69.2985 19.5267L65.3099 16.9718C64.4028 16.3908 63.3233 16.1976 62.271 16.4281C62.1802 16.448 62.0909 16.4719 62.0025 16.4977L57.922 13.8831C57.75 12.7453 57.0947 11.7108 56.1107 11.0796L52.1208 8.52458C50.2474 7.32508 47.7478 7.87231 46.5483 9.74559L45.8927 10.7712C44.1037 10.2847 42.3367 9.93148 40.6088 9.7149C47.1868 4.72754 56.7146 4.28094 63.8566 8.90854C71.0063 13.267 74.8741 22.3069 73.0319 30.483C72.1126 29.0027 71.0528 27.545 69.8634 26.1232ZM59.7377 18.1927L58.8229 19.6208L56.4163 18.0796L57.1344 16.9584C57.1347 16.9581 57.1349 16.9576 57.1352 16.9573L57.3298 16.6526C57.3801 16.5741 57.4276 16.4942 57.4722 16.4129L59.8954 17.9657C59.8408 18.0395 59.7875 18.1147 59.7377 18.1927ZM53.8917 17.6216C53.411 18.3726 52.3663 18.6317 51.5908 18.1353C51.5908 18.1353 47.6104 15.5866 47.6009 15.5806C46.8507 15.1003 46.6225 14.0305 47.1002 13.2855L48.5472 11.0243C49.0404 10.2541 50.0697 10.0285 50.8411 10.523C50.8411 10.523 54.8231 13.0729 54.8302 13.0775C55.5853 13.561 55.815 14.62 55.3315 15.3727C55.3315 15.3727 53.8921 17.6211 53.8917 17.6216ZM67.0729 26.0802C66.5848 26.8421 65.5393 27.0698 64.779 26.5828L60.7902 24.028C60.0191 23.5341 59.7937 22.5048 60.2876 21.7337C60.2876 21.7337 61.7339 19.476 61.7361 19.4725C62.2222 18.7135 63.2727 18.4849 64.0302 18.9699L68.0188 21.5248C68.3923 21.7641 68.6503 22.1345 68.7453 22.5678C68.8402 23.0011 68.7608 23.4455 68.5214 23.819C68.5214 23.819 67.0743 26.078 67.0729 26.0802ZM17.2615 20.7804C16.8145 19.803 16.8154 18.6852 17.2641 17.7133C17.7085 16.7513 18.5481 16.0334 19.5568 15.747L19.7574 15.6904C21.4966 15.1963 23.312 16.0449 24.0744 17.7064C25.3038 20.3847 28.2007 25.9676 30.6515 28.602C30.7363 29.2005 30.8452 29.8013 30.9797 30.3985C29.5422 31.9937 28.2353 33.6979 27.0788 35.4852C23.4451 31.9833 19.4906 25.654 17.2615 20.7804ZM31.1309 46.238C29.4571 45.5256 27.7324 44.7942 25.2885 44.3652C26.1223 42.1035 27.1494 39.9394 28.3563 37.9184C29.3589 36.238 30.5028 34.6267 31.7683 33.1078C33.0342 36.6412 35.147 39.8099 37.9627 42.3612C38.9156 43.2252 39.9544 44.0189 41.0496 44.7199C42.9484 45.9363 45.0186 46.8676 47.1713 47.4868C45.5351 47.9697 43.5785 48.3008 40.8053 48.3008C35.9779 48.3008 33.6235 47.2989 31.1309 46.238Z" fill="black"/>
                      <path d="M9.81486 58.2599C9.28473 58.6452 9.16718 59.3871 9.55241 59.9173C9.78449 60.237 10.1463 60.4066 10.5133 60.4066C10.7551 60.4066 10.9992 60.3329 11.2097 60.1797C16.7342 56.166 24.1574 56.166 29.6819 60.1797C30.212 60.5653 30.9541 60.4471 31.3392 59.9173C31.7244 59.3871 31.6069 58.6452 31.0767 58.2599C24.7179 53.6399 16.1734 53.6399 9.81486 58.2599Z" fill="black"/>
                      <path d="M69.3094 62.0957C68.9242 61.5654 68.1824 61.4479 67.6521 61.8333C62.1278 65.8467 54.7046 65.8469 49.18 61.8333C48.6498 61.4477 47.9077 61.5658 47.5226 62.0957C47.1374 62.6259 47.2549 63.3679 47.7851 63.7531C50.9643 66.0632 54.6902 67.2179 58.4159 67.2179C62.1417 67.2179 65.8675 66.063 69.0468 63.7531C69.5769 63.3679 69.6946 62.6257 69.3094 62.0957Z" fill="black"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_450_4227">
                      <rect width="81" height="81" fill="white"/>
                      </clipPath>
                      </defs>
                      </svg>
                    }
                  {courses?.AgeGroupType === "CHILDREN" && <svg width="81" height="80" viewBox="0 0 91 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_405_4163)">
                    <path d="M86.5299 50.6464C84.1487 50.2246 80.4288 49.8983 76.5683 51.342C72.6591 52.8026 68.5005 52.8008 64.7656 51.5614C69.9524 51.3869 74.9816 49.2954 78.8164 45.4622C86.9648 37.3119 86.9648 24.1011 78.8164 15.9526C70.666 7.80226 57.4552 7.80226 49.3067 15.9526C44.2988 20.9591 42.3603 27.884 43.5207 34.387L43.4363 34.402C38.9365 32.5271 40.4364 10.9653 33.9041 10.2284C27.1975 9.47095 32.2167 30.1853 28.4368 41.9017C27.4206 45.0498 22.4201 47.6447 19.2177 52.407C17.5753 52.2739 15.961 51.9139 14.4291 51.342C10.533 49.8871 6.83565 50.2208 4.46386 50.6464C3.03703 50.9033 2 52.1483 2 53.5976V78.6505C2 80.308 3.34246 81.6504 4.9999 81.6504H85.9972C87.6546 81.6504 88.9971 80.308 88.9971 78.6505V53.5995C88.9971 52.1464 87.9584 50.8996 86.5299 50.6464Z" fill="#B3CCFF"/>
                    <path d="M88.9971 53.6V57.0673C88.9971 58.1619 87.8616 58.9158 86.8705 58.4514C84.0703 57.1397 79.2529 57.8383 76.5681 58.8423C72.4395 60.3854 68.0334 60.2954 64.141 58.8423C60.0106 57.3011 55.6045 57.3892 51.7121 58.8423C47.5854 60.3835 43.1736 60.2954 39.285 58.8423C35.1545 57.2992 30.7484 57.3892 26.856 58.8423C22.7256 60.3835 18.3213 60.2954 14.429 58.8423C11.8805 57.8906 6.92921 57.1331 4.09562 58.4294C3.11446 58.8785 2 58.1321 2 57.0531V53.5981C2 52.1488 3.03684 50.9038 4.46367 50.647C6.83546 50.2213 10.5328 49.8876 14.429 51.3426C18.3213 52.7956 22.7256 52.8838 26.856 51.3426C30.7484 49.8895 35.1545 49.7995 39.285 51.3426C43.1736 52.7956 47.5854 52.8838 51.7121 51.3426C55.6045 49.8895 60.0106 49.8014 64.141 51.3426C68.0334 52.7956 72.4395 52.8856 76.5681 51.3426C80.4286 49.8989 84.1485 50.2251 86.5297 50.647C87.9584 50.9001 88.9971 52.1469 88.9971 53.6Z" fill="#96B8FF"/>
                    <path d="M78.8162 15.9509C70.3701 7.50484 56.7009 7.96008 48.8622 16.4102H48.8603C44.1767 21.3826 42.3974 28.0911 43.5205 34.3853L43.4361 34.4003C38.9362 32.5253 40.4362 10.9635 33.9039 10.2267C27.1973 9.46921 32.2165 30.1835 28.4366 41.9C27.4204 45.048 22.4199 47.6429 19.2175 52.4053C21.7487 52.6097 24.353 52.274 26.856 51.3403C30.7484 49.8872 35.1545 49.7972 39.285 51.3403C43.1736 52.7934 47.5853 52.8815 51.7121 51.3403C58.8168 48.6854 64.5046 51.564 64.7654 51.5597C69.6704 51.4772 74.5263 49.5104 78.3549 45.9049C86.7771 38.1963 87.2918 24.4265 78.8162 15.9509Z" fill="#FFEBD2"/>
                    <path d="M36.7197 15.9224C34.5 21.2719 37.0722 36.317 34.0614 45.6504C33.6266 46.9953 32.4662 48.2392 31.0283 49.5951C30.4621 50.1291 29.768 50.5118 29.0101 50.6893C28.2785 50.8607 27.5591 51.0782 26.856 51.3409C24.353 52.2746 21.7487 52.6102 19.2175 52.4058C22.4199 47.6435 27.4204 45.0486 28.4366 41.9006C32.2165 30.1841 27.1973 9.46977 33.9039 10.2272C36.0792 10.473 37.8154 13.2817 36.7197 15.9224Z" fill="#FFF3E4"/>
                    <path d="M51.3048 44.373C51.907 45.4934 50.4528 46.6 49.5383 45.7156C41.6622 38.0991 40.7677 25.0015 48.8603 16.4102C48.9748 16.4102 50.6608 17.7933 53.8358 18.2579C54.7225 18.3877 55.1438 19.4532 54.487 20.16H54.4851C48.0812 26.9587 47.2362 36.8024 51.3048 44.373Z" fill="#FFF3E4"/>
                    <path d="M56.7539 50.2576C55.265 50.3555 53.7973 50.6412 52.3918 51.1028C52.0772 51.2061 51.7335 51.1544 51.4523 50.9792C45.549 47.3034 41.5762 41.2622 40.4961 34.4959C40.3133 33.3507 41.7812 32.7239 42.4966 33.6365C42.7784 33.9959 43.0895 34.2571 43.4362 34.4012L43.5205 34.3862C44.848 41.8481 50.0646 47.7604 56.7539 50.2576Z" fill="#FFD9AD"/>
                    <path d="M78.8161 15.951C87.3082 24.4431 86.7572 38.2112 78.3548 45.905C73.675 38.5027 79.9654 33.9185 70.4032 24.362C60.8467 14.7998 56.2624 21.0883 48.8621 16.4104C56.6993 7.96264 70.3674 7.50234 78.8161 15.951Z" fill="#303646"/>
                    <path d="M71.7572 13.6939C66.4569 13.1676 60.9937 14.6655 56.6206 18.1876C56.4031 18.3629 56.1307 18.4551 55.8517 18.442C53.6438 18.3374 51.4214 18.0293 48.8623 16.4129C54.8809 9.92491 64.3963 8.12366 72.3281 11.5419C73.5142 12.053 73.0422 13.8214 71.7572 13.6939Z" fill="#6E6F80"/>
                    <path d="M59.3263 26.6931L57.2052 28.8142C56.6194 29.4001 56.6194 30.3496 57.2052 30.9355C57.7913 31.5212 58.7406 31.521 59.3265 30.9355L61.4476 28.8144C62.0333 28.2284 62.0333 27.279 61.4476 26.6931C60.8619 26.1075 59.9122 26.1075 59.3263 26.6931Z" fill="#475066"/>
                    <path d="M65.9552 33.322L63.8341 35.4431C63.2483 36.029 63.2483 36.9785 63.8341 37.5644C64.4202 38.1501 65.3695 38.1499 65.9554 37.5644L68.0765 35.4433C68.6622 34.8574 68.6622 33.9079 68.0765 33.322C67.4906 32.7364 66.5411 32.7364 65.9552 33.322Z" fill="#475066"/>
                    <path d="M89.1469 49.6561C88.1764 49.5389 82.3368 47.585 76.0426 49.9382C72.3786 51.3088 68.3377 51.3083 64.6653 49.9379C62.1975 49.0171 59.5883 48.6205 56.9987 48.745C44.0728 43.6962 40.4773 26.9024 50.3661 17.0138C57.917 9.46284 70.2035 9.46284 77.7544 17.0138C84.9703 24.2295 85.2898 35.7693 78.7146 43.369C76.2944 37.5762 80.5513 32.3862 71.4638 23.3048C65.2887 17.1257 61.0067 17.1263 56.4621 16.9654C55.6345 16.944 54.9396 17.5841 54.9105 18.4119C54.8815 19.2397 55.5291 19.9344 56.3571 19.9634C60.3899 20.1063 63.8546 19.9342 69.3427 25.4259C78.0767 34.1548 72.5721 38.1702 76.4465 45.5964C76.3135 45.7073 76.1797 45.8169 76.0445 45.9236C75.3942 46.437 75.2834 47.3805 75.797 48.0303C76.3103 48.6807 77.254 48.7912 77.9037 48.2778C88.4367 39.9593 89.3113 24.3277 79.8759 14.8921C71.1548 6.17139 56.9659 6.17139 48.2448 14.8921C38.1304 25.0064 39.9973 41.9544 52.1118 49.6212C51.8019 49.7192 51.4933 49.8235 51.1873 49.9377C47.518 51.3083 43.4776 51.3083 39.8098 49.9377C35.4667 48.3153 30.68 48.3151 26.3316 49.9375C25.0419 50.4186 23.7061 50.727 22.3571 50.8701C25.4155 47.5301 28.8862 45.393 29.864 42.3631C31.5569 37.1167 31.5608 30.2951 31.564 24.2763C31.567 19.079 31.5702 13.1883 33.0124 11.9006C33.1485 11.7791 33.3293 11.6734 33.735 11.7186C36.1274 11.9888 37.3278 18.6564 37.8402 21.5035C37.987 22.3191 38.7677 22.8623 39.5822 22.714C40.3974 22.5673 40.9394 21.7874 40.7926 20.9721C39.7258 15.0451 38.3278 9.21835 34.0716 8.73761C32.8973 8.60412 31.8406 8.92492 31.0143 9.66289C26.4361 13.751 30.3772 31.004 27.009 41.4416C26.2309 43.8524 21.6902 46.5088 18.5024 50.8226C17.298 50.6629 16.1072 50.3682 14.9536 49.9373C8.63652 47.5781 2.82816 49.5438 1.86144 49.6529C1.03665 49.7294 0.429923 50.46 0.506233 51.2848C0.582543 52.1096 1.31283 52.7167 2.13818 52.64C3.36776 52.526 8.44359 50.7083 13.904 52.7475C15.5549 53.3639 17.2697 53.7447 19.0001 53.8927C19.0878 53.9054 19.1478 53.9079 19.2256 53.9079C21.9746 54.1104 24.7574 53.7266 27.3801 52.7476C31.0518 51.3778 35.093 51.3776 38.7596 52.7475C43.1138 54.3743 47.8994 54.3676 52.2365 52.7475C55.9041 51.3778 59.9455 51.378 63.6163 52.7476C67.9663 54.3706 72.7526 54.3706 77.0931 52.7473C82.5424 50.7098 87.6567 52.5253 88.8525 52.6408C89.6768 52.7206 90.4131 52.1169 90.4926 51.2923C90.5726 50.4685 89.9715 49.7356 89.1469 49.6561Z" fill="#475066"/>
                    <path d="M77.04 65.3141C72.6926 63.6921 67.9062 63.6921 63.5618 65.3143C59.8922 66.6849 55.8519 66.6849 52.1847 65.3143C51.4088 65.0245 50.5445 65.4184 50.2544 66.1942C49.9646 66.9705 50.3585 67.8344 51.1343 68.1245C55.4885 69.7512 60.2741 69.7446 64.6112 68.1245C68.2788 66.7548 72.3202 66.755 75.9909 68.1247C76.7672 68.4144 77.6311 68.0201 77.9206 67.2438C78.2105 66.4676 77.8162 65.6036 77.04 65.3141Z" fill="#475066"/>
                    <path d="M33.3341 67.4182C32.0878 67.2422 30.8569 66.9665 29.6755 66.5991C24.5757 65.014 18.9553 65.0138 13.8495 66.5989C13.0583 66.8447 12.6162 67.685 12.8618 68.4762C13.1074 69.2673 13.9478 69.7094 14.739 69.4641C19.2709 68.057 24.2592 68.057 28.7849 69.4638C30.1197 69.8791 31.509 70.1901 32.9144 70.3887C33.7347 70.5046 34.4935 69.9336 34.6096 69.1133C34.7253 68.2929 34.1543 67.5341 33.3341 67.4182Z" fill="#475066"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_405_4163">
                    <rect width="90" height="90" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                    </defs>
                  </svg>
                  }
                  
                  
                  
                  <div className=" uppercase font-thin text-xl text-slate-900">
                    {changeName(courses.AgeGroupType)}{" "}
                  </div>
                  {/* <Alert variant="soft-secondary" className="flex items-center justify-center rounded-full mb-2 w-full">
                  </Alert>     */}


                </div>
                <div className="flex flex-col items-center justify-center p-6">
                  {/* <h2 className="text-base text-center font-medium uppercase text-white rounded-full bg-slate-400 px-4 py-2 w-full mb-4">{changeName(courses.AgeGroupType)}{" "}</h2> */}
                            
                  <h2 className="text-lg font-medium uppercase text-primary">{courses.title}{" "}</h2>
                  <span className=" uppercase font-thin text-center">{courses.startingAge} - {courses.endingAge} {courses.ageType}</span>
                </div>
              </div>

              <div className="flex items-center justify-center my-4">  
              
                <Button
                  rounded
                  variant="soft-primary" //"soft-secondary"
                  size="lg"
                  className="py-2 border border-slate-200 w-48 mx-2 font-light "
                  onClick={()=> {
                    setValueEnrrollment({key:"enrollmentCourseId", value:courses?.id});
                    setValueEnrrollment({key:"enrollmentCourseName", value:courses?.title});
                    setSelectedModal(true);
                    }}
                >
                 Inscribir
              </Button>
              
              {/* { Array.isArray(courses?.schedules?.items) &&
                courses?.schedules?.items.map((item: any, i: number) =>
                  <Button
                    rounded
                    variant="outline-secondary" //"soft-secondary"
                    size="lg"
                    className="px-4 py-2 border border-slate-200 w-full mx-2 font-light h-20"
                >
                  {item.day}{" "}{item.startHour}
              </Button>
              )
              } */}
              {/* <pre>{JSON.stringify(courses?.sessionTypes?.items, null, 2)}</pre> */}
      
              </div>
              
              
              <div className="flex items-center justify-center mt-4">  
              
              {/* { Array.isArray(courses?.sessionTypes?.items) &&
                courses?.sessionTypes?.items.map((item: any, i: number) =>
                  <Button
                    variant="outline-secondary"
                    className="px-4 py-2 border border-slate-200 w-full h-20 uppercase mx-2 font-light"
                >
                  {item.sessionType.name}
              </Button>
              )
              } */}
              {/* <pre>{JSON.stringify(courses?.sessionTypes?.items, null, 2)}</pre> */}
          
                    
              </div>
            
              
    
            </div>
          </div>
        </div>
        </div>
      {/* </Link> */}
    </>
  );
};

export default CardCourses;
