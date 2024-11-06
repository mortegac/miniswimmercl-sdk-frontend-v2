const Users = require("./Users");
const SessionDetail = require("./SessionDetail");
const Enrollment = require("./Enrollment");
const Schedule = require("./Schedule");
const CourseSessionType = require("./CourseSessionType");
const SessionType = require("./SessionType");
const Correlatives = require("./Correlatives");
const transaction = require("./paymentTransactions")


module.exports = {
  ...Users,
  ...SessionDetail,
  ...Enrollment,
  ...Schedule,
  ...CourseSessionType,
  ...SessionType,
  ...Correlatives,
  ...transaction,
};