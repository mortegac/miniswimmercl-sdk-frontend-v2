import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import clsx from "clsx";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import {
  FormSelect,
  FormLabel,
  FormInput,
  FormTextarea,
} from "@/components/Base/Form";
import Notification from "@/components/Base/Notification";

import RegistrationWizard from "./components/RegistrationWizard";
import { FormStep01 } from "./components/FormStep01";
import { FormStep02 } from "./components/FormStep02";
import { FormStep03 } from "./components/FormStep03";
import { NavigationBar } from "./components/NavigationBar";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setBreadcrumb } from '@/stores/breadcrumb';



const typeOfForm: any = {
  ["0"]: FormStep01,
  ["1"]: FormStep01,
  ["2"]: FormStep02,
  ["3"]: FormStep03,
};
const FormStep = typeOfForm[String(3)] || typeOfForm[0];


function Main() {
  const schema = yup
  .object({
    name: yup.string().required().min(2),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    age: yup
      .number()
      .required()
      .test("len", "age must be less than or equal to 3", (val) =>
        val && val.toString().length <= 3 ? true : false
      ),
    url: yup.string().url(),
    comment: yup.string().required().min(10),
  })
  .required();

const {
  register,
  trigger,
  formState: { errors },
} = useForm({
  mode: "onChange",
  resolver: yupResolver(schema),
});
const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
  event.preventDefault();
  const result = await trigger();
  if (!result) {
    const failedEl = document
      .querySelectorAll("#failed-notification-content")[0]
      .cloneNode(true) as HTMLElement;
    failedEl.classList.remove("hidden");
    Toastify({
      node: failedEl,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  } else {
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
  }
};

  const dispatch = useAppDispatch();
  dispatch(setBreadcrumb({first:"Registro rápido", firstURL:"quick-registration"}));
  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className=" text-base font-medium group-[.mode--light]:text-white">
            Inscripción rápida 
          </div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <Button
              rounded
              variant="primary"
              className="px-8 py-3 border border-slate-200"
              >
              <Lucide icon="Plus" className="w-6 h-6 mr-2" />{" "}
              <span className="text-border-slate-200">Nueva Inscripción</span>
              </Button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <RegistrationWizard hasEdition={false} />
    
          <div className="lg:px-8 sm:px-8  box intro-y pt-14 pb-6">

            <FormStep
              onChangeSetStore={()=>{}}
              // getFileS3={getFileS3}
            />
            <NavigationBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
