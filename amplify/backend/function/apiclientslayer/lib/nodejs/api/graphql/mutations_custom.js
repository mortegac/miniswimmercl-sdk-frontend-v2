
const gql = require("graphql-tag");

// -------------------------------------------------
// USERS
// -------------------------------------------------
const createUsers = gql`
 mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
    }
  }
`;
const updateUsers = gql`
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
    }
  }
`;
const deleteUsers = gql`
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
    }
  }
`;

// -------------------------------------------------
// LOCATIONS
// -------------------------------------------------


// -------------------------------------------------
// CURSOS
// -------------------------------------------------



// -------------------------------------------------
// HORARIOS
// -------------------------------------------------



// -------------------------------------------------
// PACK DE SESIONES
// -------------------------------------------------


// -------------------------------------------------
// ALUMNOS
// -------------------------------------------------


// -------------------------------------------------
// INSCRIPCION
// -------------------------------------------------
const createEnrollment = gql`
  mutation CreateEnrollment(
    $input: CreateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    createEnrollment(input: $input, condition: $condition) {id}
  }
`;
const updateEnrollment = gql`
  mutation UpdateEnrollment(
    $input: UpdateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    updateEnrollment(input: $input, condition: $condition) {id}
  }
`;
const deleteEnrollment = gql`
  mutation DeleteEnrollment(
    $input: DeleteEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    deleteEnrollment(input: $input, condition: $condition) {id}
    
  }
`;
// -------------------------------------------------
// DETALLE SESIONES ALUMNO
// -------------------------------------------------
const createSessionDetail = gql `
  mutation CreateSessionDetail(
    $input: CreateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    createSessionDetail(input: $input, condition: $condition) {id}
  }
`;
const updateSessionDetail = gql`
  mutation UpdateSessionDetail(
    $input: UpdateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    updateSessionDetail(input: $input, condition: $condition) {id}
  }
`;
const deleteSessionDetail = gql`
  mutation DeleteSessionDetail(
    $input: DeleteSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    deleteSessionDetail(input: $input, condition: $condition) {id}
  }
`;

// -------------------------------------------------
// TRANSACCIONES
// -------------------------------------------------
const createTransaction = gql`
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {id}
  }
`;
const updateTransaction = gql`
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {id}
  }
`;
const deleteTransaction = gql`
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {id}
  }
`;



// -------------------------------------------------
// GASTOS
// -------------------------------------------------




module.exports = {
  createUsers,
  updateUsers,
  deleteUsers,
  
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  
  createSessionDetail,
  updateSessionDetail,
  deleteSessionDetail,
  
  createTransaction,
  updateTransaction,
  deleteTransaction
};
