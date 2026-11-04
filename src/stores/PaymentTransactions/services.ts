import { generateClient } from 'aws-amplify/api';


import { listPaymentTransactions, listPaymentTransactionsByCart } from './queries';
import { FilterOptions } from './types';
const client = generateClient();




export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      
  
      const filterUserId = (typeof objFilter?.userId === 'undefined') ?
      {} : { usersId: { eq: String(objFilter.userId) } };
      
      const filterStatus = (typeof objFilter?.status === 'undefined') ?
      {} : { status: { eq: String(objFilter.status) } };
      
      // const filterIsActive = (typeof objFilter?.isActive === 'undefined') ?
      // { isActive: { eq: true } } : { isActive: { eq: Boolean(objFilter.isActive) } };
      
      const filter: any = {
        ...filterUserId,
        ...filterStatus,
      };
      
      const getData:any = await client.graphql({
        query: listPaymentTransactions,
        variables: { 
            filter: {...filter}
            , limit:100000000
        }
      });
      
      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listV2PaymentTransactions } as any);
        
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

export const fetchDataByCart = async (cartId: string): Promise<any> => {
  const res: any = await client.graphql({
    query: listPaymentTransactionsByCart,
    variables: { shoppingCartId: cartId, limit: 100 },
  });
  return res.data.listV2PaymentTransactions;
};
