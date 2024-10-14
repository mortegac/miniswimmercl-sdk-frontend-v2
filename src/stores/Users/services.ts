import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from "aws-amplify/auth";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { signOut } from "aws-amplify/auth";
import { signIn, confirmSignIn, resetPassword, signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

import { getUsers, listUsers } from './queries';
import { createUsers } from './mutation';

import { FilterOptions } from "./types";
import { Roles,  } from "../Roles/types";
import { UserPermissions } from "../UserPermissions/types";


const client = generateClient();



// CREATE APODERADO
// 
export const createApoderado = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const getData:any = await client.graphql({
        query: createUsers,
        variables: {
          input: {
            id: objFilter.userEmail, 
            name: objFilter.name, 
            email: objFilter.userEmail, 
            validated: true, 
            contactPhone: "", 
            ig: "", 
            firstContact: false, 
            usersRolesId: "parents", 
          }
        }
      });
      
      console.log("<<< APODERADO CREADO <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.createUsers } as any);
        
        // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};


export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      console.log("<<< objFilter <<<<< ", objFilter)
      
      const filterEmail = (typeof objFilter?.userEmail === 'undefined') ?
      {}
      : { email: { eq: String(objFilter.userEmail) } };
      
      const filter: any = {
        ...filterEmail,
      };
      
      const getData:any = await client.graphql({
        query: listUsers,
        // variables: { email: objFilter.userEmail },
        variables: { 
          filter: {...filter},
        },
      });
      
      console.log("<<< USERS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listUsers.items } as any);
        
        // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};

// --------  AUTH   ------

// export const checkAuthStatus: () => Promise<AuthResponse> = async () => {
//   try {
//     const user = await Auth.currentAuthenticatedUser();
//     const dataUser: any = await API.graphql<GraphQLQuery<Users>>({
//       query: getUsersWithID,
//       variables: { id: user?.attributes.email },
//     });
//     const data = { ...dataUser.data.getUsers };
//     const elem = {
//       isAuthenticated: true,
//       validated: data.validated,
//       firstLogin: data.firstLogin,
//       email: data.id,
//       name: data?.name || "",
//       Company: data?.Company,
//       Consultancy: data?.Consultancies.items,
//       Role: data?.Role,
//       Permission: (data.Permissions.items as Permission[]) || undefined,
//     };
//     return elem;
//   } catch (error) {
//     localStorage.clear();
//     // console.log(error);
//     return emptyLoginResponse;
//   }
// };

type loginType = {
  email: string;
  password: string;
};

// async function handleSignUp(username: string, password: string, email: string) {
  export const handleSignUp = async (params: loginType): Promise<AuthResponse> => {
    return new Promise(async (resolve, reject) => {
      
        try {
          const { isSignUpComplete, userId, nextStep } = await signUp({
            
            
            username: params.email, 
            password: params.password,
            options: {
              userAttributes: {
                email: params.email,
              },
              // Puedes agregar más atributos aquí si es necesario
            },
          });
      
          if (isSignUpComplete) {
            // console.log('Registro completado con éxito');
            resendConfirmationCode(params.email)
            
            return { success: true, message: 'Registro completado' };
          } else {
            // console.log('Se requiere confirmación', nextStep);
            return { success: true, message: 'Se ha enviado un código de verificación a tu email', userId };
          }
        } catch (error) {
          console.error('Error durante el registro:', error);
          return { success: false, message: error instanceof Error ? error.message : 'Error desconocido durante el registro' };
        }
          
    });
  };



async function confirmUserSignUp(username: string, code: string) {
  try {
    const { isSignUpComplete } = await confirmSignUp({ username, confirmationCode: code });
    
    if (isSignUpComplete) {
      // console.log('Confirmación exitosa');
      return { success: true, message: 'Usuario confirmado con éxito' };
    } else {
      // console.log('La confirmación requiere pasos adicionales');
      return { success: false, message: 'La confirmación requiere pasos adicionales' };
    }
  } catch (error) {
    console.error('Error durante la confirmación:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Error desconocido durante la confirmación' };
  }
}

// VOLVER A ENVIAR EL CODE 
async function resendConfirmationCode(username: string) {
  try {
    await resendSignUpCode({ username });
    // console.log('Código reenviado');
    return { success: true, message: 'Código reenviado con éxito' };
  } catch (error) {
    console.error('Error al reenviar el código:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Error desconocido al reenviar el código' };
  }
}


// LOGIN 


export const handleLogin = async (params: loginType): Promise<AuthResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
        
      
      const { isSignedIn, nextStep } = await signIn({ username: params.email, password: params.password });
          
          if (isSignedIn) {
            // console.log('Usuario ha iniciado sesión exitosamente');
           
            const auth = await getCurrentUser();
            const { username, userId } = auth;
            // console.log(">>>fetchAuthUser, auth >>>", auth)
            
            if(userId){
              const attributes = await fetchUserAttributes();
              // console.log(">>>attributes >>>", attributes)
              
              const email = attributes?.email || "";
              
              const req = await fetchUserData(email)
              // console.log(">>>req >>>", req)
              
              // return {username, userId, email, ...req};
              resolve ({username, userId, email, ...req})
            }
            
           
            !userId && 
              reject({
              errorMessage: "Email o contraseña incorrecta",
              });
           
          }else{
            switch (nextStep.signInStep) {
              case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
                // console.log('Se requiere cambio de contraseña');
                // Aquí podrías mostrar un formulario para que el usuario ingrese una nueva contraseña
                // y luego llamar a handleNewPasswordRequired
                    //   // El usuario necesita cambiar su contraseña
                // const newPassword = '87654321'; // Idealmente, esto vendría de un input del usuario
                // const newPassword = 'Negra.,123'; // Idealmente, esto vendría de un input del usuario
                // const { isSignedIn: isSignedInAfterConfirm } = await confirmSignIn({ challengeResponse: newPassword });
                
                // if (isSignedInAfterConfirm) { }
                
                break;
              case 'RESET_PASSWORD':
                // console.log('Se requiere restablecer la contraseña');
                // Aquí podrías iniciar el flujo de restablecimiento de contraseña
                // await handleResetPassword(params.email);
                break;
              default:

            }
          }
            // } else if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
          //   // console.log('Ingrese a cambiar clave');
          //   // El usuario necesita cambiar su contraseña
          //   const newPassword = '87654321'; // Idealmente, esto vendría de un input del usuario
          //   const { isSignedIn: isSignedInAfterConfirm } = await confirmSignIn({ challengeResponse: newPassword });
            
          //   if (isSignedInAfterConfirm) {
          //   }
          // }
            // } else {
          //   // console.log('Siguiente paso:', nextStep);
          //   // Maneja los siguientes pasos si es necesario (como confirmación de código)
          // }
        } catch (err) {
          // console.log('Error al iniciar sesión: ' + (err instanceof Error ? err.message : String(err)));
          if (err instanceof Error && err.message.includes('Temporary password has expired')) {
            // console.log('La contraseña temporal ha expirado. Por favor, contacta al administrador para restablecerla.');
           
            // Aquí podrías mostrar un mensaje al usuario o redirigirlo a una página de soporte
          } else {
            console.error('Error durante el inicio de sesión:', err);
          }
        }
  });
};


async function handleNewPasswordRequired(username: string, newPassword: string) {
  try {
    const { isSignedIn } = await confirmSignIn({ challengeResponse: newPassword });
    if (isSignedIn) {
      // console.log('Contraseña cambiada y sesión iniciada con éxito');
      // Redirige al usuario a la página principal o dashboard
    }
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
  }
}

async function handleResetPassword(username: string) {
  try {
    const { nextStep } = await resetPassword({ username });
    // console.log('Siguiente paso para restablecer la contraseña:', nextStep);
    // Dependiendo del nextStep, podrías mostrar un formulario para ingresar el código de confirmación
    // y la nueva contraseña, y luego llamar a confirmResetPassword
  } catch (error) {
    console.error('Error al iniciar el restablecimiento de contraseña:', error);
  }
}

// export const handleLogin = async (params: loginType): Promise<any> => {
//   try {
//     const { isSignedIn, nextStep } = await signIn({ username: email, password });
    
//     if (isSignedIn) {
//       // console.log('Usuario ha iniciado sesión exitosamente');
//       // Aquí puedes redirigir al usuario a la página principal o hacer lo que necesites
//     } else {
//       // console.log('Siguiente paso:', nextStep);
//       // Maneja los siguientes pasos si es necesario (como confirmación de código)
//     }
//   } catch (err) {
//     setError('Error al iniciar sesión: ' + (err instanceof Error ? err.message : String(err)));
//   }
// }
// export const handleLogin = async (params: loginType): Promise<AuthResponse> => {
//   return new Promise(async (resolve, reject) => {
//     let user;
//     let errorMsg: string = "";

//     try {
//       try {
//         user = await Auth.signIn(params.email, params.password);
//       } catch (error) {
//         const exception = error as CognitoIdentityProviderServiceException;
//         errorMsg = String(exception?.name || "");
//       }

//       if (user) {
//         const dataUser: any = await API.graphql<GraphQLQuery<Users>>({
//           query: getUsersWithID,
//           variables: { id: user?.attributes.email },
//         });
//         // console.log(dataUser);
//         const data = { ...dataUser.data.getUsers };
//         resolve({
//           isAuthenticated: true,
//           validated: data.validated,
//           email: data.id,
//           name: data?.name || "",
//           firstLogin: data.firstLogin,
//           Company: data?.Company,
//           Consultancy: data?.Consultancies.items as Consultancy[],
//           Role: data.Role as Role,
//           Permission: (data.Permissions.items as Permission[]) || undefined,
//           errorMessage: errorMsg,
//         } as AuthResponse);
//       } else {
//         reject({
//           errorMessage: errorMsg,
//           ...emptyLoginResponse,
//         });
//       }
//     } catch (err) {
//       reject(
//         JSON.stringify({
//           errorMessage: errorMsg,
//           ...emptyLoginResponse,
//         })
//       );
//     }
//   });
// };


// import { CookieStorage } from 'aws-amplify/utils';
// import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
// type SameSite = 'strict' | 'lax' | 'none';
// interface CookieStorageOptions {
//   domain: string;
//   expires: number;
//   secure: boolean;
//   sameSite: SameSite;
// }

// const cookieOptions: CookieStorageOptions = {
//   domain: 'localhost',
//   expires: 365, // número de días
//   secure: true,
//   sameSite: 'strict' // o 'lax' o 'none'
// };

// cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage(cookieOptions));





export interface AuthResponse {
  isAuthenticated: boolean;
  name: string;
  email: string;
  validated: boolean;
  firstLogin: boolean;
  errorMessage?: string;
  Roles?: Roles;
  userPermissions?: UserPermissions[];  
}


export const fetchAuthUser = async () => {
  try {
    // const user = await currentAuthenticatedUser();
    // // console.log('User is signed in:', user);
    const auth = await getCurrentUser();
    const { username, userId } = auth;
    console.log(">>>fetchAuthUser, auth >>>", auth)
    
    
    // if(!username || !userId){
      !userId && await signOut()
      
    // }
    if(userId){
      const attributes = await fetchUserAttributes();
      // console.log(">>>attributes >>>", attributes)
      
      const email = attributes?.email || "";
      
      const req = await fetchUserData(email)
      // console.log(">>>req >>>", req)
      
      return {username, userId, email, ...req};
    }
    return {}
  } catch (error) {
    // console.log(error);
    // console.log("Not signed in");
  }
};



// export const fetchAuthUser = async (): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
     
      
//       const auth = await getCurrentUser();
//       const { username, userId } = auth;
      
//       console.log("<<< auth <<<<< ", auth)

//       !userId && await signOut()
//       !userId && reject({ errorMessage: "Usuario o clave no existe" });
      
//     if(userId){
//       const attributes = await fetchUserAttributes();
//       const email = attributes?.email || "";
//       const req = await fetchUserData(email)
//       // return {username, userId, email, ...req};
//       resolve({username, userId, email, ...req } as any);
//     }
      
        
//         // ...userData.data.getUsers
//       // } else {
//       //   reject({
//       //     errorMessage: errorMsg,
//       //   });
//       // }
//     } catch (err) {
//       reject(
//         JSON.stringify({
//           errorMessage: err,
//         })
//       );
//     }
//   });
// };


export const fetchUserData = async (userId: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const userData:any = await client.graphql({
        query: getUsers,
        variables: { id: userId },
      });
      
      // console.log("<<< userData <<<<< ", userData)
      const data = userData.data;
      
        resolve({ ...data.getUsers } as any);
        
        // ...userData.data.getUsers
      // } else {
      //   reject({
      //     errorMessage: errorMsg,
      //   });
      // }
    } catch (err) {
      reject(
        JSON.stringify({
          errorMessage: err,
        })
      );
    }
  });
};
