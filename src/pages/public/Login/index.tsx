
import { useEffect } from "react";
import { Hub } from "aws-amplify/utils";
// import { fetchUserAttributes } from 'aws-amplify/auth';
// import { signInWithRedirect, signOut, getCurrentUser } from "aws-amplify/auth";
import { signInWithRedirect} from "aws-amplify/auth";
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

// import logoGoogle from "../../../assets/images/logo-google.svg";
import logoColor from "../../../assets/images/logo-color.svg";
import swimmer from "../../../assets/images/swimmer.svg";

// import Splash from "../../../components/Splash";

// import { Loading } from "../../../components/LoadingIcon";
import Button from "@/components/Base/Button";

// import { useAppSelector, useAppDispatch } from "../../../store/hooks";
// import { selectAuth } from "../../../store/Users/users.slice";
// import {getAuthUser} from "../../../store/Users/users.slice"



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


// interface AuthUser {
//   username: string;
//   userId: string;
// }

function Main() {
  // type AuthUserWithEmail = AuthUser & { email?: string };
  // const [user, setUser] = useState<AuthUserWithEmail | null>(null);
  // const [loading, setLoading] = useState<Boolean>(false);

  // const [error, setError] = useState<string | null>(null);
  // const [customState, setCustomState] = useState<any | null>(null);
  
  // const dispatch = useAppDispatch();
  
  // const user = useAppSelector(selectAuth);
  // const { isAuthenticated } = useAppSelector(selectAuth);
  
 
 
  
  useEffect(() => {
    // setLoading(true)
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      console.log("GOOGLE-PAYLOAD >>> ", payload)
      switch (payload.event) {
        case "signInWithRedirect":
          console.log("Sign in with redirect");
          
          // dispatch(getAuthUser());
          
          break;
        case "signInWithRedirect_failure":
          // setError("An error has occurred during the OAuth flow.");
          console.log("Error en signin with redirect");
          // setLoading(false)
          break;
        case "customOAuthState":
          // setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          console.log("Custom OAuth State fixed");
          // setLoading(false)
          break;
        case "signedOut":
          console.log("Se ha hecho logout");
          // setLoading(false)
          break;
        case "signedIn":
          console.log("Se ha hecho signIn");
          // setLoading(false)
          break;
      }
    });

    // dispatch(getAuthUser());
    
    return unsubscribe;
  }, []);
  
  // if (isAuthenticated || user.status === "loading") {
  //   return <Splash />;
  // }
  return (
    <>
<div className="bg-primary">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="bg-white border border-gray-300 rounded-lg p-12 pt-8 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <div className="flex justify-center">
          {/* <span>isAuthenticated = {JSON.stringify(isAuthenticated)}</span> */}
          <img src={logoColor} className="mb-8"/>
          </div>

            <form className="space-y-4" action="/api/auth/google-sign-in" 
        method="GET" >
              <div className="mb-8 text-center">
                <p className="text-gray-500 text-lg mt-4 leading-relaxed">Ingrese utilizando tu cuenta de google
</p>
              </div>

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
                  {/* <img src={logoGoogle} /> */}
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
       
            </form>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8 block lg:block max-md:hidden">
            <img src={swimmer} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Main;
