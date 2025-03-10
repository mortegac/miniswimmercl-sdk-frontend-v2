import { useState, useEffect } from "react";
import clsx from "clsx";
import _ from "lodash";

import Toastify from "toastify-js";
import emailjs, { init } from "emailjs-com";
const SERVICE = "service_ucb8wga"; // welcome@mini..
const TEMPLATE = "template_5kxuc3t"; // Welcome_v2
init("Csc41asZklkk5HTWk");
import Notification from "@/components/Base/Notification";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { typeOfRelationship } from "@/utils/dictionary";
import { formatDateUTC, formatCurrency } from "@/utils/helper";
import { typeOfMonth, addDaysToDate } from "@/utils/dateHandler";

import LoadingIcon from "@/components/Base/LoadingIcon";
import { Slideover } from "@/components/Base/Headless";

import { CourseModify } from "../components/CourseModify";
import {
  WelcomeHTML,
  WelcomeTemplate,
} from "../../../../components/EmailTemplates/WelcomeTemplate";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { removeEnrollment } from "@/stores/Enrollment/slice";
import { getStudent, selectStudent } from "@/stores/Students/slice";
import { selectAuth } from "@/stores/Users/slice";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import {
  setEmailSend,
  selectEmailSend,
  cleanSentVar,
} from "@/stores/EmailsSent/slice";
import type { Location } from "@/stores/Locations/types";

function formatDate(dateString: string): string {
  const diasSemana = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
                            
  
  const date = new Date(dateString);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const dayText = diasSemana[date.getDay()];
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
  const year = date.getUTCFullYear();

  return `${dayText}, ${day}-${typeOfMonth[month]}`;
  // return `${day}-${typeOfMonth[month]}`;
  // return `${day}-${month}-${year}`;
}

export function ResumenPage(props: any) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [sessionSlideover, setSessionSlideover] = useState(false);
  const { data, edad, status, studentId, studentEmail, studentName } = props;
  const [dataCourse, setDataCourse] = useState({
    id: data?.id,
    locationId: data?.locationId,
    courseId: data?.courseId,
    scheduleId: data?.scheduleId,
  });

  const dispatch = useAppDispatch();
  const { email } = useAppSelector(selectAuth);
  const { locations } = useAppSelector(selectLocation);

  async function deleteEnrollment(enrollmentId: string) {
    console.log("eliminacion enrollmentId = ", enrollmentId);
    await Promise.all([
      await dispatch(
        removeEnrollment({
          enrollmentId: enrollmentId,
          employeeId: email,
        })
      ),
      await dispatch(getStudent({ studentId: studentId || "" })),
      //  await dispatch(
      //    getStudents({
      //      month: month,
      //      year: year,
      //      day:day,
      //      wasPaid: wasPaid,
      //    })
      //  )
    ]);

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

  function findLocationById(
    locations: Location[],
    id: string
  ): Location | undefined {
    return locations.find((location) => location.id === id);
  }

  const onSendEmail = async (data: any) => {
    setIsSaved(true);

    // console.log("--onSendEmail--", data)

    const templateEmail = WelcomeHTML(data);

    emailjs
      .send(SERVICE, TEMPLATE, data)
      .then(
        function (response) {
          dispatch(
            setEmailSend({
              type: "WELCOME",
              contentEmail: templateEmail,
              email: data.to_client_email,
              usersEmailSendId: email,
              studentEmailSendId: data.to_student_id,
              contentMessage: "",
              phone: "",
              phoneState: "SEND",
              emailState: "SEND",
              enrollmentEmailSendsId: data?.enrollmentId,
            })
          );

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
          dispatch(
            setEmailSend({
              type: "WELCOME",
              contentEmail: templateEmail,
              email: data.to_client_email,
              usersEmailSendId: email,
              studentEmailSendId: data.to_student_id,
              contentMessage: "",
              phone: "",
              phoneState: "RENDERING_FAILURE",
              emailState: "RENDERING_FAILURE",
              enrollmentEmailSendsId: data?.enrollmentId,
            })
          );

          console.log("FAILED...", error);
        }
      )
      .catch((err) => {
        dispatch(
          setEmailSend({
            type: "WELCOME",
            contentEmail: templateEmail,
            email: data.to_client_email,
            usersEmailSendId: email,
            studentEmailSendId: data.to_student_id,
            contentMessage: "",
            phone: "",
            phoneState: "RENDERING_FAILURE",
            emailState: "RENDERING_FAILURE",
            enrollmentEmailSendsId: data?.enrollmentId,
          })
        );

        console.log("err ", err);
      });

    setIsSaved(false);
  };

  useEffect(() => {
    (async () => await dispatch(getLocationsOnly()))();
  }, []);

  return (
    <>
      <Notification id="success-notification-content" className="flex hidden">
        <Lucide icon="CheckCircle" className="text-success" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Email Enviado!</div>
          <div className="mt-1 text-slate-500">
            Revise el historial de envíos del Alumno
          </div>
        </div>
      </Notification>
      <Notification id="deleted-enrollment" className="flex hidden">
        <Lucide icon="CheckCircle" className="text-green-600" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Inscripción eliminada</div>
          <div className="mt-1 text-slate-500">correctamente</div>
        </div>
      </Notification>

      {/* SESIONES */}
      <Slideover
        size="xl"
        key="Slide-sessions333"
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
            {/* <pre>{JSON.stringify(dataCourse, null, 2)}</pre> */}
            <CourseModify
              data={dataCourse}
              studentId={studentId}
              setSessionSlideover={setSessionSlideover}
            />
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
        <div className="col-span-12 xl:col-span-8">
          <div className="flex flex-col gap-y-7">
            <div className="flex flex-col p-5 box ">
              <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                Historial de inscripciones en Cursos
              </div>
              {status === "loading" && (
                <div className="flex justify-center items-start text-center h-56">
                  <div className="w-16 h-16">
                    <LoadingIcon
                      color="purple"
                      icon="three-dots"
                      className="w-10 h-10 mt-10"
                    />
                  </div>
                </div>
              )}
              {status === "idle" && (
                <>
                  <div className="-my-3">
                    <div className="relative overflow-hidden before:content-[''] before:absolute before:w-px before:bg-slate-200/60 before:left-0 before:inset-y-0 before:dark:bg-darkmode-400 before:ml-[14px]">
                      {Array.isArray(data?.enrollments?.items) &&
                        [...data?.enrollments?.items]
                          .sort((a, b) => {
                            const ad = new Date(a.startDate);
                            const bd = new Date(b.startDate);
                            return ad > bd ? -1 : ad < bd ? 1 : 0;
                          })
                          .map((item: any, index: number) => {
                            const totalSessions = item?.sessionDetails?.items[0]?.totalSessions;
                            let vigencia:string;
                            switch (totalSessions) {
                              case 1:
                              case 4:
                                vigencia = "30 días";
                                break;
                              case 8:
                                vigencia = "45 días";
                                break;
                              case 12:
                                vigencia = "90 días";
                                break;
                              case 24:
                                vigencia = "180 días";
                                break;
                            }
                            
                            // vigencia = item?.sessionDetails?.items[0]?.totalSessions === 1 ? "30 días": "0 días"
                            // vigencia = item?.sessionDetails?.items[0]?.totalSessions === 4 ? "30 días": "0 días"
                            // vigencia = item?.sessionDetails?.items[0]?.totalSessions === 8 ? "45 días": "0 días"
                            // vigencia = item?.sessionDetails?.items[0]?.totalSessions === 12 ? "90 días": "0 días"
                            // vigencia = item?.sessionDetails?.items[0]?.totalSessions === 24 ? "180 días": "0 días"
                            
                            
                            const sortedSessionsAsc = [...item?.sessionDetails?.items].sort((a, b) => {
                              return new Date(a.date).getTime() - new Date(b.date).getTime();
                            });
                            
                            return (
                              <>
                                {/* {!item?.wasDeleted && */}
                                {/* <pre>vigencia = {JSON.stringify(vigencia, null, 2 )}</pre> */}
                                <div
                                  className={clsx([
                                    "mb-3 last:mb-0 relative",
                                    "mb-8",
                                    // "first:before:content-[''] first:before:h-1/2 first:before:w-5 first:before:bg-white first:before:absolute",
                                    "last:after:content-[''] last:after:h-1/2 last:after:w-5 last:after:bg-white last:after:absolute last:after:bottom-0",
                                  ])}
                                  key={index}
                                >
                                  <div className="flex flex-row justify-start items-center">
                                    <div className="h-3 w-4 bg-slate-700 ml-2 rounded-full"></div>
                                    <span
                                      className={clsx([
                                        "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                        "bg-slate-700 text-white",
                                        "w-36",
                                      ])}
                                    >
                                      <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                      <span className="-mt-px w-20">
                                        {/* {item?.startDate} */}
                                        {addDaysToDate(item?.startDate, 0)}
                                      </span>
                                    </span>
                                    {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                                    <span
                                      className={clsx([
                                        "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                        // "bg-slate-700 text-white",
                                        item?.wasPaid &&
                                          "text-success bg-success/10 font-thin ",
                                        !item?.wasPaid &&
                                          "text-black bg-red-300 font-semibold ",
                                        "w-56",
                                      ])}
                                    >
                                      <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                      <span className="-mt-px w-36">
                                        {item?.wasPaid && "PAGADO"}
                                        {!item?.wasPaid && "PENDIENTE DE PAGO"}
                                      </span>
                                    </span>
                                    <span
                                      className={clsx([
                                        "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                        " text-green-600",
                                        "w-52",
                                      ])}
                                    >
                                      <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                      <span className="-mt-px w-56">
                                        <i className="text-slate-500">VIGENCIA: </i>{addDaysToDate(item?.startDate, 30)}
                                      </span>
                                    </span>
                                    <div className="w-full border-b border-dashed"></div>
                                  </div>

                                  <div
                                    className={clsx([
                                      "px-4 py-3 ml-8",
                                      //   "before:content-[''] before:ml-1 before:absolute before:w-5 before:h-5 before:bg-slate-200 before:rounded-full before:inset-y-0 before:my-auto before:left-0 before:dark:bg-darkmode-300 before:z-10",
                                      //   "after:content-[''] after:absolute after:w-1.5 after:h-1.5 after:bg-slate-500 after:rounded-full after:inset-y-0 after:my-auto after:left-0 after:ml-[11px] after:dark:bg-darkmode-200 after:z-10",
                                    ])}
                                  >
                                    <div className="flex justify-between">
                                      <p className="uppercase font-thin text-sm text-left my-2">
                                        {item?.courseEnrollmentsId} -{" "}
                                        <b>{item?.scheduleName}</b>
                                      </p>

                                      <div className="flex flex-end -mr-6">
                                        <Button
                                          variant="soft-primary"
                                          // className=""
                                          className="mr-2 flex items-center justify-center w-12 h-12 border rounded-full border-success/10 bg-success/10"
                                          onClick={() => {
                                            setDataCourse({
                                              id: item?.id,
                                              locationId:
                                                item?.course?.location?.id,
                                              courseId:
                                                item?.courseEnrollmentsId,
                                              scheduleId: item?.scheduleId,
                                            });
                                            setSessionSlideover(true);
                                          }}
                                        >
                                          {" "}
                                          <Lucide
                                            icon="Files"
                                            className="w-6 h-6 text-success fill-success/10"
                                          />
                                        </Button>

                                        {!item?.wasPaid && (
                                          <Button
                                            variant="soft-danger"
                                            className="mr-2 flex items-center justify-center w-12 h-12 border rounded-full border-danger/10 bg-danger/10"
                                            onClick={(
                                              event: React.MouseEvent
                                            ) => {
                                              event.preventDefault();
                                              deleteEnrollment(item?.id);
                                            }}
                                          >
                                            <Lucide
                                              icon="Trash2"
                                              className="w-6 h-6 text-danger fill-danger/10"
                                            />
                                          </Button>
                                        )}
                                        <Button
                                          variant="soft-dark"
                                          className="mr-2 flex items-center justify-center w-12 h-12 border rounded-full "
                                          onClick={(
                                            event: React.MouseEvent
                                          ) => {
                                            event.preventDefault();
                                            const location = findLocationById(
                                              locations,
                                              item?.course?.location?.id
                                            );
                                            
                                            
                                            onSendEmail({
                                              reply_to: "hola@miniswimmer.cl",
                                              enrollmentId: item?.id,
                                              to_client_email: studentEmail,
                                              to_student_name: studentName,
                                              to_student_id: studentId,
                                              to_course_name:
                                                item?.course?.title,
                                              to_schedule: `${item?.scheduleName} hrs`,
                                              to_session_1:
                                                sortedSessionsAsc[0]
                                                  ?.date &&
                                                formatDate(
                                                  sortedSessionsAsc[0]
                                                    .date
                                                ),
                                              to_session_2:
                                                sortedSessionsAsc[1]
                                                  ?.date &&
                                                formatDate(
                                                  sortedSessionsAsc[1]
                                                    .date
                                                ),
                                              to_session_3:
                                                sortedSessionsAsc[2]
                                                  ?.date &&
                                                formatDate(
                                                  sortedSessionsAsc[2]
                                                    .date
                                                ),
                                              to_session_4:
                                                sortedSessionsAsc[3]
                                                  ?.date &&
                                                formatDate(
                                                  sortedSessionsAsc[3]
                                                    .date
                                                ),
                                              to_session_5:
                                                sortedSessionsAsc[4]
                                                  ?.date &&
                                                formatDate(
                                                  sortedSessionsAsc[4]
                                                    .date
                                                ),
                                              to_session_6:
                                                sortedSessionsAsc[5]
                                                  ?.date &&
                                                formatDate(
                                                  sortedSessionsAsc[5]
                                                    .date
                                                ),
                                              to_session_7:
                                                sortedSessionsAsc[6]
                                                  ?.date &&
                                                formatDate(
                                                  sortedSessionsAsc[6]
                                                    .date
                                                ),
                                              to_session_8:
                                                sortedSessionsAsc[7]
                                                  ?.date &&
                                                formatDate(
                                                  sortedSessionsAsc[7]
                                                    .date
                                                ),
                                              to_session_9:
                                              sortedSessionsAsc[8]?.date && formatDate(sortedSessionsAsc[8].date),
                                              to_session_10:
                                              sortedSessionsAsc[9]?.date && formatDate(sortedSessionsAsc[9].date),
                                              to_session_11:
                                              sortedSessionsAsc[10]?.date && formatDate(sortedSessionsAsc[10].date),
                                              to_session_12:
                                              sortedSessionsAsc[11]?.date && formatDate(sortedSessionsAsc[11].date),
                                              to_session_13:
                                              sortedSessionsAsc[12]?.date && formatDate(sortedSessionsAsc[12].date),
                                              to_session_14:
                                              sortedSessionsAsc[13]?.date && formatDate(sortedSessionsAsc[13].date),
                                              to_session_15:
                                              sortedSessionsAsc[14]?.date && formatDate(sortedSessionsAsc[14].date),
                                              to_session_16:
                                              sortedSessionsAsc[15]?.date && formatDate(sortedSessionsAsc[15].date),
                                              to_session_17:
                                              sortedSessionsAsc[16]?.date && formatDate(sortedSessionsAsc[16].date),
                                              to_session_18:
                                              sortedSessionsAsc[17]?.date && formatDate(sortedSessionsAsc[17].date),
                                              to_session_19:
                                              sortedSessionsAsc[18]?.date && formatDate(sortedSessionsAsc[18].date),
                                              to_session_20:
                                              sortedSessionsAsc[19]?.date && formatDate(sortedSessionsAsc[19].date),
                                              to_session_21:
                                              sortedSessionsAsc[20]?.date && formatDate(sortedSessionsAsc[20].date),
                                              to_session_22:
                                              sortedSessionsAsc[21]?.date && formatDate(sortedSessionsAsc[21].date),
                                              to_session_23:
                                              sortedSessionsAsc[22]?.date && formatDate(sortedSessionsAsc[22].date),
                                              to_session_24:
                                              sortedSessionsAsc[23]?.date && formatDate(sortedSessionsAsc[23].date),
                                              
                                              
                                              
                                              to_location:
                                                item?.course?.location?.name,
                                              to_location_id:
                                                item?.course?.location?.id,
                                              to_pack_vigencia:vigencia,
                                                
                                              // to_pack_vigencia:item?.sessionType.totalSessions===8 ? "45":"30",
                                              to_mapurl: location?.urlMap || "",
                                              to_mapimage:
                                                location?.imageMap || "",
                                              to_location_address:
                                                location?.address || "",
                                              to_location_temperature:
                                                `entre ${location?.minimumTemperature} C a ${location?.maximumTemperature} C` ||
                                                "",
                                              to_recomendation:
                                                location?.directions || "",
                                            });
                                          }}
                                        >
                                          <Lucide
                                            icon="Send"
                                            className="w-6 h-6 fill-slate-700/10"
                                          />
                                        </Button>
                                      </div>
                                    </div>

                                    {/* <div className="mt-1.5 text-xs text-slate-500">
                                        {"$ "}{formatCurrency(item?.amountPaid)}
                                      </div> */}

                                    <div className="flex flex-col  flex-wrap sm:flex-row items-center gap-y-1.5 mt-1.5 leading-relaxed text-slate-500 text-[0.8rem]">
                                      {Array.isArray(
                                        item?.sessionDetails?.items
                                      ) &&
                                        [...item?.sessionDetails?.items]
                                          .sort((a, b) => {
                                            const ad = new Date(a.date);
                                            const bd = new Date(b.date);
                                            return ad < bd
                                              ? -1
                                              : ad < bd
                                              ? 1
                                              : 0;
                                          })
                                          .map((session: any, i: any) => (
                                            <>
                                              {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
                                              {/* 
                              <pre>{JSON.stringify(item?.id, null, 2)}</pre> */}
                                              <div className=" relative">
                                                <span
                                                  className={clsx([
                                                    "group flex justify-center items-center text-xs rounded-md border pt-4 mr-2 mb-1",
                                                    // "bg-slate-700 text-white",
                                                    session?.status ===
                                                      "ACTIVE" &&
                                                      "bg-green-50 font-thin ",
                                                    session?.status ===
                                                      "USED" &&
                                                      "bg-red-50 border-red-200",
                                                    session?.status ===
                                                      "RECOVERED" &&
                                                      "bg-blue-50 border-blue-200",
                                                    session?.status ===
                                                      "DELETED" &&
                                                      "bg-slate-200 border-slate-200 text-slate-500",

                                                    "w-32 h-16",
                                                  ])}
                                                >
                                                  <span className="-mt-px text-center">
                                                    {session?.status ===
                                                      "ACTIVE" && (
                                                      <>
                                                        <small className=" text-xs font-semibold">
                                                          {formatDateUTC(
                                                            session?.date
                                                          )}
                                                        </small>
                                                        <p className="text-sm"></p>
                                                      </>
                                                    )}
                                                    {session?.status !=
                                                      "ACTIVE" && (
                                                      <>
                                                        <small className="line-through text-xs">
                                                          {formatDateUTC(
                                                            session?.date
                                                          )}
                                                        </small>
                                                        <p className=" text-[0.74rem]">
                                                          {session?.status}
                                                        </p>
                                                      </>
                                                    )}
                                                    <p className="text-center line-clamp-1 text-[0.54rem]">
                                                      {session?.locationId}
                                                    </p>
                                                  </span>
                                                </span>
                                                <span className=" text-center w-5 h4 absolute -top-1 left-1 bg-slate-400 text-white rounded-full text-[0.74rem]">
                                                  {session?.sessionNumber}
                                                </span>
                                              </div>{" "}
                                            </>
                                          ))}
                                    </div>
                                  </div>
                                </div>
                                {/* } */}
                              </>
                            );
                          })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="relative col-span-12 row-start-1 xl:col-start-9 xl:col-span-4">
          <div className="sticky flex flex-col top-[6.2rem] gap-y-7">
            <div className="flex flex-col p-5 box ">
              <div className="pb-5 mb-5 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                Perfil
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <div className="text-xs uppercase text-slate-500">
                    Datos Personales
                  </div>
                  {status === "loading" && (
                    <div className="flex justify-center items-start text-center h-56">
                      <div className="w-16 h-16">
                        <LoadingIcon
                          color="purple"
                          icon="three-dots"
                          className="w-10 h-10 mt-10"
                        />
                      </div>
                    </div>
                  )}
                  {status === "idle" && (
                    <div className="mt-3.5">
                      <div className="flex items-center">
                        <Lucide
                          icon="Clipboard"
                          className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                        />
                        <span className="w-40">Nombre:</span>{" "}
                        {`${data?.name} ${data?.middleName} ${data?.lastName}`}
                      </div>
                      <div className="flex items-center mt-3">
                        <Lucide
                          icon="Calendar"
                          className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                        />
                        <span className="w-40">Fecha de Nacimiento:</span>
                        {data?.birthdate}
                      </div>
                      <div className="flex items-center mt-3">
                        <Lucide
                          icon="User"
                          className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                        />
                        <span className="w-40">Edad:</span>
                        {data?.birthdate && edad.años > 100
                          ? "SIN EDAD"
                          : `${edad?.años || ""} años, ${
                              edad?.meses || ""
                            } meses`}
                      </div>
                      <div className="flex items-center mt-3">
                        <Lucide
                          icon="Hotel"
                          className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                        />
                        <span className="w-40">Comuna:</span>
                        {data?.placeOfResidence}
                      </div>
                      <div className="flex items-center mt-3">
                        <Lucide
                          icon="Phone"
                          className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                        />
                        <span className="w-40">Teléfono:</span>
                        {data?.contactPhone}
                      </div>
                      <div className="flex items-center mt-3">
                        <Lucide
                          icon="Mail"
                          className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                        />
                        <span className="w-40">Email:</span>
                        {data?.emailPhone}
                      </div>
                    </div>
                  )}
                </div>
                {status === "idle" && (
                  <div>
                    <div className="text-xs uppercase text-slate-500 mb-4">
                      Apoderados
                    </div>
                    {Array.isArray(data?.relationships?.items) &&
                      data?.relationships?.items.map(
                        (relation: any, i: any) => (
                          <div className="py-2 border-b border-t">
                            <p className=" font-thin text-sm text-left text-slate-10">
                              <span className=" font-mono">
                                {typeOfRelationship[relation?.relationType]}
                              </span>{" "}
                              {relation?.user?.name}{" "}
                              <p className="mt-1">
                                <span className="mt-1 flex flex-row">
                                  <>
                                    <Lucide
                                      icon="Mail"
                                      className=" w-4 h-4 text-success mr-2"
                                    />{" "}
                                    {relation?.user?.id}
                                  </>
                                </span>
                                <span className="mt-1 flex flex-row">
                                  {relation?.user?.contactPhone && (
                                    <>
                                      <Lucide
                                        icon="PhoneOutgoing"
                                        className=" w-4 h-4 text-success mr-2"
                                      />{" "}
                                      {relation?.user?.contactPhone}
                                    </>
                                  )}
                                  {!relation?.user?.contactPhone && (
                                    <>
                                      <Lucide
                                        icon="PhoneOff"
                                        className=" w-4 h-4 text-red-500 mr-2"
                                      />{" "}
                                      {relation?.user?.contactPhone}
                                    </>
                                  )}
                                </span>
                              </p>
                            </p>
                          </div>
                        )
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <pre>data= {JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}
