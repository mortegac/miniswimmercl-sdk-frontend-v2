import { generateClient } from 'aws-amplify/api';


import { listParameters } from './queries';
const client = generateClient();




export const fetchData = async (objFilter: {key: String,}): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const getData:any = await client.graphql({
        query: listParameters,
        variables: {
            filter: { parametersEncTypeOfParameterId: { eq: objFilter.key } },
            limit: 1000000
        }
      });
      
      const data = [...getData.data.listParameters.items];
      
      const _parameters = Array.isArray(data) ? data.sort((a, b) => a.id.localeCompare(b.id)) : data;
      // console.log("key: ", objFilter.key, ' >List: ', _parameters)
      
      
      
        resolve({
          key: objFilter.key,
          list: [..._parameters]
      } as any);
        
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
