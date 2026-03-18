import Lucide from "@/components/Base/Lucide";
import { Tab } from "@/components/Base/Headless";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import clsx from "clsx";
import _ from "lodash";
// import { FormInput, FormLabel, FormTextarea } from "@/components/Base/Form";
// import { Slideover } from "@/components/Base/Headless";
// import LoadingIcon from "@/components/Base/LoadingIcon";
import { ResumenPage } from "./components/ResumenPage";
import { ResumenTransactions } from "./components/ResumenTransactions";
import { SessionsPage } from "./components/SessionsPage";
import { EvaluacionesPage } from "./components/EvaluacionesPage";
// import { MessagesPage } from "./components/MessagesPage";
// import { ModifyPage } from "./components/ModifyPage";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
// import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getStudent,  selectStudent } from "@/stores/Students/slice";
// import { selectAuth} from "@/stores/Users/slice";
import { calcularEdad, convertirFecha } from "@/utils/dateHandler";
import {formatDateUTC} from "@/utils/helper";
import {typeOfGender} from "@/pages/private/Students/components/Card";
// import Button from "@/components/Base/Button";
// import TicketList from "./components/TicketList";
// import { memo } from "react";


interface Props {
  gender: string;  
}

const IcoGender: React.FC<Props> = ({gender}) => {
  const IcoSvg = typeOfGender[String(gender)] || typeOfGender[""]
  return<IcoSvg/>
}





function Content(props:any) {
  const {selectedIndex, setSelectedIndex, fnUpdateState } = props;
  const { student, status } = useAppSelector(selectStudent);
  const dataGuardian:any = student?.relationships;
  const edad:any = student?.birthdate && calcularEdad(String(student?.birthdate === "" ? "1800/01/01":student?.birthdate));
  
  
  // const generarLinkGoogleMaps = (latitud: number, longitud: number, zoom: number): string => {
  //   return `https://www.google.com/maps/@${latitud},${longitud},${zoom}z`;
  // };
  

    
  const generarLinkGoogleMapsConDireccion = (direccion: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }): string => {
    const direccionCompleta = `${direccion.streetAddress}, ${direccion.city}, ${direccion.state} ${direccion.zipCode}, ${direccion.country}`;
    // Codifica la dirección para que sea segura para usar en una URL
    const direccionCodificada = encodeURIComponent(direccionCompleta);
    return `https://www.google.com/maps/search/?api=1&query=${direccionCodificada}`;
  };
  
  const generarLinkWazeConDireccion = (direccion: {
    streetAddress: string;
    city: string;
    state: string;
    country: string;
  }): string => {
    const direccionCompleta = `${direccion.streetAddress}, ${direccion.city}, ${direccion.state}, ${direccion.country}`;
    const query = encodeURIComponent(direccionCompleta);
    return `https://waze.com/ul?q=${query}`;
  };
  
  return (
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
          <p className="text-center text-slate-300 text-[0,6rem] pt-2">{student?.id}</p>
          {(() => {
            // Prefer direct denormalized fields updated on each new evaluation
            const icon = student?.evaluationIcon;
            const description = student?.evaluationDescription;
            // Fallback: derive from latest studentEvaluation
            const evals = student?.studentEvaluations?.items;
            const latest = Array.isArray(evals) && evals.length > 0
              ? [...evals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
              : null;
            const displayIcon = icon || latest?.evaluationLevel?.ico;
            const displayDescription = description || latest?.evaluationLevel?.description;
            const levelName = latest?.evaluationLevel?.name;
            if (!displayIcon && !displayDescription && !levelName) return null;
            return (
              <div className="flex justify-center mt-4 px-6">
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-theme-1/40 bg-theme-1/5 shadow-sm">
                  {displayIcon && (
                    <img src={displayIcon} alt={levelName} className="w-10 h-10 object-contain flex-shrink-0" />
                  )}
                  <div className="text-left">
                    {levelName && (
                      <p className="text-xs font-semibold text-theme-1/60 uppercase tracking-widest mb-0.5">Último nivel evaluado</p>
                    )}
                    {levelName && <p className="text-sm font-bold text-slate-700">{levelName}</p>}
                    {displayDescription && (
                      <p className="text-xs text-slate-500 mt-0.5">{displayDescription}</p>
                    )}
                  </div>
                  {latest?.wasApproved && (
                    <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-300 ml-2">
                      <Lucide icon="CheckCircle" className="w-3.5 h-3.5" />Aprobado
                    </span>
                  )}
                </div>
              </div>
            );
          })()}
          <div className="flex items-center justify-center m-4">
              {/* <Button 
                rounded
                onClick={()=>setSessionSlideover(true)}
                className="bg-red-200/30 border border-red-700/30 p-3"
              ><Lucide icon="HelpCircle" className="w-5 h-5 ml-2 text-red-400 fill-black-500/30 mr-4"/>
              <span className=" text-red-400">Crear Ticket de soporte</span>
              </Button> */}
              {
                dataGuardian && 
                Array.isArray(dataGuardian.items) && 
                dataGuardian.items.length > 0 && 
                dataGuardian.items[0]?.user && 
                dataGuardian.items[0].user.streetAddress && (
                <>
                  <a 
                  
                    href={  generarLinkGoogleMapsConDireccion(
                      {
                        streetAddress: dataGuardian?.items[0].user.streetAddress,
                        city: dataGuardian?.items[0].user?.city,
                        zipCode: dataGuardian?.items[0].user?.zipCode,
                        state: dataGuardian?.items[0].user?.state,
                        country: dataGuardian?.items[0].user?.country
                        
                      }
                    )
                  }
                    target="_blank"
                    className="bg-green-200/30 border border-green-600/30 p-3 ml-4 rounded-full text-green-700 flex flex-row justify-center items-center"
                  >
                    <svg width="32px" height="32px" viewBox="-55.5 0 367 367" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                      <g>
                      <path d="M70.5853976,271.865254 C81.1995596,285.391378 90.8598594,299.639537 99.4963338,314.50654 C106.870174,328.489419 109.94381,337.97007 115.333495,354.817346 C118.638014,364.124835 121.625069,366.902652 128.046515,366.902652 C135.045169,366.902652 138.219816,362.176756 140.672953,354.867852 C145.766819,338.95854 149.763988,326.815514 156.069992,315.343493 C168.443902,293.193112 183.819296,273.510299 198.927732,254.592287 C203.018698,249.238677 229.462067,218.047767 241.366994,193.437035 C241.366994,193.437035 255.999233,166.402027 255.999233,128.645368 C255.999233,93.3274168 241.569017,68.8321265 241.569017,68.8321265 L200.024428,79.9578224 L174.793197,146.408963 L168.552129,155.57215 L167.303915,157.231625 L165.64444,159.309576 L162.729537,162.628525 L158.56642,166.791642 L136.098575,185.09637 L79.928962,217.528279 L70.5853976,271.865254 Z" fill="#34A853">
                      </path>
                      <path d="M12.6120081,188.891517 C26.3207125,220.205084 52.7568668,247.730719 70.6431185,271.8869 L165.64444,159.352866 C165.64444,159.352866 152.260416,176.856717 127.981579,176.856717 C100.939355,176.856717 79.0920095,155.2619 79.0920095,128.032084 C79.0920095,109.359386 90.325932,96.5309245 90.325932,96.5309245 L25.8373003,113.811107 L12.6120081,188.891517 Z" fill="#FBBC04">
                      </path>
                      <path d="M166.705061,5.78651629 C198.256727,15.959818 225.262874,37.3165365 241.597878,68.8104812 L165.673301,159.28793 C165.673301,159.28793 176.907223,146.228586 176.907223,127.671329 C176.907223,99.8065834 153.443693,78.990998 128.09702,78.990998 C104.128433,78.990998 90.3620076,96.4659886 90.3620076,96.4659886 L90.3620076,39.4666386 L166.705061,5.78651629 Z" fill="#4285F4">
                      </path>
                      <path d="M30.0148476,45.7654275 C48.8607087,23.2182162 82.0213432,0 127.736265,0 C149.915506,0 166.625695,5.82259183 166.625695,5.82259183 L90.2898565,96.5164943 L36.2054099,96.5164943 L30.0148476,45.7654275 Z" fill="#1A73E8">
                      </path>
                      <path d="M12.6120081,188.891517 C12.6120081,188.891517 0,164.194204 0,128.414485 C0,94.5972757 13.145926,65.0369799 30.0148476,45.7654275 L90.3331471,96.5237094 L12.6120081,188.891517 Z" fill="#EA4335">
                      </path>
                      </g>
                    </svg><span className="ml-2">Ver Mapa</span>
                  </a>
                  <a 
                    href={  
                      
                      generarLinkWazeConDireccion({
                      streetAddress: dataGuardian?.items[0].user.streetAddress,
                      city: dataGuardian?.items[0].user?.city,
                      state: dataGuardian?.items[0].user?.state,
                      country: dataGuardian?.items[0].user?.country
                    })
                    }
                    target="_blank"
                    className="bg-[#3cf] border border-green-600/30 p-3 ml-4 rounded-full text-black flex flex-row justify-center items-center"
                  >
                    <svg fill="#000000" width="32px" height="32px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Waze icon</title><path d="M13.314 1.59c-.225.003-.45.013-.675.03-2.165.155-4.295.924-6.069 2.327-2.194 1.732-3.296 4.325-3.496 7.05h.002c-.093 1.22-.23 2.15-.469 2.63-.238.479-.42.638-1.24.639C.27 14.259-.4 15.612.266 16.482c1.248 1.657 2.902 2.705 4.72 3.364a2.198 2.198 0 00-.033.367 2.198 2.198 0 002.2 2.197 2.198 2.198 0 002.128-1.668c1.307.12 2.607.14 3.824.1.364-.012.73-.045 1.094-.092a2.198 2.198 0 002.127 1.66 2.198 2.198 0 002.2-2.197 2.198 2.198 0 00-.151-.797 12.155 12.155 0 002.303-1.549c2.094-1.807 3.511-4.399 3.302-7.404-.112-1.723-.761-3.298-1.748-4.608-2.143-2.86-5.53-4.309-8.918-4.265zm.366 1.54c.312.008.623.027.933.063 2.48.288 4.842 1.496 6.4 3.577v.001c.829 1.1 1.355 2.386 1.446 3.792v.003c.173 2.477-.965 4.583-2.777 6.147a10.66 10.66 0 01-2.375 1.535 2.198 2.198 0 00-.98-.234 2.198 2.198 0 00-1.934 1.158 9.894 9.894 0 01-1.338.146 27.323 27.323 0 01-3.971-.148 2.198 2.198 0 00-1.932-1.156 2.198 2.198 0 00-1.347.463c-1.626-.553-3.078-1.422-4.155-2.762 1.052-.096 1.916-.6 2.319-1.408.443-.889.53-1.947.625-3.198v-.002c.175-2.391 1.11-4.536 2.92-5.964h.002c1.77-1.402 3.978-2.061 6.164-2.012zm-3.157 4.638c-.688 0-1.252.579-1.252 1.298 0 .72.564 1.297 1.252 1.297.689 0 1.252-.577 1.252-1.297 0-.711-.563-1.298-1.252-1.298zm5.514 0c-.688 0-1.25.579-1.25 1.298-.008.72.554 1.297 1.25 1.297.688 0 1.252-.577 1.252-1.297 0-.711-.564-1.298-1.252-1.298zM9.641 11.78a.72.72 0 00-.588.32.692.692 0 00-.11.54c.345 1.783 2.175 3.129 4.264 3.129h.125c1.056-.032 2.026-.343 2.816-.922.767-.556 1.29-1.316 1.477-2.137a.746.746 0 00-.094-.547.69.69 0 00-.445-.32.714.714 0 00-.867.539c-.22.93-1.299 1.9-2.934 1.94-1.572.046-2.738-.986-2.926-1.956a.72.72 0 00-.718-.586Z"/></svg>
                  <span className="ml-2">Ver Mapa</span>
                  </a>
                </>
                )
              }
          </div>
          {/* <pre>{JSON.stringify(student?.relationships?.items[0].user
          , null, 2 )}</pre> */}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-5 mt-2.5">
            <div className="flex items-center text-slate-500">
              <Lucide
                icon="User"
                className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
              />
              { student?.birthdate && edad?.años > 100 ? "SIN EDAD":`${edad?.años || ""} años, ${edad?.meses || ""} meses`}
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
              Creado: {`${formatDateUTC(student?.createdAt)}`}
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
              </Tab.Button>
            </Tab>
            <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
              <Tab.Button
                className="w-full xl:w-56 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                as="button"
              >
                <div className="min-w-[1.15rem] rounded-full bg-white flex items-center justify-center text-xs mr-2">
                  <div className="w-full h-full px-1.5 py-0.5 leading-none rounded-full bg-theme-1/[0.75] text-white">
                    Nuevo 
                  </div>
                </div>Evaluaciones
              </Tab.Button>
            </Tab>
            
          </Tab.List>
        
        </div>
        <Tab.Panels>
          {/* Resume */}
          <Tab.Panel>
            {student && 
              <ResumenPage 
                data={student} 
                edad={edad} 
                status={status} 
                studentId={student?.id}  
                studentEmail={student?.emailPhone}
                studentName={`${student?.name} ${student?.middleName} ${student?.lastName}`}
              />
            }
          </Tab.Panel>
          
          {/* Pagos y transacciones */}
          <Tab.Panel>
          {student && 
            <ResumenTransactions 
              data={student?.relationships}  
              studentId={student?.id}  
              status={status}
              fnUpdateState={fnUpdateState}
            />
          }
          </Tab.Panel>
          
          {/* Sesiones */}
          <Tab.Panel>
          { student && 
            <SessionsPage 
              data={student} 
              studentId={student?.id} 
              status={status}
            />
          }
          </Tab.Panel>
          
          {/* Evaluaciones */}
          <Tab.Panel>
          { student && 
            <EvaluacionesPage
              studentId={student?.id}
              studentBirthdate={student?.birthdate}
              studentName={`${student?.name || ""} ${student?.lastName || ""}`.trim()}
              studentEmail={student?.emailPhone || ""}
              onStudentUpdated={() => fnUpdateState(student?.id)}
            />
          }
          </Tab.Panel>
          
        </Tab.Panels>
      </Tab.Group>
  </div>
  )
}

function Main() {
  const { search, state } = useLocation();
  // const queryParams = new URLSearchParams(search);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectStudent);

  // Memoizamos la función para evitar recreaciones
  const fnUpdateState = useCallback(async (studentId: string) => {
    if (studentId) {
      await dispatch(getStudent({ studentId }));
    }
  }, [dispatch]);

  // Efecto para manejar los cambios en la URL
  // useEffect(() => {
  //   if (queryParams.get("page") === "resume") {
  //     setSelectedIndex(0);
  //   } else if (queryParams.get("page") === "sessions") {
  //     setSelectedIndex(1);
  //   } else if (queryParams.get("page") === "transactions") {
  //     setSelectedIndex(2);
  //   } else if (queryParams.get("page") === "messages") {
  //     setSelectedIndex(3);
  //   } else if (queryParams.get("page") === "modify") {
  //     setSelectedIndex(4);
  //   } else {
  //     setSelectedIndex(0);
  //   }
  // }, [search]);

  // Efecto para cargar los datos del estudiante
  useEffect(() => {
    const loadStudentData = async () => {
      if (state?.id) {
        await dispatch(getStudent({ studentId: state.id }));
      }
    };
    
    loadStudentData();
  }, [state?.id, dispatch]);

  // Memoizamos el contenido para evitar re-renderizados
  const content = useMemo(() => {
    if (!state?.id) {
      return (
        <div className="p-1.5 box flex flex-col">
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
      );
    }

    return (
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        {status === "idle" && (
          <Content 
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            fnUpdateState={fnUpdateState}
          />
        )}
      </div>
    );
  }, [state?.id, status, selectedIndex, fnUpdateState]);

  return content;
}

export default Main;
