import React, { useState, useEffect, useRef } from "react";


import { HeaderTitle } from "./HeaderTitle";

export const FormStep02 = ({ onChangeSetStore }: any) => {
 
  return (
    <>
      <HeaderTitle
        title={"Información del Alumno"}
        description={"Paso 2"}
        hasVisibleBrand={false}
        vehicle={{
          typeOfVehicle: "",
          brand: "",
          model: "",
        }}
      />

      <div className="lg:p-5 text-left">
        <div className="lg:p-5 intro-y ">
          <div className="grid lg:grid-cols-4 xs:grid-cols-2 lg:gap-6">
            
        </div>
      </div>
      </div>
    </>
  );
};
