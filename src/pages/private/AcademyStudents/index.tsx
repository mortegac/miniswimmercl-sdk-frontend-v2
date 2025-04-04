import {useEffect, useState, useCallback, Fragment} from "react";
import debounce from 'lodash/debounce';
import { Tab } from "@/components/Base/Headless";
import { FormInput, InputGroup } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import clsx from "clsx";




import Card from "./components/Card";
import CardMini from "./components/CardMini";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getAcademyStudents, selectAcademyStudents } from "@/stores/AcademyStudents/slice";


import LoadingIcon from "@/components/Base/LoadingIcon";
// import academyacademyStudentsSliceSlice from '../../../stores/AcademyacademyStudentsSlice/slice';


interface Student {
  id: string;
  status: string;
  presence: string;
  name: string;
  country: string;
  isPaid: boolean;
  isSponsored: boolean;
  // ... otros campos
}
interface CountryCount {
  country: string;
  count: number;
}

function countStudentsByCountry(students: Student[]): CountryCount[] {
  // Primero filtramos los estudiantes que cumplen con la condición de estado
  const filteredStudents = students.filter(
    student => 
      student.status === "CERTIFICATION_IN_PROGRESS" || 
      student.status === "WEB_FORM_ENTRY"
  );
  
  // Luego creamos un objeto para contar por país
  const countByCountry: Record<string, number> = {};
  
  // Contamos los estudiantes por país
  filteredStudents.forEach(student => {
    // Usamos "Sin país" para valores nulos o vacíos
    const country = student.country || "Sin país";
    
    // Incrementamos el contador para este país
    countByCountry[country] = (countByCountry[country] || 0) + 1;
  });
  
  // Convertimos el objeto a un array para facilitar su uso
  const result: CountryCount[] = Object.entries(countByCountry).map(
    ([country, count]) => ({ country, count })
  );
  
  // Ordenamos por cantidad (descendente) y luego por país (alfabéticamente)
  return result.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count; // Mayor cantidad primero
    }
    return a.country.localeCompare(b.country); // Alfabéticamente por país
  });
}

function Content(props: any) {
  const { data } = props;
  
  const countryCounts = countStudentsByCountry(data);
  
  
  function countStudentsByStatus(students: Student[]): number {
    return students.filter(
      student => 
        student.status === "CERTIFICATION_IN_PROGRESS" || 
      student.status === "WEB_FORM_ENTRY"
    ).length;
  }
  function countStudentsByPay(students: Student[], paid: boolean): number {
    return students.filter(
      student => 
        student.isPaid === paid && 
        (student.status === "CERTIFICATION_IN_PROGRESS" || 
         student.status === "WEB_FORM_ENTRY")
    ).length;
  }
  function countStudentsBySponsored(students: Student[]): number {
    return students.filter(
      student => 
        student.isSponsored && 
        (student.status === "CERTIFICATION_IN_PROGRESS" || 
         student.status === "WEB_FORM_ENTRY")
    ).length;
  }
  
  function countStudentsByDone(students: Student[]): number {
    return students.filter(
      student => 
        student.status === "CERTIFICATION_COMPLETED" 
    ).length;
  }
  
  return (
    <>
    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Tab.Group>
         {/* "tabs" | "pills" | "boxed-tabs" | "link-tabs"; */}
        <Tab.List variant="boxed-tabs">
            <Tab>
                <Tab.Button className="w-full py-2" as="button">
                   Inscripciones Activas 
                   <span className="ml-2 px-2 py-1 mr-1 text-white rounded-full bg-primary">{countStudentsByStatus(data)}</span>
                   
                </Tab.Button>
            </Tab>
            <Tab>
                <Tab.Button className="w-full py-2" as="button">
                    Certificaciones realizadas 
                    <span className="ml-2 px-2 py-1 mr-1 text-white rounded-full bg-slate-600">{countStudentsByDone(data)}</span>
                </Tab.Button>
            </Tab>
        </Tab.List>
        <Tab.Panels className="mt-5">
            <Tab.Panel className="leading-relaxed">
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y mb-4">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] ",
                  ])}
                >
                    <div className="p-5 box min-h-60 max-h-6">
                      {/* <div className="flex">
                        <IconStatus subType={"returns"} />
                      </div> */}
                        <p className="truncate  text-lg text-primary">
                            <b className="text-4xl mr-2">{countStudentsByStatus(data)}</b>{" "}Inscripciones
                            <p>Total de países: {countryCounts.length}</p>
                            </p>
                            
                            <div className="min-h-32 max-h-32">
                            <div className="overflow-auto h-32 relative max-w-sm mx-auto flex flex-col divide-y dark:divide-slate-200/5">
                              <div className="text-sm font-medium leading-8 flex flex-col ">
                                { Array.isArray(countryCounts) && countryCounts.map((item:any, index)=>
                                <>
                                    <div className="flex flex-row justify-between">
                                          <p className="truncate hover:text-clip">
                                            
                                            {item.country}
                                          </p>                
                                          <p className="hover:text-clip">
                                          {item.count} estudiante(s)
                                          </p>                
                                    </div>
                                </>
                                )}
                              
                              </div>
                            </div>
                            </div>
                    </div>
                </div>
              </div>
              
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y mb-4">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] ",
                  ])}
                >
                    <div className="p-5 box min-h-60 max-h-6">
                      {/* <div className="flex">
                        <IconStatus subType={"returns"} />
                      </div> */}
                        <p className="truncate  text-lg text-primary">
                            <b className="text-4xl mr-2">{countStudentsByPay(data, true)}</b>{" "}Pagados
                            </p>
                            
                            <div className="min-h-32 max-h-32">
                            <div className="overflow-auto h-32 relative max-w-sm mx-auto flex flex-col divide-y dark:divide-slate-200/5">
                              <div className="text-sm font-medium leading-8 flex flex-col ">
                                
                                <div className="flex flex-row justify-between">
                                  <p className="truncate hover:text-clip">
                                    
                                  Alumnos pendientes:
                                  </p>                
                                  <p className="hover:text-clip">
                                  {countStudentsByPay(data, false)}
                                  </p>                
                                </div>
                                
                                <div className="flex flex-row justify-between">
                                  <p className="truncate hover:text-clip">
                                    
                                  Alumnos becados:
                                  </p>                
                                  <p className="hover:text-clip">
                                  {countStudentsBySponsored.length}
                                  </p>                
                                </div>
                                    
                              </div>
                            </div>
                            </div>
                    </div>
                </div>
              </div>
            </div>
      
              <div>
              
              </div>
              <div key="ACADEMY-LIST" className="flex justify-start flex-row flex-wrap flex-1">
              {Array.isArray(data) &&
        [...data]
          .sort((a, b) => {
            // Primero ordenar por isPaid (true primero)
            if (a?.isPaid && !b?.isPaid) return -1;
            if (!a?.isPaid && b?.isPaid) return 1;
            
      
      
      
            
            // const ad = new Date(a?.createdAt);
            // const bd = new Date(b?.createdAt);
            
            // if (ad > bd) return -1;
            // if (ad < bd) return 1;
            
            // const countryA = a?.country || '';
            // const countryB = b?.country || '';
            
            // return countryA.localeCompare(countryB);
            // Si isPaid es igual, ordenar por country
            // Manejar casos donde country puede ser null
            const countryA = a?.country || '';
            const countryB = b?.country || '';
            const countryComparison = countryA.localeCompare(countryB);
            
            // Si el país es igual, ordenar por createdAt (más reciente primero)
            if (countryComparison !== 0) return countryComparison;
            
            const ad = new Date(a?.createdAt);
            const bd = new Date(b?.createdAt);
            return ad > bd ? -1 : ad < bd ? 1 : 0;
          })
          .map((item: any, i: number) => 
              item?.status === "CERTIFICATION_IN_PROGRESS" || 
              item?.status === "WEB_FORM_ENTRY"  && 
              <Card key={`${i}-ACADEMY-LOCATIONS`} student={item} />
            )
          }
                {/* {Array.isArray(data) &&
                  data.map((item: any, i: number) => item?.status === "CERTIFICATION_IN_PROGRESS" || item?.status === "WEB_FORM_ENTRY"  && <Card key={`${i}-ACADEMY-LOCATIONS`} student={item} />)} */}
              
              {/* CERTIFICATION_COMPLETED
  CERTIFICATION_IN_PROGRESS
  WEB_FORM_ENTRY */}
                
              </div>

            </Tab.Panel>
            <Tab.Panel className="leading-relaxed">
              <div key="ACADEMY-LIST" className="flex justify-start flex-row flex-wrap flex-1">
                {Array.isArray(data) &&
                data.map((item: any, i: number) => item?.status === "CERTIFICATION_COMPLETED" && <CardMini key={`${i}-ACADEMY-STUDENTS`} student={item} />)}
              </div>
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>

  );
}


function Main() {
  
  const {academyStudents, status } = useAppSelector(selectAcademyStudents);
  const dispatch = useAppDispatch();
  
  // dispatch(setBreadcrumb({first:"Listado de inscritos academia", firstURL:"academy-students"}));

  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredacademyStudents, setFilteredacademyStudents] = useState(academyStudents);

  
  // const sortacademyStudents = (a: any, b: any) => {
  //   const aIsPaidCount = a.items.reduce((acc: any, isPaid: any) => acc + items.length, 0);
  //   const bIsPaidCount = b.items.reduce((acc: any, isPaid: any) => acc + items.length, 0);
    
  //   if (aSessionsCount > 0 && bSessionsCount === 0) return -1;
  //   if (aSessionsCount === 0 && bSessionsCount > 0) return 1;
  //   return 0;
  // };
  // Función para filtrar estudiantes
  // const filteracademyStudentsSlice = (term: string) => {
  //   const filtered = academyStudents.filter(student => 
      // student.name.toLowerCase().includes(term.toLowerCase()) 
      // student.lastName.toLowerCase().includes(term.toLowerCase()) ||
      // student.middleName.toLowerCase().includes(term.toLowerCase())
    // );
    
    // setFilteredacademyStudents(filtered);
    // setFilteredacademyStudents( [...filtered].sort(sortacademyStudentsSlice));
  // };

  // Creamos una versión debounced de la función de filtrado
  // const debouncedFilter = useCallback(
  //   debounce((term: string) => filteredacademyStudents(term), 300),
  //   [academyStudents] // Dependencia del array de estudiantes
  // );

  // Manejador para el cambio en el input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    // debouncedFilter(term);
  };
  
  useEffect(() => { (async () => await dispatch(getAcademyStudents()))(); }, []);
  // useEffect(() => { setFilteredacademyStudents( [...academyStudents].sort(sortacademyStudents)); }, [academyStudents]);

  

  return (
    <>
     {/* <pre>{JSON.stringify(academyStudents, null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-4">
            <div className=" text-base font-medium group-[.mode--light]:text-white">
              Inscritos certificaciones academia
            </div>
            <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
              {/* <Button
                rounded
                variant="primary"
                className="px-8 py-3 border border-slate-200"
              >
                <Lucide icon="Plus" className="w-6 h-6 mr-2" />{" "}
                <span className="text-border-slate-200">Nuevo Alumno</span>
              </Button> */}
            </div>
          </div>
          {/* <div className="relative justify-start flex-1 hidden xl:flex my-4 mx-2">
            <InputGroup>
              <InputGroup.Text id="input-group-name" className="bg-white/[0.12] border-transparent flex items-center py-2 px-3.5  text-white cursor-pointer hover:bg-white/[0.15] transition-colors duration-300 hover:duration-100 ">
                <Lucide icon="Search" className="w-[18px] h-[18px]" />
              </InputGroup.Text>
            <FormInput
                formInputSize="lg"
                placeholder="" aria-label="name" aria-describedby="input-group-name"
                type="text"
                tabIndex={1} 
                className="bg-white/[0.12] text-white w-[350px] flex items-center py-2 px-3.5 border-transparent  cursor-pointer hover:bg-white/[0.15] transition-colors duration-300 hover:duration-100 focus:z-10"
                name="guardianEmail"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
           
          </div> */}

              { status === "loading" &&   <div className="w-16 h-16"><LoadingIcon
                    color="white"
                    icon="oval"
                    className="w-10 h-10 mt-10"
                  /></div>}
              { status === "idle" && <Content data={academyStudents}/>}
              {/* { status === "idle" && <Content data={academyStudentsSlice}/>} */}
              
              
              
              </div>
              
            </div>
          {/* </div> */}
        {/* </div>
      </div> */}
    </>
  );
}

export default Main;
