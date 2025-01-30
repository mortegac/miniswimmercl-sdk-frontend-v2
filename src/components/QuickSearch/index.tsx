import { Fragment, useState, useEffect } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import _ from "lodash";


import LoadingIcon from "@/components/Base/LoadingIcon";
import Lucide from "@/components/Base/Lucide";
import { FormInput } from "@/components/Base/Form";
import { typeOfRelationship } from "@/utils/dictionary";
import { calcularEdad, convertirFecha } from "@/utils/dateHandler";



import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getStudentsSearchName,  selectStudent } from "@/stores/Students/slice";
import { getApoderadoSearchName,  selectAuth } from "@/stores/Users/slice";
import Button from '@/components/Base/Button';

interface MainProps {
  quickSearch: boolean;
  setQuickSearch: (val: boolean) => void;
}


function ApoderadosSearchList(props:any) {
  
  const {list, searchText,} = props;
  const dispatch = useAppDispatch();
  
    
  const simulateEscKey = () => {
    // Crear un nuevo evento de teclado
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      which: 27,
      bubbles: true,
      cancelable: true
    });
    
    // Disparar el evento
    document.dispatchEvent(event);
  };
  
  const highlightText = (text:string, search:string) => {
    if (!search) return text;
    
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === search.toLowerCase() 
        ? <span key={index} className="bg-yellow-200">{part}</span>
        : part
    );
  };
    
   return(
    <>
          {/* <pre>{JSON.stringify(searchText, null, 2 )}</pre> */}
              {Array.isArray(list) &&
        [...list]
          .sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name);
            // Si los nombres son iguales, ordenar por apellido
            if (nameCompare === 0) {
              return a.lastName.localeCompare(b.lastName);
            }
            return nameCompare;
          })
          .map((item: any, index) => {
            const fullName = `${item?.name}`;
            const edad = item?.birthdate && calcularEdad(String(item?.birthdate === "" ? "1800/01/01":item?.birthdate));
  
          return (
          // <Link
          //     to="/admin-student"
          //     state={{ id: item?.id }}
          //     onClick={()=>simulateEscKey()}
          //     className="col-span-12 sm:col-span-6 xl:col-span-4 intro-y "
          //   >
            
            <div className="flex flex-col">
              <div className="flex items-center justify-start">
                <div className="flex items-center justify-center w-6 h-6 overflow-hidden border rounded-md zoom-in border-green-400 box bg-green-700/10">
                <Lucide
                  icon="User"
                  className="w-3.5 h-3.5 stroke-[1.3] text-green-500"
                />
                </div>
                {/* <div className="font-medium truncate"> */}
                  <p className=" font-thin  text-base truncate ml-3">{highlightText(fullName, searchText)}</p>
                {/* </div> */}
                <span className="hidden text-slate-500 sm:block  ml-3">
                {item?.email}
                </span>
              </div>
              
              <div className="flex items-center flex-row justify-start">
                {Array.isArray(item?.relationships?.items) &&
                  item?.relationships?.items.map(
                    (relation: any, i: any) => (
                      <Link
                      key={`STUDENT-${i}`}
                        to="/admin-student"
                        state={{ id: relation?.student?.id }}
                        onClick={()=>simulateEscKey()}
                        className="col-span-12 sm:col-span-6 xl:col-span-4 intro-y "
                      >
                      <p className="font-medium text-base text-left text-slate-10 border m-2 px-6 py-3 rounded-full bg-primary/15">
                      
                        {`${relation?.student?.name} ${relation?.student?.lastName}`}{" "}
                        <span className="mt-1  text-left ">
                        {relation?.student?.birthdate}{" "}
                        </span>
                      </p>
                      </Link>
                    )
                  )}
              </div>
              
              
            </div>
          );
        })}
        {/* </a> */}
    </>
   )
}
function StudentSearchList(props:any) {
  
  const {list, searchText,} = props;
  const dispatch = useAppDispatch();
  
    
  const simulateEscKey = () => {
    // Crear un nuevo evento de teclado
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      which: 27,
      bubbles: true,
      cancelable: true
    });
    
    // Disparar el evento
    document.dispatchEvent(event);
  };
  
  const highlightText = (text:string, search:string) => {
    if (!search) return text;
    
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === search.toLowerCase() 
        ? <span key={index} className="bg-yellow-200">{part}</span>
        : part
    );
  };
    
   return(
    <>
          {/* <pre>{JSON.stringify(searchText, null, 2 )}</pre> */}
              {Array.isArray(list) &&
        [...list]
          .sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name);
            // Si los nombres son iguales, ordenar por apellido
            if (nameCompare === 0) {
              return a.lastName.localeCompare(b.lastName);
            }
            return nameCompare;
          })
          .map((item: any, index) => {
            const fullName = `${item?.name} ${item?.lastName}`;
            const edad = item?.birthdate && calcularEdad(String(item?.birthdate === "" ? "1800/01/01":item?.birthdate));
  
          return (
          //   <a
          //   href=""
          //   key={index}
          //   className="mb-4 flex items-center justify-between gap-2.5 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 p-1 rounded-md"
          // >
          <Link
              to="/admin-student"
              state={{ id: item?.id }}
              onClick={()=>simulateEscKey()}
              className="col-span-12 sm:col-span-6 xl:col-span-4 intro-y "
            >
            
            <div className="flex flex-col">
              <div className="flex items-center justify-start">
                <div className="flex items-center justify-center w-6 h-6 overflow-hidden border rounded-md zoom-in border-theme-1/10 box bg-theme-1/10">
                <Lucide
                  icon="User"
                  className="w-3.5 h-3.5 stroke-[1.3] text-theme-1"
                />
                </div>
                {/* <div className="font-medium truncate"> */}
                  <p className="font-medium text-lg truncate ml-3">{highlightText(fullName, searchText)}</p>
                {/* </div> */}
                <span className="hidden text-slate-500 sm:block  ml-3">
                { item?.birthdate && edad.años > 100 ? "SIN EDAD":`${edad?.años || ""} años, ${edad?.meses || ""} meses`}
                </span>
              </div>
              
              <div className="flex items-center flex-row justify-start">
                {Array.isArray(item?.relationships?.items) &&
                  item?.relationships?.items.map(
                    (relation: any, i: any) => (
                      <p className=" font-thin text-sm text-left text-slate-10 border rounded-xl m-2 px-4">
                        <span className=" text-left  font-mono">
                          {typeOfRelationship[relation?.relationType]}
                        </span>{" "}
                        {relation?.user?.name}{" "}
                        <span className="mt-1  text-left ">
                          {relation?.user?.id}{" "}
                        </span>
                      </p>
                    )
                  )}
              </div>
              
              
            </div>
            </Link>
          );
        })}
        {/* </a> */}
    </>
   )
}
// Hook personalizado para debounce
const useDebounce = (value:string, delay:number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    // Configurar el timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timer en cada cambio
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

function Main(props: MainProps) {
  // const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [whoFind, setWhoFind] = useState("students");  //students - users

  
  const dispatch = useAppDispatch();
  const [searchTermStudent, setSearchTermStudent] = useState("");
  const debouncedSearchTerm = useDebounce(searchTermStudent, 500); // 500ms de delay

  const { students, status } = useAppSelector(selectStudent);
  const { apoderados, status: statusApoderados  } = useAppSelector(selectAuth);
  
  // const handleSearchChangeStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const term = event.target.value;
  //   setSearchTermStudent(term);
    
    
  //   dispatch(getStudentsSearchName({ 
  //     name: term,
  //   }))
  
  // };
  

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Aquí va tu llamada a la API
      whoFind==="students" && dispatch(getStudentsSearchName({ 
        name: searchTermStudent,
      }))
      whoFind==="users" && dispatch(getApoderadoSearchName({ 
        name: searchTermStudent,
      }))
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);
  
  useEffect(() => {
    document.onkeydown = function (evt) {
      if (evt.key === "Escape" || evt.key === "Esc") {
        props.setQuickSearch(false);
      } else if ((evt.ctrlKey || evt.metaKey) && evt.key === "k") {
        props.setQuickSearch(true);
      }
    };
  }, []);
  // useEffect(() => {
  //   setSearchTermStudent("")
  // }, []);

  return (
    <>
      <Transition appear show={props.quickSearch} as={Fragment}>
        <HeadlessDialog
          as="div"
          className="relative z-[60]"
          onClose={props.setQuickSearch}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gradient-to-b from-theme-1/50 via-theme-2/50 to-black/50 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center my-2 sm:mt-40">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-50"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in-out duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <HeadlessDialog.Panel className="sm:w-[600px] lg:w-[700px] w-[95%] relative mx-auto transition-transform">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center w-12">
                      <Lucide
                        icon="Search"
                        className="w-5 h-5 -mr-1.5 text-slate-500 stroke-[1]"
                      />
                    </div>
                    <FormInput
                      className="pl-12 pr-14 py-3.5 text-base rounded-lg focus:ring-0 border-0 shadow-lg"
                      type="text"
                      placeholder="Búsqueda rápida..."
                      value={searchTermStudent}
                      // onChange={handleSearchChangeStudents}
                      onChange={(e)=>{
                        setSearchTermStudent(e.target.value)
                        setIsSearching(true)
                      }
                      }
                      // value={search}
                      // onChange={(e) => {
                      //   setSearch(e.target.value);
                      // }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center w-14">
                      <div className="px-2 py-1 mr-auto text-xs border rounded-[0.4rem] bg-slate-100 text-slate-500/80">
                        ESC
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 pb-1 mt-1 bg-white rounded-lg shadow-lg max-h-[468px] sm:max-h-[615px] overflow-y-auto">
                    {students.length === 0 ? (
                      <div className="flex flex-col items-center justify-center pt-20 pb-28">
                        <Lucide
                          icon="SearchX"
                          className="w-20 h-20 text-theme-1/20 fill-theme-1/5 stroke-[0.5]"
                        />
                        <div className="mt-5 text-xl font-medium">
                          No se encontrarón coincidencias
                        </div>
                        <div className="w-2/3 mt-3 leading-relaxed text-center text-slate-500">
                        No se encontrarón coincidencias para{" "}
                          <span className="italic font-medium">"{searchTermStudent}</span>
                          ". Intente con un término de búsqueda diferente o verifique su ortografía.
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="px-5 py-4">
                          <div className="flex items-center">
                            <div className="text-xs uppercase text-slate-500">
                              A quién necesita buscar...
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3.5">
                            <Button
                            className={`px-4 rounded-full ${whoFind==="students" && "bg-primary text-white"}`}
                            onClick={()=>{
                              setWhoFind("students")
                              setSearchTermStudent("")
                            }}
                            >
                              <Lucide
                                  icon="UsersRound"
                                  className="w-4 h-4 stroke-[1.3]"
                                />
                                <span className="ml-4">Alumnos</span>
                            </Button>
                            <Button
                            className={`px-4 rounded-full ${whoFind==="users" && "bg-primary text-white"}`}
                            onClick={()=>{
                              setWhoFind("users")
                              setSearchTermStudent("")
                            }}
                            >
                              <Lucide
                                  icon="Users"
                                  className="w-4 h-4 stroke-[1.3]"
                                />
                                <span className="ml-4">Apoderados</span>
                            </Button>
                          </div>
                        </div>
                        <div className="px-5 py-4 border-t border-dashed">
                          <div className="flex items-center">
                            <div className="text-xs uppercase text-slate-500">
                            Alumnos
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 mt-3.5">
                            
                            
                            
                            
                          {isSearching || status === "loading" && (
                            <div className="flex justify-center">
                              <div className="w-16 h-16">
                                <LoadingIcon
                                  color="#AE5EAB"
                                  icon="three-dots"
                                  className="w-10 h-10 mt-10"
                                />
                              </div>
                            </div>
                          )}
                          
                          {whoFind==="students" && status === "idle" &&
                            <StudentSearchList 
                              list={students} searchText={searchTermStudent}
                            />
                          }
                          {whoFind==="users" && status === "idle" &&
                          <>
                            <ApoderadosSearchList 
                              list={apoderados} searchText={searchTermStudent}
                            />
                              {/* <pre>{JSON.stringify(apoderados, null, 2)}</pre> */}
                          </>
                          }
                          </div>
                        </div>
                        {/* <div className="px-5 py-4 border-t border-dashed">
                          <div className="flex items-center">
                            <div className="text-xs uppercase text-slate-500">
                              Apoderados
                            </div>
                            <a
                              className="ml-auto text-xs text-slate-500"
                              href=""
                            >
                              Ver Todos
                            </a>
                          </div>
                          <div className="flex flex-col gap-1 mt-3.5">
                            {_.take(departments.fakeDepartments(), 3).map(
                              (faker, fakerKey) => (
                                <a
                                  href=""
                                  key={fakerKey}
                                  className="flex items-center gap-2.5 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 p-1 rounded-md"
                                >
                                  <div className="flex items-center justify-center w-6 h-6 overflow-hidden border rounded-md zoom-in border-theme-1/10 box bg-theme-1/10">
                                    {_.random(0, 1) ? (
                                      <Lucide
                                        icon="Store"
                                        className="w-3.5 h-3.5 stroke-[1.3] text-theme-1"
                                      />
                                    ) : (
                                      <Lucide
                                        icon="Hotel"
                                        className="w-3.5 h-3.5 stroke-[1.3] text-theme-1"
                                      />
                                    )}
                                  </div>
                                  <div className="font-medium truncate">
                                    {faker.name}
                                  </div>
                                  <div className="hidden text-slate-500 sm:block">
                                    {faker.location.name}
                                  </div>
                                </a>
                              )
                            )}
                          </div>
                        </div> */}
                       
                      </div>
                    )}
                  </div>
                </HeadlessDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessDialog>
      </Transition>
    </>
  );
}

export default Main;
