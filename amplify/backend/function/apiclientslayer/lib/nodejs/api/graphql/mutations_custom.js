
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
// -------------------------------------------------
// GASTOS
// -------------------------------------------------
const createCorrelatives = gql`
  mutation CreateCorrelatives(
    $input: CreateCorrelativesInput!
    $condition: ModelCorrelativesConditionInput
  ) {
    createCorrelatives(input: $input, condition: $condition) { id correlative }
  }
`;
const updateCorrelatives = gql`
  mutation UpdateCorrelatives(
    $input: UpdateCorrelativesInput!
    $condition: ModelCorrelativesConditionInput
  ) {
    updateCorrelatives(input: $input, condition: $condition)  { id correlative }
  }
`;
const deleteCorrelatives = gql`
  mutation DeleteCorrelatives(
    $input: DeleteCorrelativesInput!
    $condition: ModelCorrelativesConditionInput
  ) {
    deleteCorrelatives(input: $input, condition: $condition) { id correlative }
  }
`;

const createPaymentTransactions = gql`
  mutation CreatePaymentTransactions(
    $input: CreatePaymentTransactionsInput!
    $condition: ModelPaymentTransactionsConditionInput
  ) {
    createPaymentTransactions(input: $input, condition: $condition) { id }
  }
`;
const updatePaymentTransactions = gql`
  mutation UpdatePaymentTransactions(
    $input: UpdatePaymentTransactionsInput!
    $condition: ModelPaymentTransactionsConditionInput
  ) {
    updatePaymentTransactions(input: $input, condition: $condition) { id status }
  }
`;

const deletePaymentTransactions = gql`
  mutation DeletePaymentTransactions(
    $input: DeletePaymentTransactionsInput!
    $condition: ModelPaymentTransactionsConditionInput
  ) {
    deletePaymentTransactions(input: $input, condition: $condition) { id }
  }
`;

// SHOPPING CART

const createShoppingCart = gql`
  mutation CreateShoppingCart(
    $input: CreateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    createShoppingCart(input: $input, condition: $condition) { id }
  }
`;

const updateShoppingCart = gql`
  mutation UpdateShoppingCart(
    $input: UpdateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    updateShoppingCart(input: $input, condition: $condition) { id }
  }
`;

const deleteShoppingCart = gql`
  mutation DeleteShoppingCart(
    $input: DeleteShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    deleteShoppingCart(input: $input, condition: $condition) { id }
  }
`;

// SHOPPING CART DETAIL

const createShoppingCartDetail = gql`
  mutation CreateShoppingCartDetail(
    $input: CreateShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    createShoppingCartDetail(input: $input, condition: $condition) { id }
  }
`;

const deleteShoppingCartDetail = gql`
  mutation DeleteShoppingCartDetail(
    $input: DeleteShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    deleteShoppingCartDetail(input: $input, condition: $condition) { id }
  }
`;
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
  deleteTransaction,
  
  createCorrelatives,
  updateCorrelatives,
  deleteCorrelatives,  
  
  
  createPaymentTransactions, 
  updatePaymentTransactions,
  
  createShoppingCart,
  updateShoppingCart,
  deleteShoppingCart,
  createShoppingCartDetail,
  deleteShoppingCartDetail
  
};
