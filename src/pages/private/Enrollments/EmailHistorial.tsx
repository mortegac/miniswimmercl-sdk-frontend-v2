import { useEffect } from "react";

import Table from "@/components/Base/Table";
import LoadingIcon from "@/components/Base/LoadingIcon";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectEmailSend, getEmails } from "@/stores/EmailsSent/slice";

const typeOfMonth: any = {
    [""]: "",
    ["01"]: "ENE",
    ["02"]: "FEB",
    ["04"]: "ABR",
    ["03"]: "MAR",
    ["05"]: "MAY",
    ["06"]: "JUN",
    ["07"]: "JUL",
    ["08"]: "AGO",
    ["09"]: "SEP",
    ["10"]: "OCT",
    ["11"]: "NOV",
    ["12"]: "DIC",
  };

function Content(props: any) {
    const {email} = props;
    const [date, hour] = email.createdAt.split('T');
    const [year, month, day] = date.split('-');
    const [hourFull, rest] = hour.split('.');
    return(
        <>
        {/* <pre>{JSON.stringify(email, null, 2 )}</pre> */}
            <Table.Tr key={email.id} className="[&_td]:last:border-b-0">
                    <Table.Td className="w-60 py-4 border-dashed">
                    <div className="flex items-center justify-start">
                        {email.email}
                    </div>
                    </Table.Td>
                    <Table.Td className="py-4 border-dashed dark:bg-darkmode-600">
                    <div className="flex flex-col items-center justify-center">
                   
                    {/* <p className="text-sm">{`${email.createdAt}`}</p> */}
                    <p className="text-sm">{`${date}`}</p>
                    <p className="font-thin text-sm">{hourFull}</p>
                    </div>
                    </Table.Td>
                    <Table.Td className="w-60 py-4 border-dashed">
                    <div className="flex items-center justify-start">
                        {email.type}
                    </div>
                    </Table.Td>
                    <Table.Td className="w-52 py-4 border-dashed">
                    <div className="flex items-center justify-start">
                    {email?.usersEmailSendId}
                    </div>
                    </Table.Td>
            </Table.Tr>
        </>
    )
}

export function EmailHistorial(props: any) {
    
    const {studentId} = props;
    const {status, emailSends} = useAppSelector(selectEmailSend);
    const dispatch = useAppDispatch();

    
      
  useEffect(() => { 
    (async () => await dispatch(getEmails({studentEmailSendId: studentId})) )(); 
  }, []);
  
    return(
        <div className="overflow-auto xl:overflow-visible">
     
          
                
             
                
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="w-72 py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Destinatario
              </Table.Td>
              <Table.Td className="w-52 py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Fecha
              </Table.Td>
              <Table.Td className="w-60 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Tipo
              </Table.Td>
              <Table.Td className="w-60 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Usuario
              </Table.Td>
              {/* <Table.Td className="w-40 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Sesiones
              </Table.Td> */}
           
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {/* <pre>emailSends = {JSON.stringify(emailSends, null, 2)}</pre> */}
    
            { status === "loading" && <div className="flex justify-center">
                <div className="w-16 h-16"><LoadingIcon
                    color="#AE5EAB"
                    icon="oval"
                    className="w-10 h-10 mt-10"/>
            </div></div>}
                
            { status === "idle" && 
                Array.isArray(emailSends) && emailSends.map((item:any, index) =>
                    <Content email={item}/>
                )
            }
          </Table.Tbody>
        </Table>
      </div>

    )
}