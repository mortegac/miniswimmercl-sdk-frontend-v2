import {useEffect, useState, Fragment} from "react";
import _ from "lodash";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import {
  formatCurrency,
} from "@/utils/helper";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
import { Menu, Popover } from "@/components/Base/Headless";
import users from "@/fakers/users";


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';
import { getLocationsOnly, selectLocation } from "@/stores/Locations/slice";
import { getCourses, setCourseidSelected, selectCourse } from "@/stores/Courses/slice";
import { getSessionDetails, selectSessionDetails, setSessionDetails, getSessionByLocationAndDate } from "@/stores/SessionDetails/slice";


const typeOfCourse: any = {
  [""]: "",
  ["ADULTS"]: "Adultos",
  ["CHILDREN"]: "Niños",
  ["BABIES"]: "Bebés",
};
const typeOfAge: any = {
  [""]: "",
  ["MONTHS"]: "Meses",
  ["YEARS"]: "Años",
};

function changeTypeAge(name:string){
  return typeOfAge[String(name)] || typeOfAge[""];
}
function changeName(name:string){
  return typeOfCourse[String(name)] || typeOfCourse[""];
}
const dayOrder: { [key: string]: number } = {
  'LUNES': 1,
  'MARTES': 2,
  'MIERCOLES': 3,
  'JUEVES': 4,
  'VIERNES': 5,
  'SABADO': 6,
  'DOMINGO': 7
};

import Card from "./components/Card";
let currentGroupById:string | null = null;
// function Content(props: any) {
//   const { data, status } = props;

//   // Asumimos que data ya está ordenado por locationCoursesId
//   let currentLocationId:string | null = null;

//   return (
//     <>
//     <div key="COURSES-LIST" className="flex justify-start flex-row flex-wrap">
// {Array.isArray(data) &&
//         [...data]
//           .sort((a, b) => {
//             const nameCompare = a.locationCoursesId.localeCompare(b.locationCoursesId);
//             // Si los nombres son iguales, ordenar por apellido
//             if (nameCompare === 0) {
//               return a.id.localeCompare(b.id);
//             }
//             return nameCompare;
            
            
//             // return a.locationCoursesId.localeCompare(b.locationCoursesId);
//             // return a.AgeGroupType.localeCompare(b.AgeGroupType);
//           })
//           .map((item: any, i: number) => {
//           const showLocationId = item.locationCoursesId !== currentLocationId;
//           if (showLocationId) {
//             currentLocationId = item.locationCoursesId;
//           }

//           return (
//             <Fragment key={`${i}-COURSES`}>
//               {showLocationId && (
//                 <div className="flex-1">
//                    <h2 className="mt-3 text-xl font-medium leading-none text-slate-600 dark:text-slate-500">
//                    {item.locationCoursesId}</h2>
//                 </div>
//               )}
//                 <Card courses={item} locationId={item.locationCoursesId} status={status}/>
//             </Fragment>
//           );
//         })}
//         </div>
//     </>
//   );
// }

function Locations(props: any) {
  const { data } = props;
  const {courses, status, courseidSelected } = useAppSelector(selectCourse);
  
  const dispatch = useAppDispatch();
  
  const handleLocationClick = (locationId: string) => {
    dispatch(setCourseidSelected(locationId));
    dispatch(getCourses({isActive:true, locationId:locationId}));
    console.log('Location selected:', locationId);
  };
  
  return(
    <>
    
    {/* <div className="flex flew-row flex-wrap">
      {Array.isArray(data) &&
        data.map((item: any, i: number) => <LocationsCard key={`${i}-CARD-LOCATIONS`} location={item} />)}
    </div> */}
     <div className="flex flex-col p-5 box">
        <div className="grid grid-cols-4 gap-5">     
            
            {/* {Array.isArray(data) && data.map((item: any, i: number) =>  */}
            {Array.isArray(data) && [...data].sort((a, b) => {
                const groupA = a?.group || '';
                const groupB = b?.group || '';
                return groupA.localeCompare(groupB);
              })
              .map((item: any, i: number) => {
                const showGroupById = item.group !== currentGroupById;
                if (showGroupById) {
                  currentGroupById = item.group;
                }
            return (
              <>
               { showGroupById &&
                          <div className="w-full bg-slate-100 flex items-center justify-center">
                            {/* <p className="text-sm font-medium leading-none text-slate-600 uppercase"> */}
                            <b className="font-thin">{item?.region}</b>
                            {/* </p> */}
                          </div>
                }
                <Button
                  key={`${i}-CARD-LOCATIONS`}
                  variant="outline-secondary"
                  className={` ${courseidSelected === item?.id && "bg-green-200"} col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors`}
                  onClick={() => handleLocationClick(item?.id)}
                >
                  <div className="text-base text-slate-500 uppercase text-left">
                    <h3>{item?.name}</h3>
                    <p className="text-[.6rem]"> <span className=" font-thin">{item?.city}</span></p>
                  </div>
                </Button>
              </>
          )}
          )
        }
            
          </div>
        </div>
        
        {/* <pre>{JSON.stringify(data, null, 2 )}</pre> */}
    </>
  )
}

function List(props: any) {
  const { data, locationId } = props;
  
  const {courses, status, courseidSelected } = useAppSelector(selectCourse);
  const dispatch = useAppDispatch();
    
  // useEffect(() => { (async () => await dispatch(getCourses({isActive:true, locationId:locationId})))(); }, []);
  
  return(
    <>
    <div className="overflow-auto xl:overflow-visible">
            <Table className="border-b border-slate-200/60">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td className="w-20 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                    Curso
                  </Table.Td>
                  <Table.Td className="w-20 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                    Horarios
                  </Table.Td>
                  <Table.Td className="w-20 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                    Pack Sesiones
                  </Table.Td>
                 
                  {/* <Table.Td className="w-20 py-4 font-medium text-center border-t bg-slate-50 border-slate-200/60 text-slate-500">
                    Action
                  </Table.Td> */}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {Array.isArray(courses) && courses.map((item, index) => (
                  <>
                    <Table.Tr key={index} className="[&_td]:last:border-b-0">
                      <Table.Td className="w-20 py-4 border-dashed ">
                        <>
                          <p className="uppercase font-medium">{item.title}</p>
                          <p className="text-slate-300">{item?.id}</p>  
                          <div className="flex flex-row justify-start items-start my-2">
                            <i className="h-full flex flex-row  mr-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.53846C10.1472 3.53846 8.64516 5.03085 8.64516 6.8718C8.64516 8.71274 10.1472 10.2051 12 10.2051C13.8528 10.2051 15.3548 8.71274 15.3548 6.8718C15.3548 5.03085 13.8528 3.53846 12 3.53846ZM7.09677 6.8718C7.09677 4.18118 9.29202 2 12 2C14.708 2 16.9032 4.18118 16.9032 6.8718C16.9032 9.56241 14.708 11.7436 12 11.7436C9.29202 11.7436 7.09677 9.56241 7.09677 6.8718Z" fill="#AE5EAB"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.46618 15.3333C7.30244 15.3333 5.54839 17.0761 5.54839 19.226C5.54839 19.3389 5.56915 19.4186 5.59092 19.465C5.60929 19.5041 5.62506 19.5153 5.63821 19.5224C6.23988 19.8477 7.92682 20.4615 12 20.4615C16.0732 20.4615 17.7601 19.8477 18.3618 19.5224C18.3749 19.5153 18.3907 19.5041 18.4091 19.465C18.4309 19.4186 18.4516 19.3389 18.4516 19.226C18.4516 17.0761 16.6976 15.3333 14.5338 15.3333H9.46618ZM4 19.226C4 16.2265 6.44729 13.7949 9.46618 13.7949H14.5338C17.5527 13.7949 20 16.2265 20 19.226C20 19.7766 19.7994 20.4966 19.1019 20.8737C18.1779 21.3733 16.1959 22 12 22C7.80414 22 5.82206 21.3733 4.89812 20.8737C4.20063 20.4966 4 19.7766 4 19.226Z" fill="#AE5EAB"/>
                            </svg>
                            </i>
                            <p>
                            {changeName(item.AgeGroupType)}
                            </p>
                                                 
                          </div>
                          <div className="flex flex-row justify-start items-start w-full my-2">
                            <i className="h-full flex flex-row  mr-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.53846C10.1472 3.53846 8.64516 5.03085 8.64516 6.8718C8.64516 8.71274 10.1472 10.2051 12 10.2051C13.8528 10.2051 15.3548 8.71274 15.3548 6.8718C15.3548 5.03085 13.8528 3.53846 12 3.53846ZM7.09677 6.8718C7.09677 4.18118 9.29202 2 12 2C14.708 2 16.9032 4.18118 16.9032 6.8718C16.9032 9.56241 14.708 11.7436 12 11.7436C9.29202 11.7436 7.09677 9.56241 7.09677 6.8718Z" fill="#AE5EAB"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.46618 15.3333C7.30244 15.3333 5.54839 17.0761 5.54839 19.226C5.54839 19.3389 5.56915 19.4186 5.59092 19.465C5.60929 19.5041 5.62506 19.5153 5.63821 19.5224C6.23988 19.8477 7.92682 20.4615 12 20.4615C16.0732 20.4615 17.7601 19.8477 18.3618 19.5224C18.3749 19.5153 18.3907 19.5041 18.4091 19.465C18.4309 19.4186 18.4516 19.3389 18.4516 19.226C18.4516 17.0761 16.6976 15.3333 14.5338 15.3333H9.46618ZM4 19.226C4 16.2265 6.44729 13.7949 9.46618 13.7949H14.5338C17.5527 13.7949 20 16.2265 20 19.226C20 19.7766 19.7994 20.4966 19.1019 20.8737C18.1779 21.3733 16.1959 22 12 22C7.80414 22 5.82206 21.3733 4.89812 20.8737C4.20063 20.4966 4 19.7766 4 19.226Z" fill="#AE5EAB"/>
                            </svg>
                            </i>
                            <p>
                              {item?.startingAge} - {item?.endingAge} {changeTypeAge(item?.ageType)}
                            </p>                           
                          </div>
                          <div className="flex flex-row justify-start items-start w-full my-2">
                            <i className="h-full flex flex-row  mr-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.8284 6.75736C12.3807 6.75736 12.8284 7.20507 12.8284 7.75736V12.7245L16.3553 14.0653C16.8716 14.2615 17.131 14.8391 16.9347 15.3553C16.7385 15.8716 16.1609 16.131 15.6447 15.9347L11.4731 14.349C11.085 14.2014 10.8284 13.8294 10.8284 13.4142V7.75736C10.8284 7.20507 11.2761 6.75736 11.8284 6.75736Z" fill="#AE5EAB"/>
                            </svg>

                            </i>
                            <p>
                            {item?.duration} minutos
                            </p>                           
                          </div>
                          <div className="flex flex-row justify-start items-start w-full my-2">
                            <i className="h-full flex flex-row  mr-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6ZM12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#AE5EAB"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0901 22.5958C11.2059 22.6753 11.2981 22.7366 11.3626 22.7788L11.4687 22.8472C11.7933 23.0504 12.2061 23.0508 12.5307 22.8476L12.6375 22.7788C12.7019 22.7366 12.7941 22.6753 12.9099 22.5958C13.1415 22.4367 13.4685 22.2041 13.8591 21.9041C14.6386 21.3054 15.6801 20.4322 16.7247 19.3336C18.7857 17.1661 21 13.9725 21 10.1818C21 7.75381 20.0571 5.42084 18.3719 3.69728C16.6859 1.97296 14.3943 1 12 1C9.60571 1 7.31415 1.97296 5.62814 3.69728C3.94288 5.42084 3 7.75381 3 10.1818C3 13.9725 5.21434 17.1661 7.27531 19.3336C8.31993 20.4322 9.36136 21.3054 10.1409 21.9041C10.5315 22.2041 10.8585 22.4367 11.0901 22.5958ZM12 3C10.1508 3 8.37273 3.75107 7.05815 5.09552C5.74283 6.44073 5 8.26992 5 10.1818C5 13.2007 6.78566 15.9162 8.72469 17.9554C9.68007 18.9602 10.6386 19.7646 11.3591 20.3179C11.6046 20.5065 11.8215 20.6651 12 20.7918C12.1785 20.6651 12.3954 20.5065 12.6409 20.3179C13.3614 19.7646 14.3199 18.9602 15.2753 17.9554C17.2143 15.9162 19 13.2007 19 10.1818C19 8.26992 18.2572 6.44073 16.9418 5.09552C15.6273 3.75107 13.8492 3 12 3Z" fill="#AE5EAB"/>
                            </svg>
                            </i>
                            <p>
                            {item?.locationCoursesId} 
                            </p>                           
                          </div>
                        </>
                      </Table.Td>
                      <Table.Td className="w-20 border-dashed">
                        <div className="w-56">
                          <div className="text-xs text-slate-500 flex flex-col min-w-56">
                           {Array.isArray(item?.schedules?.items) && 
                           [...item?.schedules?.items].sort((a, b) => {
                            return (dayOrder[a.day] || 0) - (dayOrder[b.day] || 0)
                          })
                          .map((schedule:any, i:number)=>{
                            return ( 
                            <>
                              <Button
                                key={`${i}-CARD-Schedules`}
                                variant="outline-secondary"
                                className={`min-w-64  bg-slate-50 border border-dashed rounded-[0.6rem] border-slate-300/80 shadow-sm hover:bg-slate-50 transition-colors mb-4`}
                                // onClick={() => handleLocationClick(item?.id)}
                              >
                                <div className="">
                                  <p className="text-left text-lg mb-4">
                                    <b className=" uppercase ">{schedule?.day}</b> {schedule?.startHour}
                                  </p>
                                  <p className="text-left">
                                  {schedule?.minimumQuotas} min | {schedule?.maximumQuotas} max
                                  </p>
                                  <p className="text-slate-300">{schedule?.id}</p>
                                </div>
                              </Button>
                            </>)
                           })}
                          </div>
                          <Button
                            // key={`${x}-CARD-sessionType`}
                            // variant="outline-secondary"
                            className={`bg-slate-200 min-w-64 p-3 mb-2 border rounded-[0.6rem]  shadow-sm hover:bg-primary hover:text-white  transition-colors uppercase`}
                            // onClick={() => handleLocationClick(item?.id)}
                          >
                            Nuevo Horario
                          </Button>
                        </div>
                      </Table.Td>
                      <Table.Td className="w-20 py-4 border-dashed">
                        <div className="w-56">
                          <div className="text-xs text-slate-500">
                           {Array.isArray(item?.sessionTypes?.items) && 
                           [...item?.sessionTypes?.items].sort((a:any, b:any) => {
                            const ad = Number(a.sessionType.totalSessions);
                            const bd = Number(b.sessionType.totalSessions);
                            return ad > bd ? -1 : ad < bd ? 1 : 0;
                          })
                          .map((sessionType:any, x:number)=>{
                            return ( 
                            <>
                              <p className="text-slate-300">{sessionType?.sessionType?.id}</p>
                              <p className="text-slate-300">{sessionType?.id}</p>
                              <Button
                                key={`${x}-CARD-sessionType`}
                                variant="outline-secondary"
                                className={`min-w-64 col-span-4 md:col-span-2 xl:col-span-1 p-3 mb-2 border border-dashed rounded-[0.6rem] border-slate-300/80 shadow-sm hover:bg-slate-50  transition-colors`}
                                // onClick={() => handleLocationClick(item?.id)}
                              >
                                <div className="w-full">
                                  <p className="text-left w-full">
                                    <b className=" uppercase">{sessionType?.sessionType?.name}</b>
                                  </p>
                                  <p className="flex justify-between items-center mt-2">
                                    <span className="w-8 h-8 mr-2 text-xs text-slate-700 rounded-full bg-slate-200 px-2 py-2">{sessionType?.sessionType?.totalSessions}</span>
                                    <span className="px-2 py-1 mr-1 text-lg text-primary">$ {formatCurrency(sessionType?.sessionType?.amount)}</span>
                                  </p>
                                  
                                  
                                </div>
                              </Button>
                            </>)
                           })}
                          </div>
                          <Button
                            // key={`${x}-CARD-sessionType`}
                            // variant="outline-secondary"
                            className={`bg-slate-200 min-w-64 p-3 mb-2 border rounded-[0.6rem]  shadow-sm hover:bg-primary hover:text-white  transition-colors uppercase`}
                            // onClick={() => handleLocationClick(item?.id)}
                          >
                            Nuevo Pack de sesiones
                          </Button>
                        </div>
                      </Table.Td>
                    
                      {/* <Table.Td className="relative py-4 border-dashed">
                        <div className="flex items-center justify-center">
                          <Menu className="h-5">
                            <Menu.Button className="w-5 h-5 text-slate-500">
                              <Lucide
                                icon="MoreVertical"
                                className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                              />
                            </Menu.Button>
                            <Menu.Items className="w-40">
                              <Menu.Item>
                                <Lucide
                                  icon="CheckSquare"
                                  className="w-4 h-4 mr-2"
                                />{" "}
                                Edit
                              </Menu.Item>
                              <Menu.Item className="text-danger">
                                <Lucide
                                  icon="Trash2"
                                  className="w-4 h-4 mr-2"
                                />
                                Delete
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </div>
                      </Table.Td> */}
                    </Table.Tr>
                    {/* <pre>{JSON.stringify(item, null, 2 )}</pre> */}
                  </>
                ))}
              </Table.Tbody>
            </Table>
          </div>
    </>
  )
}

function Content(props: any) {
  const { data } = props;
  const {courseidSelected, status } = useAppSelector(selectCourse);
  return (
  <>
    
      
      
      <div className="flex flex-col gap-8 mt-3.5">
        <Locations data={data}/>
        <div className="flex flex-col box">
           { status === "loading" &&   <LoadingIcon
          color="white"
          icon="oval"
          className="w-10 h-10 mt-10"
        />}
        { status === "idle" && courseidSelected && <List locationId={courseidSelected}/>}
        
        </div>
      </div>
      

  </>
  );
}


function Main() {
  const {locations, status } = useAppSelector(selectLocation);
  const dispatch = useAppDispatch();
  
  useEffect(() => { (async () => await dispatch(getLocationsOnly("CHILE")))(); }, []);

  return (
    <>
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Listado de Cursos
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button
              variant="primary"
              className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            >
              <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />{" "}
              Crear nuevo curso
            </Button>
          </div>
        </div>
    
        <Content data={locations}/>
      
      </div>
    </div>
  </>
  );
}

export default Main;
