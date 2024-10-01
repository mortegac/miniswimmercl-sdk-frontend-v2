import React, { Fragment, useState, useEffect, useRef } from "react";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { HeaderTitle } from "./HeaderTitle";
import CardCourses from "./CardCourses";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectCourse, getCourses} from "@/stores/Courses/slice";
import { selectEnrollment, setDataUser, increment, cleanData} from "@/stores/Enrollment/slice";


export const FormStep04 = ({ onChangeSetStore }: any) => {
  const {enrollment}= useAppSelector(selectEnrollment);
  const {
    guardianId,
    guardianEmail,
    guardianName,
    guardianRelation,
    studentName,
    studentLastName,
  } = enrollment;
  
  // const {courses, status } = useAppSelector(selectCourse);
  // const dispatch = useAppDispatch();
  
  // useEffect(() => { (async () => await dispatch(getCourses()))(); }, []);
  
  return (
    <>
       <div className="text-left px-8 ">
        <div className="intro-y flex flex-col justify-center border-b pb-8">
          <span className="text-3xl font-semibold  text-slate-700">
            Resumen
          </span>
          <span className="text-xl font-normal  text-slate-700 mb-12 mt-2">
            Inscripción del curso
          </span>
          <div className="overflow-y-auto h-[600px] w-full ">
            {/* STEP 01 - APODERADO */}
            <div className="flex flex-col mb-20 ">
              <h3 className="text-xl font-medium text-primary">
                {"Información apoderado y Alumno"}
              </h3>
              <span className="text-base font-light mt-2  text-primary">
                {"Apoderado: "} {guardianName} | {guardianRelation}
              </span>
              <span className="text-base font-light mt-2  text-primary">
                {"Email: "} {guardianEmail}
              </span>
              <span className="text-base font-light mt-2  text-primary">
                {"Alumno: "} {studentName} {studentLastName}
              </span>
              <span className="text-base font-light mt-2  text-primary">
                {"Edad: "} 3 años
              </span>
              <div className="flex items-center justify-between w-full border-t pt-4 border-slate-200/60 mt-4"></div>

              <div className="font-light text-base text-slate-500 text-left ">
                {/* <ValidateList items={offert?.PlantOffert?.items || []} title="de las plantas" />
                
                { offert?.PlantOffert?.items.length >= 1 && <PlantsList items={offert?.PlantOffert?.items || []} />} 
                 */}

              </div> 
            </div>

            {/* STEP 02 - ALUMNO*/}
            <div className="flex flex-col mb-16 ">
              <h3 className="text-xl font-medium text-primary">
                LA REINA | {"COLEGIO-JOHN-ANDREWS"}
              </h3>
              {/* <span className="text-base font-light mt-2  text-primary">
              {"Sede:"} COLEGIO-JOHN-ANDREWS
              </span> */}
              <span className="text-base font-light mt-2  text-primary">
              {"Curso:"} <b>Bebes - 2 a 12 Meses</b>
              </span>
              <span className="text-base font-light mt-2  text-primary">
              {"Pack:"} <b>8 Sessiones</b>
              </span>
              <span className="text-base font-light mt-2  text-primary">
              {"Valor:"} <b>$110.000</b>
              </span>
              <div className="flex items-center justify-between w-full border-t pt-4 border-slate-200/60 mt-4"></div>

              <div className="font-light text-base text-slate-500 text-left ">
              {/* { Array.isArray(offert?.PlantOffert?.items) &&
                offert?.PlantOffert?.items.map((item: any, i: number)=><>
                 <div className="text-slate-500 text-md mt-8">
                    <p className="text-slate-500 ">
                      <span className="text-slate-500 uppercase font-medium">{item?.ProductionPlant?.name}</span> | <span className="text-slate-500 capitalize ml-3"> {item?.ProductionPlant?.comune}</span>
                    </p>
                  </div>
                  
                 
                  <ValidateList items={item?.RouteVehicleOffert?.items ||[]} title="del vehículo" />
                  { item?.RouteVehicleOffert?.items.length >= 1 && <VehiclesList items={item?.RouteVehicleOffert?.items ||[]} />}
                  
                </>
              )} */}
              </div>
            </div>

            {/* STEP 03 - CURSOS / HORARIOS */}
            <div className="flex flex-col mb-20 ">
              <h3 className="text-xl font-medium text-primary">
                {"Detalle Sessiones generadas"}
              </h3>
             
              <span className="text-base font-light mt-2  text-primary">
              {"Horario clases:"} <b>Viernes 17:00</b>
              </span>
              <span className="text-base font-light mt-2  text-primary">
              {"Sesión 1:"} <b>14 sept 2024</b>
              </span>
              <span className="text-base font-light mt-2  text-primary">
              {"Sesión 2:"} <b>22 sept 2024</b>
              </span>
              <span className="text-base font-light mt-2  text-primary">
              {"Sesión 3:"} <b>04 oct 2024</b>
              </span>
              <span className="text-base font-light mt-2  text-primary">
              {"Sesión 4:"} <b>14 oct 2024</b>
              </span>
             
            
              <div className="flex items-center justify-between w-full border-t pt-4 border-slate-200/60 mt-4"></div>
              <div className="font-light text-base text-slate-500 text-left ">
            
            </div>
              
              <div className="font-light text-base text-slate-500 text-left ">
              {/* { Array.isArray(offert?.PlantOffert?.items) &&
                offert?.PlantOffert?.items.map((item: any, i: number)=><>
                 <div className="text-slate-500 text-md mt-8">
                    <p className="text-slate-500 ">
                      <span className="text-slate-500 uppercase font-medium">{item?.ProductionPlant?.name}</span> | <span className="text-slate-500 capitalize ml-3"> {item?.ProductionPlant?.comune}</span>
                    </p>
                  </div>
                  
                </>
              )} */}
              </div>
              
         

              
              
            </div>
            


          </div>
        </div>
          <div className="flex justify-center items-center flex-col mt-8">
            {/* <pre>canBecreateEconomic={JSON.stringify(canBecreateEconomic)}</pre> */}
            {/* <h4 className="mb-4 font-thin text-xl">Presione el botón para continuar con su oferta</h4> */}
            <Button
                rounded
                // onClick={() => {
                //   dispatch(incrementByAmount(nextNumber))
                // }}
                variant="primary"
                className="w-[60%] py-3 uppercase mr-2"
                // disabled={statusRequest === "loading" && false}
              >
                <span className="flex flex-row justify-center items-center">
                  {/* <Lucide icon={`${canBecreateEconomic ? "Check" : "X"}`} className={`w-6 h-6 mr-2 ${canBecreateEconomic ? "text-white": "text-red-300"}`} /> */}
                  <span className={`px-4 py-3 text-xl`}>Enviar Email</span>
                </span>
              </Button>
          </div>
      </div>
    </>
  );
};
