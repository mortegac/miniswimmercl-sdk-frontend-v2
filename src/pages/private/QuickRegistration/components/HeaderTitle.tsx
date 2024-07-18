// import React, { useEffect } from "react";
// import IconTypeOfVehicle from "../../../../components/IconVehicles";

export interface Props {
  title: string;
  description: string;
  hasVisibleBrand?: boolean;
  vehicle: { typeOfVehicle: string; brand: string; model: string };
}

export function HeaderTitle({
  title,
  description,
  hasVisibleBrand = true,
  vehicle,
}: Props) {
  // const { title, description, hasVisibleBrand = false } = props;
  // export const HeaderTitle = () => {

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="flex flex-col">
          <h3 className="text-xl font-medium">{title}</h3>
          <span className="text-base font-light mt-2">{description}</span>
        </div>
        {hasVisibleBrand && (
          <div className="flex justify-start items-center flex-row p-5 box w-80 ">
            {/* <IconTypeOfVehicle type={vehicle?.typeOfVehicle || ""} /> */}
            <div className="flex justify-center items-start flex-col pl-8">
              <p className="w-full">
                <b className="uppercase text-slate-700 text-lg">
                  {vehicle.brand}
                </b>
              </p>
              <p className="w-full">
                <b className="uppercase text-slate-500 text-base">
                  {vehicle.model}
                </b>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
