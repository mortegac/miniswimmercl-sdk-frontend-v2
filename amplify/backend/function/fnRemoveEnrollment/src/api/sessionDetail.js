const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");

// console.log("--layer--", layer)

const mutation = gql`
  mutation UpdateSessionDetail(
    $input: UpdateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    updateSessionDetail(input: $input, condition: $condition) { id }
  }
`;


const removeSession = async (variables) => {
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
            const res = base?.data?.updateSessionDetail
            return resolve(res);
        } catch (error) {
            console.log(variables, "----ERROR - updateSessionDetail()----", error);
            return reject(JSON.stringify(error));
        }
    });
};

module.exports = {
    removeSession
}