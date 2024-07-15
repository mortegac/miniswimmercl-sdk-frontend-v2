import {useEffect} from "react";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";



import LocationsCard from "./components/LocationsCard";
import { useAppSelector, useAppDispatch } from "../../../stores/hooks";
import { getCourses, selectCourse } from "../../../stores/Courses/slice";


import LoadingIcon from "@/components/Base/LoadingIcon";






function Content(props: any) {
  const { data } = props;
  return (
    <div className="grid grid-cols-12 gap-6">
      {Array.isArray(data) &&
        data.map((item: any, i: number) => <LocationsCard key={`${i}-COURSES`} courses={item} />)}
    </div>
  );
}


function Main() {
  
  const {courses, status } = useAppSelector(selectCourse);
  const dispatch = useAppDispatch();
  
  
  useEffect(() => { (async () => await dispatch(getCourses()))(); }, []);

  

  return (
    <>
     {/* <pre>{JSON.stringify(courses[0], null, 2)}</pre> */}
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className=" text-base font-medium group-[.mode--light]:text-white">
              Listado de Cursos
            </div>
            <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
              <Button
                rounded
                variant="primary"
                className="px-8 py-3 border border-slate-200"
              >
                <Lucide icon="Plus" className="w-6 h-6 mr-2" />{" "}
                <span className="text-border-slate-200">Nuevo Curso</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-8 mt-8">
        
            <div className="flex flex-col px-8 py-4">
              <div className="overflow-auto xl:overflow-visible flex justify-cenmter items-center">
                
              { status === "loading" &&   <LoadingIcon
                    color="white"
                    icon="oval"
                    className="w-10 h-10 mt-10"
                  />}
              { status === "idle" && <Content data={courses}/>}
              
              
              
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
