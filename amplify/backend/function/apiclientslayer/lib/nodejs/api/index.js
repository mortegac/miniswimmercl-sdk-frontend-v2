const Users = require("./Users");
const SessionDetail = require("./SessionDetail");
const Enrollment = require("./Enrollment");
const Schedule = require("./Schedule");
const CourseSessionType = require("./CourseSessionType");
const SessionType = require("./SessionType");


module.exports = {
  ...Users,
  ...SessionDetail,
  ...Enrollment,
  ...Schedule,
  ...CourseSessionType,
  ...SessionType,
};