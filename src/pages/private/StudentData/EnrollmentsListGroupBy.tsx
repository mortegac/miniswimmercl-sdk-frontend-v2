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

import {SessionList} from "./SessionList";
import { useAppSelector, useAppDispatch } from "../../../stores/hooks";
import {
  getStudents,
  selectEnrollment,
  removeEnrollment,
} from "../../../stores/Enrollment/slice";
import { selectAuth} from "@/stores/Users/slice";
// import { setOneSessionDetail, selectSessionDetails } from "@/stores/SessionDetails/slice";
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
  
  const { enrollments, locationId, wasPaid, day, month, year, statusEnroll } = props;
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
    sessionId:"",
    studentId:"",
    cartId:"", 
    phoneNumber:"", 
    clientName:"", 
    clientId:"", 
  });
  // const [session, setSession] = useState({});
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
  function handleSession(data:any) {
    setSessionSlideover(true);
    // setSession({ ...session });
    setData({
      ...data,
      studentId: data?.studentId,
      enrollmentId: data?.enrollmentId,   
      sessionId: data?.sessionId,   
      // date: String(session.date).replace("T00:00:00.000Z", ''),
      // location: session.locationId,
      // status: session.status,
      // sessionId: session?.id
    });
  }

  // async function updateSession(){
    
  //   await Promise.all([
  //     await dispatch(
  //       setOneSessionDetail({
  //         sessionId:data?.sessionId,
  //         status:data?.status,
  //         locationIdUsed:data?.location,
  //         sessionDate:data?.date,
  //         userModifyId:email,
  //       })),
  //     await dispatch(
  //       getStudents({
  //         month: month,
  //         year: year,
  //         // locationId: locationId,
  //       })
  //     )
  //   ])
    
  //   const successEl = document
  //   .querySelectorAll("#success-notification-content")[0]
  //   .cloneNode(true) as HTMLElement;
  //   successEl.classList.remove("hidden");
  //   Toastify({
  //     node: successEl,
  //     duration: 3000,
  //     newWindow: true,
  //     close: true,
  //     gravity: "top",
  //     position: "right",
  //     stopOnFocus: true,
  //   }).showToast();
  // }
  
  async function deleteEnrollment(enrollmentId:string){
   console.log("eliminacion enrollmentId = ", enrollmentId)
    await Promise.all([
      await dispatch(
        removeEnrollment({
          enrollmentId:enrollmentId,
          employeeId:email,
        })),
      await dispatch(
        getStudents({
          // day: filter.day,
          // month: filter.month,
          // year: filter.year,
          // wasPaid: filter.wasPaid,
          month: month,
          year: year,
          day:day,
          wasPaid: wasPaid,
        })
      )
    ])
    
    const successEl = document
    .querySelectorAll("#deleted-enrollment")[0]
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
   <Notification
        id="deleted-enrollment"
        className="flex hidden"
      >
        <Lucide icon="XCircle" className="text-danger" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Inscripción eliminada</div>
          <div className="mt-1 text-slate-500">
            correctamente
          </div>
        </div>
      </Notification>
    {/* SESIONES */}
      <Slideover
        size="xl"
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
            <SessionList enrollmentId={data?.enrollmentId} sessionId={data?.sessionId} studentId={data?.studentId}/>
           
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
                  {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
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
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Email enviado
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
          {statusEnroll === "loading" && (
                   <div className="flex justify-center w-full">
                     <div className="w-16 h-16">
                       <LoadingIcon
                         color="#AE5EAB"
                         icon="three-dots"
                         className="w-10 h-10 mt-10"
                       />
                     </div>
                   </div>
                 )}
              {Array.isArray(sortedEnrollments) &&
              sortedEnrollments.map((item: any, index) => {
                
                const emailWelcomeCount = item?.emailSends?.items.filter((sendEmail:any) => 
                  sendEmail?.type === "WELCOME" && 
                  sendEmail?.enrollmentEmailSendsId === item?.id).length;
                  
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
                    <Table.Td className="w-12 py-4 border-dashed">
                <p className="my-2 border-slate-300 border rounded-full text-center p-2">
                  {emailWelcomeCount === 0 && <Lucide icon="XCircle" className="text-red-600" />}
                  {emailWelcomeCount >= 1 && <div className="flex"><Lucide icon="CheckCircle" className="text-green-600 mr-2" />{emailWelcomeCount}</div>}
                  {/* {emailWelcomeCount >= 1 && emailWelcomeCount} */}
                  </p>
                </Table.Td>
                    <Table.Td className=" py-4 border-dashed">
                      
                    {!item?.wasDeleted &&
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
                    }
                      {item?.wasDeleted &&
                        <div className="flex items-center">
                          <div
                            className={`flex justify-center items-center text-xs border rounded-full px-2 py-2 
                            text-danger bg-danger/10 font-thin`}
                          >
                            <span className="-mt-px text-center p-1">
                              INSCRIPCION ELIMINADO
                            </span>
                          </div>
                        </div>
                      }
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
                      <p className="uppercase font-thin text-sm text-left">{item?.course?.title}</p>
                      <p className="uppercase font-thin text-sm text-left">{item?.scheduleName}</p>
                        {/* <p className="uppercase font-thin text-sm text-left">
                          {item?.course?.title}
                          
                        </p> */}
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
                            {/* <pre>{JSON.stringify(item?.student?.id, null, 2)}</pre>
                            <pre>{JSON.stringify(item?.id, null, 2)}</pre> */}
                              <Button
                                onClick={() => handleSession({
                                  studentId: item?.student?.id,
                                  enrollmentId: item?.id,                                  
                                  sessionId: session?.id
                                })}
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
                                // setRemoveEnrollmentSlideover(true);
                                deleteEnrollment(item?.id)
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
      {/* {status === "loading" && (
        <div className="flex justify-center">
          <div className="w-16 h-16">
            <LoadingIcon
              color="#AE5EAB"
              icon="three-dots"
              className="w-10 h-10 mt-10"
            />
          </div>
        </div>
      )} */}
      {/* {status === "idle" && <Content enrollments={enrollments}  {...props}/>} */}
      <Content enrollments={enrollments} statusEnroll={status} {...props}/>
    </>
  );
}

export default Main;
