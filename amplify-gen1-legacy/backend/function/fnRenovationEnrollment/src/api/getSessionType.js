

const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");


const query = gql`
  query GetSessionType($id: ID!) {
    getSessionType(id: $id) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      courses {
        items{
          id
          courseId
        }
      }
      createdAt
      updatedAt
    }
  }
`;
const getSessionType = async (variables) => {
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
            console.log(variables, "----ERROR - getSessionType()----", error);
            return reject(JSON.stringify(error));
        }
    });
};

module.exports = {
    getSessionType
}