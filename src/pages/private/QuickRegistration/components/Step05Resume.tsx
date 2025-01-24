import React, { Fragment, useState, useEffect, useRef } from "react";
import * as jose from 'jose';

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { HeaderTitle } from "./HeaderTitle";
import CardCourses from "./CardCourses";

import {typeOfMonth} from "@/utils/dictionary";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectCourse, getCourses} from "@/stores/Courses/slice";
import { selectEnrollment, setDataUser, increment, cleanData} from "@/stores/Enrollment/slice";


export const Step05Resume = ({ onChangeSetStore }: any) => {
  const [JWT, setJWT] = useState("")
  const {enrollment, sessions, cartId}= useAppSelector(selectEnrollment);
  const {
    guardianId,
    guardianEmail,
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

  // const payload: any = {
  //   "sub": "1234567890",
  //   "iat": 1516239022
  // }
  // const claims:any = jose.decodeJwt(JWT)
  
  // const {courses, status } = useAppSelector(selectCourse);
  // const dispatch = useAppDispatch();
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
    // const secret = jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
    await createJWT()
    // const jwt = await new jose.EncryptJWT({
    //   "sub": cartId,
    //   "iat": 1516239022
    // })
    //   .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    //   .setIssuedAt()
    //   .setIssuer('urn:example:issuer')
    //   .setAudience('urn:example:audience')
    //   .setExpirationTime('2d')
    //   .encrypt(secret)

    // console.log(jwt)
    
  })(); }, [cartId]);
  
  return (
    <>
    {/* <pre>{JSON.stringify(enrollment, null, 2 )}</pre> */}
       <div className="text-left px-4 ">
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
              <h3 className="text-sm font-medium text-primary">
                {"Sede:"}
              </h3>
              <h3 className="text-sm font-medium text-primary">
                {"Se detallan las fechas agendadas:"}
              </h3>
              
              {Array.isArray(sessions ) &&
              sessions.map((item: any, i: number) => {
                
                const date = item?.date.replace(/\s/g, '').split('-');
                
              return <span className="text-base font-light mt-2  text-primary m-4">
                {`- (${item?.sesionNumber || "0"}) `} 
                {/* <b>{item?.date}</b>  */}
                {/* <pre>{JSON.stringify(date, null, 2)}</pre>
                <pre>{JSON.stringify(date[0], null, 2)}</pre>
                <pre>{JSON.stringify(date[1], null, 2)}</pre> */}
                <b><span className="uppercase">{courseDay[0] || ""}</span> {date[0]} {typeOfMonth[date[1]]}</b> 
                {/* <i className="ml-4 rounded-full px-4 py-2 bg-slate-200 text-slate-500">
                  {item?.locationId}
                </i> */}
              </span>
              }
              )}
              
              <div className="flex items-center justify-between w-full border-t pt-4 border-slate-200/60 mt-4"></div>
              <div className="font-light text-base text-slate-500 text-left ">
            
            </div>
              
         

              
              
            </div>
            
            {/* STEP 04 - CARRO DE COMPRAS */}
            <div className="flex flex-col mb-20 ">
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
                    {`https://pagos.miniswimmer.cl/${JWT}`}
                  </a>
              }
              </span>
              
{/*              
             
            
              <div className="flex items-center justify-between w-full border-t pt-4 border-slate-200/60 mt-4"></div>
              <div className="font-light text-base text-slate-500 text-left ">
            
            </div>
               */}
            
              
         

              
              
            </div>
            


          {/* </div> */}
        </div>
          {/* <div className="flex justify-center items-center flex-col mt-8">
            
            <h4 className="mb-4 font-thin text-xl">Presione el botón para continuar con su oferta</h4>
            <Button
                rounded
                variant="primary"
                className="w-[60%] py-3 uppercase mr-2"
                disabled={statusRequest === "loading" && false}
              >
                <span className="flex flex-row justify-center items-center">
                  <Lucide icon={`${canBecreateEconomic ? "Check" : "X"}`} className={`w-6 h-6 mr-2 ${canBecreateEconomic ? "text-white": "text-red-300"}`} />
                  <span className={`px-4 py-3 text-xl`}>Enviar Email</span>
                </span>
              </Button>
          </div> */}
      </div>
    </>
  );
};
