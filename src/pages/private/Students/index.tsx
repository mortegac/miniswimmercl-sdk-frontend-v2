import {useEffect, useState, useCallback, Fragment} from "react";
import debounce from 'lodash/debounce';

import { FormInput, InputGroup } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";





import Card from "./components/Card";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getStudents, selectStudent } from "@/stores/Students/slice";


import LoadingIcon from "@/components/Base/LoadingIcon";




function Content(props: any) {
  const { data } = props;
  let validTitleSession:string | null = null;

  return (
    <div key="COURSES-LIST" className="flex justify-between flex-row flex-wrap flex-1">
      {Array.isArray(data) &&
        data.map((item: any, i: number) => {
          const hasSessionTitle = item?.enrollments?.items?.length > 0 ? "Con Sesiones": "Sin sesiones";
          const hasSessions = hasSessionTitle !== validTitleSession;
          if (hasSessions) {
            validTitleSession = item?.enrollments?.items?.length > 0 ? "Con Sesiones": "Sin sesiones";
          }

          return (
            <Fragment key={`${i}-STUDENTS`}>
              { hasSessions && (
                <div className="w-full  py-3">
                   <h2 className="mt-3 text-xl font-medium leading-none text-slate-600 dark:text-slate-500 uppercase ml-2">
                   { hasSessionTitle === "Sin sesiones" && "Alumnos sin sesiones activas" }</h2>
                </div>
              )}
              <>
                <Card key={`${i}-COURSES-LOCATIONS`} students={item} />
              </>
            </Fragment>
              
          );
        })}
    </div>
  );
}


function Main() {
  
  const {students, status } = useAppSelector(selectStudent);
  const dispatch = useAppDispatch();
  
  dispatch(setBreadcrumb({first:"Listado de estudiantes", firstURL:"students"}));

  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);

  
  const sortStudents = (a: any, b: any) => {
    const aSessionsCount = a.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    const bSessionsCount = b.enrollments.items.reduce((acc: any, enrollment: any) => acc + enrollment.sessionDetails.items.length, 0);
    
    if (aSessionsCount > 0 && bSessionsCount === 0) return -1;
    if (aSessionsCount === 0 && bSessionsCount > 0) return 1;
    return 0;
  };
  // Función para filtrar estudiantes
  const filterStudents = (term: string) => {
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(term.toLowerCase()) ||
      student.lastName.toLowerCase().includes(term.toLowerCase()) ||
      student.middleName.toLowerCase().includes(term.toLowerCase())
    );
    
    // setFilteredStudents(filtered);
    setFilteredStudents( [...filtered].sort(sortStudents));
  };

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
  
  useEffect(() => { (async () => await dispatch(getStudents()))(); }, []);
  useEffect(() => { setFilteredStudents( [...students].sort(sortStudents)); }, [students]);

  

  return (
    <>
     {/* <pre>{JSON.stringify(filteredStudents[0], null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-4">
            <div className=" text-base font-medium group-[.mode--light]:text-white">
              Listado de Alumnos
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
          <div className="relative justify-start flex-1 xl:flex my-4 mx-2">
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
           
          </div>

              { status === "loading" &&   <div className="w-16 h-16"><LoadingIcon
                    color="white"
                    icon="oval"
                    className="w-10 h-10 mt-10"
                  /></div>}
              { status === "idle" && <Content data={filteredStudents}/>}
              {/* { status === "idle" && <Content data={students}/>} */}
              
              
              
              </div>
              
            </div>
          {/* </div> */}
        {/* </div>
      </div> */}
    </>
  );
}

export default Main;
