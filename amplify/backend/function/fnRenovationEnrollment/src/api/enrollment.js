const gql = require("graphql-tag");
const layer = require("/opt/nodejs/index");

const query = gql`
  query GetEnrollment($id: ID!) {
    getEnrollment(id: $id) {
      id
      scheduleId     
      
      amountPaid
      startDate
      endDate
      wasPaid
      timeAWeek
      numberOfSessions
      sessionsLeft
      sessionsUsed
      scheduleName
      paymentToken
      student {
        id
        emailPhone
      }
      sessionType {
        id
        name
        totalSessions
        amount
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
      course {
        id
        title
        locationCoursesId
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

module.exports = {
    getEnrollment
}