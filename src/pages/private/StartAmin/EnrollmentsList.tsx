import React, { useEffect, useState, useId } from "react";
import _ from "lodash";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";

import {formatCurrency} from "../../../utils/helper";
import LoadingIcon from "@/components/Base/LoadingIcon";
// import EveCard from "../../../components/Cards/EveCard";

import { useAppSelector, useAppDispatch } from "../../../stores/hooks";
import { getStudents, selectEnrollment } from "../../../stores/Enrollment/slice";

import {typeOfMonth} from "../../../utils/dateHandler";

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
  
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses son 0-indexados
  const year = date.getUTCFullYear();

  return `${day}-${typeOfMonth[month]}`;
}

function Content(props: any) {
  const { enrollments } = props;
  return (
    <>
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
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {/* <pre>{JSON.stringify(paymentTransactions, null, 2)}</pre> */}
            {Array.isArray(enrollments) && enrollments.map((item:any, index) => {
             
              return (
              <Table.Tr key={index} className={`[&_td]:last:border-b-0 ${!item?.wasPaid && "bg-red-50"}  ${item?.wasPaid && "bg-white"}`}>
                <Table.Td className=" py-4 border-dashed w-36">
                  <div className="flex items-center">
                    <div className="w-20 text-sm">
                    {formatDate(item?.startDate)}
                    </div>
                  </div>
                </Table.Td>
                <Table.Td className=" py-4 border-dashed">
                  <div className="flex items-center">
                  <div className={`flex justify-center items-center text-xs border rounded-full px-2 py-2 
                    ${item?.wasPaid && "text-success bg-success/10 font-thin "}
                    ${!item?.wasPaid && "text-gray-600 bg-gray-200 font-thin "}
                    `}>
                    <span className="-mt-px">
                    {/* {String(item?.wasPaid)} */}
                    {item?.wasPaid && "PAGADO" }
                    {!item?.wasPaid && "PENDIENTE" }
                    </span>
                  </div>
                  </div>
                </Table.Td>
               
                <Table.Td className=" py-4 border-dashed">
                    <div className="w-16 font-thin text-sm text-left">{`$ ${formatCurrency(item?.amountPaid)}`}</div>
                </Table.Td>
                
                <Table.Td className=" py-4 border-dashed">
                  <div className="w-52 flex items-start justify-start flex-col">
                    <p className=" uppercase font-dm-sans font-normal text-base text-left">
                    {item?.student?.name} {item?.student?.lastName} </p>
                    
                    {Array.isArray(item?.student?.relationships?.items) && item?.student?.relationships?.items.map((relation:any, i:any) => (
                      <p className=" font-thin text-sm text-left text-slate-10">
                        {/* <pre>{JSON.stringify(relation, null, 2)}</pre> */}
                            <span className=" font-mono">{typeOfRelationship[relation?.relationType]}</span> {" "} {relation?.user?.name} {" "} <p className="mt-1">{relation?.user?.id} {" "} {relation?.user?.contactPhone}</p>
                        </p>
                    ))}
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
                {Array.isArray(item?.sessionDetails?.items) && item?.sessionDetails?.items.map((session:any, i:any) => (
                    <>
                      <div className={` max-w-16 mx-1 my-1 ${session?.status==="ACTIVE"? " bg-green-50":" bg-red-50 border-red-200"} rounded-full text-center px-2`}>
                        { session?.status==="ACTIVE" && <>
                          <small className="">{formatDate(session?.date)}</small>
                        </>
                        }
                        { session?.status==="USED" && <>
                          <small className=" font-mono line-through">{formatDate(session?.date)}</small>
                        </>
                        }
                      </div>
                    </>
                  ))}
                                     
                </Table.Td>
                <Table.Td className=" m-0">
                  <Button
                      rounded
                      className="px-2 py-2 border border-primary hover:bg-purple-100"
                      // onClick={(event: React.MouseEvent) => {
                      //   event.preventDefault();
                      //   setCartId(item?.shoppingCartPaymentTransactionsId)
                      //   setSwitcherSlideover(true);
                      // }}
                    >
                      <Lucide icon="X" className="text-primary" />{" "}
                  </Button>
                 
                </Table.Td>
                
              
              </Table.Tr>
            )})}
          </Table.Tbody>
        </Table>
      </div>
      
    </>
  );
}
function Main(props: any) {
  // const { locationId, month, year, state } = props;
  const { status, enrollments } = useAppSelector(selectEnrollment);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getStudents({ 
  //     month: month,
  //     year: year,
  //     locationId: locationId,
  //   }));
  // }, [props]);

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
      {status === "idle" && <Content enrollments={enrollments} />}
    </>
  );
}

export default Main;
