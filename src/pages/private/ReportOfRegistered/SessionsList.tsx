import React, { useEffect, useState, useId, Fragment } from "react";
import _ from "lodash";
import Toastify from "toastify-js";

import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
import {CalculateAge} from "@/components/CalculateAge";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import Tippy from "@/components/Base/Tippy";
import Litepicker from "@/components/Base/Litepicker";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";
import {SendWhatsAppMessage} from "@/components/sendWhatsapp";

import { formatCurrency } from "../../../utils/helper";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { Slideover } from "@/components/Base/Headless";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth} from "@/stores/Users/slice";
import {
  getStudents,
  selectEnrollment,
} from "../../../stores/Enrollment/slice";
import { getLocations, selectLocation } from "@/stores/Locations/slice";
import { setOneSessionDetail, selectSessionDetails } from "@/stores//SessionDetails/slice";
import { selectShoppingCartDetails, getShoppingCartDetail } from "@/stores/ShoppingCartDetail/slice";
// import { updateSession } from '@/stores/SessionDetails/services';
import { typeOfMonth } from "../../../utils/dateHandler";

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
  const year = date.getUTCFullYear();
  
  return `${day}-${typeOfMonth[month]}`;
}

function Content(props: any) {
  let currentScheduleId:string | null = null;
  const { sessions } = props;
  const [switcherSlideRemember, setSwitcherSlideRemember] = useState(false);
  // const dispatch = useAppDispatch();


  return (
    <>
          <Slideover
        size="lg"
        key="Slide-Students"
        open={switcherSlideRemember}
        onClose={() => {
          setSwitcherSlideRemember(false);
        }}
      >
     
      </Slideover>
      <div className="overflow-auto xl:overflow-visible text-base">
        {/* <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                
              </Table.Td>
              <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Tipo
              </Table.Td>
              <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Curso
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Inscripción
              </Table.Td>
              <Table.Td className=" py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-left">
                Estado
              </Table.Td>
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Estudiante
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-left">
                Sesiones
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
          <pre>sessions= {JSON.stringify(sessions, null, 2)}</pre>
          
          </Table.Tbody>
        </Table> */}
           <div className="mt-2 overflow-auto lg:overflow-visible">
           {
              Array.isArray(sessions) &&
              (sessions.length === 0 ? (
                <div className="flex justify-center items-center">
                  <span className="text-lg text-slate-400">😴</span>{" "}
                  <span className="text-lg">Sin sesiones encontradas</span>
                </div>
              ) : (
                <Table className="border-spacing-y-[10px] border-separate">
              <Table.Tbody>
                
                { Array.isArray(sessions) &&
        [...sessions]
          .sort((a:any, b:any) => {
            
       
            if (a.scheduleId === "SIN-SCHEDULE" && b.scheduleId !== "SIN-SCHEDULE") return 1;
            if (a.scheduleId !== "SIN-SCHEDULE" && b.scheduleId === "SIN-SCHEDULE") return -1;

            // return nameComparison;
            if (a.status === "USED" && b.status !== "USED") return 1;
            if (a.status !== "USED" && b.status === "USED") return -1;
            
            const timeA = a.schedule?.startHour ? new Date(`1970/01/01 ${a.schedule.startHour}`) : new Date(0);
            const timeB = b.schedule?.startHour ? new Date(`1970/01/01 ${b.schedule.startHour}`) : new Date(0);
            const timeComparison = timeA.getTime() - timeB.getTime();
            if (timeComparison !== 0) return timeComparison;
            
            // Then compare scheduleId
            const scheduleIdComparison = a.scheduleId.localeCompare(b.scheduleId);
            if (scheduleIdComparison !== 0) return scheduleIdComparison;
            
            return a.student?.name.localeCompare(b.student?.name);
              
          })
          .map((item: any, i: number) => {
            const showLocationId = item.scheduleId !== currentScheduleId;
            if (showLocationId) {
              currentScheduleId = item.scheduleId;
            }
                    return(  
                      <Fragment key={`${i}-SCHEDULES`}>
                      {/* { showLocationId &&
                        item?.courseId !== "SIN-CURSO" &&
                        <div className="flex flex-col mt-10">
                           <h2 className="text-xl font-medium leading-none text-slate-600 uppercase">
                           {`${item?.schedule?.day}-${item?.schedule?.startHour}`}
                           </h2>
                           <p className="px-3 my-2 text-left bg-slate-100 mt-1 rounded-full text-xs font-thin py-1 uppercase" >{item?.course?.description}</p>
                        </div>
                      }
                      { showLocationId &&
                        item?.courseId === "SIN-CURSO" &&
                        <div className="w-full mt-12">
                           <h2 className="w-96 mt-3 text-xl font-medium leading-none text-slate-600 my-2 uppercase">
                           Sesión sin horarios asignado
                           </h2>
                        </div>
                      } */}
                            
                    <Table.Tr key={item.id} className={`box`}>
                      
                      <Table.Td className={`w-56`}>
                        <p className="font-medium  text-xl uppercase">
                        {`${item?.schedule?.day}-${item?.schedule?.startHour}`}
                        </p>
                        <p className="text-left mt-1 text-xs font-thin py-1 uppercase" >{item?.course?.description}</p>
                      </Table.Td>
                      <Table.Td className={`w-96`}>
                        <div className="flex items-center">
                          
                          <div className="ml-2">
                            <p className="font-medium  text-xl">
                              {item?.student?.name || ""}{" "}{item?.student?.lastName || ""}
                            </p>
                            <div className="mt-1 text-xs text-slate-500 ">
                              <CalculateAge birthdate={String(item?.student?.birthdate)} />
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      
                      
                    </Table.Tr>
                    </Fragment>
                    
              )})}
              </Table.Tbody>
            </Table>
              ))
    
          }
        
            
          </div>
      </div>
      
    </>
  );
}

function Main(props: any) {
  const {sessions} = props
  const { status } = useAppSelector(selectEnrollment);
  // const { status, enrollments } = useAppSelector(selectEnrollment);

  return (
    <>
      {status === "loading" && (
        <div className="flex justify-center">
          <div className="w-16 h-16">
            <LoadingIcon
              color="#AE5EAB"
              icon="oval"
              className="w-10 h-10 mt-10"
            />
          </div>
        </div>
      )}
      {/* {status === "idle" && <Content {...props} />} */}
      {status === "idle" && <Content sessions={sessions} {...props} />}
    </>
  );
}

export default Main;
