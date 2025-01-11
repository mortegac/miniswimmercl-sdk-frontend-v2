import Lucide from "@/components/Base/Lucide";
import { Tab } from "@/components/Base/Headless";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import clsx from "clsx";
import _ from "lodash";

import { ResumenPage } from "./components/ResumenPage";
import { ResumenTransactions } from "./components/ResumenTransactions";
import { SessionsPage } from "./components/SessionsPage";
import { MessagesPage } from "./components/MessagesPage";
import { ModifyPage } from "./components/ModifyPage";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { getStudent,  selectStudent } from "@/stores/Students/slice";
import { calcularEdad, convertirFecha } from "@/utils/dateHandler";
import {formatDateUTC} from "@/utils/helper";
import {typeOfGender} from "@/pages/private/Students/components/Card";

interface Props {
  gender: string;  
}

const IcoGender: React.FC<Props> = ({gender}) => {
  const IcoSvg = typeOfGender[String(gender)] || typeOfGender[""]
  return<IcoSvg/>
}

function Main() {
  const { search, state } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useAppDispatch();
  const studentId: string | null = queryParams.get("id" ?? "");
  const { student } = useAppSelector(selectStudent);
  const edad:any = student?.birthdate && calcularEdad(String(student?.birthdate === "" ? "1800/01/01":student?.birthdate));
  
  
  useEffect(() => {
    if (queryParams.get("page") == "resume") {
      setSelectedIndex(0);
    } else if (queryParams.get("page") == "sessions") {
      setSelectedIndex(1);
    } else if (queryParams.get("page") == "transactions") {
      setSelectedIndex(2);
    } else if (queryParams.get("page") == "messages") {
      setSelectedIndex(3);
    } else if (queryParams.get("page") == "modify") {
      setSelectedIndex(4);
    } else {
      setSelectedIndex(0);
    }
  }, [search]);
  
  
  useEffect(() => {
    typeof state?.id !== "undefined" &&
      dispatch(getStudent({ studentId: state?.id || ""}))
   
    return () => {};
  }, [state?.id]);
  
  // useEffect(() => {
  //   studentId && dispatch(getStudent({ studentId}))
  // }, [studentId]);
  
  // 

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="p-1.5 box flex flex-col ">
          <div className="h-48 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
            <div
              className={clsx([
                "w-full h-full relative overflow-hidden",
                "before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]",
                "after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]",
              ])}
            ></div>
            <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-24">
              <div className="w-full h-full overflow-hidden border-[6px] box border-white rounded-full image-fit">
                {/* <img
                  alt="Tailwise - Admin Dashboard Template"
                  src={users.fakeUsers()[0].photo}
                /> */}
                <div className="flex justify-center items-center">
                 <IcoGender gender={student?.gender || ""}/>
                </div>
              </div>
              {/* <div className="absolute bottom-0 right-0 w-5 h-5 mb-2.5 mr-2.5 border-2 border-white rounded-full bg-success box"></div> */}
            </div>
          </div>
          {/* <pre>{JSON.stringify(student, null, 2)}</pre> */}
          <div className="rounded-[0.6rem] bg-slate-50 pt-12 pb-6">
            <div className="flex items-center justify-center text-xl font-medium">
              {`${student?.name} ${student?.middleName} ${student?.lastName}`}
              <Lucide
                icon="BadgeCheck"
                className="w-5 h-5 ml-2 text-blue-500 fill-blue-500/30"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-5 mt-2.5">
              <div className="flex items-center text-slate-500">
                <Lucide
                  icon="User"
                  className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                />
                { student?.birthdate && edad.años > 100 ? "SIN EDAD":`${edad?.años || ""} años, ${edad?.meses || ""} meses`}
              </div>
              <div className="flex items-center text-slate-500">
                <Lucide
                  icon="Mail"
                  className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                />
                {`${student?.emailPhone}`}
              </div>
              <div className="flex items-center text-slate-500">
                <Lucide
                  icon="Signal"
                  className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                />
                 {`${student?.contactPhone}`}
              </div>
              <div className="flex items-center text-slate-500">
                <Lucide
                  icon="Calendar"
                  className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
                />
                 {`${formatDateUTC(student?.createdAt)}`}
              </div>
            </div>
          </div>
        </div>
        <Tab.Group
          className="mt-10"
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <div className="flex flex-col 2xl:items-center 2xl:flex-row gap-y-3">
            <Tab.List
              variant="boxed-tabs"
              className="flex-col sm:flex-row w-full 2xl:w-auto mr-auto bg-white box rounded-[0.6rem] border-slate-200"
            >
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Resumen
                </Tab.Button>
              </Tab>
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-52 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Pagos y Transacciones
                </Tab.Button>
              </Tab>
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-56 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Gestión de Sesiones
                  <div className="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full text-theme-1/70 bg-theme-1/10 border-theme-1/10">
                    7
                  </div>
                </Tab.Button>
              </Tab>
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Mensajes enviados
                </Tab.Button>
              </Tab>
            
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Modificar datos
                </Tab.Button>
              </Tab>
            </Tab.List>
           
          </div>
          <Tab.Panels>
            <Tab.Panel><ResumenPage data={student} edad={edad}/></Tab.Panel>
            <Tab.Panel><ResumenTransactions data={student?.relationships}/></Tab.Panel>
            <Tab.Panel><SessionsPage/></Tab.Panel>
            <Tab.Panel><MessagesPage/></Tab.Panel>
            <Tab.Panel><ModifyPage/></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Main;
