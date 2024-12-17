import React, { useEffect, useState, Fragment, useMemo } from "react";
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

import { useAppSelector, useAppDispatch } from "../../../stores/hooks";
import {
  getStudents,
  selectEnrollment,
} from "../../../stores/Enrollment/slice";
import { selectAuth} from "@/stores/Users/slice";
import { setOneSessionDetail, selectSessionDetails } from "@/stores//SessionDetails/slice";
import { getLocations, selectLocation } from "@/stores/Locations/slice";
import { selectShoppingCartDetails, getShoppingCartDetail } from "@/stores/ShoppingCartDetail/slice";
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
  let currentUserId:string | null = null;
  
  const { enrollments, locationId, month, year } = props;
  const dispatch = useAppDispatch();
  const {email}= useAppSelector(selectAuth);
  const { locations, status } = useAppSelector(selectLocation);
  const {shoppingCartDetails} = useAppSelector(selectShoppingCartDetails);
  const [data, setData] = useState({
    date: "",
    location: "",
    status: "",
    // SEND REMMENBER PAYMENT
    enrollmentId:"", 
    cartId:"", 
    phoneNumber:"", 
    clientName:"", 
    clientId:"", 
    sessionId:"", 
    
  });
  const [session, setSession] = useState({});
  const [sessionSlideover, setSessionSlideover] = useState(false);
  const [remmenberSlideover, setRemmenberSlideover] = useState(false);
  const [removeEnrollmentSlideover, setRemoveEnrollmentSlideover] = useState(false);
  const [dataStudentSlideover, setDataStudentSlideover] = useState(false);

  // const sortedEnrollments:any = Array.isArray(enrollments) && enrollments.sort((a:any, b:any) => {
  //   const idA = a.student?.relationships?.items[0]?.usersRelationshipsId || '';
  //   const idB = b.student?.relationships?.items[0]?.usersRelationshipsId || '';
    
  //   return idA.localeCompare(idB);
  // });
  
  
  const sortedEnrollments = useMemo(() => {
    return [...enrollments].sort((a, b) => {
      // return (dayOrder[a.day] || 0) - (dayOrder[b.day] || 0);
        const idA = a.student?.relationships?.items[0]?.usersRelationshipsId || '';
        const idB = b.student?.relationships?.items[0]?.usersRelationshipsId || '';
    
    return idA.localeCompare(idB);
    });
  }, [enrollments]);
  
  async function setDataSendRememberPayment(dataEnrollment:any) {
    setData({
      ...data,
      ...dataEnrollment,
      // SEND REMENBER PAYMENT
      // enrollmentId:item?.id, 
      // cartId:"", 
      // phoneNumber:item?.student?.relationships?.items[0]?.user?.contactPhone, 
      // clientName:item?.student?.relationships?.items[0]?.user?.name, 
      // clientId: item?.student?.relationships?.items[0]?.usersRelationshipsId
  })
    const getCardDetailData = await dispatch(getShoppingCartDetail({enrollmentId:dataEnrollment.enrollmentId}))
    const cartData:any = shoppingCartDetails[0]
    console.log("---shoppingCartDetails--", cartData?.shoppingCartCartDetailsId
    )
    cartData?.shoppingCartCartDetailsId && setData({
      ...data,
      ...dataEnrollment,
      cartId:cartData?.shoppingCartCartDetailsId, 
  })
  }
  function handleSession(session: any) {
    setSessionSlideover(true);
    setSession({ ...session });
    setData({
      ...data,
      date: String(session.date).replace("T00:00:00.000Z", ''),
      location: session.locationId,
      status: session.status,
      sessionId: session?.id
    });
  }

  async function updateSession(){
    
    await Promise.all([
      await dispatch(
        setOneSessionDetail({
          sessionId:data?.sessionId,
          status:data?.status,
          locationIdUsed:data?.location,
          sessionDate:data?.date,
          userModifyId:email,
        })),
      await dispatch(
        getStudents({
          month: month,
          year: year,
          locationId: locationId,
        })
      )
    ])
    
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
  }
 
  
  useEffect(() => {
    (async () => await dispatch(getLocations()))();
  }, []);

  return (
    <>
   <Notification
        id="success-notification-content"
        className="flex hidden"
      >
        <Lucide icon="CheckCircle" className="text-success" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Sesión actualizada</div>
          <div className="mt-1 text-slate-500">
            correctamente
          </div>
        </div>
      </Notification>
    {/* SESIONES */}
      <Slideover
        size="lg"
        key="Slide-Historial333"
        open={sessionSlideover}
        onClose={() => {
          setSessionSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setSessionSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <pre>{JSON.stringify(data, null, 2 )}</pre>
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Reagendar Sesión</div>
                <div className="text-slate-500 mt-0.5  mb-12">del Alumno</div>
                <div className="overflow-auto xl:overflow-visible">
                
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Fecha sesión</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                          (Formato fecha año - mes - dia)
                        </div>
                      </div>
                    </label>
                    <div className="flex flex-row mt-3 xl:mt-0 w-[140] justify-center items-center">
                      <div className="relative">
                        <Lucide
                          icon="Calendar"
                          className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-5 stroke-[1.3]"
                        />
                        <Litepicker
                          value={data.date}
                          type="text"
                          name="studentBithday"
                          onChange={(e) =>
                            setData({ ...data, date: String(e.target.value).replace("T00:00:00.000Z", '') })
                          }
                          options={{
                            autoApply: true,
                            showWeekNumbers: false,
                            format: "YYYY-MM-DD",
                            singleMode: true,
                            // Formatear la fecha de salida como ISO 8601
                            setup: (picker) => {
                              picker.on("selected", (date1) => {
                                // Convertir a formato ISO 8601
                                const isoDate = date1.format(
                                  "YYYY-MM-DD"
                                );
                                // const isoDate = date1.format(
                                //   "YYYY-MM-DDTHH:mm:ss.SSSZ"
                                // );
                                console.log(
                                  "Fecha seleccionada (ISO 8601):",
                                  isoDate
                                );
                              });
                            },
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
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Sede</div>
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormSelect
                        className="!box uppercase mr-3"
                        onChange={(e) =>
                          setData({ ...data, location: e.target.value })
                        }
                      >
                        <option value="" selected>
                          {`${"Sedes"} `}
                        </option>
                        {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <option
                              key={i}
                              value={item?.id}
                              selected={item?.id === data.location && true}
                            >
                              {item.name}
                            </option>
                          ))}
                      </FormSelect>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Estado</div>
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormSelect
                        className="!box uppercase mr-3"
                        onChange={(e) =>
                          setData({ ...data, status: e.target.value })
                        }
                      >
                        {/* <option value="" selected>
                          {`${"Estados"} `}
                        </option> */}
                        {/* {Array.isArray(locations) &&
                          locations?.map((item, i) => ( */}
                            <option
                              key={"STATUS-01"}
                              value={"ACTIVE"}
                              selected={"ACTIVE" === data.status && true}
                            >
                              {"ACTIVA"}
                            </option>
                            <option
                              key={"STATUS-02"}
                              value={"USED"}
                              selected={"USED" === data.status && true}
                            >
                              {"USADA"}
                            </option>
                            <option
                              key={"STATUS-03"}
                              value={"RECOVERED"}
                              selected={"RECOVERED" === data.status && true}
                            >
                              {"RECUPERADA"}
                            </option>
                            <option
                              key={"STATUS-04"}
                              value={"DELETED"}
                              selected={"DELETED" === data.status && true}
                            >
                              {"ELIMINADA"}
                            </option>
                          {/* ))} */}
                      </FormSelect>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                   
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <Button
                            key={`${"UPDATE_SESSION"}-span-buttons`} 
                            rounded
                            variant="primary"
                            className={`w-full px-2 py-2  mx-2 font-light uppercase `}
                            onClick={()=>updateSession()}
                          >Actualizar Sesión</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
    {/* ENVIO RECORDATORIO */}
      <Slideover
        size="lg"
        key="Slide-send-remmember-pay333"
        open={remmenberSlideover}
        onClose={() => {
          setRemmenberSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setRemmenberSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Enviar recordatorio</div>
                <div className="text-slate-500 mt-0.5  mb-12">de pago</div>
                <div className="overflow-auto xl:overflow-visible">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                  {/* 
                  <pre>{JSON.stringify(data, null, 2)}</pre> */}

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    {data.cartId &&<SendWhatsAppMessage
                      cartId={data?.cartId}
                      phoneNumber={data?.phoneNumber}
                      clientName={data?.clientName}
                      clientId={data?.clientId}
                    />}
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                   
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <Button
                            key={`${"UPDATE_SESSION"}-span-buttons`} 
                            rounded
                            variant="primary"
                            className={`w-full px-2 py-2  mx-2 font-light uppercase `}
                            onClick={()=>{
                             
                            }
                          }
                          >ACCION</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
    {/* ELIMINAR INSCRIPCION */}
      <Slideover
        size="lg"
        key="Slide-remove-enrollment333"
        open={removeEnrollmentSlideover}
        onClose={() => {
          setRemoveEnrollmentSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setRemoveEnrollmentSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Proceso de eliminación</div>
                <div className="text-slate-500 mt-0.5  mb-12">de la inscripción selecciona</div>
                <div className="overflow-auto xl:overflow-visible">
                  {/* <pre>{JSON.stringify(session, null, 2)}</pre>
                  <pre>{JSON.stringify(data, null, 2)}</pre> */}

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                   
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <Button
                            key={`${"UPDATE_SESSION"}-span-buttons`} 
                            rounded
                            variant="primary"
                            className={`w-full px-2 py-2  mx-2 font-light uppercase `}
                            onClick={()=>{
                             
                            }
                          }
                          >ACCION</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
    {/* DATOS ALUMNO */}
      <Slideover
        size="lg"
        key="Slide-student-data33"
        open={dataStudentSlideover}
        onClose={() => {
          setDataStudentSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setDataStudentSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Información </div>
                <div className="text-slate-500 mt-0.5  mb-12">del alumno y apoderados</div>
                <div className="overflow-auto xl:overflow-visible">
                  {/* <pre>{JSON.stringify(session, null, 2)}</pre>
                  <pre>{JSON.stringify(data, null, 2)}</pre> */}

                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                   
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <Button
                            key={`${"UPDATE_SESSION"}-span-buttons`} 
                            rounded
                            variant="primary"
                            className={`w-full px-2 py-2  mx-2 font-light uppercase `}
                            onClick={()=>{
                             
                            }
                          }
                          >ACCION</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      {/* <pre>{JSON.stringify(sortedEnrollments, null, 2 )}</pre> */}
      <div className="overflow-auto xl:overflow-visible text-base">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Fecha
              </Table.Td>
              <Table.Td className=" py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-left">
                Estado
              </Table.Td>
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Valor
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-left">
                Estudiante
              </Table.Td>
              <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Curso
              </Table.Td>
              <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Sesiones
              </Table.Td>
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500"></Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
              {Array.isArray(sortedEnrollments) &&
              sortedEnrollments.map((item: any, index) => {
                
          const showUserId = item.student?.relationships?.items[0]?.usersRelationshipsId !== currentUserId;
          if (showUserId) {
            currentUserId = item.student?.relationships?.items[0]?.usersRelationshipsId;
          }

          return (
            <Fragment key={`${index}-ENROLLMENT`}>
              {showUserId && (
                <div className="flex-1">
                   <h2 className="mt-3 text-xl font-medium leading-none text-slate-600 dark:text-slate-500">
                   {item.showUserId}</h2>
                </div>
              )}
               
               <Table.Tr
                    key={index}
                    className={`[&_td]:last:border-b-0 ${
                      !item?.wasPaid && "bg-red-50"
                    }  ${item?.wasPaid && "bg-white"}`}
                  >
                    <Table.Td className=" py-4 border-dashed">
                      <div className="flex items-center">
                        <div className="w-14 text-sm">
                          {formatDate(item?.startDate)}
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td className=" py-4 border-dashed">
                      <div className="flex items-center">
                        <div
                          className={`flex justify-center items-center text-xs border rounded-full px-2 py-2 
                          ${item?.wasPaid && "text-success bg-success/10 font-thin "}
                          ${!item?.wasPaid && "text-gray-600 bg-gray-200 font-thin "}
                          `}
                        >
                          <span className="-mt-px">
                            {item?.wasPaid && "PAGADO"}
                            {!item?.wasPaid && "PENDIENTE"}
                          </span>
                        </div>
                      </div>
                    </Table.Td>

                    <Table.Td className=" py-4 border-dashed">
                      <div className="w-20 font-thin text-sm text-left">{`$ ${formatCurrency(
                        item?.amountPaid
                      )}`}</div>
                    </Table.Td>

                    <Table.Td className=" py-4 border-dashed">
                      <div className="w-52 flex items-start justify-start flex-col">
                        <p className=" uppercase font-dm-sans font-normal text-base text-left">
                          {item?.student?.name} {item?.student?.lastName}{" "}
                        </p>

                        {Array.isArray(item?.student?.relationships?.items) &&
                          item?.student?.relationships?.items.map(
                            (relation: any, i: any) => (
                              <p className=" font-thin text-sm text-left text-slate-10">
                                
                                <span className=" font-mono">
                                  {typeOfRelationship[relation?.relationType]}
                                </span>{" "}
                                {relation?.user?.name}{" "}
                                <p className="mt-1">
                                  {relation?.user?.id}{" "}
                                  {relation?.user?.contactPhone}
                                </p>
                              </p>
                            )
                          )}
                      </div>
                    </Table.Td>
                    <Table.Td className=" py-4 border-dashed w-32">
                      <div className="w-48 flex items-start justify-start flex-col">
                        <p className="uppercase font-thin text-sm text-left">
                          {item?.course?.title}
                        </p>
                        <p className="uppercase font-dm-sans text-base text-left">
                          {item?.course?.location?.id}
                        </p>
                      </div>
                    </Table.Td>
                    <Table.Td className=" min-h-20  py-4 border-0  flex items-center justify-center flex-row flex-wrap">
                      {Array.isArray(item?.sessionDetails?.items) &&
                        item?.sessionDetails?.items.map(
                          (session: any, i: any) => (
                            <>
                              <Button
                                onClick={() => handleSession(session)}
                                className={` mx-1 my-1 rounded-full p-0 w-28 h-12
                                  ${session?.status === "ACTIVE" && " bg-green-50"}
                                  ${session?.status === "USED" && " bg-red-50 border-red-200"}
                                  ${session?.status === "RECOVERED" && " bg-blue-50 border-blue-200"}
                                  ${session?.status === "DELETED" && " bg-slate-500 border-slate-200 text-slate-100"}
                                `}
                              >
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
                                        <p className="text-sm">{session?.status}</p>
                                    </>
                                  )}
                                </div>
                              </Button>
                            </>
                          )
                        )}
                    </Table.Td>
                    <Table.Td className=" m-0">
                      <div className="flex flex-row">
                      
                        
                           {!item?.wasPaid &&
                           <>
                            <Button
                              rounded
                              className="mr-2 px-2 py-2 border border-red-400 hover:bg-red-300"
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                setRemoveEnrollmentSlideover(true);
                              }}
                            >
                              <Tippy  content="Eliminar inscripción">
                                <Lucide icon="X" className="text-red-400" />{" "}
                              </Tippy>
                            </Button>
                            <Button
                              rounded
                              className="mr-2 px-2 py-2 border border-primary hover:bg-purple-300"
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault();
                                setDataSendRememberPayment({
                                  enrollmentId:item?.id, 
                                  cartId:"", 
                                  phoneNumber:item?.student?.relationships?.items[0]?.user?.contactPhone, 
                                  clientName:item?.student?.relationships?.items[0]?.user?.name, 
                                  clientId: item?.student?.relationships?.items[0]?.usersRelationshipsId
                                })
                             
                                setRemmenberSlideover(true);
                              }}
                            >
                              <Tippy  content="Envía recordatorio de pago">
                                <Lucide icon="Send" className="text-primary" />{" "}
                              </Tippy>
                            </Button>
                           </>
                        }
                        <Button
                          rounded
                          className="px-2 py-2 border border-slate-400 hover:bg-slate-300"
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            setDataStudentSlideover(true);
                          }}
                        >
                          <Tippy  content="Información del Alumno">
                            <Lucide icon="User" className="text-slate-400" />{" "}
                          </Tippy>
                        </Button>
                      </div>
                    </Table.Td>
                  </Table.Tr>
            </Fragment>
          );
        })}
          </Table.Tbody>
        </Table>
      </div>
      
    </>
  );
}

function Main(props: any) {
  const {enrollments} = props
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
      {status === "idle" && <Content enrollments={enrollments}  {...props}/>}
    </>
  );
}

export default Main;
