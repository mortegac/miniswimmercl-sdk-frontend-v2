import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import _ from "lodash";


import Toastify from "toastify-js";
import Notification from "@/components/Base/Notification";




import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import {typeOfRelationship} from "@/utils/dictionary";
import {formatDateUTC, formatCurrency} from "@/utils/helper";
import { cleanSentVar } from '@/stores/EmailsSent/slice';


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { setWPStatus} from "@/stores/WP/slice";



import { getPaymentTransactions, selectPaymentTransactions } from "@/stores/PaymentTransactions/slice";
import { updateEnrollmentPay } from "@/stores/Enrollment/slice";
import {
  getShoppingCart,
  selectShoppingCarts,
  updatePayment,
} from "@/stores/ShoppingCarts/slice";
import { selectAuth } from "@/stores/Users/slice";
import { getStudent } from "@/stores/Students/slice";



export function ResumenTransactions(props:any) {
    
    const {data, studentId, fnUpdateState } = props;
    
    const { emailAuth } = useAppSelector(selectAuth);
    const { shoppingCarts} = useAppSelector(selectShoppingCarts);  
    const {paymentTransactions} = useAppSelector(selectPaymentTransactions);
    
    const dispatch = useAppDispatch();
    
    async function updatePaymente(payload:any){
      
      const {enrollmentId,shoppingCartId} = payload;
      
      Promise.all([
        dispatch(updateEnrollmentPay({
          enrollmentId:enrollmentId, 
          wasPaid:"true"
        })),
        dispatch(updatePayment({
          shoppingCartId:shoppingCartId, 
        })),
        await fnUpdateState(studentId)
      ])
      
      const successEl = document
      .querySelectorAll("#update-payment")[0]
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
    useEffect(() => { 
        (async () => {
            if (Array.isArray(data?.items)) {
                await Promise.all(
                    data.items.map((item: any) => Promise.all([
                        dispatch(getPaymentTransactions({userId: item?.user?.id})),
                        dispatch(getShoppingCart({ userId: item?.user?.id || ""}))
                    ]))
                );
            }
        })();
    }, [data]);
      
    return <>
        <Notification
          id="update-payment"
          className="flex hidden"
        >
          <Lucide icon="CheckCircle" className="text-green-600" />
          <div className="ml-4 mr-4">
            <div className="font-medium">Inscripción y  pago Actualizado</div>
            <div className="mt-1 text-slate-500">
              correctamente
            </div>
          </div>
      </Notification>
    {/* <pre>{JSON.stringify(shoppingCarts, null, 2)}</pre> */}
     <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
                  <div className="col-span-12 xl:col-span-6">
                    <div className="flex flex-col gap-y-7">
                      <div className="flex flex-col p-5 box ">
                        <div className="pb-5 mb-5 font-medium  text-[0.94rem]">
                          Historial de Carros de compras  
                          {emailAuth !== "hi@manuelo.dev" && emailAuth !== "loreto.gonzález.or@gmail.com" &&  <span className="p-2 bg-slate-600 text-white rounded-full text-sm">USUARIO REGULAR</span>}
                          {(emailAuth === "hi@manuelo.dev" || emailAuth === "loreto.gonzález.or@gmail.com") &&  <span className="p-2 bg-red-400 text-white rounded-full text-sm">ADMIN</span>}
                        </div>
                        
                        <div className="-my-3">
                          <div className="relative overflow-hidden before:content-[''] before:absolute before:w-px before:bg-slate-200/60 before:left-0 before:inset-y-0 before:dark:bg-darkmode-400 before:ml-[14px]">
                            { Array.isArray(shoppingCarts) && 
                            [...shoppingCarts]
                            .sort((a:any, b:any) => {
                              const ad = new Date(a.createdAt);
                              const bd = new Date(b.createdAt);
                              return ad > bd ? -1 : ad < bd ? 1 : 0;
                            })
                            .map((item:any, index:number)=>{
                              let total: number = 0;
                                return <>
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
                                    <div className="h-3 w-5 bg-slate-700 ml-2 rounded-full"></div>
                                        <span
                                            className={clsx([
                                                "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                                "bg-slate-700 text-white",
                                                "w-44",
                                            ])}
                                            >
                                            <span className="w-1.5 h-2 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                            <span className="-mt-px">
                                            {formatDateUTC(item?.createdAt)}
                                            </span>
                                        </span>
                                        <span
                                            className={clsx([
                                                "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                                // "bg-slate-700 text-white",
                                                item?.status && "text-success bg-success/10 font-thin ",
                                                !item?.wasPaid && "text-black bg-red-300 font-semibold ",
                                                "w-32",
                                            ])}
                                            >
                                            <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                            <span className="-mt-px">
                                            {item?.status}
                                            {/* {!item?.status && "PENDIENTE"} */}
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
                                    {/* <a
                                      href=""
                                      className="font-medium text-slate-500"
                                    >
                                     {item?.courseEnrollmentsId}
                                    </a> */}
                                    
                                    <div className="mt-1.5 text-xs text-slate-500">
                                      <p>
                                        {/* <span className="mr-4">{"$ "}{formatCurrency(item?.totalPrice)}</span> */}
                                        
                                        <span className="mr-4"> {item?.usersShoppingCartId}</span>
                                      </p>
                                    </div>
                                    <div className="">
                                      {Array.isArray(item?.cartDetails?.items) && item?.cartDetails?.items.map((detail:any, i:number)=>{
                                        
                                        total = total + detail?.amount;
                                        return (
                                          <div key={i} className="mt-4 pb-4 border-b">
                                            
                                            <div className="flex flex-row justify-between">
                                              <p>
                                              <span className="mr-4">{"$ "}{formatCurrency(detail?.amount)}</span>
                                              <span className="mr-4 font-thin"> {`${detail?.enrollment?.student?.name || ""} ${detail?.enrollment?.student?.lastName || ""}`}</span>
                                                
                                              </p>
                                              <p>
                                              <span className="mr-4 font-thin"> {detail?.detail}</span>
                                                
                                              </p>
                                                            
                                              {/* ------------------ */}
                                              {/* <div className="flex flex-end">
                                                <Button
                                                  variant="soft-dark"
                                                  className=""
                                                  onClick={async ()=> {
                                                    // Promise.all([
                                                    //   await dispatch(updateEnrollmentPay({
                                                    //     enrollmentId: detail?.enrollment.id,
                                                    //     wasPaid:true
                                                    //    })),
                                                      
                                                    // ])
                                                     
                                                     
                                                    // carroId = item?.id
                                                    // enrollmentId = detail?.enrollment.id
                                                  }}
                                                >
                                                <Lucide
                                                  icon="DollarSign"
                                                  className="w-4 h-4 stroke-[1.3] text-slate-500"
                                                /></Button>                                                
                                              </div> */}
                                              <div className="flex flex-end -mr-6">
                                          
                                          
                                          {emailAuth === "hi@manuelo.dev" && 
                                          <Button
                                            variant="soft-primary"
                                            // className=""
                                            className="mr-2 flex items-center justify-center w-12 h-12 border rounded-full border-success/10 bg-success/10"
                                            onClick={()=> {
                                              updatePaymente({
                                                enrollmentId: detail?.enrollment?.id,
                                                shoppingCartId: item?.id})
                                            }}
                                          > <Lucide
                                          icon="DollarSign"
                                          className="w-6 h-6 text-success fill-success/10"
                                        /></Button>
                                          }
                                        </div>
                                              {/* ------------------ */}
                                            
                                            </div>
                                            
                                            {/* <pre>carroId = {JSON.stringify(item?.id, null, 2)}</pre>
                                            <pre>enrollmentId = {JSON.stringify(detail?.enrollment?.id, null, 2)}</pre> */}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    
                                    <p className="mr-4 mt-2">
                                      <span className="">Total {"$ "}{formatCurrency(total)}</span>
                                    </p>
                                    
                                   
                                   
                                  
                                   
                                  </div>
                                </div>     
                                </>
                            })}
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 xl:col-span-6">
                    <div className="flex flex-col gap-y-7">
                      <div className="flex flex-col p-5  ">
                        <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                          Historial de Transacciones 
                        </div>
                        <div className="-my-3">
                          <div className="relative overflow-hidden before:content-[''] before:absolute before:w-px before:bg-slate-500/60 before:left-0 before:inset-y-0 before:dark:bg-darkmode-400 before:ml-[14px]">
                            { Array.isArray(paymentTransactions) && 
                            [...paymentTransactions]
                            .sort((a:any, b:any) => {
                              const ad = new Date(a.createdAt);
                              const bd = new Date(b.createdAt);
                              return ad > bd ? -1 : ad < bd ? 1 : 0;
                            })
                            .map((item:any, index:number)=>{
                                
                                return <>
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
                                        <div className="h-3 w-5 bg-slate-700 ml-2 rounded-full"></div>
                                        <span
                                            className={clsx([
                                                "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                                "bg-slate-700 text-white",
                                                "w-44",
                                            ])}
                                            >
                                            <span className="w-1.5 h-2 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                            <span className="-mt-px">
                                            {formatDateUTC(item?.createdAt)}
                                            </span>
                                        </span>
                                        <span
                                            className={clsx([
                                                "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                                                // "bg-slate-700 text-white",
                                                item?.status && "text-success bg-success/10 font-thin ",
                                                !item?.wasPaid && "text-black bg-red-300 font-semibold ",
                                                "w-32",
                                            ])}
                                            >
                                            <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                            <span className="-mt-px">
                                            {item?.status}
                                            {/* {!item?.status && "PENDIENTE"} */}
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
                                    <a
                                      href=""
                                      className="font-medium text-slate-500"
                                    >
                                     {item?.courseEnrollmentsId}
                                    </a>
                                    
                                    <div className="mt-1.5 text-xs text-slate-500">
                                      <p>
                                        <span className="mr-4">{"$ "}{formatCurrency(item?.amount)}</span>
                                        <span className="mr-4">{item?.glosa}</span>
                                        <span className="mr-4">{item?.card_number && "xxxxxx-"} {item?.card_number}</span>
                                        <span className="mr-4 font-thin"> {item?.usersPaymentTransactionsId}</span>
                                      </p>
                                    </div>
                                    
                                   
                                   
                                  
                                   
                                  </div>
                                </div>     
                                </>
                            })}
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="relative col-span-12 row-start-1 xl:col-start-9 xl:col-span-4">
                    <div className="sticky flex flex-col top-[6.2rem] gap-y-7">
  
                      <div className="flex flex-col p-5 box ">
                        <div className="pb-5 mb-5 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                        Resumen
                        </div>
                        <div className="flex flex-col gap-8">
                          <div>
                            <div className="text-xs uppercase text-slate-500">
                              Carros de compra y transacciones
                            </div>
                            <div className="mt-3.5">
                              <div className="flex items-center">
                                <Lucide
                                  icon="Clipboard"
                                  className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                />
                                <span className="w-40">Nombre:</span> {`${data?.name} ${data?.middleName} ${data?.lastName}`}
                              </div>
                              <div className="flex items-center mt-3">
                                <Lucide
                                  icon="Calendar"
                                  className="w-4 h-4 mr-2 stroke-[1.3] text-slate-500"
                                />
                                <span className="w-40">Fecha de Nacimiento:</span>{data?.birthdate}
                              </div>
                              
                              
                              
                             
                             
                            </div>
                          </div>
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
                                    <><Lucide icon="Mail" className=" w-4 h-4 text-success mr-2" /> {relation?.user?.id}</>
                                    </span>
                                    <span className="mt-1 flex flex-row">
                                    { relation?.user?.contactPhone && 
                                    <><Lucide icon="PhoneOutgoing" className=" w-4 h-4 text-success mr-2" /> {relation?.user?.contactPhone}</>
                                    }
                                    { !relation?.user?.contactPhone && 
                                    <><Lucide icon="PhoneOff" className=" w-4 h-4 text-red-500 mr-2" /> {relation?.user?.contactPhone}</>
                                    }
                                    </span>
                                    </p>
                                    </p>    
                                </div>
                            )
                          )}
                          </div>
                       
                        </div>
                      </div>
                    </div>
                  </div> */}
    </div>
    {/* <pre>data= {JSON.stringify(data, null, 2)}</pre> */}
    </>
  }