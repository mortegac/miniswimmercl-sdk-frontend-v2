import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import _ from "lodash";
import LoadingIcon from "@/components/Base/LoadingIcon";


import Lucide from "@/components/Base/Lucide";
import {typeOfRelationship} from "@/utils/dictionary";
import {formatDateUTC, formatCurrency} from "@/utils/helper";
import { cleanSentVar } from '@/stores/EmailsSent/slice';


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { setWPStatus} from "@/stores/WP/slice";



import { getPaymentTransactions, selectPaymentTransactions } from "@/stores/PaymentTransactions/slice";
import {
  getShoppingCart,
  selectShoppingCarts,
} from "@/stores/ShoppingCarts/slice";
import Button from "@/components/Base/Button";





export function ResumenTransactions(props:any) {
    
    const {userId } = props;
    
    const { shoppingCarts, status} = useAppSelector(selectShoppingCarts);  
    const {paymentTransactions} = useAppSelector(selectPaymentTransactions);
    const dispatch = useAppDispatch();
    
    
    useEffect(() => { 
        (async () => {
          userId && await dispatch(getShoppingCart({ userId: userId || "", status:"PENDING"}))
        })();
    }, [userId]);
      
    return <>              
      { status === "loading" &&   <div className="flex justify-center items-center w-full h-10">
        <LoadingIcon
          color="#AE5EAB"
          icon="three-dots"
          className="w-10 h-10 mt-10"
        />
              </div>}
      { status === "idle" &&
        <div className="">
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
                key={index}
              >
                  <div className="flex flex-row justify-start items-center">
                      <span
                          className={clsx([
                              " text-center font-medium rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                              "bg-slate-700 text-white",
                              "w-36",
                          ])}
                          >
                          {/* <span className="w-1.5 h-2 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span> */}
                          <span className="-mt-px">
                          {formatDateUTC(item?.createdAt)}
                          </span>
                      </span>
                      <span
                          className={clsx([
                              "font-medium text-center rounded-md sm:ml-2 border px-0.5 py-1 mr-auto sm:mr-0",
                              // "bg-slate-700 text-white",
                              item?.status && "text-success bg-success/10 font-thin ",
                              !item?.wasPaid && "text-black bg-red-300 font-semibold ",
                              "w-32",
                          ])}
                          >
                          {/* <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span> */}
                          <span className="-mt-px">
                          {item?.status}
                          </span>
                      </span>
                      
                  </div>
                  
                  
                <div
                  className="px-2 py-3"
                >                
                  {/* <div className="mt-1.5 text-xs text-slate-500">
                    <p>
                      <span className="mr-4"> {item?.usersShoppingCartId}</span>
                    </p>
                  </div> */}
                  <div className="">
                    {Array.isArray(item?.cartDetails?.items) && item?.cartDetails?.items.map((detail:any, i:number)=>{
                      
                      total = total + detail?.amount;
                      return (
                        <div key={i} className="mt-2 pb-2 border-b">
                          <p>
                          <span className="mr-4">{"$ "}{formatCurrency(detail?.amount)}</span>
                          <span className="mr-4 font-thin"> {`${detail?.enrollment?.student?.name || ""} ${detail?.enrollment?.student?.lastName || ""}`}</span>
                            
                          </p>
                          <p>
                          <span className="mr-4 font-thin text-[0.65rem]"> {detail?.detail}</span>
                            
                          </p>
                          
                          
        
                        </div>
                      );
                    })}
                  </div>
                  
                  <p className="mr-4 mt-2 text-right">
                    <span className="">Total {"$ "}{formatCurrency(total)}</span>
                  </p>
                  {/* <div className=" -mx-4 mt-6 pt-4  border-t-dashed border-t-4 ">
                    <p className="text-[.7rem]">Descuentos disponibles</p>
                    <Button variant="soft-secondary" className="mr-2 mb-2"><span className="text-[.9rem] mr-2">10%</span><span className="text-[.7rem]">Hermanos</span></Button>
                    <Button variant="soft-secondary" className="mr-2 mb-2"><span className="text-[.9rem] mr-2">$ 16.800</span><span className="text-[.7rem]">Pack 8 Sesiones</span></Button>
                    <Button variant="soft-secondary" className="mr-2 mb-2"><span className="text-[.9rem] mr-2">$ 20.000</span><span className="text-[.7rem]">Pack 8 Sesiones Premium</span></Button>
                  </div> */}
                  
                  
                  
                
                  
                </div>
              </div>     
              </>
          })}
          
        </div>
      }
    </>
  }