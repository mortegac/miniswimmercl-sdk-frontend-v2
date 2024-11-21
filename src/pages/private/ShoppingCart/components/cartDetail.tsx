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
                    <Table.Td className="w-8 py-4 border-dashed">
                    <span className="flex items-center justify-center">
                        {detail?.quantity}
                    </span>
                    </Table.Td>
                    <Table.Td className="w-80 py-4 border-dashed">
                    <div className="flex items-start justify-start">
                    {detail?.type}
                    </div>
                    <div className="flex items-center justify-start">
                    {detail?.detail}
                    </div>
                    </Table.Td>
                    <Table.Td className="w-12 py-4 text-center border-dashed">
                    <span className="text-center bg-pink-200 ">
                    $ {formatCurrency(detail?.amount)}
                    </span>
                    </Table.Td>
                    <Table.Td className="w-52 py-4 border-dashed">
                    <span className="flex items-start justify-start">
                    {`${detail?.enrollment?.student?.name || ""} ${detail?.enrollment?.student?.lastName || ""}`}
                    </span>
                    </Table.Td>
                    <Table.Td className="w-2 py-4 border-dashed">
                    <Button
                        rounded
                        className="border border-red-400 hover:bg-red-100 w-10 h-10 p-1"
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                     /** TODO */
                     
                        }}
                      >
                        <Lucide
                          icon="X"
                          className="w-10 h-10  text-red-400"
                        />{" "}
                      </Button>
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