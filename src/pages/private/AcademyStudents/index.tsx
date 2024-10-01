import {useEffect, useState, useCallback, Fragment} from "react";
import debounce from 'lodash/debounce';
import { Tab } from "@/components/Base/Headless";
import { FormInput, InputGroup } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";





import Card from "./components/Card";
import CardMini from "./components/CardMini";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getAcademyStudents, selectAcademyStudents } from "@/stores/AcademyStudents/slice";


import LoadingIcon from "@/components/Base/LoadingIcon";
// import academyacademyStudentsSliceSlice from '../../../stores/AcademyacademyStudentsSlice/slice';




function Content(props: any) {
  const { data } = props;
  // let validTitleSession:string | null = null;

  return (
      <Tab.Group>
         {/* "tabs" | "pills" | "boxed-tabs" | "link-tabs"; */}
        <Tab.List variant="boxed-tabs">
            <Tab>
                <Tab.Button className="w-full py-2" as="button">
                   Inscripciones Activas
                </Tab.Button>
            </Tab>
            <Tab>
                <Tab.Button className="w-full py-2" as="button">
                    Certificaciones realizadas
                </Tab.Button>
            </Tab>
        </Tab.List>
        <Tab.Panels className="mt-5">
            <Tab.Panel className="leading-relaxed">
              <div key="ACADEMY-LIST" className="flex justify-start flex-row flex-wrap flex-1">
                {Array.isArray(data) &&
                  data.map((item: any, i: number) => item?.status === "CERTIFICATION_IN_PROGRESS" && <Card key={`${i}-ACADEMY-LOCATIONS`} student={item} />)}
              
                
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
    

  );
}


function Main() {
  
  const {academyStudents, status } = useAppSelector(selectAcademyStudents);
  const dispatch = useAppDispatch();
  
  dispatch(setBreadcrumb({first:"Listado de inscritos academia", firstURL:"academy-students"}));

  
  
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
              Listado de inscritos academia
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
          <div className="relative justify-start flex-1 hidden xl:flex my-4 mx-2">
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
