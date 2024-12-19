import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import * as jose from "jose";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './phone.css'



import { formatCurrency } from "../../../utils/helper";

import LoadingIcon from "@/components/Base/LoadingIcon";
import { Slideover } from "@/components/Base/Headless";
// import { Menu, Popover } from "@/components/Base/Headless";
import { FormInput, FormSelect, FormTextarea } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from "@/stores/breadcrumb";
import { setPhoneApoderado } from "@/stores/Users/slice";

import {
  getShoppingCart,
  selectShoppingCarts,
} from "@/stores/ShoppingCarts/slice";
// import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
// import {
//   setEmailSend,
//   selectEmailSend,
//   cleanSentVar,
// } from "@/stores/EmailsSent/slice";
// import { Location } from "@/stores/Locations/types";

import { CartDetail } from "./components/cartDetail";

const typeOfName: any = {
  ["CREATE"]: "CREADA",
  ["AUTHORIZED"]: "PAGADA",
  ["PENDING"]: "PENDING",
  ["INITIALIZED"]: "INICIALIZADA",
  [""]: "-",
};

function sumCartAmounts(cartDetails: any) {
  return cartDetails.items.reduce(
    (total: number, item: any) => total + item.amount,
    0
  );
}

function SendJwtWhatsapp(props: any) {
  const [JWT, setJWT] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [clientPhoneNumber, setClientPhoneNumber] = useState(props?.phoneNumber || "");
  const { cartId, phoneNumber, clientName, clientId,  cartStatus } = props;

  const dispatch = useAppDispatch();
  
  
  
  const secretKey = new TextEncoder().encode(
    "tu_clave_secreta_super_segura_min_32_caracteres"
  );

  function cleanPhoneNumber(phone:string) {
    // Eliminar el signo más
    let cleanPhone = phone.replace(/^\+/, '');
    
    // Eliminar espacios y caracteres no numéricos
    cleanPhone = cleanPhone.replace(/\D/g, '');
    
    // Verificar que tenga 11 dígitos
    if (cleanPhone.length === 11) {
      return {
        cleanPhone,
        message: "",
        status: true
    };
    } else {
      return {
        message: 'Número de teléfono inválido',
        status: true
    };
    }
  }
  
  const sendWhatsAppMessage = async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJjcmVhdGU6bWVzc2FnZXMiXSwiY29tcGFueUlkIjoiZTI5NzkzYWUtZmIzYi00MjQxLWFmODQtN2Y4NGZjZWI5NDhlIiwiaWF0IjoxNzMxOTQwODY5fQ.AX1FcQeB5m_e-bsG9W5vSNXQ7JcX2eQxXhknPdPRRZs'; // Replace with your actual token
    
    !clientPhoneNumber && setError("Debe ingresar el teléfono del cliente para continuar")
    
    if(clientPhoneNumber && JWT){
      
      const validPhone = cleanPhoneNumber(clientPhoneNumber);
      const payload = {
        whatsappId: "3f327a33-4b6c-47c0-b7bd-7649674907cd",
        messages: [
          {
            number: validPhone?.cleanPhone,
            name: clientName,
            body: `${clientName}, Para completar su inscripción por favor ingrese en el siguiente link de pago https://pagos.miniswimmer.cl/${JWT}   El link de pago tiene una vigencia de 48 horas.`
          }
        ]
      };
  
      try {
        setLoading(true);
        setError(null);
  
        if(validPhone.status){
          const response = await fetch(
            // 'https://api.whaticket.com/api/v1/messages', 
            '/api/api/v1/messages', 
            {
              method: 'POST',
              credentials: 'include',
              referrerPolicy: 'no-referrer',
              headers: {
                'Authorization': `Bearer ${token}`,
                // 'Accept': '*/*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*", // O tu dominio específico
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
              },
              body: JSON.stringify(payload)
            }
          );
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const responseData = await response.json();
          /** TODO:  Almacenar envio del whatsapp */
          console.log('Message sent successfully:', responseData);
        }
        
      } catch (err:any) {
        setError(err.message);
        console.error('Error sending message:', err);
      } finally {
        setLoading(false);
      }
    }
  };
  
  async function createJWT() {
    const payload = {
      sub: cartId,
      iat: 1516239022,
    };

    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt() // Establece iat (issued at)
      .setExpirationTime("2h") // El token expira en 2 horas
      .sign(secretKey);
    setJWT(jwt);

    console.log(jwt);

    return jwt;
  }
  async function setPhoneUser(){
    clientId !== "" && 
    phone !== "" && dispatch(setPhoneApoderado({userId:clientId, userPhone:phone}));
    setClientPhoneNumber(phone)
  }
  const validatePhoneNumber = (value:any) => {
    setPhone(value);
    
    if (!value) {
      setError('El número de teléfono es requerido');
      setIsValid(false);
      return;
    }

    try {
      if (isValidPhoneNumber(value)) {
        setError('');
        setIsValid(true);
      } else {
        setError('Número de teléfono inválido');
        setIsValid(false);
      }
    } catch (err) {
      setError('Error al validar el número');
      setIsValid(false);
    }
  };
  
  useEffect(() => {
    (async () => {
      await createJWT();
    })();
  }, [cartId]);
  return (
    <>
      { cartStatus !== "AUTHORIZED" && 
        <div className="px-8 pt-6 pb-8 mt-3.5 bg-purple-100">
          <div className="text-base font-medium">Envio de link de pago</div>
          <div className="text-slate-500 mt-0.5 mb-2">
            Con esta funcionalidad puede enviar directo al whatsapp del
            cliente el link de pago
          </div>
          <div className="p-5 box box--stacked">
            <div className="pb-5 mb-5 border-b border-dashed border-slate-300/70">
              <div className="">
                <h2 className="text-sm mb-2">
                  <span className="text-lg w-20 text-left inline-block">
                    Cliente:
                  </span>{" "}
                  <span className="ml-4 text-lg">{clientName}</span>
                </h2>
                
                <div className="text-sm mb-2 flex flex-row items-center justify-start">
                  <span className="text-lg w-20 text-left  inline-block">
                    Teléfono:
                  </span>{" "}
                  { clientPhoneNumber ==="" && <div className=" mt-3 flex flex-row ml-4 ">
                        <PhoneInput
                          international
                          defaultCountry="CL"
                          value={phone}
                          onChange={validatePhoneNumber}
                          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          error={error}
                        />
                        <div className="mt-4 ml-4">
                          <Button 
                            variant="primary"
                            className={`px-4 py-2 rounded ${
                              isValid 
                                ? 'bg-primary hover:bg-primary/200 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!isValid}
                            onClick={()=>setPhoneUser()}
                          >
                            Grabar teléfono
                          </Button>
                        </div>
    
        
      
        
                      {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>
                  }
                  { clientPhoneNumber !=="" && <div className="w-full flex justify-between items-center">
                    <span className="ml-4 text-lg">{clientPhoneNumber}</span>
                    <Button
                    variant="primary"
                    disabled={loading}
                    className="px-3 py-2 w-full sm:w-auto bg-white text-primary border-primary hover:bg-primary/20"
                    onClick={()=>setClientPhoneNumber("")}
                  >
                    <Lucide
                      icon="Phone"
                      className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                    />
                    Editar teléfono
                  </Button>
                  </div>}
                  
                </div>
                 {isValid && clientPhoneNumber ==="" &&(
                        <div className="flex flex-col w-full">
                          <p className="text-green-500 text-xs mt-1">
                            Número válido: {phone}
                          </p>
                        </div>
                    )}
                  { clientPhoneNumber ==="" &&  <div className="flex flex-col w-full">
                      <span className="text-red-300">Debe ingresar el teléfono para continuar </span>
                    </div>
                  }
                   
                  
                  
                
              </div>
             
             
             {
              clientPhoneNumber && clientPhoneNumber !=="" && 
              <>
                {/* <div className="relative mt-3">
                  <FormInput
                    type="text"
                    placeholder="56988889988"
                    className="sm:py-3"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={loading}
                    className="w-full sm:w-auto sm:absolute inset-y-0 right-0 pl-3.5 pr-4 my-auto mt-2 sm:mt-auto mr-2 h-9 sm:h-8 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    onClick={sendWhatsAppMessage}
                  >
                    <Lucide
                      icon="Send"
                      className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                    />
                    {loading ? 'Enviando...' : 'ENVIAR LINK DE PAGO'}
                  </Button>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>  */}
                <div className="relative mt-3">
                  <span className="font-thin mb-2">Se enviará el siguiente mensaje: </span>
                  <FormTextarea
                    disabled
                    rows={4}
                    cols={2}
                    placeholder="Mensaje"
                    value={`${clientName}, Para completar su inscripción por favor ingrese en el siguiente link de pago https://pagos.miniswimmer.cl/${JWT}   El link de pago tiene una vigencia de 48 horas.`}
                    className="sm:py-3"
                  />
                </div>
                <div className="mt-4">
                {/* <div className="mt-4 flex justify-between items-center"> */}
                  {/* <FormInput
                    type="text"
                    placeholder="56988889988"
                    className="sm:py-3"
                  /> */}
                  <Button
                    variant="primary"
                    // size="lg"
                    disabled={loading}
                    // className="w-full sm:w-auto sm:absolute inset-y-0 right-0 pl-3.5 pr-4 my-auto mt-2 sm:mt-auto mr-2 h-9 sm:h-8 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    className="px-3 py-2 w-full sm:w-auto bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                    onClick={sendWhatsAppMessage}
                  >
                    <Lucide
                      icon="Send"
                      className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                    />
                    {loading ? 'Enviando...' : 'Enviar Link de Pago'}
                  </Button>
                  
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div> 
              </>              
              }
              
              
            </div>

{/*         
              <div>Link de pago</div>
              <div className="flex gap-3 mt-3 relative">
                <FormInput
                  type="text"
                  value={`https://pagos.miniswimmer.cl/${JWT}`}
                  disabled
                  className="text-slate-500 "
                />
              <a target="_blank" href={`https://pagos.miniswimmer.cl/${JWT}`} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 p-2  rounded-md">
                <Lucide
                  icon="ShoppingCart"
                  className="w-10 h-10 p-2 text-slate-800"
                />{" "}
              </a>
              </div> */}
            
          </div>
        </div>
      }
  </>
  );
}

function Jwt(props: any) {
  const [JWT, setJWT] = useState("");
  const { cartId } = props;
  const secretKey = new TextEncoder().encode(
    "tu_clave_secreta_super_segura_min_32_caracteres"
  );

  async function createJWT() {
    const payload = {
      sub: cartId,
      iat: 1516239022,
    };

    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt() // Establece iat (issued at)
      .setExpirationTime("2h") // El token expira en 2 horas
      .sign(secretKey);
    setJWT(jwt);

    console.log(jwt);

    return jwt;
  }

  useEffect(() => {
    (async () => {
      await createJWT();
    })();
  }, [cartId]);
  return (
    <div className="w-14 h-14 bg-primary/20  rounded-full px-2 py-2 border border-primary hover:bg-purple-100">
      {JWT && (
        <a target="_blank" href={`https://pagos.miniswimmer.cl/${JWT}`}>
          <Lucide
            icon="ShoppingCart"
            className="w-10 h-10 p-2 text-slate-800"
          />{" "}
        </a>
      )}
    </div>
  );
}
function Content(props: any) {
  const [cartId, setCartId] = useState({id:"", cartStatus:"", clientName:"", phoneNumber:"", clientId:""});
  const [switcherSlideover, setSwitcherSlideover] = useState(false);
  const { shoppingCarts } = props;

  // const secretKey = new TextEncoder().encode(
  //   "tu_clave_secreta_super_segura_min_32_caracteres"
  // );

  // async function createJWT(cartId: string) {
  //   const payload = {
  //     sub: cartId,
  //     iat: 1516239022,
  //   };

  //   const jwt = await new jose.SignJWT(payload)
  //     .setProtectedHeader({ alg: "HS256" })
  //     .setIssuedAt() // Establece iat (issued at)
  //     .setExpirationTime("2h") // El token expira en 2 horas
  //     .sign(secretKey);
  //   // setJWT(jwt)

  //   console.log(jwt);

  //   return jwt;
  // }

  // useEffect(() => { (async () => {
  //   await createJWT()
  // })(); }, [cartId]);

  return (
    <>
      <Slideover
        size="xl"
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
                <div className="text-base font-medium">
                  Detalle del Carro de compras
                </div>
                <div className="text-slate-500 mt-0.5  mb-12">Generado</div>
                <div className="overflow-auto xl:overflow-visible">
                  <CartDetail cartId={cartId?.id} />
                </div>
              </div>
            </div>

            <SendJwtWhatsapp 
              cartId={cartId?.id} 
              clientId={cartId?.clientId} 
              phoneNumber={cartId?.phoneNumber}
              cartStatus={cartId?.cartStatus} 
              clientName={cartId.clientName}
            />
            
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      <div className="overflow-auto xl:overflow-visible">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Cliente
              </Table.Td>
              <Table.Td className="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Monto
              </Table.Td>
              <Table.Td className=" py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Estado
              </Table.Td>
              <Table.Td className="text-left py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Creación
              </Table.Td>

              <Table.Td className="text-center border-t bg-slate-50 border-slate-200/60 text-slate-500"></Table.Td>
              <Table.Td className="text-center border-t bg-slate-50 border-slate-200/60 text-slate-500"></Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {/* <pre>{JSON.stringify(paymentTransactions, null, 2)}</pre> */}
            {Array.isArray(shoppingCarts) &&
              shoppingCarts.map((item: any, index) => {
                const totalAmount =
                  item?.cartDetails && sumCartAmounts(item?.cartDetails);
                const options: Intl.DateTimeFormatOptions = {
                  timeZone: "America/Santiago",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                };

                const date: Date = new Date(item?.createdAt);
                const formattedDate: string = date.toLocaleDateString(
                  "es-CL",
                  options
                );

                return (
                  <Table.Tr key={index} className="[&_td]:last:border-b-0">
                    <Table.Td className=" py-4 border-dashed">
                      <div className="flex justify-start items-start flex-col">
                        <div className="text-lg">{item?.user?.name}</div>
                        <div className="text-sm font-thin">
                          {item?.user?.id}
                        </div>
                      </div>
                    </Table.Td>

                    <Table.Td className=" py-4 border-dashed">
                      <div className="flex items-center justify-center flex-col">
                        <p className="uppercase font-thin text-sm text-center">
                          $ {formatCurrency(totalAmount)}
                        </p>
                      </div>
                    </Table.Td>
                    <Table.Td className=" py-4 border-dashed">
                      <div
                        className={`flex justify-center items-center text-xs border rounded-full px-2 py-2 
                    ${
                      item?.status === "CREATE" &&
                      "text-success bg-success/10 font-thin "
                    }
                    ${
                      item?.status === "AUTHORIZED" &&
                      "text-primary border-primary font-black font-dm-sans "
                    }
                    ${
                      item?.status === "INITIALIZED" &&
                      "text-gray-600 bg-gray-200 font-thin "
                    }
                    `}
                      >
                        <span className="-mt-px">
                          {typeOfName[item?.status]}
                        </span>
                      </div>
                    </Table.Td>
                    <Table.Td className=" py-4 border-dashed">
                      <div className="flex items-start justify-start flex-col">
                        <p className="uppercase font-thin text-sm text-center">
                          {formattedDate}
                        </p>
                      </div>
                    </Table.Td>

                    <Table.Td className=" border-dashed w-1">
                      {/* <pre>{JSON.stringify(item?.user, null, 2)}</pre> */}
                      <Button
                        rounded
                        className="px-2 py-2 border border-slate-400 hover:bg-slate-100"
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          setCartId({
                            id:item?.id, 
                            cartStatus:item?.status,
                            clientName:item?.user?.name, 
                            phoneNumber:item?.user?.contactPhone, 
                            clientId:item?.user?.id, 
                          });
                          setSwitcherSlideover(true);
                        }}
                      >
                        <Lucide
                          icon="AlignLeft"
                          className="w-10 h-10 p-2 text-slate-400"
                        />{" "}
                      </Button>
                    </Table.Td>
                    <Table.Td className="border-dashed w-1">
                      {item?.status !== "AUTHORIZED" && (
                        <Jwt cartId={item?.id} />
                      )}
                    </Table.Td>
                  </Table.Tr>
                );
              })}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}

function Main() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusShoppingCart, setStatusShoppingCart] = useState("PENDING")
  // const [JWT, setJWT] = useState("");
  const { shoppingCarts, status } = useAppSelector(selectShoppingCarts);
  // const {locations} = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  dispatch(
    setBreadcrumb({ first: "Carros de compra", firstURL: "transactions" })
  );

  async function handleSearchChange(){
    searchTerm && searchTerm !== "" && await dispatch(getShoppingCart({ userId:searchTerm })) 
  }
  
  useEffect(() => {
    (async () => await dispatch(getShoppingCart({status:"PENDING"})))();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">

            <div className="flex justify-between w-full flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
              <h2 className="text-base font-medium group-[.mode--light]:text-white">Carros de compra clientes</h2>
              <div className="">
                <Button
                  rounded
                  variant="primary"
                  className={`px-8 py-3 border border-slate-200 mr-3 ${statusShoppingCart==="PENDING" && " bg-white text-primary"}`}
                  onClick={()=>{
                    dispatch(getShoppingCart({status:"PENDING"}))
                    setStatusShoppingCart("PENDING")
                  }}
                >
                  <span className="text-border-slate-200 font-dm-sans">PENDIENTES</span>
                </Button>
                <Button
                  rounded
                  variant="primary"
                  className={`px-8 py-3 border border-slate-200 ${statusShoppingCart==="AUTHORIZED" && " bg-white text-primary"}`}
                  onClick={()=>{
                    dispatch(getShoppingCart({status:"AUTHORIZED"}))
                    setStatusShoppingCart("AUTHORIZED")
                  }}
                >
                  <span className="text-border-slate-200 font-dm-sans">PAGADOS </span>
                </Button>
              
              </div>
            </div>
          
          </div>
          <div className="flex flex-col gap-8 mt-3.5">
            {/* <pre>{JSON.stringify(enrollments, null, 2)}</pre> */}
            <div className="flex flex-col box min-h-screen">
            <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2 ">
          
          <div className="relative flex w-full">
             <FormInput
                formInputSize="lg"
                placeholder="Email cliente"
                aria-label="name" 
                aria-describedby="input-group-name"
                type="text"
                tabIndex={1} 
                className="w-96 rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                name="guardianEmail"
                value={searchTerm}
                onChange={(e:any)=>setSearchTerm(String(e.target.value))}
              />
               <Button
                variant="primary"
                size="lg"
                className="ml-2 px-3 py-2 "
                onClick={handleSearchChange}
                >
                <Lucide icon="Search" className="w-5 h-5" />
                </Button>
               <Button
                size="lg"
                className="ml-1 px-3 py-2 border-primary"
                onClick={async()=> {
                  await dispatch(getShoppingCart({}))
                  setSearchTerm("")
                } }
                >
                <Lucide icon="X" className="w-5 h-5 text-primary" />
                </Button>
          </div>
    
         
        {/* <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
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
                          <option key={"CREATE"} value={"CREATE"}>CREATE</option>
                          <option key={"AUTHORIZED"} value={"AUTHORIZED"}>AUTHORIZED</option>
                          <option key={"INITIALIZED"} value={"INITIALIZED"}>INITIALIZED</option>
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
        </div> */}
      </div>
      

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

              {status === "idle" && <Content shoppingCarts={shoppingCarts} />}

              <div className="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
