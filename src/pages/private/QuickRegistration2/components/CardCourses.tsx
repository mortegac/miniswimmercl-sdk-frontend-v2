import React, { useState, useId } from "react";
// import { Link } from "react-router-dom";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Alert from '@/components/Base/Alert';
import { Dialog } from "@/components/Base/Headless";

import { Course } from '../../../../stores/Courses/types';
import { setOptions } from "leaflet";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectEnrollment, setDataEnroll, setEnrollment} from "@/stores/Enrollment/slice";
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
  const [birthday, setBirthday] = useState({month:"", years:""})
  const [selectedModal, setSelectedModal] = useState(false)
  const [option, selectedOption] = useState({id:"", selected:false})
  const [optionDay, selectedOptionDay] = useState({id:"", selected:false})
  
  
  const {enrollment, sessions, currentStep} = useAppSelector(selectEnrollment);
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
    setValueEnrrollment({key:"enrollmentStartDate", value:transformDate(date)})
    console.log("e>>> ", event)
    
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
  function setEnrollmentCourse(): void {
    // Asumimos que dispatch está disponible en el scope, si no, deberías pasarlo como parámetro
    dispatch(
      setEnrollment({
        studentId: enrollment.studentId,
        enrollmentStartDate: enrollment.enrollmentStartDate,
        enrollmentSessionTypeId: enrollment.enrollmentSessionTypeId,
        enrollmentScheduleId: enrollment.enrollmentScheduleId,
        enrollmentCourseId: enrollment.enrollmentCourseId
      })
    );
  }
  
  return (
    <>
    
    
      {/* <pre>{JSON.stringify(courses.gender, null, 2)}</pre> */}
      {/* <Link
        to="/data-detail"
        state={{ id: data.id }}
        className=" "
      > */}
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
                      { Array.isArray(courses?.sessionTypes?.items) &&
                        courses?.sessionTypes?.items.map((item: any, i: number) =>
                        option.id===item.sessionType.id && option.selected === true ?
                        <span key={`${i}-span-options`} className="rounded-full px-4 py-2 border border-slate-200 mx-2 font-light bg-slate-400 text-white">{item.sessionType.name}</span>
                        :<Button
                            key={`${i}-span-buttons`} 
                            rounded
                            variant="outline-secondary"
                            className={`px2 py-2 border border-slate-200 mx-2 font-light `}
                            onClick={()=>{
                              selectedOption(
                              {
                                id:item.sessionType.id, 
                                selected:true
                              }
                              );
                              setValueEnrrollment({key:"enrollmentSessionTypeId", value:item.sessionType.id})
                            }
                          }
                          >{item.sessionType.name}</Button>
                        
                      )
                      }
                      </div>
                    </div>
                    <div className="my-4 border-t border-slate-200/60"></div>
                    
                    <div className=" flex flex-col justify-center">
                      <span className="mt-2 text-lg text-slate-500">Seleccione el día de la clase</span>
                      <div className="mt-2 flex flex-row justify-center">
                        { Array.isArray(courses?.schedules?.items) &&
                          courses?.schedules?.items.map((item: any, i: number) =>
                          optionDay.id===item.id && optionDay.selected === true ?
                          <span key={`${i}-span-options-schedules`}  className="rounded-full px-4 py-2 border border-slate-200 mx-2 font-light bg-slate-400 text-white">{item.day}{" "}{item.startHour}</span>
                          :
                          <Button
                          key={`${i}-span-options-button-schedules`} 
                              rounded
                              variant="outline-secondary"
                              className={`px2 py-2 border border-slate-200 mx-2 font-light `}
                              onClick={()=>{
                                selectedOptionDay(
                                  {
                                    id:item.id, 
                                    selected:true
                                  }
                                )
                                setValueEnrrollment({key:"enrollmentScheduleId", value:item.id})
                              }
                            }
                          >{item.day}{" "}{item.startHour}</Button>
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
                          <Litepicker value={Date()} type="text" name="enrollmentStartDate" 
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
                      </div>
                    </div>
                </div>
                <div className="p-5 text-primary text-center border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="px-5 pb-8 text-center">
                      <Button rounded type="button" variant="primary" onClick={()=> {
                          setEnrollmentCourse();
                          // setSelectedModal(false);
                          }}
                          className="px-12 py-4"
                          >
                          Inscribir
                      </Button>
                  </div>
                  Listado de sessiones creadas
                  {JSON.stringify(sessions, null, 2)}
                </div>
            </Dialog.Panel>
        </Dialog>
        <div
          key={`${id}-${courses.id}`}
          className=" intro-y w-[49%] mb-6"
        >
        <div
          key={`${id}-${courses.id}`}
          className=" min-w-96 h-full"
          // onClick={(event: React.MouseEvent) => {
          //   event.preventDefault();
          //   alert("hiu");
          //   // dispatch(getUsersAccess(user.id))
          //   // setButtonModalPreview(true);
          // }}
        >
          <div>
            <div className={`p-5 box h-[300px] cursor-pointer`} >
              <div className="flex flex-row border-1">
                {/* <div className="flex flex-col items-center justify-center p-4 h-40 border-r-4"> */}
                <div className="flex flex-col items-center justify-center p-4 ">
                <svg width="61" height="60" viewBox="0 0 91 90" fill="none" xmlns="http://www.w3.org/2000/svg">
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



                </div>
                <div className="flex flex-col items-center justify-center p-6">
                  {/* <h2 className="text-base text-center font-medium uppercase text-white rounded-full bg-slate-400 px-4 py-2 w-full mb-4">{changeName(courses.AgeGroupType)}{" "}</h2> */}
                  <Alert variant="soft-secondary" className="flex items-center justify-center rounded-full mb-2 w-full">
                  <div className=" uppercase font-thin text-slate-900">
                    {changeName(courses.AgeGroupType)}{" "}
                  </div>
                  </Alert>              
                  <h2 className="text-lg font-medium uppercase text-primary">{courses.title}{" "}</h2>
                  <span className=" uppercase font-thin text-center">{courses.startingAge} - {courses.endingAge} {courses.ageType}</span>
                </div>
              </div>

              <div className="flex items-center justify-center my-4">  
              
                <Button
                  rounded
                  variant="outline-secondary" //"soft-secondary"
                  size="lg"
                  className="py-2 border border-slate-200 w-full mx-2 font-light "
                  onClick={()=> {
                    setValueEnrrollment({key:"enrollmentCourseId", value:courses.id});
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
