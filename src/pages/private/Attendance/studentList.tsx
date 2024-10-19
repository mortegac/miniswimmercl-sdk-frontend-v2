import { useState, useEffect, useCallback } from "react";
import debounce from 'lodash/debounce';

import {FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";


const typeOfRelationship: any = {
  [""]: "",
  ["NONE"]: "",
  ["FATHER"]: "Padre",
  ["MOTHER"]: "Madre",
  ["OTHER"]: "Otro",
  ["GRANDFATHER"]: "Abuelo",
  ["GRANDMOTHER"]: "Abuela",
  ["UNCLE"]: "Tio",
  ["AUNT"]: "Tia",
  ["FAMILYS_FRIEND"]: "Amigo familia",
  ["Primo/a"]: "",
};
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
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses son 0-indexados
  const year = date.getUTCFullYear();

  return `${day}-${typeOfMonth[month]}`;
  // return `${day}-${month}-${year}`;
}
function convertirFecha(fechaString: string): Date {
  // Asumimos que la fecha viene en formato "dd/mm/yyyy"
  const [dia, mes, anio] = fechaString.split('/');
  
  // Creamos una nueva fecha en formato "yyyy-mm-dd"
  return new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
}
function calcularEdad(fechaNacimientoString: string): { años: number; meses: number } {
  const fechaNacimiento = convertirFecha(fechaNacimientoString);
  const hoy = new Date();
  let años = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let meses = hoy.getMonth() - fechaNacimiento.getMonth();

  if (meses < 0 || (meses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    años--;
    meses += 12;
  }

  meses = meses % 12;

  return { años, meses };
}



import { useAppSelector, useAppDispatch } from "@/stores/hooks";

import { getStudentsSearchName, selectStudent } from "@/stores/Students/slice";
function StudentList() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {students, status } = useAppSelector(selectStudent);
  const dispatch = useAppDispatch();
  
  
  
  // useEffect(() => { (async () => await dispatch(getStudentsSearchName({name:""})))(); }, []);
  
  const filterStudents = async (term: string) => await dispatch(getStudentsSearchName({name:term}));

  // Creamos una versión debounced de la función de filtrado
  const debouncedFilter = useCallback(
    debounce((term: string) => filterStudents(term), 300),
    [students] // Dependencia del array de estudiantes
  );

  // Manejador para el cambio en el input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedFilter(term);
  };
  

    
  return (
    <>
      <div className="relative w-[99%] mt-4">
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
                      className="pl-9 w-full  rounded-[0.5rem] transition-colors duration-300 hover:duration-100 focus:z-10"
                      name="studentName"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                </div>
                {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}
                <div className="overflow-auto xl:overflow-visible mt-8">
        <Table className="border-b border-slate-200/60">
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="w-52 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                Alumno
              </Table.Td>
              <Table.Td className="w-44 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500 text-center">
                Sesiones vigentes
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {/* <pre>{JSON.stringify(enrollments, null, 2)}</pre> */}
            {Array.isArray(students) && students.map((item:any, index:number) => {
              const edad = calcularEdad(String(item?.birthdate === "" ? "1800/01/01":item?.birthdate ));
              return (
              <Table.Tr key={index} className="[&_td]:last:border-b-0">
                <Table.Td className="py-4 border-dashed">
                  <div className="flex items-start flex-col">
                    <p className="text-lg">
                      {item?.name} {item?.lastName}
                      {" | "}<span className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{ edad.años > 100 ? "SIN EDAD":`${edad.años} años, ${edad.meses} meses`}</span>
                      
                    </p>
                    {Array.isArray(item?.relationships?.items) && item?.relationships?.items.map((relation:any, i:any) => (
                      <div className="flex flex-row my-2 text-left p-2 w-full">
                        <Lucide icon="ChevronsRight" className="text-slate-400"/>
                        <p className="font-medium whitespace-nowrap ml-2 text-slate-500">
                            {relation?.user?.name}
                        {" | "}<span className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        {typeOfRelationship[relation?.relationType]}
                        </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </Table.Td>
               
                <Table.Td className=" w-96">
                  {Array.isArray(item?.enrollments?.items) && item?.enrollments?.items.map((enrollment:any, i:any) => {
                      return (
                        <>
                          {/* <pre>{JSON.stringify(enrollment, null, 2)}</pre> */}
                          {enrollment?.sessionDetails?.items.length > 0 && <p className=" text-center mt-3 text-sm font-thin leading-none text-slate-600">
                            Curso: <b>{enrollment.courseEnrollmentsId}</b>
                          </p>}
                        {  Array.isArray(enrollment?.sessionDetails?.items) && enrollment?.sessionDetails?.items.map((session:any, i:any) => (
                          <>
                            <Button variant="soft-danger" rounded 
                              className="px-4 py-3 m-2 h-12 w-full" 
                                  // onClick={() => updateSession({
                                  //   sessionId: item.id,
                                  //   status: "USED",
                                  // })}
                                  >
                              <div className="flex flex-row justify-between w-full px-3">
                                <div className="flex flex-col justify-start items-start">
                                  <small className=" text-slate-700">{formatDate(session?.date)}</small>
                                  <small className="truncate text-xs font-thin text-ellipsis overflow-hidden text-slate-700">{session?.locationId}</small>
                                </div>
                                <div className="flex justify-center items-center">
                                  <p className="">MARCAR PRESENTE</p>
                                </div>
                              </div>
                              {/* <p className="w-40 truncate text-xs font-thin text-ellipsis overflow-hidden text-slate-700" >{session?.locationId}</p> */}
                            </Button>
                                  
                            {/* <div className={`my-2 ${session?.status==="ACTIVE"? " bg-green-50":" bg-slate-50"} rounded-full text-center p-2 flex flex-col flex-wrap`}>
                                { session?.status==="ACTIVE" && 
                                <>
                                  <small className="mt-1">{formatDate(session?.date)} | <i className=" font-thin">{session?.status}</i></small>
                                  <p className="w-40 truncate text-xs font-thin text-ellipsis overflow-hidden" >{session?.locationId}</p>
                                </>
                                }
                                { session?.status==="USED" && <>
                                  <small className="mt-1 line-through text-slate-400">{formatDate(session?.date)} | <i className=" font-thin">{session?.status}</i></small>
                                  <p className="w-40 truncate text-xs font-thin text-ellipsis overflow-hidden" >{session?.locationIdUsed}</p>
                                </>
                                } 
                            </div>*/}
                          </>
                          ))}
                        </>
                    
                    
                      )}
                  )}
                 
                  
                </Table.Td>
              </Table.Tr>
            )})}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}

export default StudentList;
