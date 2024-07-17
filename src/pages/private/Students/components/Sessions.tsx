import React, { useState, useEffect, useId } from "react";
// import { Link } from "react-router-dom";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import {formatCurrency} from "../../../../utils/helper";
import { FormatDate } from "../../../../utils/dateHandler";
import { Menu, Popover } from "@/components/Base/Headless";
import { Student } from '../../../../stores/Students/types';
import { useAppSelector, useAppDispatch } from "../../../../stores/hooks";
import { getSessionDetails, selectSessionDetails } from "../../../../stores/SessionDetails/slice";




function SessionsComponent(props: any) {
  const { studentId } = props;
  const {sessionDetails, status } = useAppSelector(selectSessionDetails);
  const dispatch = useAppDispatch();
  
  
  useEffect(() => { (async () => await dispatch(getSessionDetails({ 
    studentId: studentId,
    status: "ACTIVE"
  })))(); }, [studentId]);
  
  return (
    // <div className="flex flex-col" key={studentId}>
      
      <div className="overflow-y-auto  h-48">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              Pack
              </Table.Td>
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
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
             
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
          {/* <div className="overflow-y-auto h-52"> */}
      { Array.isArray(sessionDetails) &&
        sessionDetails.map((item: any, i: number) => 
        // <div className="bg-slate-50">
        //   <h2 key={item.id} className="mt-2 font-thin"><b className="">{item.sessionNumber}</b> {item.month}/{item.year} </h2>
        // </div>
            
            
              <Table.Tr key={"aa"} className="[&_td]:last:border-b-0">
                
                <Table.Td className="w-16  py-4 border-dashed dark:bg-darkmode-600">
                {item.totalSessions}
                </Table.Td>
                <Table.Td className="w-16 py-4 border-dashed dark:bg-darkmode-600">
                {item.sessionNumber}
                </Table.Td>
                <Table.Td className="w-96 py-4 border-dashed dark:bg-darkmode-600">
                <div className="uppercase whitespace-nowrap inline-block">
                {FormatDate({
                      date: item.date,
                      options: { month: "short", day: "numeric"},
                    })
                }
                </div>

                </Table.Td>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                {item.status}
                </Table.Td>
                <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                ${formatCurrency(item.proratedValue)}
                </Table.Td>
                <Table.Td className="relative py-4 border-dashed dark:bg-darkmode-600">
                  <div className="flex items-center justify-center">
                    <Menu className="h-5">
                      <Menu.Button className="w-5 h-5 text-slate-500">
                        <Lucide
                          icon="MoreVertical"
                          className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                        />
                      </Menu.Button>
                      <Menu.Items className="w-40">
                        <Menu.Item>
                          <Lucide
                            icon="CheckSquare"
                            className="w-4 h-4 mr-2"
                          />{" "}
                          Edit
                        </Menu.Item>
                        <Menu.Item className="text-danger">
                          <Lucide
                            icon="Trash2"
                            className="w-4 h-4 mr-2"
                          />
                          Delete
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </Table.Td>
              </Table.Tr>
          
        )}
    {/* </div> */}
        
        </Table.Tbody>
      </Table>
    </div>
    // </div>
  );
}

export const Sessions = React.memo(SessionsComponent);
