const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");

// console.log("--layer--", layer)

const query = gql`
query ListShoppingCartDetails(
  $filter: ModelShoppingCartDetailFilterInput
  $limit: Int
  $nextToken: String
) {
  listShoppingCartDetails(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      shoppingCartCartDetailsId
    }

  }
}
`;


const getShoppingCartDetail = async (variables) => {
    return new Promise(async (resolve, reject) => {
        try {
        
            const base = (await layer?.utils?.APIv2({
                env: process.env.ENV,
                _query: query,
                _variables: {
                    ...variables
                },
                access: {
                    apikey: process.env.API_KEY,
                    endpoint: process.env.API_ENDPOINT,
                }
            }))
            const res = base?.data?.listShoppingCartDetails?.items
            return resolve(res);
        } catch (error) {
            console.log(variables, "----ERROR - sendEmail()----", error);
            return reject(JSON.stringify(error));
        }
    });
};





const mutation = gql`
  mutation DeleteShoppingCartDetail(
    $input: DeleteShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    deleteShoppingCartDetail(input: $input, condition: $condition) { id }
  }
`;
const removeCartDetail = async (variables) => {
  return new Promise(async (resolve, reject) => {
      try {
      
          const base = (await layer?.utils?.APIv2({
              env: process.env.ENV,
              _query: mutation,
              _variables: {
                  ...variables
              },
              access: {
                  apikey: process.env.API_KEY,
                  endpoint: process.env.API_ENDPOINT,
              }
          }))
          const res = base?.data?.deleteShoppingCartDetail
          return resolve(res);
      } catch (error) {
          console.log(variables, "----ERROR - deleteShoppingCartDetail()----", error);
          return reject(JSON.stringify(error));
      }
  });
};




module.exports = {
    getShoppingCartDetail,
    removeCartDetail
}