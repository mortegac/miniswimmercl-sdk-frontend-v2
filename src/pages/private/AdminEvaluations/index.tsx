import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
// import debounce from 'lodash/debounce';
// import Toastify from "toastify-js";

// import {formatCurrency} from "../../../utils/helper";
import clsx from "clsx";
import { FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
import Notification from "@/components/Base/Notification";
import Alert from "@/components/Base/Alert";
import LoadingIcon from "@/components/Base/LoadingIcon";
// import { Slideover } from "@/components/Base/Headless";
// import { Menu, Popover } from "@/components/Base/Headless"
// import {FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getEvaluationLevel, selectEvaluations } from "@/stores/Evaluations/slice";
// import { setBreadcrumb } from '@/stores/breadcrumb';
// import { setWPStatus} from "@/stores/WP/slice";



// import { getPaymentTransactions, selectPaymentTransactions } from "@/stores/PaymentTransactions/slice";
// import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
// import { setEmailSend, selectEmailSend, cleanSentVar } from "@/stores/EmailsSent/slice";
// import { Location } from "@/stores/Locations/types";

// import { CartDetail} from "./components/cartDetail"; 

function Content(props: any) {
  
  
const {evaluations} = props;
const dispatch = useAppDispatch();
  return (
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
            {/* <pre>{JSON.stringify(evaluations[0].evaluationObjectives?.items, null, 2)}</pre> */}
            { Array.isArray(evaluations) &&
        [...evaluations]
        .sort((a:any, b:any) => a.order - b.order)
          
          .map((item: any, index: number) => {
            
            {/* {Array.isArray(evaluations) && evaluations.map((item:any, index) => { */}
             
              return (
              <Table.Tr key={index} className="[&_td]:last:border-b-0">
                <Table.Td className=" py-4 border-dashed p-10  w-56">
                  {/* <p className="uppercase font-thin text-sm text-center">{item?.ico}</p> */}
                  <img className="w-56 object-contain ..." src={item?.ico} />
                </Table.Td>
                
                <Table.Td className=" py-4 border-dashed ">
                  <p className="uppercase font-medium text-lg text-left pt-6 pb-6">{item?.name}</p>
                  <p className="font-base text-sm text-left pb-4">{item?.description}</p>
                  {/* <pre>{JSON.stringify(item?.evaluationObjectives?.items, null, 2)}</pre> */}
                  { Array.isArray(item?.evaluationObjectives?.items) && 
                    item?.evaluationObjectives?.items.map((objective: any, i: number) => {
                      return <>
                        {/* <pre>{JSON.stringify(objective, null, 2)}</pre> */}
                        <div className="flex items-center px-5 py-3.5">
                          <div>
                            <div className="relative w-5 h-5">
                              <FormCheck.Input
                                type="checkbox"
                                value={objective?.isMandatory && "checked"}
                                checked={objective?.isMandatory}
                                className="absolute z-10 w-full h-full opacity-0 peer"
                              />
                                {objective?.isMandatory && 
                                  <div className="absolute inset-0 flex text-white shadow-sm items-center justify-center w-[8] h-[8] m-auto  transition-all border rounded opacity-0 bg-primary/60 border-primary/50 peer-checked:opacity-100">
                                    <Lucide
                                      icon="Check"
                                      className="stroke-[1.5] w-3 h-3"
                                      />
                                  </div>
                                }
                                {objective?.isMandatory === false && 
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
                  })
                  }
                </Table.Td>
                
                <Table.Td className=" py-4 border-dashed w-56">
                  <p className="uppercase font-thin text-sm text-center rounded-lg border px-2 py-2 bg-slate-50">{item?.startingAge} a {item?.endingAge} años</p>
                </Table.Td>
       
                
              
              </Table.Tr>
            )})}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}

function Main() {
  const {evaluationLevels, status} = useAppSelector(selectEvaluations);
  
  const dispatch = useAppDispatch();
  

  
  useEffect(() => { 
    (async () => await dispatch(getEvaluationLevel({})) )(); 
    // (async () => await dispatch(getLocationsOnly()) )(); 
  }, []);
  
  
  return (
    <>
     <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div className="flex justify-between w-full flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
              <h2 className="text-base font-medium group-[.mode--light]:text-white">Listados de evaluaciones</h2>

              
            </div>
         
        </div>
        <div className="flex flex-col gap-8 mt-3.5">
            {/* <pre>{JSON.stringify(enrollments, null, 2)}</pre> */}
          <div className="flex flex-col box min-h-screen">
        
            
                { status === "loading" && <div className="flex justify-center"><div className="w-16 h-16"><LoadingIcon
                  color="#AE5EAB"
                  icon="oval"
                  className="w-10 h-10 mt-10"
                /></div></div>}
                
                { status === "idle" && <Content evaluations={evaluationLevels}/>}
                
            <div className="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row"> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Main;
