const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");




const mutation = gql`
  mutation CreateStudentEvaluations(
    $input: CreateStudentEvaluationsInput!
    $condition: ModelStudentEvaluationsConditionInput
  ) {
    createStudentEvaluations(input: $input, condition: $condition) {
      id
    }
  }
`;

const setEvaluation = async (variables) => {
  
  console.log("--setEvaluation--", variables)

    return new Promise(async (resolve, reject) => {
        try {
        
            const base = (await layer?.utils?.APIv2({
                env: process.env.ENV,
                _query: mutation,
                _variables: {
                  input:{ ...variables }
                },
                access: {
                    apikey: process.env.API_KEY,
                    endpoint: process.env.API_ENDPOINT,
                }
            }))
            const res = base?.data?.createStudentEvaluations
            return resolve(res);
        } catch (error) {
            console.log(variables, "----ERROR - setEvaluation()----", error);
            return reject(JSON.stringify(error));
        }
    });
};


module.exports = {
  setEvaluation,
}