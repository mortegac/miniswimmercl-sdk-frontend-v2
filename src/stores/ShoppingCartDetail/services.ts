import { generateClient } from 'aws-amplify/api';


import { listShoppingCartDetails } from './queries';
import { createShoppingCartDetail, deleteShoppingCartDetail } from './mutation';
import { FilterOptions, InputOptions } from './types';
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
        // wasDeleted: { eq: true }
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

export const createShoppinCartDetail = async (objInput: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      
      console.log("--createEmailSent--", objInput)
      const setData:any = await client.graphql({
        query: createShoppingCartDetail,
        variables: {
          input: {
            
            type: objInput?.type, 
            quantity: 1,
            amount: objInput?.amount, 
            detail: objInput?.detail, 
            shoppingCartCartDetailsId: objInput?.shoppingCartId, 
            
            // shoppingCartDetailEnrollmentId : objInput?.enrollmentId, 
          }
        }
      });
      
      console.log("<<< EMAIL CREADO <<<<< ", setData)
      const data = setData.data;
      
      if(data?.createShoppingCartDetail?.id !== undefined){
        resolve({ ...data.createShoppingCartDetail } as any);
      }else{
          reject({
            errorMessage: "Fallo al crear el email",
          });
        
      }
        
      // ...userData.data.getUsers
      // } else {
      // }
    } catch (err) {
      reject({
        errorMessage: JSON.stringify(err),
    });
    }
  });
};

export const removeShoppinCartDetail = async (objInput: InputOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
     
      
      console.log("--removeShoppinCartDetail--", objInput)
      const setData:any = await client.graphql({
        query: deleteShoppingCartDetail,
        variables: {
          input: {
            id: objInput?.shoppingDetailCartId, 
            // wasDeleted: true,            
          }
        }
      });
      
      console.log("<<< removeShoppinCartDetail ELIMINADO <<<<< ", setData)
      const data = setData.data;
      
      if(data?.deleteShoppingCartDetail?.id !== undefined){
        resolve({ ...data.deleteShoppingCartDetail } as any);
      }else{
          reject({
            errorMessage: "Fallo al eliminar removeShoppinCartDetail",
          });
        
      }
        
      // ...userData.data.getUsers
      // } else {
      // }
    } catch (err) {
      reject({
        errorMessage: JSON.stringify(err),
    });
    }
  });
};