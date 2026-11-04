import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import _ from "lodash";
import * as jose from "jose";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { Link } from "react-router-dom";

const JWT_SECRET = new TextEncoder().encode("tu_clave_secreta_super_segura_min_32_caracteres");

function PaymentLinkButton({ cartId }: { cartId: string }) {
  const [paymentUrl, setPaymentUrl] = useState("");
  useEffect(() => {
    new jose.SignJWT({ sub: cartId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(JWT_SECRET)
      .then(jwt => setPaymentUrl(`https://pagos.miniswimmer.cl/${jwt}`));
  }, [cartId]);

  if (!paymentUrl) return <div className="w-full" />;
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={paymentUrl}
      className="flex flex-col items-center justify-center border border-primary px-4 py-4 w-full rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors gap-2"
    >
      <div className="flex items-center justify-center w-8 h-8 overflow-hidden border rounded-lg border-theme-1/10 box bg-theme-1/10">
        <Lucide icon="ExternalLink" className="w-4 h-4 stroke-[1.3] text-theme-1" />
      </div>
      <p className="font-medium text-sm">Ir a pagar</p>
    </a>
  );
}


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
          color="#7E4996"
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
                  {/* <pre>{JSON.stringify(item?.id, null, 2 )}</pre> */}
                  
                  <div className="flex flex-row gap-3 mt-4">
                    <PaymentLinkButton cartId={item?.id} />
                    <Link
                      to="/shopping-cart"
                      state={{ shoppingCartId: item?.id }}
                      className="flex flex-col items-center justify-center border border-primary px-4 py-4 w-full rounded-2xl bg-primary/15 hover:bg-primary/25 transition-colors gap-2"
                    >
                      <div className="flex items-center justify-center w-8 h-8 overflow-hidden border rounded-lg border-theme-1/10 box bg-theme-1/10">
                        <Lucide icon="DollarSign" className="w-4 h-4 stroke-[1.3] text-theme-1" />
                      </div>
                      <p className="font-medium text-sm">Ir al carro</p>
                    </Link>
                  </div>
                  
                
                  
                </div>
              </div>     
              </>
          })}
          
          
          
          
        </div>
      }
    </>
  }