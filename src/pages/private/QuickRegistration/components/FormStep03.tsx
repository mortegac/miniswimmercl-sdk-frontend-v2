import React, { useState, useEffect, useRef } from "react";


import { HeaderTitle } from "./HeaderTitle";

export const FormStep03 = ({ onChangeSetStore }: any) => {
 
  return (
    <>
      <HeaderTitle
        title={"Proceso de inscripción"}
        description={"Paso 3"}
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
