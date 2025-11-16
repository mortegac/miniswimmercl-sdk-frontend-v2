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
// import { HeaderTitle } from "./HeaderTitle";
// import CardCourses from "./CardCourses";
import { setPhoneApoderado } from "@/stores/Users/slice";
import { setWhatsapp } from "@/stores/EmailsSent/slice";

import {typeOfMonth} from "@/utils/dictionary";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectCourse, getCourses} from "@/stores/Courses/slice";
import { selectEnrollment, setDataUser, increment, cleanData} from "@/stores/Enrollment/slice";

function generatePaymentLink(props: any){
    const paymentLink:string = `
    Para completar su inscripción por favor ingrese en el siguiente link de pago 
    https://pagos.miniswimmer.cl/${props?.JWT}   
    El link de pago tiene una vigencia de 48 horas.`;
    
    return paymentLink
}

function generateEnrollment(props: any){
    const {clientName, courseName, locationName, sessions, courseDay} = props;
    
    const sessionsDetail:string = `${clientName}, hemos realizado su inscripción 🎉 en el *curso ${courseName} en la sede ${locationName}*, \n con las siguientes fechas agendadas:
    ${sessions?.map((item:any, i:number) => {
      const [day, month] = item?.date.replace(/\s/g, '').split('-');
      return ` \n - ${String(courseDay).toUpperCase() || ''} ${day}-${typeOfMonth[month]}`;
    }).join(' \n')}
    `;
return sessionsDetail;
} 



// typeMessage
// "enrollment"
// "paymentLink"


// phoneNumber={guardianPhone}
// clientName={guardianName}
// clientId={guardianId}
// courseName={String(enrollment.enrollmentCourseName).toUpperCase()}
// locationName={String(enrollment.enrollmentLocationName).toUpperCase()} 
// sessions={sessions} 
// typeMessage="enrollment"
// JWT={JWT}
                
export function SendJwtWhatsapp(props: any) {
    const { phoneNumber, clientName, clientId, courseName, sessions, courseDay,  locationName, typeMessage, JWT  } = props;
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    
    const [phone, setPhone] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [clientPhoneNumber, setClientPhoneNumber] = useState(props?.phoneNumber || "");
  
    const dispatch = useAppDispatch();
    const hasSentInitialMessage = useRef(false);
    
    // const paymentLink:string = `Para completar su inscripción por favor ingrese en el siguiente link de pago https://pagos.miniswimmer.cl/${props?.JWT}   El link de pago tiene una vigencia de 48 horas.`;
    // const sessionsDetail:string = `${clientName}, hemos realizado su inscripción 🎉 en el *curso ${courseName} en la sede ${locationName}*, \ncon las siguientes fechas agendadas:
    //                   ${props?.sessions?.map((item:any, i:number) => {
    //                     const [day, month] = item?.date.replace(/\s/g, '').split('-');
    //                     return `\n- ${String(props?.courseDay).toUpperCase() || ''} ${day}-${typeOfMonth[month]}`;
    //                   }).join('\n')}
    //                   `;
    
    const messageText = () => {
        if (typeMessage === "enrollment") {
          return generateEnrollment({
            clientName: clientName,
            courseName: courseName,
            locationName: locationName,
            sessions: sessions,
            courseDay: courseDay,
          });
        } else if (typeMessage === "paymentLink") {
          return generatePaymentLink({ JWT });
        }
        return "";
      };
    
    function cleanPhoneNumber(phone:string) {
      // Eliminar el signo más
      let cleanPhone = phone.replace(/^\+/, '');
      
      // Eliminar espacios y caracteres no numéricos
      cleanPhone = cleanPhone.replace(/\D/g, '');
      
      // Verificar que tenga 11 dígitos
      if (cleanPhone.length === 11) {
        return {
          cleanPhone,
          message: "",
          status: true
      };
      } else {
        return {
          message: 'Número de teléfono inválido',
          status: true
      };
      }
    }
    
    const sendWhatsAppMessage = async (payload: any) => {
      const { name, msg } = payload;
      
      !phoneNumber && setError("Debe ingresar el teléfono del cliente para continuar")
      
      if(phoneNumber){
        
        const validPhone = cleanPhoneNumber(phoneNumber);  
        try {
          setLoading(true);
          setError(null);
    
          if(validPhone.status){
            dispatch(setWhatsapp({
              name: name, 
              phoneNumber: validPhone?.cleanPhone,
              message: messageText(),
            }))
          }
          
        } catch (err:any) {
          setError(err.message);
          console.error('Error sending message:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    
      async function setPhoneUser(){
        clientId !== "" && 
        phone !== "" && dispatch(setPhoneApoderado({userId:clientId, userPhone:phone}));
        setClientPhoneNumber(phone)
      }
      const validatePhoneNumber = (value:any) => {
        setPhone(value);
        
        if (!value) {
          setError('El número de teléfono es requerido');
          setIsValid(false);
          return;
        }
  
        try {
          if (isValidPhoneNumber(value)) {
            setError('');
            setIsValid(true);
          } else {
            setError('Número de teléfono inválido');
            setIsValid(false);
          }
        } catch (err) {
          setError('Error al validar el número');
          setIsValid(false);
        }
      };

      // Enviar automáticamente un solo mensaje al iniciar el componente
      // cuando ya existe un número de teléfono del cliente.
      useEffect(() => {
        if (
          clientPhoneNumber &&
          clientPhoneNumber !== "" &&
          !hasSentInitialMessage.current
        ) {
          hasSentInitialMessage.current = true;
          sendWhatsAppMessage({
            name: clientName,
            msg: `${clientName}, hemos realizado su inscripción en el *curso ${courseName} en la sede ${locationName}* 🎉, \ncon las siguientes fechas agendadas:
                        ${props?.sessions
                          ?.map((item: any) => {
                            const [day, month] = item?.date
                              .replace(/\s/g, "")
                              .split("-");
                            return `\n- ${String(props?.courseDay).toUpperCase() || ""} ${day}-${typeOfMonth[month]}`;
                          })
                          .join("\n")}
                        `,
          });
        }
      }, [clientPhoneNumber, clientName, courseName, locationName, props?.sessions, props?.courseDay, sendWhatsAppMessage]);

    return (
      <>
        {/* { cartStatus !== "AUTHORIZED" &&  */}
          <div className="px-8 pt-6 pb-8 mt-3.5 bg-purple-100">
            <div className="text-base font-medium">Envio mensaje informativo</div>
            <div className="text-slate-500 mt-0.5 mb-2">
              Con esta funcionalidad puedes enviar directo al whatsapp la información de la inscripción
            </div>
            <div className="p-5 box box--stacked">
              <div className="pb-5 mb-5 border-b border-dashed border-slate-300/70">
                <div className="">
                  <h2 className="text-sm mb-2">
                    <span className="text-lg w-20 text-left inline-block">
                      Cliente:
                    </span>{" "}
                    <span className="ml-4 text-lg">{clientName}</span>
                  </h2>
                  
                  <div className="text-sm mb-2 flex flex-row items-center justify-start">
                    <span className="text-lg w-20 text-left  inline-block">
                      Teléfono:
                    </span>{" "}
                    { clientPhoneNumber ==="" && <div className=" mt-3 flex flex-row ml-4 ">
                          <PhoneInput
                            international
                            defaultCountry="CL"
                            value={phone}
                            onChange={validatePhoneNumber}
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            error={error}
                          />
                          <div className="mt-4 ml-4">
                            <Button 
                              variant="primary"
                              className={`px-4 py-2 rounded ${
                                isValid 
                                  ? 'bg-primary hover:bg-primary/200 text-white' 
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                              disabled={!isValid}
                              onClick={()=>setPhoneUser()}
                            >
                              Grabar teléfono
                            </Button>
                          </div>
      
          
        
          
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                      </div>
                    }
                    { clientPhoneNumber !=="" && <div className="w-full flex justify-between items-center">
                      <span className="ml-4 text-lg">{clientPhoneNumber}</span>
                      <Button
                      variant="primary"
                      disabled={loading}
                      className="px-3 py-2 w-full sm:w-auto bg-white text-primary border-primary hover:bg-primary/20"
                      onClick={()=>setClientPhoneNumber("")}
                    >
                      <Lucide
                        icon="Phone"
                        className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                      />
                      Editar teléfono
                    </Button>
                    </div>}
                    
                  </div>
                   {isValid && clientPhoneNumber ==="" &&(
                          <div className="flex flex-col w-full">
                            <p className="text-green-500 text-xs mt-1">
                              Número válido: {phone}
                            </p>
                          </div>
                      )}
                    { clientPhoneNumber ==="" &&  <div className="flex flex-col w-full">
                        <span className="text-red-300">Debe ingresar el teléfono para continuar </span>
                      </div>
                    }
                     
                    
                    
                  
                </div>
               
               
               {
                clientPhoneNumber && clientPhoneNumber !=="" && 
                <>
                 
                  <div className="relative mt-3">
                    <div className="flex justify-start items-center mb-2">
                      <CopyButton 
                      text={messageText() || ""} 
                      buttonText="" 
                      successMessage=""
                      />
                      <span className="font-thin ml-4">Mensaje con el detalle del curso: </span>
                      
                    </div>
                    <FormTextarea
                      disabled
                      rows={8}
                      cols={2}
                      placeholder="Mensaje"
                      value={`${messageText()}`}
                      className="sm:py-3"
                      />
                       <div className="mt-4">
                    <Button
                      variant="primary"
                      disabled={loading}
                      className="px-3 py-2 w-full sm:w-auto bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      onClick={()=>sendWhatsAppMessage({
                        name:clientName, 
                        msg:`${clientName}, hemos realizado su inscripción en el *curso ${courseName} en la sede ${locationName}* 🎉, \ncon las siguientes fechas agendadas:
                        ${props?.sessions?.map((item:any, i:number) => {
                          const [day, month] = item?.date.replace(/\s/g, '').split('-');
                          return `\n- ${String(props?.courseDay).toUpperCase() || ''} ${day}-${typeOfMonth[month]}`;
                        }).join('\n')}
                        `
                      }
                      )}
                    >
                      <Lucide
                        icon="Send"
                        className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                      />
                      {loading ? 'Enviando...' : 'Enviar Whatsapp Inscripción'}
                    </Button>
                    
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </div> 
                  </div>
                  <div className="relative mt-3">
                  <div className="flex justify-start items-center mb-2">
                      <CopyButton 
                      text={messageText() || ""} 
                      buttonText="" 
                      successMessage=""
                      />
                      <span className="font-thin ml-4">Mensaje con link de pago: </span>
                      
                    </div>
   
                    <FormTextarea
                      disabled
                      rows={5}
                      cols={2}
                      placeholder="Mensaje"
                      value={`${messageText()}`}
                      className="sm:py-3"
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="primary"
                      disabled={loading}
                      className="px-3 py-2 w-full sm:w-auto bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      onClick={()=>sendWhatsAppMessage({
                        name:clientName, 
                        msg:messageText()
                        // `${clientName}, hemos realizado su inscripción en el *curso ${courseName} en la sede ${locationName}* 🎉, \ncon las siguientes fechas agendadas:
                        // ${props?.sessions?.map((item:any, i:number) => {
                        //   const [day, month] = item?.date.replace(/\s/g, '').split('-');
                        //   return `\n- ${String(props?.courseDay).toUpperCase() || ''} ${day}-${typeOfMonth[month]}`;
                        // }).join('\n')}
                        // `
                      }
                      )}
                    >
                      <Lucide
                        icon="Send"
                        className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                      />
                      {loading ? 'Enviando...' : 'Enviar mensaje'}
                    </Button>
                    
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </div> 
                </>              
                }
                
                
              </div>            
            </div>
          </div>
        {/* } */}
    </>
    );
  }