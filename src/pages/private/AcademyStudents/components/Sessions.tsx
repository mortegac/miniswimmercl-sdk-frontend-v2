import React, { useState, useEffect, useId } from "react";
import { format, tzDate } from '@formkit/tempo';

const timeZone = "America/Santiago";

import LoadingIcon from "@/components/Base/LoadingIcon";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import {formatCurrency} from "../../../../utils/helper";
import { FormatDateSession } from "../../../../utils/dateHandler";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getSessionDetails, selectSessionDetails, setSessionDetails } from "@/stores/SessionDetails/slice";
import { InputOptions } from "@/stores/SessionDetails/types";



function SessionsComponent(props: any) {
  const { studentId, statusSessions } = props;
  const {sessionDetails, status } = useAppSelector(selectSessionDetails);
  const dispatch = useAppDispatch();
  
  
  async function updateSession(params:InputOptions){
    
    await Promise.all([
      await dispatch(setSessionDetails({ sessionId: params.sessionId, status: params.status, })),
      await dispatch(getSessionDetails({ studentId: studentId, status: String(statusSessions)}))
    ]);
    
   
  }
  useEffect(() => { (async () => await dispatch(getSessionDetails({ 
    studentId: studentId,
    status: String(statusSessions)
  })))(); }, [studentId]);
  
  return (
 <>
    { status === "loading" &&   <div className="flex justify-center items-center w-full h-10"><LoadingIcon
      color="#AE5EAB"
      icon="oval"
      className="w-10 h-10 mt-10"
      /></div>}
      
    { status === "idle" &&   <div className="overflow-y-auto h-48">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Sesión
              </Table.Td>
              <Table.Td className=" py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Fecha
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Estado
              </Table.Td>
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Pago
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Pack
              </Table.Td>
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
             
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
      { Array.isArray(sessionDetails) &&
        sessionDetails.map((item: any, i: number) => {
          // let fechaIso8601 =item.date;
          // fechaIso8601 =fechaIso8601.replace(/\D/g, ' ');          
          // let componentsdate:any = fechaIso8601.split(' ');    
          // const dateSession = new Date(`${componentsdate[0]}/${componentsdate[1]}/${componentsdate[2]} 00:00:00`);
          // const fechaConZona = tzDate(dateSession.toISOString(), "America/Santiago");
          // const fechaFormateada = format(fechaConZona, "ddd, DD-MMM", "es");
          

          return(
              <Table.Tr key={`aa-${i}`} className={`[&_td]:last:border-b-0 ${item.status==="USED" && "bg-red-50"} ${item.status==="RECOVERED" && "bg-green-50"}  `}>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                {item.sessionNumber}
                </Table.Td>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                <div className="uppercase whitespace-nowrap inline-block">
                  <span>{FormatDateSession(item.date)}</span>
                  {/* <span>{fechaFormateada}</span> */}
                </div>

                </Table.Td>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                {item.status}
                </Table.Td>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                ${formatCurrency(item.proratedValue)}
                </Table.Td>
                <Table.Td className="  py-4 border-dashed dark:bg-darkmode-600">
                {item.totalSessions}
                </Table.Td>
                <Table.Td className="relative py-4 border-dashed dark:bg-darkmode-600">
                  <div className="flex items-center justify-center">
                    {item.status==="ACTIVE" &&
                      <Button variant="soft-danger" rounded className="" 
                      onClick={() => updateSession({
                        sessionId: item.id,
                        status: "USED",
                      })}
                      >USAR</Button>
                     }
                    {item.status==="RECOVERED" &&
                      <Button variant="soft-danger" rounded className=""
                      onClick={() => updateSession({
                        sessionId: item.id,
                        status: "USED",
                      })}
                      >USAR</Button>
                     }
                     {item.status==="USED" && 
                      <Button variant="soft-primary" rounded className=""
                      onClick={() => updateSession({
                        sessionId: item.id,
                        status: "RECOVERED",
                      })}
                      >RECUPERAR</Button>
                      }
                  </div>
                </Table.Td>
              </Table.Tr>
              )
          }
        )}
        </Table.Tbody>
      </Table>
    </div>
  }
  </>
  

  );
}

export const Sessions = React.memo(SessionsComponent);
