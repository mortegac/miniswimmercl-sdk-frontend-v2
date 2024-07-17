import Lucide from "@/components/Base/Lucide";
import { Menu, Popover } from "@/components/Base/Headless";
import Pagination from "@/components/Base/Pagination";
import { FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import users from "@/fakers/users";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import clsx from "clsx";
import _ from "lodash";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';



function Main() {
  const dispatch = useAppDispatch();
  dispatch(setBreadcrumb({first:"Nuevo gasto", firstURL:"new-expense"}));
  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Nuevo gasto
          </div>
          {/* <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button
              variant="primary"
              className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            >
              <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />{" "}
              Add New User
            </Button>
          </div> */}
        </div>
        <div className="flex flex-col gap-8 mt-3.5">
          <div className="flex flex-col p-5 box box--stacked">
            <div className="grid grid-cols-4 gap-5">
              {/* LOCATIONS  */}
              <div className="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                <div className="text-base text-slate-500">La Reina</div>
                <div className="mt-1.5 text-2xl font-medium">1.200.000</div>
                <div className="absolute inset-y-0 right-0 flex flex-col justify-center mr-5">
                <div className="flex items-center border border-success/10 bg-success/10 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-success">
                    <Lucide
                      icon="Calendar"
                      className="w-4 h-4 mr-4 stroke-[1.5]"
                    />
                    Junio
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                <div className="text-base text-slate-500">Vitacura</div>
                <div className="mt-1.5 text-2xl font-medium">950.000</div>
                <div className="absolute inset-y-0 right-0 flex flex-col justify-center mr-5">
                <div className="flex items-center border border-success/10 bg-success/10 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-success">
                    <Lucide
                      icon="Calendar"
                      className="w-4 h-4 mr-4 stroke-[1.5]"
                    />
                    Junio
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                <div className="text-base text-slate-500">Marketing</div>
                <div className="mt-1.5 text-2xl font-medium">200.000</div>
                <div className="absolute inset-y-0 right-0 flex flex-col justify-center mr-5">
                <div className="flex items-center border border-success/10 bg-success/10 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-success">
                    <Lucide
                      icon="Calendar"
                      className="w-4 h-4 mr-4 stroke-[1.5]"
                    />
                    Junio
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
                <div className="text-base text-slate-500">Materiales</div>
                <div className="mt-1.5 text-2xl font-medium">160.000</div>
                <div className="absolute inset-y-0 right-0 flex flex-col justify-center mr-5">
                <div className="flex items-center border border-success/10 bg-success/10 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-success">
                    <Lucide
                      icon="Calendar"
                      className="w-4 h-4 mr-4 stroke-[1.5]"
                    />
                    Junio
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col box">
           
            <div className="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row">
                <span>Ingrese el nuevo gasto </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
