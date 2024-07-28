import React, { useEffect } from "react";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

import { useAppSelector, useAppDispatch } from "../../../../stores/hooks";
import { increment, decrement, selectEnrollment, setDataEnroll } from "@/stores/Enrollment/slice";

import { setStudent, selectStudent } from "@/stores/Students/slice";
  
export const NavigationBar = () => {
  const {currentStep}= useAppSelector(selectEnrollment);
  const {student}= useAppSelector(selectStudent);
  const {enrollment}= useAppSelector(selectEnrollment);
  const {
    studentId,
    studentName,
    studentLastName,
    studentBithday,
    studentGender,
    studentResidence,
    studentEmail,
    studentPhone,
    guardianRelation,
  } = enrollment;
  
  
  const dispatch = useAppDispatch();

  
  
  async function saveData(){
    
    if(studentId && studentId !== ""){
      dispatch(increment())
    }else{
      
      studentName !== "" && studentBithday !== "" && studentResidence !== "" && studentEmail !== "" && studentGender !== "" && guardianRelation &&
        await Promise.all([
          dispatch(setStudent({
            name: studentName,
            lastName: studentLastName,
            birthdate: studentBithday,
            placeOfResidence: studentResidence,
            contactPhone: studentPhone,
            emailPhone: studentEmail,
            gender: studentGender,
            idUser: studentEmail,
            relation: guardianRelation,
          })),
          dispatch(increment())
        ]);
      
    }
  }
  
  
  useEffect(() => { (async () =>{ 
    student.id && student.id !== "" &&  await dispatch(
      setDataEnroll({
        key: "studentId",
        value: student.id,
      })
    );
      
  })(); }, [student.id]);
  
  
  return (
    <>
        
          <div className="flex items-center justify-between col-span-12 mt-16 intro-y pt-3">
            <Button
              rounded
              onClick={() => dispatch(decrement())}
              className="w-32 px-2 py-3 text-primary"
              disabled={false}
            >
              <Lucide icon="ChevronLeft" className="w-4 h-4 mr-2" /> Anterior
            </Button>
          <div>
                <Button
                variant="primary"
                rounded
                disabled={currentStep === 1}
                className={`w-56 px-2 py-3 mb-2 mr-2 ${currentStep === 1 && "bg-slate-300 border-slate-300 text-slate-400"}`}
                onClick={() => saveData()}
                >
                  <span className="flex flex-row justify-center items-center">
                    <span>Grabar y continuar</span>
                    <Lucide icon="ChevronRight" className="w-4 h-4 ml-2" />
                  </span>
                </Button>
         
          
            </div>
        </div>
    </>
  );
};
