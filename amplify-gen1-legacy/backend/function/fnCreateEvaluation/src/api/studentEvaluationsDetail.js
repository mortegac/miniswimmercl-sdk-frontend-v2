const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");




const mutation = gql`
  mutation CreateStudentEvaluationsDetail(
    $input: CreateStudentEvaluationsDetailInput!
    $condition: ModelStudentEvaluationsDetailConditionInput
  ) {
    createStudentEvaluationsDetail(input: $input, condition: $condition) { id }
    }
`;

const setEvaluationDetail = async (variables) => {
  
  console.log("--setEvaluationDetail--", variables)

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
            const res = base?.data?.createStudentEvaluationsDetail
            return resolve(res);
        } catch (error) {
            console.log(variables, "----ERROR - setEvaluation()----", error);
            return reject(JSON.stringify(error));
        }
    });
};


module.exports = {
    setEvaluationDetail,
}