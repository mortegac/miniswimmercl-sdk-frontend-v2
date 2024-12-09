import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import debounce from 'lodash/debounce';
import Toastify from "toastify-js";
import emailjs, { init } from "emailjs-com";
const SERVICE = "service_ucb8wga";  // welcome@mini..
const TEMPLATE = "template_5kxuc3t"; // Welcome_v2
init("Csc41asZklkk5HTWk");

import {typeOfMonth} from "../../../utils/dateHandler";

import {
  formatCurrency,
  calculateCurrentDate,
} from "@/utils/helper";

import Notification from "@/components/Base/Notification";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Alert from "@/components/Base/Alert";
import { Slideover } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import { Menu, Popover } from "@/components/Base/Headless"
import {FormInput, FormSelect } from "@/components/Base/Form";
import users from "@/fakers/users";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { selectAuth } from "@/stores/Users/slice";



import { getStudents, selectEnrollment } from "@/stores/Enrollment/slice";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { setEmailSend, selectEmailSend, cleanSentVar } from "@/stores/EmailsSent/slice";
import { Location } from "@/stores/Locations/types";

import {EmailTemplate, HTML} from "./EmailTemplate";
import {EmailHistorial} from "./EmailHistorial";

const typeOfRelationship: any = {
  [""]: "",
  ["NONE"]: "",
  ["FATHER"]: "Padre",
  ["MOTHER"]: "Madre",
  ["OTHER"]: "Otro",
  ["GRANDFATHER"]: "Abuelo",
  ["GRANDMOTHER"]: "Abuela",
  ["UNCLE"]: "Tio",
  ["AUNT"]: "Tia",
  ["FAMILYS_FRIEND"]: "Amigo familia",
  ["Primo/a"]: "",
};
// const typeOfMonth: any = {
//   [""]: "",
//   ["01"]: "ENE",
//   ["02"]: "FEB",
//   ["04"]: "ABR",
//   ["03"]: "MAR",
//   ["05"]: "MAY",
//   ["06"]: "JUN",
//   ["07"]: "JUL",
//   ["08"]: "AGO",
//   ["09"]: "SEP",
//   ["10"]: "OCT",
//   ["11"]: "NOV",
//   ["12"]: "DIC",
// };



// function sortByEndDate(data: any[]): any[] {
//   console.log(data)
//   return data.sort((a, b) => {
//     const dateA = convertToDate(a.date);
//     const dateB = convertToDate(b.date);
//     return dateA.getTime() - dateB.getTime();
//   });
// }
// function sortByEndDate(array: any[]): any[] {
//   return array.sort((a, b) => {
//     const dateA = new Date(a.date);
//     const dateB = new Date(b.date);
//     return dateA.getTime() - dateB.getTime();
//   });
// }
function sortByEndDate(array: any[] | undefined | null): any[] {
  
  if(array?.length ===1) return array
  
  // console.log("--array--", array)
  // console.log("--array--length", array?.length)
  if (!array || !Array.isArray(array)) {
    return []; // Retorna un array vacío si el input es undefined, null, o no es un array
  }

  return array.sort((a, b) => {
    if (!a.date || !b.date) {
      return 0; // Si alguna fecha no está definida, no cambia el orden
    }
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
}

function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses son 0-indexados
  const year = date.getUTCFullYear();

  return `${day}-${typeOfMonth[month]}`;
  // return `${day}-${typeOfMonth[month]}`;
  // return `${day}-${month}-${year}`;
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

function Content(props: any) {

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { enrollments, locations } = props;
  const [switcherSlideover, setSwitcherSlideover] = useState(false);
  const [switcherSlideHistorial, setSwitcherSlideHistorial] = useState(false);
  const [studentListId, setStudentListId] = useState("");
  const [dataEMail, setDataEMail] = useState({
    reply_to: "",
    to_client_email: "",
    to_student_name: "",
    to_student_id: "",
    to_course_name: "",
    to_schedule: "",
    to_session_1:"",
    to_session_2:"",
    to_session_3:"",
    to_session_4:"",
    to_session_5:"",
    to_session_6:"",
    to_session_7:"",
    to_session_8:"",
    to_location:"",
    to_location_id:"",
    to_pack_vigencia:"",
    to_mapurl:"",
    to_mapimage:"",
    to_location_address:"",
    to_location_temperature:"",
    to_recomendation:""
  });
  
  const {email}= useAppSelector(selectAuth);
  const {wasSent} = useAppSelector(selectEmailSend);
  const dispatch = useAppDispatch();
  
  function findLocationById(locations: Location[], id: string): Location | undefined {
    return locations.find(location => location.id === id);
  }
  
  
  const onSendEmail = async () => {
    setIsSaved(true)
    
    const templateEmail =HTML(dataEMail)
    
    emailjs.send(SERVICE, TEMPLATE, dataEMail).then(
      function (response) {
        
        dispatch(setEmailSend({
          type:  "WELCOME",
          contentEmail:  templateEmail,
          email:  dataEMail.to_client_email,
          usersEmailSendId: email,
          studentEmailSendId: dataEMail.to_student_id,
          
        }))
        
        
        const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
        successEl.classList.remove("hidden");
        Toastify({
          node: successEl,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
    
      
      },
      function (error) {
        dispatch(setEmailSend({
          type:  "WELCOME",
          contentEmail:  templateEmail,
          email:  dataEMail.to_client_email,
          usersEmailSendId: email,
          studentEmailSendId: dataEMail.to_student_id,
        
        }))
        
        console.log("FAILED...", error);
      }
    ).catch(err => {
      dispatch(setEmailSend({
        type:  "WELCOME",
        contentEmail:  templateEmail,
        email:  dataEMail.to_client_email,
        usersEmailSendId: email,
        studentEmailSendId: dataEMail.to_student_id,
       
      }))
      
      console.log("err ", err)
    }
    
    //   setIsSentEmail({
    //   sentEmail: true,
    //   isFailure: true,
    //   title: "Página no encontrada 😭",
    //   text: "No encontramos la página solicitada ",
    //   response: response || '',
    // })
    );
    
    setIsSaved(false)
    
    
  }
  return (
    <>
     <Notification
        id="success-notification-content"
        className="flex hidden"
      >
        <Lucide icon="CheckCircle" className="text-success" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Email Enviado!</div>
          <div className="mt-1 text-slate-500">
            Revise el historial de envíos del Alumno
          </div>
        </div>
      </Notification>
    <Slideover
        size="xl"
        key="Slide-Historial"
        open={switcherSlideHistorial}
        onClose={() => {
          setSwitcherSlideHistorial(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setSwitcherSlideHistorial(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Histórico de envios</div>
                <div className="text-slate-500 mt-0.5  mb-12">
                  Revise el detalle de email enviado
                </div>
                { studentListId && <EmailHistorial studentId={studentListId}/>}
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
    </Slideover>
    <Slideover
        size="xl"
        open={switcherSlideover}
        onClose={() => {
          setSwitcherSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              dispatch(cleanSentVar())
              setSwitcherSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Email de bienvenida</div>
                <div className="text-slate-500 mt-0.5">
                  Revise la información
                </div>
              {/* <pre>{JSON.stringify(dataEMail, null, 2 )}</pre> */}
              { wasSent && <>
                <Alert variant="soft-primary" className="flex items-center mt-12">
                  
                  <>
                  <svg width="320" height="315" viewBox="0 0 320 315" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L102.069 225.243L168.132 181.85L212.607 192.746L221.908 125.397L268.87 78.3034L0 0ZM44.7093 35.3053L201.638 119.079L199.605 166.508L44.7093 35.3053Z" fill="#F194EE"/>
                    <path d="M229.209 209.328C236.99 217.036 244.214 225.182 251.264 233.46C258.284 241.752 265.099 250.206 271.71 258.82C278.32 267.419 284.741 276.18 290.942 285.116C297.114 294.067 303.125 303.134 308.551 312.655C300.755 304.948 293.545 296.816 286.496 288.538C279.476 280.246 272.661 271.792 266.05 263.178C259.439 254.564 253.019 245.803 246.832 236.882C240.646 227.902 234.65 218.835 229.209 209.328Z" fill="#AE5EAB"/>
                    <path d="M161.961 210.793C169.742 218.5 176.966 226.647 184.016 234.925C191.036 243.217 197.851 251.67 204.462 260.285C211.072 268.884 217.493 277.645 223.694 286.581C229.866 295.531 235.877 304.599 241.303 314.12C233.507 306.413 226.297 298.281 219.248 290.003C212.228 281.711 205.412 273.257 198.802 264.643C192.191 256.029 185.771 247.268 179.57 238.347C173.413 229.367 167.402 220.299 161.961 210.793Z" fill="#AE5EAB"/>
                    <path d="M240.656 125.484C248.437 133.192 255.662 141.338 262.711 149.616C269.731 157.908 276.547 166.362 283.157 174.976C289.768 183.576 296.188 192.336 302.389 201.272C308.561 210.223 314.572 219.291 319.998 228.812C312.203 221.104 304.993 212.972 297.943 204.695C290.923 196.402 284.108 187.949 277.512 179.334C270.901 170.72 264.481 161.96 258.28 153.038C252.108 144.058 246.097 134.991 240.656 125.484Z" fill="#AE5EAB"/>
                    </svg>
                    <h3 className="mt-3 text-2xl font-medium leading-none">
                      Email enviado!
                    </h3>
                    {/* <Alert.DismissButton type="button" className="text-white" aria-label="Close" 
                        onClick={dismiss}
                        >
                          <Lucide icon="X" className="w-4 h-4" />
                    </Alert.DismissButton> */}
                  </>
                  
              </Alert>
              </> }
              
              { !wasSent &&
                <EmailTemplate data={dataEMail}/>
              }
              
              
              {/* <pre>{JSON.stringify(locations, null, 2 )}</pre> */}
              </div>
              { !wasSent &&
                <>
                  <div className="border-b border-dashed"></div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="relative w-[60%] mt-4">
                        <Lucide
                          icon="Mail"
                          className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                        />
                        <FormInput
                            formInputSize="lg"
                            placeholder="Email destinario..."
                            aria-label="name" 
                            aria-describedby="input-group-name"
                            type="text"
                            tabIndex={1} 
                            // className="bg-white/[0.12] text-white w-[350px] flex items-center py-2 px-3.5 border-transparent  cursor-pointer hover:bg-white/[0.15] transition-colors duration-300 hover:duration-100 focus:z-10"
                            className="pl-9 w-full rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                            name="guardianEmail"
                            value={dataEMail.to_client_email}
                            onChange={(e)=>setDataEMail({
                              ...dataEMail,
                              to_client_email : e.target.value
                            })}
                          />
                    </div>
                    {/* <pre>{JSON.stringify(isSaved, null, 2)}</pre> */}
                    <Button
                      variant="primary"
                      rounded
                      onClick={()=> {
                        onSendEmail()
                      }}
                      disabled = {isSaved}
                      className="m-8 p-4 w-[60%]"
                      // onClick={(event: React.MouseEvent) => {
                      //   event.preventDefault();
                      //   onSendEmail()
                      // }}
                      >
                      {/* <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />{" "} */}
                      {isSaved && <LoadingIcon icon="puff" color="#FFFFFF" className="mr-2 w-8 h-8" />}
                      Enviar Email
                    </Button>
                  </div>
                </>
              }
              
              
             
            </div>
          </Slideover.Description>
        </Slideover.Panel>
    </Slideover>
      <div className="overflow-auto xl:overflow-visible">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
            <Table.Td className="w-5 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                {/* <FormCheck.Input type="checkbox" /> */}
              </Table.Td>
              <Table.Td className="w-52 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Alumno
              </Table.Td>
              <Table.Td className="w-60 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Apoderado
              </Table.Td>
              <Table.Td className="w-60 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Curso
              </Table.Td>
              {/* <Table.Td className="w-72 py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Sede
              </Table.Td> */}
              <Table.Td className="w-44 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Sesiones
              </Table.Td>
              <Table.Td className="w-40 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Estado
              </Table.Td>
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Action
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {/* <pre>{JSON.stringify(enrollments, null, 2)}</pre> */}
            {Array.isArray(enrollments) && enrollments.map((item:any, index) => {
              const [month, day, year] = item?.startDate.split('-');
              const edad:{años:"0", meses:"0"} = item?.student?.birthdate && calcularEdad(String(item?.student?.birthdate === "" ? "1800/01/01":item?.student?.birthdate ));                
              
              // const sortedSessions = Array.isArray(item?.sessionDetails?.items) &&  sortByEndDate(item?.sessionDetails?.items);
              
              return (
              <Table.Tr key={`ENROLLMENTS-${index}`} className="[&_td]:last:border-b-0 ">
                <Table.Td 
                className={`${item?.wasPaid ? "":"bg-red-200"} py-4 border-dashed dark:bg-darkmode-600`}>
                
                  {index+1}
                </Table.Td>
                <Table.Td className="w-52 py-4 border-dashed">
                  <div className="flex items-center">
                    <div className="text-lg">
                      {item?.student?.name} {item?.student?.lastName}
                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      { item?.student?.birthdate &&  Number(edad?.años) > 100 ? "SIN EDAD":`${edad?.años} años, ${edad?.meses} meses`}
                      {/* {item?.student?.birthdate} */}
                      </div>
                    </div>
                  </div>
                </Table.Td>
                <Table.Td className="w-60 py-4 border-dashed">
                {Array.isArray(item?.student?.relationships?.items) && item?.student?.relationships?.items.map((relation:any, i:any) => (
                  <div className="my-2 bg-slate-50 rounded-full text-center p-2">
                    <p className="font-medium whitespace-nowrap">
                        {relation?.user?.name}
                    </p>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    {typeOfRelationship[relation?.relationType]}
                    </div>
                  </div>
                ))}
                </Table.Td>
                <Table.Td className="w-60 py-4 border-dashed">
                  <div className="flex items-center justify-start flex-col">
                    {item?.course?.title}
                    <p className="uppercase font-thin text-sm text-center">{item?.course?.location?.name}</p>
                    <p className="font-thin text-green-700">Inscripción: {`${formatDate(item?.startDate)}`}</p>
                  </div>
                   
                </Table.Td>
                <Table.Td className=" w-44 py-4 border-dashed">
                  {Array.isArray(item?.sessionDetails?.items) && item?.sessionDetails?.items.map((session:any, i:any) => (
                    <>
                          {/* <pre>{JSON.stringify(session?.id, null, 2)}</pre> */}
                      <div className={`my-2 ${session?.status==="ACTIVE"? " bg-green-50":" bg-slate-50"} rounded-full text-center p-2 flex flex-col flex-wrap`}>
                        <pre>{session?.id}</pre>
                        { session?.status==="ACTIVE" && <>
                          <small className="mt-1">{formatDate(session?.date)} | <i className=" font-thin">{session?.status}</i></small>
                          <p className="w-40 truncate text-xs font-thin text-ellipsis overflow-hidden" >{session?.locationId}</p>
                        </>
                        }
                        { session?.status==="USED" && <>
                          
                          <small className="mt-1 line-through text-slate-400">{formatDate(session?.date)} | <i className=" font-thin">{session?.status}</i></small>
                          <p className="w-40 truncate text-xs font-thin text-ellipsis overflow-hidden" >{session?.locationIdUsed}</p>
                        </>
                        }
                      </div>
                    </>
                  ))}
                  
                </Table.Td>
                <Table.Td 
                className={`${item?.wasPaid ? "":"bg-red-200"} py-4 border-dashed dark:bg-darkmode-600 relative text-center`}>
                 {/* <pre>wasPaid = {JSON.stringify(item?.wasPaid, null, 2)}</pre> */}
                  <span className={`${item?.wasPaid ? "text-slate-400":"text-slate-700"}`}>{item?.wasPaid ? "PAGADO":"SIN PAGO"}</span>
                </Table.Td>
                <Table.Td className="relative py-4 border-dashed">
                  <div className="flex items-center justify-center">
                    <Menu className="h-5">
                      <Menu.Button className="w-5 h-5 text-slate-500">
                        <Lucide
                          icon="MoreVertical"
                          className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                        />
                      </Menu.Button>
                      <Menu.Items className="w-52">
                      <Menu.Item 
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          const location = findLocationById(locations, item?.course?.location?.id);
                          setDataEMail({
                            reply_to:"hola@miniswimmer.cl",
                            to_client_email:item?.student?.emailPhone,
                            to_student_name:`${item?.student?.name} ${item?.student?.lastName}`,
                            to_student_id:item?.student?.id,
                            to_course_name:item?.course?.title,
                            to_schedule:`${item?.scheduleName} hrs`,
                            to_session_1:item?.sessionDetails?.items[0]?.date && formatDate(item?.sessionDetails?.items[0].date),
                            to_session_2:item?.sessionDetails?.items[1]?.date && formatDate(item?.sessionDetails?.items[1].date),
                            to_session_3:item?.sessionDetails?.items[2]?.date && formatDate(item?.sessionDetails?.items[2].date),
                            to_session_4:item?.sessionDetails?.items[3]?.date && formatDate(item?.sessionDetails?.items[3].date),
                            to_session_5:item?.sessionDetails?.items[4]?.date && formatDate(item?.sessionDetails?.items[4].date),
                            to_session_6:item?.sessionDetails?.items[5]?.date && formatDate(item?.sessionDetails?.items[6].date),
                            to_session_7:item?.sessionDetails?.items[7]?.date && formatDate(item?.sessionDetails?.items[7].date),
                            to_session_8:item?.sessionDetails?.items[8]?.date && formatDate(item?.sessionDetails?.items[8].date),
                            to_location:item?.course?.location?.name,
                            to_location_id:item?.course?.location?.id,
                            to_pack_vigencia:item?.sessionType.totalSessions===8 ? "45":"30",
                            to_mapurl:location?.urlMap || "",
                            to_mapimage:location?.imageMap || "",
                            to_location_address:location?.address || "",
                            to_location_temperature:`entre ${location?.minimumTemperature} C a ${location?.maximumTemperature} C` || "",
                            to_recomendation:location?.directions || "",
                          })
                          setSwitcherSlideover(true);
                        }}>
                          <Lucide
                            icon="Send"
                            className="w-4 h-4 mr-2"
                          />{" "}
                          Enviar Email
                        </Menu.Item>
                      <Menu.Item 
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          setStudentListId(item?.student?.id)
                          setSwitcherSlideHistorial(true);
                        }}>
                          <Lucide
                            icon="Mail"
                            className="w-4 h-4 mr-2"
                          />{" "}
                          Histórico envíos
                        </Menu.Item>
                        {/* 
                        <Menu.Item>
                          <Lucide
                            icon="CheckSquare"
                            className="w-4 h-4 mr-2"
                          />{" "}
                          Edit
                        </Menu.Item>
                        <Menu.Item className="text-danger">
                          <Lucide
                            icon="Trash2"
                            className="w-4 h-4 mr-2"
                          />
                          Delete
                        </Menu.Item> */}
                      </Menu.Items>
                    </Menu>
                  </div>
                </Table.Td>
              </Table.Tr>
            )})}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}

const date = new Date();
const month:string = date.toLocaleString('es', { month: '2-digit' });
const year:string = date.getFullYear().toString();
const currentYear = calculateCurrentDate().year;
const currentMonth = calculateCurrentDate().month;


import { FilterBar } from "@/components/FilterBar";
import { FilterUseState } from "./types";
import { getLocations } from "@/stores/Locations/slice";

function Main() {
  const {enrollments, status} = useAppSelector(selectEnrollment);
  const {locations} = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  
  // dispatch(setBreadcrumb({first:"Inscripciones Alumnos", firstURL:"enrollments"}));
  
  const [residenceList, setResidenceList] = useState();
  const [filter, setFilter] = useState<FilterUseState>({
    locationId: "",
    month: currentMonth,
    year: currentYear,
    state: "",
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(enrollments);

  const sortStudents = (a: any, b: any) => {
    // const aSessionsCount = a.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    // const bSessionsCount = b.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    
    // if (aSessionsCount > 0 && bSessionsCount === 0) return -1;
    // if (aSessionsCount === 0 && bSessionsCount > 0) return 1;
    return 1;
  };
  
    // Función para filtrar estudiantes
    const filterStudents = (term: string) => {
      const filtered = enrollments.filter((item:any) => {
      // console.log("--student--", item)
        return item?.student?.name.toLowerCase().includes(term.toLowerCase()) ||
        item?.student?.lastName.toLowerCase().includes(term.toLowerCase())
      }
        // student.middleName.toLowerCase().includes(term.toLowerCase())
      );
      
      // setFilteredStudents(filtered);
      setFilteredStudents( [...filtered].sort(sortStudents));
    };
  // Creamos una versión debounced de la función de filtrado
  const debouncedFilter = useCallback(
    debounce((term: string) => filterStudents(term), 300),
    [enrollments] // Dependencia del array de estudiantes
  );

  // Manejador para el cambio en el input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedFilter(term);
  };
  
  function transformResidenceData(
    locations: any
  ): { id: string; name: string }[] {
    return locations.map((item: any) => ({
      id: item?.id,
      name: `${item?.name}`,
    }));
  }
  
  useEffect(() => { 
    // (async () => await dispatch(getStudents({
    //   month,
    //   year
    // })) )(); 
    (async () => await dispatch(getLocationsOnly()) )(); 
  }, []);
  
  useEffect(() => {
    dispatch(getStudents({ 
      month: filter.month,
      year: filter.year,
      locationId: filter.locationId,
    }));
  }, [filter]);
  
  // useEffect(() => { setFilteredStudents( [...enrollments].sort(sortStudents)); }, [enrollments]);
  useEffect(() => { setFilteredStudents( [...enrollments]); }, [enrollments]);
  
  
  useEffect(() => {
    setFilter({
      ...filter,
      locationId: locations[0]?.id || "",
    });

    const data: any =
    locations && transformResidenceData(locations);
    setResidenceList(data);
  }, [location]);
  
  
  return (
    <>
     <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col justify-between  md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Alumnos Incritos en {`${typeOfMonth[filter?.month || month]} ${filter.year}`}
          </div>
          <div className ="flex flex-wrap justify-between items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
                <FilterBar
                  filter={filter}
                  setFilter={setFilter}
                  residences={residenceList}
                  hasDate={true}
                  onlyDate={true}
                />
              </div>
          {/* <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button
            variant="primary"
            className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            >
            <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />{" "}
            Nueva inscripción
            </Button>
            </div> */}
        </div>
        <div className="flex flex-col gap-8 mt-3.5">
          <div className="flex flex-col box min-h-screen">
            {/* <pre>{JSON.stringify(enrollments, null, 2)}</pre> */}
            <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
              <div>
                <div className="relative">
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                  />
                   <FormInput
                      formInputSize="lg"
                      placeholder="Buscar alumnos..."
                      aria-label="name" 
                      aria-describedby="input-group-name"
                      type="text"
                      tabIndex={1} 
                      // className="bg-white/[0.12] text-white w-[350px] flex items-center py-2 px-3.5 border-transparent  cursor-pointer hover:bg-white/[0.15] transition-colors duration-300 hover:duration-100 focus:z-10"
                      className="pl-9 sm:w-64 rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                      name="guardianEmail"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                <Popover className="inline-block">
                  {({ close }) => (
                    <>
                      <Popover.Button
                        as={Button}
                        variant="outline-secondary"
                        className="w-full sm:w-auto"
                      >
                        <Lucide
                          icon="ArrowDownWideNarrow"
                          className="stroke-[1.3] w-4 h-4 mr-2"
                        />
                        Filtros
                        {/* <div className="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full bg-slate-100">

                        </div> */}
                      </Popover.Button>
                      <Popover.Panel placement="bottom-end">
                        <div className="p-2">
                          <div>
                            <div className="text-left text-slate-500">
                              Sede
                            </div>
                            <FormSelect className="flex-1 mt-2">
                              {/* {_.take(users.fakeUsers(), 5).map(
                                (faker, fakerKey) => (
                                  <option key={fakerKey} value={faker.position}>
                                    {faker.position}
                                  </option>
                                )
                              )} */}
                            </FormSelect>
                          </div>
                          {/* <div className="mt-3">
                            <div className="text-left text-slate-500">
                              Department
                            </div>
                            <FormSelect className="flex-1 mt-2">
                              {_.take(users.fakeUsers(), 5).map(
                                (faker, fakerKey) => (
                                  <option
                                    key={fakerKey}
                                    value={faker.department}
                                  >
                                    {faker.department}
                                  </option>
                                )
                              )}
                            </FormSelect>
                          </div> */}
                          <div className="flex items-center mt-4">
                            <Button
                              variant="secondary"
                              onClick={() => {
                                close();
                              }}
                              className="w-32 ml-auto"
                            >
                              Close
                            </Button>
                            <Button variant="primary" className="w-32 ml-2">
                              Apply
                            </Button>
                          </div>
                        </div>
                      </Popover.Panel>
                    </>
                  )}
                </Popover>
              </div>
            </div>
            
                { status === "loading" && <div className="flex justify-center"><div className="w-16 h-16"><LoadingIcon
                  color="#AE5EAB"
                  icon="oval"
                  className="w-10 h-10 mt-10"
                /></div></div>}
                
                { status === "idle" && <Content enrollments={filteredStudents} locations={locations}/>}
                
            <div className="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row"> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Main;
