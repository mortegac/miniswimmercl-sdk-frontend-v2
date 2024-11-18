import { generateClient } from 'aws-amplify/api';


import { listShoppingCarts } from './queries';
import { FilterOptions } from './types';
const client = generateClient();




export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      
      
      const filterUser = (typeof objFilter?.userId === 'undefined') ?
      {} : { usersShoppingCartId: { eq: String(objFilter.userId) } };
      
      const filterStatus = (typeof objFilter?.status === 'undefined') ?
      {} : { status: { eq: String(objFilter.status) } };
      
         
      const filter: any = {
        ...filterUser,
        ...filterStatus,
      };   
      
      const getData:any = await client.graphql({
        query: listShoppingCarts,
        variables: { 
            filter: {...filter}
            , limit:1000000
        }
      });
      
      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listShoppingCarts } as any);
        
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

