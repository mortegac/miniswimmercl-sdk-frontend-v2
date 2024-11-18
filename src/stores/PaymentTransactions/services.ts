import { generateClient } from 'aws-amplify/api';


import { listPaymentTransactions } from './queries';
import { FilterOptions } from './types';
const client = generateClient();




export const fetchData = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      
  
      const filterUserId = (typeof objFilter?.userId === 'undefined') ?
      {} : { usersPaymentTransactionsId: { eq: String(objFilter.userId) } };
      
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
            , limit:1000000
        }
      });
      
      // console.log("<<< STUDENTS DATA <<<<< ", getData)
      const data = getData.data;
      
        resolve({ ...data.listPaymentTransactions } as any);
        
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
