import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import debounce from 'lodash/debounce';
import Toastify from "toastify-js";

import {formatCurrency} from "../../../utils/helper";

import Notification from "@/components/Base/Notification";
import Alert from "@/components/Base/Alert";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { Slideover } from "@/components/Base/Headless";
import { Menu, Popover } from "@/components/Base/Headless"
import {FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';




import { getPaymentTransactions, selectPaymentTransactions } from "@/stores/PaymentTransactions/slice";
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { setEmailSend, selectEmailSend, cleanSentVar } from "@/stores/EmailsSent/slice";
import { Location } from "@/stores/Locations/types";

import { CartDetail} from "./components/cartDetail"; 

// import {
//   // formatCurrency,
//   // monthsDate,
//   calculateCurrentDate,
// } from "../../../utils/helper";
// const currentYear = calculateCurrentDate().year;
// const currentMonth = calculateCurrentDate().month;

const typeOfName:any = {
  ["CREATE"]: "CREADA",
  ["AUTHORIZED"]: "PAGADA",
  // ["AUTHORIZED"]: "AUTORIZADA",
  ["INITIALIZED"]: "INICIALIZADA",
  [""]: "-",
};

function Content(props: any) {
  const [cartId, setCartId] = useState("");
  const [switcherSlideover, setSwitcherSlideover] = useState(false);
const {paymentTransactions} = props;
  return (
    <>
    <Slideover
        size="lg"
        key="Slide-Historial"
        open={switcherSlideover}
        onClose={() => {
          setSwitcherSlideover(false);
        }}
      >
        <Slideover.Panel className="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a
            href=""
            className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              setSwitcherSlideover(false);
            }}
          >
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0">
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-8">
                <div className="text-base font-medium">Detalle del Carro de compras</div>
                <div className="text-slate-500 mt-0.5  mb-12">
                  Generado
                </div>
                <div className="overflow-auto xl:overflow-visible">
                  <CartDetail cartId={cartId}/>
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
    </Slideover>
      <div className="overflow-auto xl:overflow-visible">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              {/* <Table.Td className="w-5 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
              </Table.Td> */}
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Orden
              </Table.Td>
              <Table.Td className=" py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Estado
              </Table.Td>
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Glosa
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Monto
              </Table.Td>
              <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Cliente
              </Table.Td>
              <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Fecha
              </Table.Td>
              <Table.Td className="py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {/* <pre>{JSON.stringify(paymentTransactions, null, 2)}</pre> */}
            {Array.isArray(paymentTransactions) && paymentTransactions.map((item:any, index) => {
             
              return (
              <Table.Tr key={index} className="[&_td]:last:border-b-0">
                <Table.Td className=" py-4 border-dashed">
                  <div className="flex items-center">
                    <div className="text-lg">
                      {item?.buy_order}
                    </div>
                  </div>
                </Table.Td>
                <Table.Td className=" py-4 border-dashed">
                  <div className={`flex justify-center items-center text-xs border rounded-full px-2 py-2 
                    ${item?.status === "CREATE" && "text-success bg-success/10 font-thin "}
                    ${item?.status === "AUTHORIZED" && "text-primary border-primary font-black font-dm-sans "}
                    ${item?.status === "INITIALIZED" && "text-gray-600 bg-gray-200 font-thin "}
                    `}>
                    <span className="-mt-px">
                    {typeOfName[item?.status]}
                    </span>
                  </div>
                </Table.Td>
                <Table.Td className=" py-4 border-dashed">
                  <div className="flex items-start justify-start flex-col">
                    <p className="uppercase font-thin text-sm text-center">{item?.glosa}</p>
                  </div>                   
                </Table.Td>
                
                <Table.Td className=" py-4 border-dashed">
                  <div className="flex items-center justify-center flex-col">
                    <p className="uppercase font-thin text-sm text-center">$ {formatCurrency(item?.amount)}</p>
                  </div>                   
                </Table.Td>
                <Table.Td className=" py-4 border-dashed">
                  <div className="flex items-start justify-start flex-col">
                    <p className="uppercase font-thin text-sm text-left">{item?.usersPaymentTransactionsId}</p>
                  </div>                   
                </Table.Td>
                <Table.Td className=" py-4 border-dashed">
                  <div className="flex items-start justify-start flex-col">
                    <p className="uppercase font-thin text-sm text-left">{item?.day}-{item?.month}-{item?.year}</p>
                  </div>                   
                </Table.Td>
                <Table.Td className=" py-4 border-dashed">
                              
                <Button
                    rounded
                    // variant="primary"
                    className="px-2 py-2 border border-primary hover:bg-purple-100"
                    // onClick={() => setFlag(!flag)}
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault();
                      setCartId(item?.shoppingCartPaymentTransactionsId)
                      setSwitcherSlideover(true);
                    }}
                  >
                    <Lucide icon="ShoppingCart" className="w-10 h-10 p-2 text-primary" />{" "}
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

function Main() {
  const {paymentTransactions, status} = useAppSelector(selectPaymentTransactions);
  const {locations} = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  dispatch(setBreadcrumb({first:"Transacciones Webpay", firstURL:"transactions"}));

  
  
  useEffect(() => { 
    (async () => await dispatch(getPaymentTransactions({})) )(); 
    // (async () => await dispatch(getLocationsOnly()) )(); 
  }, []);
  
  
  return (
    <>
     <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Transacciones Webpay
          </div>
          {/* <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button
            variant="primary"
            className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            >
            <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />{" "}
            Nueva inscripción
            </Button>
            </div> */}
        </div>
        <div className="flex flex-col gap-8 mt-3.5">
            {/* <pre>{JSON.stringify(enrollments, null, 2)}</pre> */}
          <div className="flex flex-col box min-h-screen">
           <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
              <div>
                {/* <div className="relative">
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                  />
                   <FormInput
                      formInputSize="lg"
                      placeholder="Buscar alumnos..."
                      aria-label="name" 
                      aria-describedby="input-group-name"
                      type="text"
                      tabIndex={1} 
                      // className="bg-white/[0.12] text-white w-[350px] flex items-center py-2 px-3.5 border-transparent  cursor-pointer hover:bg-white/[0.15] transition-colors duration-300 hover:duration-100 focus:z-10"
                      className="pl-9 sm:w-64 rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                      name="guardianEmail"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                </div> */}
              </div>
              {/* </div> */}
               
              <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                <Popover className="inline-block">
                  {({ close }) => (
                    <>
                      <Popover.Button
                        as={Button}
                        variant="outline-secondary"
                        className="w-full sm:w-auto"
                      >
                        <Lucide
                          icon="ArrowDownWideNarrow"
                          className="stroke-[1.3] w-4 h-4 mr-2"
                        />
                        Filtros
                        
                      </Popover.Button>
                      <Popover.Panel placement="bottom-end">
                        <div className="p-2">
                          <div>
                            <div className="text-left text-slate-500">
                              Sede
                            </div>
                            <FormSelect className="flex-1 mt-2">
                            </FormSelect>
                          </div>
                        
                          <div>
                            <div className="text-left text-slate-500 mt-4">
                              Fecha
                            </div>
                            <FormSelect className="flex-1 mt-2">
                            </FormSelect>
                          </div>
                          <div>
                            <div className="text-left text-slate-500 mt-4">
                              Estado
                            </div>
                            <FormSelect id="status" >
                              {/* {categories.fakeCategories().map((faker, fakerKey) => ( */}
                                <option key={"CREATE"} value={"CREATE"}>CREATE</option>
                                <option key={"AUTHORIZED"} value={"AUTHORIZED"}>AUTHORIZED</option>
                                <option key={"INITIALIZED"} value={"INITIALIZED"}>INITIALIZED</option>
                              {/* ))} */}
                            </FormSelect>
                          </div>
                          <div className="flex items-center mt-4">
                            <Button
                              variant="secondary"
                              onClick={() => {
                                close();
                              }}
                              className="w-32 ml-auto"
                            >
                              Close
                            </Button>
                            <Button variant="primary" className="w-32 ml-2">
                              Apply
                            </Button>
                          </div>
                        </div>
                      </Popover.Panel>
                    </>
                  )}
                </Popover>
              </div>
            </div>
            
                { status === "loading" && <div className="flex justify-center"><div className="w-16 h-16"><LoadingIcon
                  color="#AE5EAB"
                  icon="oval"
                  className="w-10 h-10 mt-10"
                /></div></div>}
                
                { status === "idle" && <Content paymentTransactions={paymentTransactions} locations={locations}/>}
                
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
