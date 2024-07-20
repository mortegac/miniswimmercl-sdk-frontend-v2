import React, { useEffect } from "react";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

import { useAppSelector, useAppDispatch } from "../../../../stores/hooks";
import {
  increment,
  decrement,

} from "@/stores/Enrollment/slice";

export const NavigationBar = () => {
  
  const dispatch = useAppDispatch();

  return (
    <>
        
          <div className="flex items-center justify-between col-span-12 mt-16 intro-y pt-3">
            <Button
              rounded
              onClick={() => dispatch(decrement())}
              className="w-32 px-2 py-3 text-primary"
              disabled={false}
              // disabled={statusRequest === "loading" && false}
            >
              <Lucide icon="ChevronLeft" className="w-4 h-4 mr-2" /> Anterior
            </Button>
          <div>
              
                <Button
                  variant="primary"
                  rounded
                  className="w-56 px-2 py-3 mb-2 mr-2"
                  onClick={() => dispatch(increment())}
                  // onClick={() => {
                  //   alert("press")
                  //   // dispatch(setStepAPI(1));
                  //   // toast.success(`Información almacenada`);
                  // }}
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
