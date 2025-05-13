import React, { useState, useEffect, useRef } from "react";
import { FormInput, FormSelect, FormCheck } from "@/components/Base/Form";
import Toastify from "toastify-js";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './phone.css'


import CopyButton from '@/components/CopyButton';

import Notification from "@/components/Base/Notification";
import { NotificationElement } from "@/components/Base/Notification";
import { HeaderTitle } from "./HeaderTitle";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
// import ListParams from "@/components/ListParams";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectEnrollment, getGuardian, setDataUser, increment, cleanData} from "@/stores/Enrollment/slice";
import { selectAuth, setApoderado, cleanDataUser} from "@/stores/Users/slice";
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


export const FormStep01 = ({ onChangeSetStore, onSetNewStudent }: any) => {
  const [message, setMessage] = useState({ type:"error", title:"Error", description:"Debe ingresar todos los datos del Apoderado"})
  const [error, setError] = useState<any>(null);
  const [phoneInput, setPhoneInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  const {enrollment, status}= useAppSelector(selectEnrollment);
  const user = useAppSelector(selectAuth);
  // const {id, name, email, phone, users }= useAppSelector(selectAuth);
  const {
    guardianId,
    guardianEmail,
    guardianName,
    guardianPhone,
    guardianRelation,
    guardianStreetAddress,
    guardianCity,
    guardianState,
    guardianZipCode,
    guardianCountry,
    guardianLatitude,
    guardianLongitude,
    
    // streetAddress,
    // city,
    // state,
    // zipCode,
    // country,
    // latitude,
    // longitude,
  } = enrollment;
  const dispatch = useAppDispatch();

  const validatePhoneNumber = (value:any) => {
    setPhoneInput(value);
    
    if (!value) {
      setError('El número de teléfono es Required');
      setIsValid(false);
      return;
    }

    try {
      if (isValidPhoneNumber(value)) {
        setError('');
        setIsValid(true);
        
        const event = {
          target:{
            name:"guardianPhone",
            value:value,
            type: "text",
          },
          preventDefault:()=>null,
        }      
        onChangeSetStore({...event})
        
      } else {
        setError('Número de teléfono inválido');
        setIsValid(false);
      }
    } catch (err) {
      setError('Error al validar el número');
      setIsValid(false);
    }
  };
  
  async function getDataUser(email:string){ 
    // console.log("---getDataUser---", email)
    email !== "" && await dispatch(getGuardian({userEmail:email.trim().toLowerCase()}))
  }
  
  async function dataValidate(){ 
    // alert(guardianId)
    
    if(guardianId){
      // dispatch(increment())
      
    }else{
 
      if(guardianName ==="" || guardianEmail ==="" || guardianPhone ===""){
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
            name:guardianName,
            userPhone:guardianPhone
          })),
          
          await dispatch(getGuardian({userEmail:guardianEmail})),
          
          onSetNewStudent(guardianEmail)
          // dispatch(increment()),  
        ]);
      }
      
    }
    
  }
  
    // Success notification
    const successNotification = useRef<NotificationElement>();
    const successNotificationToggle = () => successNotification.current?.showToast();

  // useEffect(() => { (async () =>{ 
  //   id ==="" ? await dispatch(setDataUser({id:"", email:"", name:"", phone:"" })): await dispatch(setDataUser({id, email, name, phone }))    
  
  // })(); }, [id]);
  

  
  return (
    <>
    
    {/* <pre>enrollment = {JSON.stringify(enrollment, null, 2 )}</pre> */}
    {/* 
    <pre>guardianEmail = {JSON.stringify(guardianEmail)}</pre> */}
    <Notification
        id="success-notification-content"
        className="flex hidden"
      >
        <Lucide icon={"XCircle"} className="text-red-400 w-10 h-10" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Missing information.</div>
          <div className="mt-1 text-slate-500">
          Guardian's email and name are required to continue. 
          </div>
        </div>
    </Notification>
    

      <HeaderTitle
        title={`🇺🇸 Parent/Guardian Information: `}
        description={""}
      />
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Mail</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md border border-slate-200">
                Required
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col-reverse items-center md:flex-row">
            
          { guardianId === "" &&
          <>
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
          </>
          }

          { guardianId && guardianId !== "" && <>
            <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianEmail}</h2>
            <CopyButton 
              text={guardianEmail || ""} 
              buttonText="Copiar texto" 
              successMessage="¡Texto copiado!"
            />
          </>}
        
          </div>
        </div>
      </div>
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Name</div>
              <p className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Required
              </p>
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
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Phone</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Required
              </div>
            </div>
          </div>
        </label>
        {/* <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row"> */}
          <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
          { guardianId === "" &&
           <>
           <PhoneInput
              international
              defaultCountry="US"
              name="guardianPhone"
              value={guardianPhone}
              onChange={validatePhoneNumber}
              className=" px-6 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              error={error}
            />
         { error && <p className="text-red-500 mt-2">{error}</p>}
         </>
        
        }
        
          { guardianId && guardianId !== "" && <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianPhone}</h2> }
          </div>
        </div>
      </div>
      
      {/* Street Address */}
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Street Address</div>
              {/* <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Required
              </div> */}
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
            {guardianId === "" && (
              <FormInput
                type="text"
                tabIndex={4}
                className="px-6 py-3 rounded-full mr-8 focus:z-12"
                placeholder="123 Main St"
                name="guardianStreetAddress"
                value={guardianStreetAddress}
                onChange={onChangeSetStore}
              />
            )}
            {guardianId && guardianId !== "" && (
              <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianStreetAddress}</h2>
            )}
          </div>
        </div>
      </div>

      {/* City */}
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">City</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Required
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
            {guardianId === "" && (
              <FormInput
                type="text"
                tabIndex={5}
                className="px-6 py-3 rounded-full mr-8 focus:z-12"
                placeholder="New York"
                name="guardianCity"
                value={guardianCity}
                onChange={onChangeSetStore}
              />
            )}
            {guardianId && guardianId !== "" && (
              <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianCity}</h2>
            )}
          </div>
        </div>
      </div>

      {/* State */}
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">State</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Required
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
            {guardianId === "" && (
              <FormInput
                type="text"
                tabIndex={6}
                className="px-6 py-3 rounded-full mr-8 focus:z-12"
                placeholder="NY"
                name="guardianState"
                value={guardianState}
                onChange={onChangeSetStore}
              />
            )}
            {guardianId && guardianId !== "" && (
              <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianState}</h2>
            )}
          </div>
        </div>
      </div>

      {/* ZIP Code */}
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">ZIP Code</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Required
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
            {guardianId === "" && (
              <FormInput
                type="text"
                tabIndex={7}
                className="px-6 py-3 rounded-full mr-8 focus:z-12"
                placeholder="10001"
                name="guardianZipCode"
                value={guardianZipCode}
                onChange={onChangeSetStore}
              />
            )}
            {guardianId && guardianId !== "" && (
              <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{guardianZipCode}</h2>
            )}
          </div>
        </div>
      </div>

      {/* Country */}
      {/* <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Country</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Required
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
            {guardianId === "" && (
              <FormSelect
                tabIndex={8}
                className="px-6 py-3 rounded-full mr-8 focus:z-12"
                name="country"
                value={guardianCountry}
                onChange={onChangeSetStore}
              >
                <option value="">Select Country</option>
                <option value="USA">United States</option>
                <option value="CHILE">Chile</option>
                <option value="URUGUAY">Uruguay</option>
                <option value="PANAMA">Panama</option>
              </FormSelect>
            )}
            {guardianId && guardianId !== "" && (
              <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">{country}</h2>
            )}
          </div>
        </div>
      </div> */}

      {/* Latitude and Longitude */}
      <div className="flex-col block pt-2 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-36 xl:mr-14">
          <div className="text-left">
            <div className="flex items-center">
              <div className="font-medium">Coordinates</div>
              <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Required
              </div>
            </div>
          </div>
        </label>
        <div className="flex-1 w-full mt-1 xl:mt-0">
          <div className="flex flex-col items-center md:flex-row">
            {guardianId === "" && (
              <>
                <FormInput
                  type="number"
                  tabIndex={9}
                  className="px-6 py-3 rounded-full mr-4 focus:z-12"
                  placeholder="Latitude"
                  name="guardianLatitude"
                  value={guardianLatitude}
                  onChange={onChangeSetStore}
                />
                <FormInput
                  type="number"
                  tabIndex={10}
                  className="px-6 py-3 rounded-full mr-8 focus:z-12"
                  placeholder="Longitude"
                  name="longitude"
                  value={guardianLongitude}
                  onChange={onChangeSetStore}
                />
              </>
            )}
            {guardianId && guardianId !== "" && (
              <h2 className="px-6 py-3 w-full mr-8 border rounded-full bg-slate-100">
                {guardianLatitude}, {guardianLongitude}
              </h2>
            )}
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
          
          <span className="ml-2">Clean</span>
        </Button>
        
          <Button
                rounded
                variant="primary"
                className="border border-slate-200 px-4 py-3"
                onClick={()=>dataValidate()}
                disabled={guardianId !== ""}
              >
                <Lucide icon="Plus" className="w-6 h-6 mr-2" />{" "}
                Save and continue
            </Button>
      </div>
      </>
  );
};
