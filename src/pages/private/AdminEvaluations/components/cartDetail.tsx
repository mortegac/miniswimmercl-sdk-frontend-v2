import { useEffect } from "react";

import Table from "@/components/Base/Table";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

import { formatCurrency } from "@/utils/moneyHandler";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectShoppingCartDetails, getShoppingCartDetail } from "@/stores/ShoppingCartDetail/slice";



function Content(props: any) {
    const {detail} = props;
    return(
        <>
        {/* <pre>{JSON.stringify(detail, null, 2 )}</pre> */}
            <Table.Tr key={""} className="[&_td]:last:border-b-0 w-full">
                    <Table.Td className="py-4 border-dashed">
                    <div className="flex items-center justify-center">
                        {detail?.quantity}
                    </div>
                    </Table.Td>
                    <Table.Td className="w-60 py-4 border-dashed">
                    <div className="flex items-center justify-start">
                    {detail?.detail}
                    </div>
                    </Table.Td>
                    <Table.Td className="py-4 border-dashed">
                    <div className="flex items-center justify-center">
                    {detail?.amount}
                    </div>
                    </Table.Td>
                    <Table.Td className="w-52 py-4 border-dashed">
                    <div className="flex items-start justify-start">
                    {detail?.type}
                    </div>
                    </Table.Td>
            </Table.Tr>
        </>
    )
}

export function CartDetail(props: any) {
    
    const {cartId} = props;
    const {status,  shoppingCartDetails} = useAppSelector(selectShoppingCartDetails);
    const dispatch = useAppDispatch();

    const total =
    Array.isArray(shoppingCartDetails) &&
    shoppingCartDetails?.reduce((sum: number, item: any) => sum + item.amount, 0);

      
  useEffect(() => { 
    (async () => await dispatch(getShoppingCartDetail({cartId: cartId})) )(); 
  }, []);
  
    return(
      <>
        <div className="overflow-auto xl:overflow-visible">
     
          {/* <pre>{JSON.stringify(shoppingCartDetails, null, 2 )}</pre> */}
                
        {/* <div className="-mt-4 mb-4 flex justify-start">
          <Button
            rounded
            // variant="primary"
            className="px-4 py-2 border border-primary hover:bg-purple-100"
            // onClick={() => setFlag(!flag)}
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              // setCartId(item?.shoppingCartPaymentTransactionsId)
              // setSwitcherSlideover(true);
            }}
          >
            <Lucide icon="ShoppingCart" className="w-10 h-10 p-2 text-primary" />{" "}
            <span className="text-primary">Crear link de pago</span>
        </Button>
        </div> */}
                
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
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Tipo
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
                    <Content detail={item}/>
                )
            }
          </Table.Tbody>
        </Table>
        </div>
        <div className="pt-14 flex justify-between">
          <span className="text-primary">Total</span>
          <span className="text-primary text-xl">$ {formatCurrency(Number(total))}</span>
        </div>
      </>
    )
}