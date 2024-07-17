
import { useEffect } from "react";
import { Hub } from "aws-amplify/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

// import { fetchUserAttributes } from 'aws-amplify/auth';
// import { signInWithRedirect, signOut, getCurrentUser } from "aws-amplify/auth";
import { signInWithRedirect} from "aws-amplify/auth";
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

// import logoColorGoogle from "../../../assets/images/logoColor-google.svg";
import {LogoColor} from "../../../assets/images/logoColor";
import {Swimmer} from "../../../assets/images/swimmer";

import Splash from "@/components/Splash";

// import { Loading } from "../../../components/LoadingIcon";
import Button from "@/components/Base/Button";
import { FormInput, FormLabel } from "@/components/Base/Form";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, getAuthUser} from "@/stores/Users/slice";


type SameSite = 'strict' | 'lax' | 'none';
interface CookieStorageOptions {
  domain: string;
  expires: number;
  secure: boolean;
  sameSite: SameSite;
}

const cookieOptions: CookieStorageOptions = {
  domain: 'localhost',
  expires: 365, // número de días
  secure: true,
  sameSite: 'strict' // o 'lax' o 'none'
};

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage(cookieOptions));


interface LoginFormInputs {
  email: string;
  password: string;
}

const AddUserSchema = yup.object().shape({
  email: yup.string().required("debes colocar tu email."),
  password: yup.string().required("debes colocar tu contraseña"),
});

interface ErrorTypes {
  [key: string]: string;
}
const typeOfError: ErrorTypes = {
  // eslint-disable-next-line no-useless-computed-key
  [""]: "",
  // [""]: "Error desconocido, consulte con su administrador",
  ["PasswordResetRequiredExceptionon"]:
    "Usuario desabilitado, consulte con su administrador",
  ["UserNotFoundException"]: "Usuario o password incorrecta", //No existe el usuario
  ["NotAuthorizedException"]: "El Email o la Password son incorrectos",
  ["InvalidParameterException"]: "Valores ingresados no son válidos",
  ["InvalidPasswordException"]: "Valores ingresados no son válidos",
  ["UsernameExistsException"]:
    "Debe activar su cuenta ingresando el código enviado a su email",
};

function Main() {
  // type AuthUserWithEmail = AuthUser & { email?: string };
  // const [user, setUser] = useState<AuthUserWithEmail | null>(null);
  // const [loading, setLoading] = useState<Boolean>(false);

  // const [error, setError] = useState<string | null>(null);
  // const [customState, setCustomState] = useState<any | null>(null);
  
  // const dispatch = useAppDispatch();
  
  // const user = useAppSelector(selectAuth);
  // const { isAuthenticated } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  
  const user = useAppSelector(selectAuth);
  const { isAuthenticated } = useAppSelector(selectAuth);
 
 
  
  // useEffect(() => {
  //   const unsubscribe = Hub.listen("auth", ({ payload }) => {
  //     // console.log("GOOGLE-PAYLOAD >>> ", payload)
  //     switch (payload.event) {
  //       case "signInWithRedirect":
  //         // console.log("Sign in with redirect");
          
  //         dispatch(getAuthUser());
          
  //         break;
  //       case "signInWithRedirect_failure":
  //         // setError("An error has occurred during the OAuth flow.");
  //         // console.log("Error en signin with redirect");
  //         // setLoading(false)
  //         break;
  //       case "customOAuthState":
  //         // setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
  //         // console.log("Custom OAuth State fixed");
  //         // setLoading(false)
  //         break;
  //       case "signedOut":
  //         // console.log("Se ha hecho logoColorut");
  //         // setLoading(false)
  //         break;
  //       case "signedIn":
  //         // console.log("Se ha hecho signIn");
  //         // setLoading(false)
  //         break;
  //     }
  //   });

  //   dispatch(getAuthUser());
    
  //   return unsubscribe;
  // }, []);
  
  if (isAuthenticated || user.status === "loading") {
    return <Splash />;
  }
  
  
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
    // const request = await dispatch(getLoginUser({ email, password }));
  };
  
  return (
    <>
<div className="bg-primary">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="bg-white border border-gray-300 rounded-lg p-12 pt-8 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <div className="flex justify-center">
          <LogoColor/>
          <span>isAuthenticated = {JSON.stringify(isAuthenticated)}</span>
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
                          "* El campo es obligatorio"}
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
                          "* El campo es obligatorio"}
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
                  </div>
                  <div className="text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                    >
                      Login
                    </Button>

                    {/* <Link to={REGISTER}>
                      <Button
                        variant="outline-secondary"
                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0 border-0"
                      >
                        Registrarse
                      </Button>
                    </Link> */}
                  </div>
                </form>
                
                
                
            {/* <form className="space-y-4" action="/api/auth/google-sign-in" 
        method="GET" >
              <div className="mb-8 text-center">
                <p className="text-gray-500 text-lg mt-4 leading-relaxed">Ingrese utilizando tu cuenta de google
</p>
              </div> */}

              {/* { loading && <Loading /> } */}
              

  {/* <Button
    rounded
    variant="primary" 
      type="button"                  
      className="w-full px-12 py-4 border-[1px] border-primary "
      onClick={() => signOut()}
  >
    <span className="ml-2 text-white text-lg">Sign Out</span>
  </Button> */}
             
                <div className="flex flex-col items-center">
                  <Button
                  rounded
                  type="button"                  
                  className="w-full bg-gradient-to-r from-[#F194EE] to-[#AE5EAB]  px-12 py-4 border-[1px] border-[#F194EE] "
                  onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })}
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
                  <span className="ml-2 text-white text-lg">Continua con Google</span>
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
