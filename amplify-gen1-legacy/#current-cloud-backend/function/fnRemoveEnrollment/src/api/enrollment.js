const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");

// console.log("--layer--", layer)

const query = gql`
  query GetEnrollment($id: ID!) {
    getEnrollment(id: $id) {
      id
      scheduleId     
      wasPaid
      wasDeleted
      sessionDetails{
        items{
          id
          date
          month
          year
          status
        }
      }
      shoppingCartDetail {
        id
        type
        quantity
        amount
        detail
        createdAt
        updatedAt
        shoppingCartCartDetailsId
        shoppingCartDetailEnrollmentId
      }
      courseEnrollmentsId
      sessionTypeEnrollmentsId
      studentEnrollmentsId
      usersEnrollmentsId
      enrollmentShoppingCartDetailId
    }
  }
`;

const getEnrollment = async (variables) => {
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
            const res = base?.data?.getEnrollment
            return resolve(res);
        } catch (error) {
            console.log(variables, "----ERROR - sendEmail()----", error);
            return reject(JSON.stringify(error));
        }
    });
};


const mutation = gql`
  mutation UpdateEnrollment(
    $input: UpdateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    updateEnrollment(input: $input, condition: $condition) {
      id
    }
  }
`;
const removeEnrollment = async (variables) => {
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
          const res = base?.data?.getEnrollment
          return resolve(res);
      } catch (error) {
          console.log(variables, "----ERROR - sendEmail()----", error);
          return reject(JSON.stringify(error));
      }
  });
};


module.exports = {
    getEnrollment,
    removeEnrollment
}