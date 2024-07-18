import React, { useEffect } from "react";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";

export const NavigationBar = () => {


  return (
    <>
        <div className="grid grid-cols-12 gap-4 gap-y-5 mt-36">
          <div className="z-10 flex items-center justify-between col-span-12 mt-5 intro-y">
            <Button
              rounded
              onClick={() => alert("press")
                // dispatch(decrement())
                }
              className="w-32 mb-2 mr-2 text-primary"
              disabled={false}
              // disabled={statusRequest === "loading" && false}
            >
              <Lucide icon="ChevronLeft" className="w-4 h-4 mr-2" /> Anterior
            </Button>
            <div>
              
                <Button
                  variant="primary"
                  rounded
                  // className="w-32 mb-2 mr-4 text-primary"
                  className="w-56 mb-2 mr-2"
                  onClick={() => {
                    alert("press")
                    // dispatch(setStepAPI(1));
                    // toast.success(`Información almacenada`);
                  }}
                >
                 <span className="flex flex-row justify-center items-center">
                      <span>Grabar y continuar</span>
                      <Lucide icon="ChevronRight" className="w-4 h-4 mr-2" />
                    </span>
                </Button>
         
          
            </div>
          </div>
        </div>
    </>
  );
};
