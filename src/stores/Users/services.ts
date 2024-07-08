import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from "aws-amplify/auth";
import { fetchUserAttributes } from 'aws-amplify/auth';


import { getUsers } from './queries';

import { Roles } from "../Roles/types";
import { UserPermissions } from "../UserPermissions/types";


const client = generateClient();

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
    const { username, userId } = await getCurrentUser();
    console.log(">>>username, userId >>>", username, userId)
    const attributes = await fetchUserAttributes();
    console.log(">>>attributes >>>", attributes)
    const email = attributes?.email || "";
    
    const req = await fetchUserData(email)
    console.log(">>>req >>>", req)
    
    return {username, userId, email, ...req};
    
  } catch (error) {
    console.error(error);
    console.log("Not signed in");
  }
};

export const fetchUserData = async (userId: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const userData:any = await client.graphql({
        query: getUsers,
        variables: { id: userId },
      });
      
      console.log("<<< userData <<<<< ", userData)
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
