import React, { useEffect, useState, useId } from "react";
import _ from "lodash";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { timeAgo } from "../../../../utils/helper";
import Lucide from "@/components/Base/Lucide";
// import { Slideover } from "../../../../base-components/Headless";
import Table from "@/components/Base/Table";
// import { SupportTicketStatusTicket } from "../../../../stores/graphql/API";

// import Comments from "../../../../components/Cards/SupportTicketsCard/components/comments";
import Button from "@/components/Base/Button";
import { useAppSelector, useAppDispatch } from "../../../../stores/hooks";

import {
  selectSupportTickets,
  getSupportTickets,
  setStatusTickets,
} from "../../../../stores/SupportTicket/slice";

function Content(props: any) {
  const [slideNew, setSlideNew] = useState(false);
  const [dataTicket, setDataTicket] = useState({
    supportTicketId: "",
    employeeId: "",
    email: "",
    statusTicket: "",
    level: "",
    name: "",
    description: "",
    phoneNumber: "",
    eveId: "",
    updatedAt: "",
    TicketComments: [],
  });
  const { tickets } = props;
  const dispatch = useAppDispatch();

  // const closeTicket = async (ticketId: string, status: string) => {
  //   await Promise.all([
  //     await dispatch(
  //       setStatusTickets({
  //         supportTicketId: ticketId,
  //         statusTicket: status,
  //       })
  //     ),
  //     await dispatch(getSupportTickets({ onlyValidTickets: true })),
  //     setSlideNew(false),
  //   ]);
  // };

  return (
    <>
      {/* {Array.isArray(tickets) && tickets.length === 0 && (
        <div className="w-screen bg-pink-300">
          <span>👻 Sin registros en esta residencia</span>
        </div>
      )} */}
      {/* <pre>{JSON.stringify(tickets, null, 2)}</pre> */}
      {/* <div className="overflow-x-scroll h-96 min-w-full"> */}
      {Array.isArray(tickets) &&
        tickets.map((item, i) => (
          <Table.Tr
            key={`Tickets-${i}`}
            className={`[&_td]:last:border-b-0 bg-white ${dataTicket?.supportTicketId === item?.supportTicketId && "bg-yellow-100/35"}`}
          >
            <Table.Td className=" py-4 border-dashed">
              {/* <div className="flex items-center">
                <span className=" block font-thin text-sm">Actualización:</span>
                <br />{" "}
                <span className=" font-normal text-sm">
                  {timeAgo(String(item?.updatedAt))}
                </span>
              </div> */}
              <p className=" font-normal text-sm text-left">
                {timeAgo(String(item?.createdAt))}
              </p>
              <p className="uppercase text-slate-500 rounded-md w-full text-left p-2">
                {item?.statusTicket}
              </p>
            </Table.Td>
            <Table.Td className="py-4 border-dashed">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-between flex-col">
                  <span className="w-full text-center text-2xl">
                    {item?.TicketComments?.items?.length}
                  </span>
                  <span className="text-center text-slate-500">respuestas</span>
                </div>
              </div>
            </Table.Td>
            <Table.Td className="py-4 border-dashed">
              <div className="flex items-start flex-col">
                <h2 className="text-base font-medium intro-y">{item.name}</h2>
                <div className="text-sm">{item?.description}</div>
              </div>
            </Table.Td>
            
          </Table.Tr>
        ))}
    </>
  );
}
function Main(props: any) {
  const { items, status } = useAppSelector(selectSupportTickets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getSupportTickets({ onlyValidTickets: true, email: props?.email })
    );
  }, []);

  return (
    <>
      <div className="w-full mb-10">
        <div className="overflow-auto h-96">
          <Table className="border-b border-slate-200/60">
            <Table.Thead>
              <Table.Tr>
                <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                  Fecha
                </Table.Td>
                {/* <Table.Td className=" py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                  Estado
                </Table.Td> */}
                {/* <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                  Usuario
                </Table.Td> */}
                <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                  Respuestas
                </Table.Td>
                <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                  Detalle
                </Table.Td>
                {/* <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500"></Table.Td> */}
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {status === "loading" && (
                <div className="flex justify-center items-center text-center py-20 mx-auto">
                  <div className="w-16 h-16">
                    <LoadingIcon
                      color="#AE5EAB"
                      icon="puff"
                      className="w-10 h-10 mt-10"
                    />
                  </div>
                </div>
              )}
              {status === "idle" && <Content tickets={items} />}
            </Table.Tbody>
          </Table>
          {status === "idle" && Array.isArray(items) && items.length === 0 && (
            <div className=" text-center p-4">
              <span className="text-slate-400">
                👻 Sin Ticket abiertos en esta residencia
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
