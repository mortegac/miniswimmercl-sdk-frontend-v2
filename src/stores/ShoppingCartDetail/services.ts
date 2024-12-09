import { generateClient } from 'aws-amplify/api';


import { listShoppingCartDetails } from './queries';
import { FilterOptions } from './types';
const client = generateClient();




export const fetchOne = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      
      
      const filterCartId = (typeof objFilter?.cartId === 'undefined') ?
      {} : { shoppingCartCartDetailsId: { eq: String(objFilter.cartId) } };
    
      const filterEnrollmentId = (typeof objFilter?.enrollmentId === 'undefined') ?
      {} : { shoppingCartDetailEnrollmentId: { eq: String(objFilter.enrollmentId) } };
      
         
      const filter: any = {
        ...filterCartId,
        ...filterEnrollmentId,
      };
      
      // const getData:any = await client.graphql({
      //   query: getShoppingCartDetail,
      //   variables: { id: objFilter.id },
      // });
      
      
      const getData:any = await client.graphql({
        query: listShoppingCartDetails,
        variables: { 
            filter: {...filter}
            , limit:100000000
        }
      });
      
      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listShoppingCartDetails } as any);
        
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

