import { generateClient } from 'aws-amplify/api';


// import { getShoppingCart } from './queries';
import { setStart, setCommit, setStatus } from './mutation';
import { FilterOptions } from './types';
const client = generateClient();


export const wpStart = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: setStart,
        variables: {
            amount: objFilter.amount,
            userId: objFilter.userId,
            glosa: objFilter.glosa,
            cartId: objFilter.cartId,
        }
      });
      
      // console.log("<<< WP START CREADO 1<<<<< ", setData)
      const data = setData?.data?.setStart || {};
      // console.log("<<< WP START CREADO 2<<<<< ", data)
          
      resolve({ data } as any);
        
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
export const wpCommit = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: setCommit,
        variables: {
            token: objFilter.token
        }
      });
      
      // console.log("<<< WP COMMIT CREADO 1<<<<< ", setData)
      const data = setData?.data?.setCommit || {};
      // console.log("<<< WP COMMIT CREADO 2<<<<< ", data)
          
      resolve({ data } as any);
        
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
export const wpStatus = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const setData:any = await client.graphql({
        query: setStatus,
        variables: {
            token: objFilter.token
        }
      });
      
      // console.log("<<< WP STATUS CREADO 1<<<<< ", setData)
      const data = setData?.data?.setStatus || {};
      // console.log("<<< WP STATUS CREADO 2<<<<< ", data)
          
      resolve({ data } as any);
        
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
