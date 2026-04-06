import React, { Fragment, useState, useEffect, useRef } from "react";
import * as jose from 'jose';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './phone.css'

import CopyButton from '@/components/CopyButton';
import { FormInput, FormSelect, FormTextarea } from "@/components/Base/Form";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { HeaderTitle } from "./HeaderTitle";
import CardCourses from "./CardCourses";
import { setPhoneApoderado } from "@/stores/Users/slice";
import { setWhatsapp } from "@/stores/EmailsSent/slice";

import {typeOfMonth} from "@/utils/dictionary";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectCourse, getCourses} from "@/stores/Courses/slice";
import { selectEnrollment, setDataUser, increment, cleanData} from "@/stores/Enrollment/slice";

// function SendJwtWhatsapp(props: any) {
//   const { phoneNumber, clientName, clientId, courseName, locationName  } = props;
//   // const [JWT, setJWT] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<any>(null);
  
//   const [phone, setPhone] = useState('');
//   const [isValid, setIsValid] = useState(false);
//   const [clientPhoneNumber, setClientPhoneNumber] = useState(props?.phoneNumber || "");

//   const dispatch = useAppDispatch();
  
  
//   const paymentLink:string = `Para completar su inscripción por favor ingrese en el siguiente link de pago https://pagos.miniswimmer.cl/${props?.JWT}   El link de pago tiene una vigencia de 48 horas.`;
//   const sessionsDetail:string = `${clientName}, hemos realizado su inscripción 🎉 en el *curso ${courseName} en la sede ${locationName}*, \ncon las siguientes fechas agendadas:
//                     ${props?.sessions?.map((item:any, i:number) => {
//                       const [day, month] = item?.date.replace(/\s/g, '').split('-');
//                       return `\n- ${String(props?.courseDay).toUpperCase() || ''} ${day}-${typeOfMonth[month]}`;
//                     }).join('\n')}
//                     `;
  
  
//   function cleanPhoneNumber(phone:string) {
//     // Eliminar el signo más
//     let cleanPhone = phone.replace(/^\+/, '');
    
//     // Eliminar espacios y caracteres no numéricos
//     cleanPhone = cleanPhone.replace(/\D/g, '');
    
//     // Verificar que tenga 11 dígitos
//     if (cleanPhone.length === 11) {
//       return {
//         cleanPhone,
//         message: "",
//         status: true
//     };
//     } else {
//       return {
//         message: 'Número de teléfono inválido',
//         status: true
//     };
//     }
//   }
  
//   const sendWhatsAppMessage = async (payload: any) => {
//     const { name, msg } = payload;
    
//     !clientPhoneNumber && setError("Debe ingresar el teléfono del cliente para continuar")
    
//     if(clientPhoneNumber){
      
//       const validPhone = cleanPhoneNumber(clientPhoneNumber);  
//       try {
//         setLoading(true);
//         setError(null);
  
//         if(validPhone.status){
//           dispatch(setWhatsapp({
//             name: name, 
//             phoneNumber: validPhone?.cleanPhone,
//             message: msg,
//           }))
//           // const response = await fetch(
//           //   // 'https://api.whaticket.com/api/v1/messages', 
//           //   '/api/api/v1/messages', 
//           //   {
//           //     method: 'POST',
//           //     credentials: 'include',
//           //     referrerPolicy: 'no-referrer',
//           //     headers: {
//           //       'Authorization': `Bearer ${token}`,
//           //       // 'Accept': '*/*',
//           //       'Accept': 'application/json',
//           //       'Content-Type': 'application/json',
//           //       "Access-Control-Allow-Origin": "*", // O tu dominio específico
//           //       "Access-Control-Allow-Headers": "Content-Type,Authorization",
//           //       "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
//           //     },
//           //     body: JSON.stringify(payload)
//           //   }
//           // );
    
//           // if (!response.ok) {
//           //   throw new Error(`HTTP error! status: ${response.status}`);
//           // }
    
//           // const responseData = await response.json();
//           /** TODO:  Almacenar envio del whatsapp */
//           // console.log('Message sent successfully:', responseData);
//         }
        
//       } catch (err:any) {
//         setError(err.message);
//         console.error('Error sending message:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };
  
//     async function setPhoneUser(){
//       clientId !== "" && 
//       phone !== "" && dispatch(setPhoneApoderado({userId:clientId, userPhone:phone}));
//       setClientPhoneNumber(phone)
//     }
//     const validatePhoneNumber = (value:any) => {
//       setPhone(value);
      
//       if (!value) {
//         setError('El número de teléfono es requerido');
//         setIsValid(false);
//         return;
//       }

//       try {
//         if (isValidPhoneNumber(value)) {
//           setError('');
//           setIsValid(true);
//         } else {
//           setError('Número de teléfono inválido');
//           setIsValid(false);
//         }
//       } catch (err) {
//         setError('Error al validar el número');
//         setIsValid(false);
//       }
//     };
  
    

//   // useEffect(() => {
//   //   (async () => {
//   //     await createJWT();
//   //   })();
//   // }, [cartId]);
//   return (
//     <>
//       {/* { cartStatus !== "AUTHORIZED" &&  */}
//         <div className="px-8 pt-6 pb-8 mt-3.5 bg-purple-100">
//           <div className="text-base font-medium">Envio mensaje informativo</div>
//           <div className="text-slate-500 mt-0.5 mb-2">
//             Con esta funcionalidad puedes enviar directo al whatsapp la información de la inscripción
//           </div>
//           <div className="p-5 box box--stacked">
//             <div className="pb-5 mb-5 border-b border-dashed border-slate-300/70">
//               <div className="">
//                 <h2 className="text-sm mb-2">
//                   <span className="text-lg w-20 text-left inline-block">
//                     Cliente:
//                   </span>{" "}
//                   <span className="ml-4 text-lg">{clientName}</span>
//                 </h2>
                
//                 <div className="text-sm mb-2 flex flex-row items-center justify-start">
//                   <span className="text-lg w-20 text-left  inline-block">
//                     Teléfono:
//                   </span>{" "}
//                   { clientPhoneNumber ==="" && <div className=" mt-3 flex flex-row ml-4 ">
//                         <PhoneInput
//                           international
//                           defaultCountry="CL"
//                           value={phone}
//                           onChange={validatePhoneNumber}
//                           className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
//                           error={error}
//                         />
//                         <div className="mt-4 ml-4">
//                           <Button 
//                             variant="primary"
//                             className={`px-4 py-2 rounded ${
//                               isValid 
//                                 ? 'bg-primary hover:bg-primary/200 text-white' 
//                                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                             }`}
//                             disabled={!isValid}
//                             onClick={()=>setPhoneUser()}
//                           >
//                             Grabar teléfono
//                           </Button>
//                         </div>
    
        
      
        
//                       {error && <p className="text-red-500 mt-2">{error}</p>}
//                     </div>
//                   }
//                   { clientPhoneNumber !=="" && <div className="w-full flex justify-between items-center">
//                     <span className="ml-4 text-lg">{clientPhoneNumber}</span>
//                     <Button
//                     variant="primary"
//                     disabled={loading}
//                     className="px-3 py-2 w-full sm:w-auto bg-white text-primary border-primary hover:bg-primary/20"
//                     onClick={()=>setClientPhoneNumber("")}
//                   >
//                     <Lucide
//                       icon="Phone"
//                       className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
//                     />
//                     Editar teléfono
//                   </Button>
//                   </div>}
                  
//                 </div>
//                  {isValid && clientPhoneNumber ==="" &&(
//                         <div className="flex flex-col w-full">
//                           <p className="text-green-500 text-xs mt-1">
//                             Número válido: {phone}
//                           </p>
//                         </div>
//                     )}
//                   { clientPhoneNumber ==="" &&  <div className="flex flex-col w-full">
//                       <span className="text-red-300">Debe ingresar el teléfono para continuar </span>
//                     </div>
//                   }
                   
                  
                  
                
//               </div>
             
             
//              {
//               clientPhoneNumber && clientPhoneNumber !=="" && 
//               <>
               
//                 <div className="relative mt-3">
//                   <div className="flex justify-start items-center mb-2">
//                     <CopyButton 
//                     text={sessionsDetail || ""} 
//                     buttonText="" 
//                     successMessage=""
//                     />
//                     <span className="font-thin ml-4">Mensaje con el detalle del curso: </span>
                    
//                   </div>
//                   <FormTextarea
//                     disabled
//                     rows={8}
//                     cols={2}
//                     placeholder="Mensaje"
//                     value={`${sessionsDetail}`}
//                     className="sm:py-3"
//                     />
//                      <div className="mt-4">
//                   <Button
//                     variant="primary"
//                     disabled={loading}
//                     className="px-3 py-2 w-full sm:w-auto bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
//                     onClick={()=>sendWhatsAppMessage({
//                       name:clientName, 
//                       msg:`${clientName}, hemos realizado su inscripción en el *curso ${courseName} en la sede ${locationName}* 🎉, \ncon las siguientes fechas agendadas:
//                       ${props?.sessions?.map((item:any, i:number) => {
//                         const [day, month] = item?.date.replace(/\s/g, '').split('-');
//                         return `\n- ${String(props?.courseDay).toUpperCase() || ''} ${day}-${typeOfMonth[month]}`;
//                       }).join('\n')}
//                       `
//                     }
//                     )}
//                   >
//                     <Lucide
//                       icon="Send"
//                       className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
//                     />
//                     {loading ? 'Enviando...' : 'Enviar Whatsapp Inscripción'}
//                   </Button>
                  
//                   {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div> 
//                 </div>
//                 <div className="relative mt-3">
//                 <div className="flex justify-start items-center mb-2">
//                     <CopyButton 
//                     text={paymentLink || ""} 
//                     buttonText="" 
//                     successMessage=""
//                     />
//                     <span className="font-thin ml-4">Mensaje con link de pago: </span>
                    
//                   </div>
 
//                   <FormTextarea
//                     disabled
//                     rows={5}
//                     cols={2}
//                     placeholder="Mensaje"
//                     value={`${paymentLink}`}
//                     className="sm:py-3"
//                   />
//                 </div>
//                 <div className="mt-4">
//                   <Button
//                     variant="primary"
//                     disabled={loading}
//                     className="px-3 py-2 w-full sm:w-auto bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
//                     onClick={()=>sendWhatsAppMessage({
//                       name:clientName, 
//                       msg:`${clientName}, hemos realizado su inscripción en el *curso ${courseName} en la sede ${locationName}* 🎉, \ncon las siguientes fechas agendadas:
//                       ${props?.sessions?.map((item:any, i:number) => {
//                         const [day, month] = item?.date.replace(/\s/g, '').split('-');
//                         return `\n- ${String(props?.courseDay).toUpperCase() || ''} ${day}-${typeOfMonth[month]}`;
//                       }).join('\n')}
//                       `
//                     }
//                     )}
//                   >
//                     <Lucide
//                       icon="Send"
//                       className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
//                     />
//                     {loading ? 'Enviando...' : 'Enviar mensaje'}
//                   </Button>
                  
//                   {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div> 
//               </>              
//               }
              
              
//             </div>            
//           </div>
//         </div>
//       {/* } */}
//   </>
//   );
// }

export const Step05Resume = ({ onChangeSetStore }: any) => {
  const [JWT, setJWT] = useState("")
  const {enrollment, sessions, cartId}= useAppSelector(selectEnrollment);
  const {
    guardianId,
    guardianEmail,
    guardianPhone,
    guardianName,
    guardianRelation,
    studentFullName,
    studentAge,
    
    enrollmentStartDate,
    enrollmentSessionTypeId,
    enrollmentSessionTypeName,
    enrollmentScheduleId,
    enrollmentScheduleName,
    enrollmentCourseId,
    enrollmentCourseName,

  } = enrollment;
  
  
  const courseDay = enrollmentCourseName?.split('-') || [];


  const secretKey = new TextEncoder().encode(
    'tu_clave_secreta_super_segura_min_32_caracteres'
  );
  
  async function createJWT() {
    const payload = {
      sub: cartId,
      iat: 1516239022
    };
  
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()           // Establece iat (issued at)
      .setExpirationTime('2h') // El token expira en 2 horas
      .sign(secretKey);
      setJWT(jwt)
      
    console.log(jwt)
      
    return jwt;
  }
  
  
  useEffect(() => { (async () => {

    await createJWT()
   
  })(); }, [cartId]);
  
  return (
    <>
    {/* <pre>{JSON.stringify(enrollment, null, 2 )}</pre> */}
       <div className="text-left w-screen -mx-4 px-4 sm:w-full sm:mx-0 sm:px-4">
        <div className="intro-y flex flex-col justify-center border-b ">
          <span className="text-3xl font-semibold  text-slate-700">
            Resumen
          </span>
          <span className="text-lg font-normal  text-slate-700 mb-8 mt-2">
          Inscripción creada correctamente <i className="text-2xl">🎉</i>
          </span>
          {/* <div className="overflow-y-auto h-[600px] w-full "> */}
           

            {/* STEP 03 - CURSOS / HORARIOS */}
            <div className="flex flex-col mb-4 ">
              {/* <h3 className="text-sm font-medium text-primary">
                {"Sede:"}
              </h3> */}
              <h3 className="text-sm font-medium text-primary">
                {"Se detallan las fechas agendadas:"}
              </h3>
              
              {Array.isArray(sessions) && sessions.length > 0 && (
                <div className="flex flex-col gap-1 mt-2">
                  {sessions.map((item: any) => (
                    <span key={item?.id} className="text-base font-light text-primary ml-4">
                      {`(${item?.sesionNumber || "0"}) `}
                      <b className="uppercase">{item?.date || ""}</b>
                    </span>
                  ))}
                </div>
              )}

              {!cartId && <span className="text-sm text-slate-400 mt-2">No existe el carro de compra</span>}
              
              <div className="flex items-center justify-between w-full border-t pt-4 border-slate-200/60 mt-4"></div>
              <div className="font-light text-base text-slate-500 text-left ">
            
            </div>
              
         

              
              
            </div>
            
            {/* STEP 04 - CARRO DE COMPRAS */}
            {/* <div className="flex flex-col mb-20 ">
              <h3 className="text-xl font-medium text-primary">
                {"Link de pago"}
              </h3>
             
              <span className="text-base font-light mt-2  text-primary">
              {"Id Carro:"} <b>{cartId}</b>
              </span>
              <span className="text-base font-light overflow-auto text-primary mt-8 border border-primary p-4 rounded-xl bg-purple-100">
              {
                cartId &&
                  <a target="_blank" href={`https://pagos.miniswimmer.cl/${JWT}`}>
                    {
                    `Para completar su inscripción por favor ingrese en el siguiente link de pago https://pagos.miniswimmer.cl/${JWT}   El link de pago tiene una vigencia de 48 horas.`
                    }
                  </a>
              }
              </span>
            </div>
             */}

        </div>
      </div>
    </>
  );
};
