import { useEffect } from "react";

import Table from "@/components/Base/Table";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

import { formatCurrency } from "@/utils/moneyHandler";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectShoppingCartDetails, getShoppingCartDetail, setShoppingCartDetail, removeShoppingCartDetail } from "@/stores/ShoppingCartDetail/slice";



function Content(props: any) {
    const { detail, onShoppingCartId } = props;
    
    
    // function handlerRemoveDetail(payload:any){
    //   const { detailId, detailType } = payload;
      
    //   // Eliminar detalle carro 
    //   removeShoppingCartDetail(detailId)
      
    //   // Actualziar carro
    // }
    return(
        <>
        {/* <pre>{JSON.stringify(detail, null, 2 )}</pre> */}
        {detail?.wasDeleted === true  ? 
          <Table.Tr key={""} className="w-full">
            
            <Table.Td className="w-8 py-4 border-dashed " colSpan={6}>
             <p className="bg-red-50 w-full flex flex-row p-4 text-slate-400 line-through">
              <span className="flex items-center justify-center">
              {detail?.detail}
              </span>
              <span className="text-center w-full block">
                {`$ ${formatCurrency(detail?.amount)}`}
              </span>
              </p> 
              
            </Table.Td>
         </Table.Tr> 
         
         :
         <Table.Tr key={""} className="[&_td]:last:border-b-0 w-full">
                    <Table.Td className="w-8 py-4 border-dashed">
                    <span className="flex items-center justify-center">
                        {detail?.quantity}
                    </span>
                    </Table.Td>
                    <Table.Td className="w-80 py-4 border-dashed">
                    <div className="flex items-start justify-start text-slate-400">
                    {typeOfDetail[detail?.type]}
                    </div>
                    <div className="flex items-center justify-start">
                    {detail?.detail}
                    </div>
                    </Table.Td>
                    <Table.Td className="w-36 py-4 text-center border-dashed">
                    <span className="text-center w-full block">
                    {`$ ${formatCurrency(detail?.amount)}`}
                    </span>
                    </Table.Td>
                    <Table.Td className="w-52 py-4 border-dashed">
                    <span className="flex items-start justify-start">
                    {`${detail?.enrollment?.student?.name || ""} ${detail?.enrollment?.student?.lastName || ""}`}
                    </span>
                    </Table.Td>
                    <Table.Td className="w-2 py-4 border-dashed">
                    
                    {/* <pre>{JSON.stringify(detail?.wasDeleted, null, 2 )}</pre> */}
                    { detail?.type !== "ENROLLMENTS" && 
                      <Button
                          rounded
                          className="border border-red-400 hover:bg-red-100 w-10 h-10 p-1"
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            onShoppingCartId({ 
                              shoppingDetailCartId: detail.id
                              // detailType: detail.type 
                            })
                          }}
                        >
                          <Lucide
                            icon="X"
                            className="w-10 h-10  text-red-400"
                          />{" "}
                        </Button>
                    }
                      
                      
                    </Table.Td>
            </Table.Tr>
        }
        </>
    )
}



const typeOfDetail: any = {
  ["ENROLLMENTS"]: "INSCRIPCION",
  ["PRODUCT"]: "PRODUCTO",
  [""]: "-",
};

export function CartDetail(props: any) {
    
    const {cartId} = props;
    const {status,  shoppingCartDetails} = useAppSelector(selectShoppingCartDetails);
    const dispatch = useAppDispatch();

    const total =
    Array.isArray(shoppingCartDetails) &&
    shoppingCartDetails?.reduce((sum: number, item: any) => sum + item.amount, 0);

      
   async function generateDisscount(payload: any){
    // const {type, amount, detail, shoppingCart } = payload
    Promise.all([
      await dispatch(setShoppingCartDetail({ ...payload})),
      await dispatch(getShoppingCartDetail({cartId: cartId}))
    ])
   }
      
   async function removeDetail(payload: any){
    // const {type, amount, detail, shoppingCart } = payload
    
    // console.log("--payload--", payload)
    Promise.all([
      await dispatch(removeShoppingCartDetail({...payload})),
      await dispatch(getShoppingCartDetail({cartId: cartId}))
    ])
   }
    
  useEffect(() => { 
    (async () => await dispatch(getShoppingCartDetail({cartId: cartId})) )(); 
  }, []);
  
    return(
      <>
        <div className="overflow-auto xl:overflow-visible">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
            <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Cantidad
              </Table.Td>
              <Table.Td className=" text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Detalle
              </Table.Td>
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Monto
              </Table.Td>
              {/* <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Tipo
              </Table.Td> */}
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Detalle
              </Table.Td>
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                
              </Table.Td>
              
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            { status === "loading" && <div className="flex justify-center">
                <div className="w-16 h-16"><LoadingIcon
                    color="#AE5EAB"
                    icon="oval"
                    className="w-10 h-10 mt-10"/>
            </div></div>}
                
            {  status === "idle" && 
                Array.isArray(shoppingCartDetails) && shoppingCartDetails.map((item:any, index) =>
                    <Content 
                        key={index}
                        detail={item} 
                        shoppingCartId={cartId}
                        onShoppingCartId={removeDetail}
                    />
                )
            }
          </Table.Tbody>
        </Table>
        </div>
        <div className="pt-14 flex justify-between">
          <span className="text-primary">Total</span>
          <span className="text-primary text-xl">$ {formatCurrency(Number(total))}</span>
        </div>
        <div className=" -mx-4 mt-6 pt-4  border-t-dashed border-t-4 flex flex-col">
          <p className="text-[.7rem]">Descuentos disponibles</p>
        
          <div className="flex flex-row flex-wrap mt-1">
            <Button 
              onClick={()=>
                generateDisscount({ 
                  type:"COURSE_REGISTRATION", 
                  amount:30000, 
                  detail:"Matricula",  
                  shoppingCartId:cartId 
                })}  variant="soft-pending" className="mr-2 mb-2 flex flex-col justify-start items-start"><span className="text-[.9rem] mr-2 text-green-600">$ {formatCurrency(Number(30000))}</span><span className="text-[.7rem]">Matricula</span>
            </Button>
                <Button 
                  onClick={()=>
                    generateDisscount({ 
                      type:"DISCOUNT", 
                      amount:-1 * Number(Math.round(Number(total) * 0.10)), 
                      detail:"Descuento",  
                      shoppingCartId:cartId 
                    })}  variant="soft-secondary" className="mr-2 mb-2 flex flex-col justify-start items-start"><span className="text-[.9rem] mr-2 text-green-600">$ {formatCurrency(Number(Math.round(Number(total) * 0.10)))}</span><span className="text-[.7rem]">Descuento 10%</span>
                </Button>
            <Button 
              onClick={()=>
                generateDisscount({ 
                  type:"DISCOUNT", 
                  amount:-1 * Number(Math.round(Number(total) * 0.20)), 
                  detail:"Descuento",  
                  shoppingCartId:cartId 
                })}  variant="soft-secondary" className="mr-2 mb-2 flex flex-col justify-start items-start"><span className="text-[.9rem] mr-2 text-green-600">$ {formatCurrency(Number(Math.round(Number(total) * 0.20)))}</span><span className="text-[.7rem]">Descuento 20%</span>
            </Button>
            <Button 
              onClick={()=>
                generateDisscount({ 
                  type:"DISCOUNT", 
                  amount:-1 * Number(Math.round(Number(total) * 0.30)), 
                  detail:"Descuento",  
                  shoppingCartId:cartId 
                })}  variant="soft-secondary" className="mr-2 mb-2 flex flex-col justify-start items-start"><span className="text-[.9rem] mr-2 text-green-600">$ {formatCurrency(Number(Math.round(Number(total) * 0.30)))}</span><span className="text-[.7rem]">Descuento 30%</span>
            </Button>
            {/* <Button 
              onClick={()=>
                generateDisscount({ 
                  type:"DISCOUNT", 
                  amount:-1 * Number(16800), 
                  detail:"Descuento pack",  
                  shoppingCartId:cartId 
                })}  variant="soft-secondary" className="mr-2 mb-2 flex flex-col justify-start items-start"><span className="text-[.9rem] mr-2 text-green-600">$ 16.800</span><span className="text-[.7rem]">Pack 8 Sesiones</span></Button> */}
            <Button 
              onClick={()=>
                generateDisscount({ 
                  type:"DISCOUNT", 
                  amount:-1 * Number(20000), 
                  detail:"Descuento pack Premium", 
                  shoppingCartId:cartId 
                })}  variant="soft-secondary" className="mr-2 mb-2 flex flex-col justify-start items-start"><span className="text-[.9rem] mr-2 text-green-600">$ 20.000</span><span className="text-[.7rem]">Descuento Pack 8 Sesiones</span>
            </Button>
          </div>
        </div>
        <div className=" -mx-4 mt-6 pt-4  border-t-dashed border-t-4 flex flex-col">
          <p className="text-[.7rem]">Cargos adicionales</p>
        
          <div className="flex flex-row flex-wrap mt-1">
            <Button 
              onClick={()=>
                generateDisscount({ 
                  type:"SERVICES", 
                  amount:50000, 
                  detail:"Uso de Pista Personalizado",  
                  shoppingCartId:cartId 
                })}  variant="soft-primary" className="mr-2 mb-2 flex flex-col justify-start items-start"><span className="text-[.9rem] mr-2 text-green-600">$ {formatCurrency(Number(50000))}</span><span className="text-[.7rem] text-slate-500">Uso de pista Personalizado</span>
            </Button>
               
          </div>
        </div>
      </>
    )
}