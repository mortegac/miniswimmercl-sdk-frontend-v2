
// type AgeGroupType = "ALL" | "BABIES" | "CHILDREN" | "ADULTS" | "PREGNANT" | "OLDER_ADULTS"; 




export type PaymentTransactions = {
  id: string
  status: string
  token: string
  amount: number
  buy_order: string
  card_number: string
  transaction_date: string
  accounting_date: string
  installments_number: string
  session_id: string
  card_detail: string
  payment_type_code: string
  installments_amount: string
  authorization_code: string
  response_code: string
  vci: string
  day: string
  month: string
  year: string
  hour: string
  glosa: string
  hasRefund: boolean

    // #Relations
    // users: Users @belongsTo
    // enrollment: Enrollment @belongsTo    # Pago por Inscripcion


  // schedules: {items: Schedule[]};
  // sessionTypes: {items: SessionType[]};

}

export const emptyPaymentTransactions: PaymentTransactions = {
  id: "",
  status: "",
  token: "",
  amount: 0,
  buy_order: "",
  card_number: "",
  transaction_date: "",
  accounting_date: "",
  installments_number: "",
  session_id: "",
  card_detail: "",
  payment_type_code: "",
  installments_amount: "",
  authorization_code: "",
  response_code: "",
  vci: "",
  day: "",
  month: "",
  year: "",
  hour: "",
  glosa: "",
  hasRefund: false

  // schedules: {items: [emptySchedules]},
  // sessionTypes: {items: [emptySessionTypes]},
};



export type FilterOptions  = {

  isActive?: boolean;
  userId?: string;
  status?: string;

}