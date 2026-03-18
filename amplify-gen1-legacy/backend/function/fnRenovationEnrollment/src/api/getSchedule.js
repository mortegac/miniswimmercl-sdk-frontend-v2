
const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");


const query = gql`
  query GetSchedule($id: ID!) {
    getSchedule(id: $id) {
      id
      day
      startHour
      endHour
      course {
        id
        title
        description
        startingAge
        endingAge
        ageType
        AgeGroupType
        duration
        isActive
        createdAt
        updatedAt
        locationCoursesId
      }
      location {
        id
        name
        city
        minimumTemperature
        maximumTemperature
        address
        phone
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      locationSchedulesId
      courseSchedulesId
    }
  }
`;

const getSchedule = async (variables) => {
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
            console.log(variables, "----ERROR - getSchedule()----", error);
            return reject(JSON.stringify(error));
        }
    });
};

module.exports = {
    getSchedule
}