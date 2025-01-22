import React, { useState, useEffect, useRef } from "react";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";
import Toastify from "toastify-js";


import Notification from "@/components/Base/Notification";
import { NotificationElement } from "@/components/Base/Notification";
import { HeaderTitle } from "./HeaderTitle";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
// import ListParams from "@/components/ListParams";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectEnrollment, setDataUser, increment, cleanData} from "@/stores/Enrollment/slice";
import { selectAuth, getUser, setApoderado, cleanDataUser} from "@/stores/Users/slice";
import { selectRelationships, getRelationships} from "@/stores/Relationships/slice";
import Card from "./Card";
interface Props {
  students?: any;  
}

const RelationList: React.FC<Props> = ({students}) => {
  return(
    <>
    {/* <pre>{JSON.stringify(students.items, null, 2 )}</pre> */}
    
        <div key="STUDENT-LIST"  className="flex justify-between intro-y" >          
          {/* {
            students.items[0]?.student?.id && Array.isArray(students) && students.length === 0 && 
              <div className="w-full text-center h-fit mt-8">
                <span className="text-lg mr-4 text-slate-400">😴</span>{" "}
                <span className="text-lg">Sin registros encontrados</span>
              </div>
          } */}
          { Array.isArray(students.items) &&
                students.items.map((item: any, i: number) => <>
                {/* <pre>item = {JSON.stringify(item, null, 2 )}</pre> */}
                  <Card key={`${i}-STUDENTS-RELATIONSHIP`} student={item} />
                </>
                  
          )}
        </div>
      </>
    )
}
{/* <pre>{JSON.stringify(item, null, 2)}</pre> */}


export const FormStep01 = ({ onChangeSetStore }: any) => {
  const [message, setMessage] = useState({ type:"error", title:"Error", description:"Debe ingresar todos los datos del Apoderado"})

  const {enrollment, status}= useAppSelector(selectEnrollment);
  const user = useAppSelector(selectAuth);
  const {id, name, email, users }= useAppSelector(selectAuth);
  const {
    guardianId,
    guardianEmail,
    guardianName,
    guardianPhone,
    guardianRelation,
  } = enrollment;
  const dispatch = useAppDispatch();

  // const handleBlur = () => {
  //   // Aplicamos trim cuando el input pierde el foco
  //   const trimmed = value.trim();
  //   setValue(trimmed);
  //   setTrimmedValue(trimmed);
  // };
  
  async function getDataUser(email:string){ 
    // console.log("---getDataUser---", email)
    email !== "" && await dispatch(getUser({userEmail:email.trim().toLowerCase()}))
  }
  
  async function dataValidate(){ 
    // alert(guardianId)
    
    if(guardianId){
      dispatch(increment())
      
    }else{
 
      if(guardianName ==="" || guardianEmail ===""){
        const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
        successEl.classList.remove("hidden");
        Toastify({
          node: successEl,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      }else{
        await Promise.all([
          await dispatch(setApoderado({
            userEmail:guardianEmail,
            name:guardianName
          })),
          
          await getDataUser(guardianEmail || ""),
          dispatch(increment()),  
        ]);
      }
      
    }
    
  }
  
    // Success notification
    const successNotification = useRef<NotificationElement>();
    const successNotificationToggle = () => successNotification.current?.showToast();

  useEffect(() => { (async () =>{ 
    id ==="" ? await dispatch(setDataUser({id:"", email:"", name:"" })): await dispatch(setDataUser({id, email, name }))    
  
  })(); }, [id]);
  

  
  return (
    <>
    
    {/* <pre>guardianId = {JSON.stringify(enrollment)}</pre> */}
    {/* 
    <pre>guardianEmail = {JSON.stringify(guardianEmail)}</pre> */}
    <Notification
        id="success-notification-content"
        className="flex hidden"
      >
        <Lucide icon={"XCircle"} className="text-red-400 w-10 h-10" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Faltan datos</div>
          <div className="mt-1 text-slate-500">
            Debe ingresar el email y nombre del apoderados para continuar
          </div>
        </div>
      </Notification>
      
      <HeaderTitle
        title={`Información del Apoderado`}
        description={""}
      />
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Email</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Requerido
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
            
          { guardianId === "" &&
           <FormInput
              type="text"
              tabIndex={1} 
              className="px-6 py-3 rounded-full mr-8 focus:z-10"
              placeholder={"josefina@swimmer.com"}
              aria-describedby="guardianEmail"
              name="guardianEmail"
              value={guardianEmail}
              onChange={onChangeSetStore}
              onBlur={(e:any)=>getDataUser(e.target.value)}
              onKeyDown={(e:any) => {
                if (e.key === "Enter")
                  getDataUser(e.target.value)
                }}
            />
          }
          { guardianId && guardianId !== "" && <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianEmail}</h2> }
        
          </div>
        </div>
      </div>
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Nombre Apoderado</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Requerido
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
          { guardianId === "" &&
            <FormInput
              type="text"
              tabIndex={2} 
              className="px-6 py-3 rounded-full mr-8 focus:z-12"
              placeholder={"Josefina"}
              aria-describedby="guardianName"
              name="guardianName"
              value={guardianName}
              onChange={onChangeSetStore}
            />
          }
          { guardianId && guardianId !== "" && <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianName}</h2> }
          </div>
        </div>
      </div>
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Teléfono</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Requerido
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
          { guardianId === "" &&
            <FormInput
              type="text"
              tabIndex={3} 
              className="px-6 py-3 rounded-full mr-8 focus:z-12"
              placeholder={"+569999999999"}
              aria-describedby="guardianPhone"
              name="guardianPhone"
              value={guardianPhone}
              onChange={onChangeSetStore}
            />
          }
          { guardianId && guardianId !== "" && <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianName}</h2> }
          </div>
        </div>
      </div>
      
      <div className="flex flex-row justify-between  pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <Button onClick={async ()=>await Promise.all([
            dispatch(cleanData()),
            dispatch(cleanDataUser())               
            ])
          } 
          rounded variant="soft-primary" className="border border-primary px-4 py-3 focus:z-2">
          <Lucide icon="Delete" className="w-5 h-5 text-primary" />
          <span className="ml-2">Limpiar</span>
        </Button>
        <Button
              rounded
              variant="primary"
              className="border border-slate-200 px-4 py-3"
              onClick={()=>dataValidate()}
              
              
            >
              <Lucide icon="Plus" className="w-6 h-6 mr-2" />{" "}
              { guardianId === "" ? "Grabar y crear Alumno" :"Crear nuevo Alumno"}
          </Button>
      </div>
    
      
        {/* <div className="flex flex-row justify-between h-12 mt-12 mb-8">
          <h2 className="font-thin text-xl">Estudiantes asociados</h2>
          
        </div> */}
        
       
        {/* { user.status === "loading" &&
                <div className="flex justify-center items-center w-full h-48"><LoadingIcon
                  color="#AE5EAB"
                  icon="oval"
                  className="w-10 h-10 mt-10"
                /></div>
        }
      { user.status === "idle" && users?.relationships && <RelationList students={users?.relationships}/> } */}
    </>
  );
};
