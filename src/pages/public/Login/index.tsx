
import { useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

import {LogoColor} from "../../../assets/images/logoColor";
import {Swimmer} from "../../../assets/images/swimmer";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, getAuthUser, getLoginUser} from "@/stores/Users/slice";




import Splash from "@/components/Splash";
import Button from "@/components/Base/Button";
import { FormInput, FormLabel } from "@/components/Base/Form";

const AddUserSchema = yup.object().shape({
  email: yup.string().required("debes colocar tu email."),
  password: yup.string().required("debes colocar tu contraseña"),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

function Main() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(AddUserSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    // console.log(errors);
    const request = await dispatch(getLoginUser({ email, password }));
  };
  
  if (user.isAuthenticated || user.status === "loading") {
    return <Splash />;
  }
  
  return (
    <>
    {user.isAuthenticated && redirect("/")}
    <div className="bg-primary">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="bg-white border border-gray-300 rounded-lg p-12 pt-8 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <div className="flex justify-center">
          <LogoColor/>
          {/* <span>isAuthenticated = {JSON.stringify(isAuthenticated)}</span> */}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-10 input-form">
                    <FormLabel
                      htmlFor="emailLabel"
                      className="flex flex-col w-full sm:flex-row text-slate-500"
                    >
                      Email
                    </FormLabel>
                    <FormInput
                      {...register("email")}
                      id="emailLabel"
                      type="email"
                      name="email"
                      className={clsx(
                        {
                          "border-danger": errors.email,
                        },
                        "p-4 "
                      )}
                      placeholder="example@gmail.com"
                    />
                    {errors.email && (
                      <div className="mt-2 text-danger">
                        {typeof errors.email.message === "string" &&
                          "* Campo obligatorio"}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 input-form">
                    <FormLabel
                      htmlFor="passwordLabel"
                      className="flex flex-col w-full sm:flex-row text-slate-500"
                    >
                      Password
                    </FormLabel>
                    <FormInput
                      {...register("password")}
                      id="passwordLabel"
                      type="password"
                      name="password"
                      className={clsx(
                        {
                          "border-danger": errors.password,
                        },
                        "p-4 "
                      )}
                      placeholder="* * * * * * *"
                    />
                    {errors.password && (
                      <div className="mt-2 text-danger">
                        {typeof errors.password.message === "string" &&
                          "* Campo obligatorio"}
                      </div>
                    )}
                  </div>

                  {/* <div className="flex justify-end text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <Link
                      to={RECOVER}
                      className="px-4 py-3 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200"
                    >
                      <p className="mt-3 font-medium text-center leading-none  text-slate-500">
                        ¿Olvido su contraseña?
                      </p>
                    </Link>
                    <Link
                      to={VERIFY}
                      className="px-4 py-3 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200"
                    >
                      <p className="mt-3 font-medium text-center leading-none  text-slate-500">
                        ¿Quieres validar tu cuenta?
                      </p>
                    </Link>
                  </div> */}
                  <div className="my-6 text-danger text-md">
                    {/* {typeOfError[errorMessage || ""]} */}
                    {user.errorMessage}
                  </div>
                  <div className="text-center intro-x xl:mt-8 xl:text-left">
                  <Button
                  rounded
                  
                  type="submit"           
                  className="mb-6 w-full bg-gradient-to-r from-[#F194EE] to-[#AE5EAB]  px-12 py-4 border-[1px] border-[#F194EE] "
                  // onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })}
                >                 
                  <span className="ml-2 text-white text-lg">Ingresar</span>
                </Button>  
                
                   
                  </div>
          </form>
                             
                <div className="flex flex-col items-center">
                  <Button
                  rounded
                  variant="outline-secondary"
                  type="button"                  
                  className="w-full px-12 py-4 border-[1px] border-[#F194EE] "
                  // className="w-full bg-gradient-to-r from-[#F194EE] to-[#AE5EAB]  px-12 py-4 border-[1px] border-[#F194EE] "
                  // onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })}
                >                 
                  {/* <img src={logoColorGoogle} /> */}
                  <svg className="w-8" viewBox="0 0 533.5 544.3">
                    <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4" />
                    <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853" />
                    <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04" />
                    <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335" />
                </svg>
                  <span className="ml-4 text-primary text-lg">Continua con Google</span>
                </Button>                        
                </div>
       
            {/* </form> */}
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8 block lg:block max-md:hidden">
          <Swimmer/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Main;
