import React, { useEffect, useState, useId } from "react";
import _ from "lodash";
import Toastify from "toastify-js";

import Notification from "@/components/Base/Notification";
import Lucide from "@/components/Base/Lucide";
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
  const { courses } = props;
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
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e:any) => {
              e.preventDefault();
              setSwitcherSlideRemember(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Enviar recordatorio de pago vía Whastapp</div>
              
                <div className="flex flex-col items-startgap-y-2">
              <div>
                
                {/* <StudentList/> */}
              </div>  
              </div>  
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      <div className="overflow-auto xl:overflow-visible text-base">
        <Table className="border-b border-slate-200/60">
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
          {/* <pre>{JSON.stringify(enrollments, null, 2)}</pre> */}
           {Array.isArray(courses) &&
              courses.map((course: any, i:number) => {
                let number = i+1;
                return (
                  <>
                  {Array.isArray(course?.enrollments?.items) &&
                  course?.enrollments?.items.map((item: any, index:number) => {
                    return (
                      <>
                      {/* <pre>{JSON.stringify(course, null, 2)}</pre> */}
                    <Table.Tr
                      key={i}
                      className={`[&_td]:last:border-b-0 bg-white`}
                    >
                       <Table.Td className=" py-4 border-dashed w-8">
                            <p className="text-sm">{}</p>
                        </Table.Td>
                       <Table.Td className=" py-4 border-dashed w-16">
                            <p className="text-sm">
                              {course?.ageType === "MONTHS" && "BEBES"}
                              {course?.ageType === "YEARS" && "NINOS"}
                            </p>
                        </Table.Td>
                        <Table.Td className=" py-4 border-dashed w-80">
                        
                        
                            <p className="text-sm">
                              {course?.id}
                            </p>
                            <p className="text-sm uppercase font-thin text-green-600">
                              {item?.scheduleName}
                            </p>
                            <p className="text-sm font-thin">
                              {course?.locationCoursesId}
                            </p>
                            <div className="w-48 flex items-start justify-start flex-col">
                        {/* <p className="uppercase font-thin text-sm text-left">
                          {item?.course?.title}
                        </p>
                        <p className="uppercase font-dm-sans text-base text-left">
                          {item?.course?.location?.id}
                        </p> */}
                      </div>
                        </Table.Td>
                        <Table.Td className=" py-4 border-dashed w-40">
                            <p className="text-sm">
                              {item?.startDate}
                            </p>
                        </Table.Td>
                        <Table.Td className=" py-4 border-dashed w-40">
                            {/* <p className="text-sm">
                              {item?.wasPaid.toString()}
                            </p> */}
                            <div className="flex items-center">
                        <div
                          className={`flex justify-center items-center text-xs border rounded-full px-2 py-2 
                    ${item?.wasPaid && "text-success bg-success/10 font-thin "}
                    ${!item?.wasPaid && "text-gray-600 bg-gray-200 font-thin "}
                    `}
                        >
                          <span className="-mt-px">
                            {/* {String(item?.wasPaid)} */}
                            {item?.wasPaid && "PAGADO"}
                            {!item?.wasPaid && "PENDIENTE"}
                          </span>
                        </div>
                      </div>
                        </Table.Td>
                        <Table.Td className=" py-4 border-dashed w-40">
                            {/* <p className="text-sm">
                              <pre>{JSON.stringify(item?.student?.name)}</pre>
                            </p> */}
                            <p className=" uppercase font-dm-sans font-normal text-base text-left">
                          {item?.student?.name} {item?.student?.lastName}{" "}
                        </p>
                        <p className=" block font-dm-sans text-sm text-left">
                          {item?.student?.emailPhone}
                        </p>
                        
                        {item?.wasPaid && <p className=" block font-dm-sans text-sm text-left text-slate-400">
                          {item?.student?.contactPhone}
                        </p>}
                        {!item?.wasPaid &&  <Button
                                onClick={() => setSwitcherSlideRemember(true)}
                                className={` mx-1 my-1 rounded-full p-0  w-40 h-12 bg-green-50`}
                              >
                                <div className={`text-center px-2`}>
                                  
                                      <small className="text-xs">
                                      Enviar Recordatorio {item?.student?.contactPhone}
                                      </small>
                                  
                                </div>
                              </Button>}
                        
                        </Table.Td>
                        <Table.Td className=" py-4 border-dashed w-40">
                        {Array.isArray(item?.sessionDetails?.items) &&
                        item?.sessionDetails?.items.map(
                          (session: any, i: any) => (
                            <>
                                <div className={`text-center px-2`}>
                                  {session?.status === "ACTIVE" && (
                                    <>
                                      <small className="">
                                        {formatDate(session?.date)}
                                      </small>
                                    </>
                                  )}
                                  {session?.status != "ACTIVE" && (
                                    <>
                                      <small className="line-through">
                                        {formatDate(session?.date)}
                                      </small>
                                    </>
                                  )}
                                </div>
                            </>
                          )
                        )}
                        </Table.Td>
                      </Table.Tr>
                      </>
                       
                       
                      )
                      
                      // number = number+1;
                      })}
                  </>
                      
                    );
            })}
          </Table.Tbody>
        </Table>
      </div>
      
    </>
  );
}

function Main(props: any) {
  const {courses} = props
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
      {status === "idle" && <Content courses={courses} {...props} />}
    </>
  );
}

export default Main;
