import Lucide from "@/components/Base/Lucide";
import { Tab } from "@/components/Base/Headless";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import clsx from "clsx";
import _ from "lodash";
import { FormInput, FormLabel, FormTextarea } from "@/components/Base/Form";
import { Slideover } from "@/components/Base/Headless";
// import LoadingIcon from "@/components/Base/LoadingIcon";
import { ResumenPage } from "./components/ResumenPage";
import { ResumenTransactions } from "./components/ResumenTransactions";
import { SessionsPage } from "./components/SessionsPage";
import { MessagesPage } from "./components/MessagesPage";
import { ModifyPage } from "./components/ModifyPage";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getStudent,  selectStudent } from "@/stores/Students/slice";
import { selectAuth} from "@/stores/Users/slice";
import { calcularEdad, convertirFecha } from "@/utils/dateHandler";
import {formatDateUTC} from "@/utils/helper";
import {typeOfGender} from "@/pages/private/Students/components/Card";
import Button from "@/components/Base/Button";
import TicketList from "./components/TicketList";


interface Props {
  gender: string;  
}

const IcoGender: React.FC<Props> = ({gender}) => {
  const IcoSvg = typeOfGender[String(gender)] || typeOfGender[""]
  return<IcoSvg/>
}

function Main() {
  const { search, state } = useLocation();
  const [sessionSlideover, setSessionSlideover] = useState(false);
  const [dataNew, setDataNew] = useState({
    id: "",
    locationId:  "",
    email:  "",
    phone:  "",
    student:  "",
    title:  "",
    description:  "",
  });
  const queryParams = new URLSearchParams(search);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useAppDispatch();
  const studentId: string | null = queryParams.get("id" ?? "");
  const { student, status } = useAppSelector(selectStudent);
  const {email}= useAppSelector(selectAuth);
  const { locations } = useAppSelector(selectLocation);
  const edad:any = student?.birthdate && calcularEdad(String(student?.birthdate === "" ? "1800/01/01":student?.birthdate));
  
  
  useEffect(() => {
    if (queryParams.get("page") == "resume") {
      setSelectedIndex(0);
    } else if (queryParams.get("page") == "sessions") {
      setSelectedIndex(1);
    } else if (queryParams.get("page") == "transactions") {
      setSelectedIndex(2);
    } else if (queryParams.get("page") == "messages") {
      setSelectedIndex(3);
    } else if (queryParams.get("page") == "modify") {
      setSelectedIndex(4);
    } else {
      setSelectedIndex(0);
    }
  }, [search]);
  
  
  useEffect(() => {
    typeof state?.id !== "undefined" &&
      dispatch(getStudent({ studentId: state?.id || ""}))
   
    return () => {};
  }, [state?.id]);
  
  useEffect(() => {
    (async () => await dispatch(getLocationsOnly()))();
  }, []);
  
  useEffect(() => {
    dataNew?.id === "" && setDataNew({
      ...dataNew,
      id:  `${student?.id}`,
      email:  `${student?.emailPhone}`,
      phone:  `${student?.contactPhone}`,
      student:  `${student?.name} ${student?.middleName} ${student?.lastName}`,
    })
  }, [student]);
 
  return (
    <>
         {/* SESIONES */}
         <Slideover
        size="xl"
        key="Slide-tickets333"
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
          <Slideover.Title>
            <h2 className="mr-auto text-base font-medium">Ticket de soporte</h2>
          </Slideover.Title>
          <Slideover.Description className="p-8">
           
            <div className="mt-3">
              <FormLabel htmlFor="modal-form-2"><span className="min-w-40 pr-12">Email:</span><b>{dataNew?.email}</b></FormLabel>
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="modal-form-2"><span className="min-w-40 pr-6">Telefono:</span><b>{dataNew?.phone}</b></FormLabel>
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="modal-form-2"><span className="min-w-40 pr-2">Estudiante:</span> <b>{dataNew?.student}</b></FormLabel>
            </div> 
            <div className="mt-10">
              <FormLabel htmlFor="modal-form-1">Titulo</FormLabel>
              <FormInput
                id="name"
                type="text"
                value={dataNew?.title}
                placeholder=""
                onChange={(e) =>
                 setDataNew({
                    ...dataNew,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="modal-form-4">Sede</FormLabel>
              {/* <div className="flex flex-row flex-wrap"> */}
              <div className="flex-1 w-full mt-3 xl:mt-0">
                        {Array.isArray(locations) &&
                          locations?.map((item, i) => (
                            <>
                              <Button
                              key={`${i}-LOCATIONS-USED`}
                              onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                                setDataNew({ ...dataNew, locationId: item?.id })
                            }}                              
                            className={`shadow-none border m-0 p-0 mr-2 mb-1 w-40 h-12  ${item?.id === dataNew?.locationId && "bg-green-200"}`}>
                              <span
                                  className="group flex justify-center items-center text-xs rounded-md uppercase ">
                                  <span className="-mt-px text-center">
                                  
                                  {/* <p className="text-center line-clamp-1 text-xs text-slate-400">{item?.name}</p> */}
                                  <p className={`text-center line-clamp-1 text-xs text-slate-400  ${item?.id === dataNew?.locationId && "text-slate-500"}`}>{item?.name}</p>
                                  </span>
                              </span>
                              
                            </Button>
                            </>
                          ))}
                    </div>
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="modal-form-3">Descripción</FormLabel>
              <FormTextarea
                name="postContent"
                defaultValue=""
                className="w-full border border-slate-300 rounded-lg "
                rows={4}
                cols={40}
                onChange={async (e) => {
                  console.log("e---", e.target.value);
                  setDataNew({
                    ...dataNew,
                    description: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mt-3 mb-16">
              <Button
                variant="primary"
                type="button"
                className="w-28 px-2 py-3 rounded-xl"
                // onClick={createTicket}
              >
                Grabar Ticket
              </Button>
            </div>
            <p className="text-2xl text-left mt-4">
              Listado de Tickets creados
            </p>
            <p className="text-sm mb-8 text-left text-slate-500">
              Asociados a {" "}
              {
              dataNew.email
              }
            </p>
            {/* <pre>{JSON.stringify(dataNew, null, 2 )}</pre> */}
            <TicketList email={dataNew?.email} />
           
          </Slideover.Description>
          <Slideover.Footer>
            <div className="flex justify-between">
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => {
                  setSessionSlideover(false);
                }}
                className="w-20 px-2 py-3 rounded-xl"
              >
                Volver
              </Button>
            </div>
          </Slideover.Footer>
        </Slideover.Panel>
      </Slideover>
    { state?.id &&
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="p-1.5 box flex flex-col ">
            <div className="h-48 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
              <div
                className={clsx([
                  "w-full h-full relative overflow-hidden",
                  "before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]",
                  "after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]",
                ])}
              ></div>
              <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-24">
                <div className="w-full h-full overflow-hidden border-[6px] box border-white rounded-full image-fit">
                  <div className="flex justify-center items-center">
                  <IcoGender gender={student?.gender || ""}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[0.6rem] bg-slate-50 pt-12 pb-6">
              <div className="flex items-center justify-center text-xl font-medium">
                {`${student?.name} ${student?.middleName} ${student?.lastName}`}
                <Lucide
                  icon="BadgeCheck"
                  className="w-5 h-5 ml-2 text-blue-500 fill-blue-500/30"
                  />
              </div>
              <div className="flex items-center justify-center m-4">
                  <Button 
                    rounded
                    onClick={()=>setSessionSlideover(true)}
                    className="bg-red-200/30 border border-red-700/30 p-3"
                  ><Lucide icon="HelpCircle" className="w-5 h-5 ml-2 text-red-400 fill-black-500/30 mr-4"/>
                  <span className=" text-red-400">Crear Ticket de soporte</span></Button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-5 mt-2.5">
                <div className="flex items-center text-slate-500">
                  <Lucide
                    icon="User"
                    className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                  />
                  { student?.birthdate && edad.años > 100 ? "SIN EDAD":`${edad?.años || ""} años, ${edad?.meses || ""} meses`}
                </div>
                <div className="flex items-center text-slate-500">
                  <Lucide
                    icon="Mail"
                    className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                  />
                  {`${student?.emailPhone}`}
                </div>
                <div className="flex items-center text-slate-500">
                  <Lucide
                    icon="Signal"
                    className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                  />
                  {`${student?.contactPhone}`}
                </div>
                <div className="flex items-center text-slate-500">
                  <Lucide
                    icon="Calendar"
                    className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                  />
                  {`${formatDateUTC(student?.createdAt)}`}
                </div>
              </div>
            </div>
          </div>
          <Tab.Group
            className="mt-10"
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          >
            <div className="flex flex-col 2xl:items-center 2xl:flex-row gap-y-3">
              <Tab.List
                variant="boxed-tabs"
                className="flex-col sm:flex-row w-full mr-auto bg-white box rounded-[0.6rem] border-slate-200"
              >
                <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                  <Tab.Button
                    className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                    as="button"
                  >
                    Resumen
                  </Tab.Button>
                </Tab>
                <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                  <Tab.Button
                    className="w-full xl:w-52 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                    as="button"
                  >
                    Pagos y Transacciones
                  </Tab.Button>
                </Tab>
                <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                  <Tab.Button
                    className="w-full xl:w-56 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                    as="button"
                  >
                    Gestión de Sesiones
                    {/* <div className="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full text-theme-1/70 bg-theme-1/10 border-theme-1/10">
                      7
                    </div> */}
                  </Tab.Button>
                </Tab>
                <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                  <Tab.Button
                    className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                    as="button"
                  >
                    Mensajes enviados
                  </Tab.Button>
                </Tab>
              
                <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                  <Tab.Button
                    className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                    as="button"
                  >
                    Modificar datos
                  </Tab.Button>
                </Tab>
              </Tab.List>
            
            </div>
            <Tab.Panels>
              <Tab.Panel><ResumenPage data={student} edad={edad} status={status}/></Tab.Panel>
              <Tab.Panel><ResumenTransactions 
                            data={student?.relationships}  
                            studentId={student?.id}  
                            status={status}/>
                          </Tab.Panel>
              <Tab.Panel><SessionsPage data={student} studentId={student?.id} status={status}/></Tab.Panel>
              <Tab.Panel><MessagesPage/></Tab.Panel>
              <Tab.Panel><ModifyPage/></Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    }
    
    { !state?.id && <>
      <div className="p-1.5 box flex flex-col ">
        <div className="flex flex-col items-center justify-center pt-20 pb-28">
                          <Lucide
                            icon="SearchX"
                            className="w-20 h-20 text-theme-1/20 fill-theme-1/5 stroke-[0.5]"
                          />
                          <div className="mt-5 text-xl font-medium">
                            No se encontro al Alumno
                          </div>
                          <div className="w-2/3 mt-3 leading-relaxed text-center text-slate-500">
                          Utilice el buscador superior para visualizar información del alumno
                            
                          </div>
        </div>
      </div>
    </>
    }
    </>
  );
}

export default Main;
