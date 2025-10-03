import {useState, useEffect, useMemo} from "react";
import clsx from "clsx";
import _, { iteratee } from "lodash";

import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
// Configura dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(updateLocale);
dayjs.locale('es'); // Establece el idioma español
dayjs.tz.setDefault('America/Santiago'); // Establece la zona horaria de Santiago


import { FormCheck, FormTextarea, FormInline, FormLabel } from "@/components/Base/Form";
import Table from "@/components/Base/Table";
import Lucide from "@/components/Base/Lucide";
import { Slideover } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import {formatDateUTC, formatCurrency} from "@/utils/helper";
import {typeOfSession} from "@/utils/dictionary";
import {SessionList} from "./SessionList";
import LoadingIcon from "@/components/Base/LoadingIcon";

import { InputOptions } from "@/stores/SessionDetails/types";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getStudentEvaluations, selectStudentEvaluations } from "@/stores/StudentEvaluations/slice";
import { getEvaluationLevel, selectEvaluations } from "@/stores/Evaluations/slice";


function LevelsList(props: any) {
  const { data, activeAssessments } = props;
  const [level, setLevel] = useState("");
  const [test, setTest] = useState(false);
  const [levelFiltered, setLevelFiltered] = useState<any[]>([]); // Cambiar aquí
  
  // Filtrar elementos que NO están en activeAssessments
  const filteredData = Array.isArray(data) 
    ? data.filter((item: any) => !activeAssessments?.includes(item.id))
    : [];
    
  const filterLevels = (levelId: string) => {
    // alert(levelId)
    setLevel(levelId);
    
    // Buscar el nivel seleccionado en los datos filtrados
    const selectedLevel = filteredData.find((item: any) => item.id === levelId);
    
    console.log("---selectedLevel----", selectedLevel?.evaluationObjectives?.items)
    
    if (Array.isArray(selectedLevel?.evaluationObjectives?.items)) {
      // Filtrar los objetivos que coincidan con el levelId
      // const filteredObjectives = selectedLevel?.evaluationObjectives?.items.filter(
      //   (objective: any) => objective.evaluationLevelId === levelId
      // );
      setLevelFiltered([...selectedLevel?.evaluationObjectives?.items]);
    } else {
      setLevelFiltered([]);
    }
  };
  
  return(
    <>
    {/* <pre>{JSON.stringify(filteredData, null, 2 )}</pre> */}
      <div className="flex flex-col p-5">
        <div className="flex flex-row w-full gap-5">     
          {Array.isArray(filteredData) && [...filteredData].sort((a, b) => {
            console.log("--order--", a?.order)
            const groupA = a?.order || 0;
            const groupB = b?.order || 0;
            return groupA - groupB
          })
          .map((item: any, i: number) => {
            return (
              <>
                <div key={`${i}-CARD-LEVELS`} className={`flex flex-row p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm
                  ${item?.id === level && " bg-slate-300 "}`}>
                  <button 
                    onClick={() => filterLevels(item.id)}
                    className="w-36 text-base text-slate-500 uppercase flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors duration-200 rounded-lg p-2"
                  >
                    <img className="w-28 object-contain mb-3" src={item?.ico} />
                    <h3 className="text-center">{item?.name}</h3>
                  </button>
                </div>
              </>
            )
          })}
        </div>
      </div>
      
      { level !== "" &&
      <>
        <div className="flex flex-col p-5 border-t border-slate-200 mt-4">
          <h3 className="text-lg font-medium mb-4">Objetivos del Nivel Seleccionado</h3>
          {/* <pre>{JSON.stringify(levelFiltered, null, 2 )}</pre> */}
          { Array.isArray(levelFiltered) && levelFiltered.map((objective: any, i: number) => {
              return (
                <>
                <div key={i} className="flex items-center px-5 py-3.5">
                  {/* <pre>{JSON.stringify(objective, null, 2 )}</pre> */}
                  <div>
                    <div className="relative w-5 h-5">
                      <FormCheck.Input
                        type="checkbox"
                        // value={objective?.isMandatory && "checked"}
                        value={String(test)}
                        checked={test}
                        // checked={objective?.isMandatory}
                        onClick={()=>setTest(!test)}
                        className="absolute z-10 w-full h-full opacity-0 peer"
                      />
                      {/* {objective?.isMandatory &&  */}
                      {test && 
                        <div className="absolute inset-0 flex text-white shadow-sm items-center justify-center w-[8] h-[8] m-auto  transition-all border rounded opacity-0 bg-primary/60 border-primary/50 peer-checked:opacity-100">
                          <Lucide
                            icon="Check"
                            className="stroke-[1.5] w-3 h-3"
                          />
                        </div>
                      }
                      {/* {objective?.isMandatory === false &&  */}
                      {test === false && 
                        <div className="absolute inset-0 flex  text-slate-400 shadow-sm items-center justify-center w-[8] h-[8] m-auto  transition-all border rounded bg-slate-50/60 border-slate=-200">
                          <Lucide
                            icon="X"
                            className="stroke-[1.5] w-3 h-3"
                          />
                        </div>
                      }
                    </div>
                  </div> 
                  <div className="flex items-center flex-none ml-8 mr-5">
                    <div className="flex items-center flex-row">
                      <span>{objective?.texto}</span>
                      {objective?.isMandatory && 
                      <span className="ml-4 text-xs font-medium rounded-lg border px-2.5 py-1 bg-red-50">
                        Obligatoria
                      </span>
                      }
                    </div>
                  </div>
                </div>
                
                </>
              )
            }) 
            // : <p className="text-slate-500 text-center py-4">No hay objetivos disponibles para este nivel</p>
          }
          <div>
              <FormLabel htmlFor="vertical-form-1">Email</FormLabel>
              <FormTextarea id="vertical-form-1" rows={12} placeholder="..." />
          </div>
          <div className="flex flex-row justify-between">            
            <Button 
            // onClick={()=>setNewSlideover(!newSlideover)}
              variant="primary" className="sm:flex py-4 px-6 rounded-full">
              <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
              Grabar Evaluación
            </Button>
            <Button 
            // onClick={()=>setNewSlideover(!newSlideover)}
              variant="outline-primary" className="sm:flex py-4 px-6 rounded-full">
              <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
              Enviar Evaluación al apoderado
            </Button>
          </div>

                {/* <FormInline>
                  
                  <FormLabel htmlFor="horizontal-form-1" className="sm:w-20">
                      Observaciones
                  </FormLabel>
                  <FormTextarea id="horizontal-form-1" type="text" placeholder="example@gmail.com" />
              </FormInline> */}
        </div>
      </>
      }
    </>
  )
}


export function Content(props:any) {
  const { data, statusFilter, studentId } = props;


  const dispatch = useAppDispatch();
  
  
  
    
  return(
    <>
    
    
      <div className="overflow-auto xl:overflow-visible">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              {/* <Table.Td className="w-5 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              </Table.Td> */}
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              </Table.Td>
             
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Descripción
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Edad
              </Table.Td>
              
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            { Array.isArray(data) &&
        [...data]
        .sort((a:any, b:any) => a.order - b.order)
          
          .map((item: any, index: number) => {
              return (
                <>
                  <Table.Tr key={index} className="[&_td]:last:border-b-0">
                    <Table.Td className=" py-4 border-dashed p-10  w-56">
                      <img className="w-56 object-contain ..." src={item?.evaluationLevel?.ico} />
                    </Table.Td>
                    
                    <Table.Td className=" py-4 border-dashed ">
                      <p className="uppercase font-medium text-lg text-left pt-6 pb-6">{item?.evaluationLevel?.name}</p>
                      <p className="font-base text-sm text-left pb-4">{item?.evaluationLevel?.description}</p>
                      { Array.isArray(item?.studentEvaluationsDetails?.items) && 
                        item?.studentEvaluationsDetails?.items.map((objective: any, i: number) => {
                          return <>
                            <div className="flex items-center px-5 py-3.5">
                              <div>
                                <div className="relative w-5 h-5">
                                  <FormCheck.Input
                                    type="checkbox"
                                    value={objective?.wasAchieved && "checked"}
                                    checked={objective?.wasAchieved}
                                    className="absolute z-10 w-full h-full opacity-0 peer"
                                  />
                                    {objective?.wasAchieved && 
                                      <div className="absolute inset-0 flex text-white shadow-sm items-center justify-center w-[8] h-[8] m-auto  transition-all border rounded opacity-0 bg-primary/60 border-primary/50 peer-checked:opacity-100">
                                        <Lucide
                                          icon="Check"
                                          className="stroke-[1.5] w-3 h-3"
                                          />
                                      </div>
                                    }
                                    {objective?.wasAchieved === false && 
                                      <div className="absolute inset-0 flex  text-slate-400 shadow-sm items-center justify-center w-[8] h-[8] m-auto  transition-all border rounded bg-slate-50/60 border-slate=-200">
                                        <Lucide
                                          icon="X"
                                          className="stroke-[1.5] w-3 h-3"
                                          />
                                      </div>
                                    }
                                </div>
                              </div> 
                              <div className="flex items-center flex-none ml-8 mr-5">
                                <div
                                  className="flex items-center flex-row"
                                >
                                <span>{objective?.evaluationObjective?.texto}</span>
                                {objective?.evaluationObjective?.isMandatory && 
                                <span className="ml-4 text-xs font-medium rounded-lg border px-2.5 py-1 bg-red-50">
                                  Obligatoria
                                </span>
                                  }
                                  
                                </div>
                              </div>
                              </div>
                          </>
                      })
                      }
                    </Table.Td>
                    
                    <Table.Td className=" py-4 border-dashed w-56">
                      <p className="uppercase font-thin text-sm text-center rounded-lg border px-2 py-2 bg-slate-50">{item?.evaluationLevel?.startingAge} a {item?.evaluationLevel?.endingAge} años</p>
                    </Table.Td>
          
                    
                  
                  </Table.Tr>
                  <Table.Tr>
                  <Table.Td colSpan={3}>
                    <p className="text-sm">Evaluado por: <b>{item?.user?.name}</b> el {dayjs(item?.date).format('DD-MMMM-YYYY')}</p>
                    
                    <p className="text-lg py-6 ">{item?.observations}</p>
                  </Table.Td>
                  </Table.Tr>
                </>
            
           
            )})}
          </Table.Tbody>
        </Table>
      </div>
    </>
  )
}


export function EvaluacionesPage(props:any) {
  const [statusFilter, setStatusFilter] = useState({status: true, text:"ACTIVE"});
  
  const [newSlideover, setNewSlideover] = useState(false);
  const {data, studentId } = props;
  
  const { status, studentEvaluations, activeAssessments } = useAppSelector(selectStudentEvaluations);
  const {evaluationLevels} = useAppSelector(selectEvaluations);

    const dispatch = useAppDispatch();
    
    
      
  // Crear el array activeAssessments con useMemo para optimizar el rendimiento
  // const activeAssessments = useMemo(() => {
  //   return Array.isArray(data) 
  //     ? data.map((item: any) => item.id)
  //     : [];
  // }, [data]);
  
  
  // data && activeAssessments
  // console.log("activeAssessments:", activeAssessments);
 
    
    
    useEffect(() => {
      const loadStudentData = async () => {
        if (studentId) {
          await dispatch(getStudentEvaluations({studentId:studentId}));
          await dispatch(getEvaluationLevel({})); 
        }
      };
      
      loadStudentData();
    }, [studentId, dispatch]);
    
    return <>
     <Slideover
        size="xl"
        key="Slide-sessions444"
        open={newSlideover}
        onClose={() => {
          setNewSlideover(false);
        }}
      >
        <Slideover.Panel className="w-96 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e:any) => {
              e.preventDefault();
              setNewSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            {/* <pre>dataSession=={JSON.stringify(dataSession, null, 2 )}</pre> */}
            {/* <SessionList 
              data={dataSession} 
              studentId={studentId} 
              setNewSlideover={setNewSlideover}
            /> */}
            <LevelsList
              data={evaluationLevels}
              activeAssessments={activeAssessments}
            />
           
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
     
      {/* <pre>{ studentEvaluations && JSON.stringify(studentEvaluations, null, 2)}</pre> */}
        <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
          <div className="col-span-12">
            <div className="flex flex-col gap-y-7">
              <div className="flex flex-col p-5 box min-h-[600px]">
               
               <div className="flex flex-row justify-between">
                <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem] uppercase">
                  <h2 className="text-2xl uppercase">{statusFilter.status === true ? "Evaluaciones": "Historial de Sesiones utilizadas"}</h2>
                  
                </div>
                <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                  <Button 
                  onClick={()=>setNewSlideover(!newSlideover)}
                    variant="primary" className="sm:flex py-4 px-6 rounded-full">
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                    Nueva Evaluación
                  </Button>
                </div>
               </div>
               
                { status === "loading" && 
                <div className="absolute top-8 left-0 w-full">
                  <div className="flex justify-center items-start text-center h-56">
                    <div className="w-16 h-16">
                      <LoadingIcon
                        color="purple"
                        icon="three-dots"
                        className="w-10 h-10 mt-10"
                      />
                    </div>
                  </div>
                </div>
                }
                
                <Content 
                  data={studentEvaluations}
                  status={status}
                  studentId={studentId}
                  // statusFilter={statusFilter.status}
                />
                
              </div>
            
            </div>
          </div>
        </div>
    </>
  }