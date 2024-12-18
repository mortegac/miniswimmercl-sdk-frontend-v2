

type TypeOfEmail = "WELCOME" | "NOSESSION"
export type EmailSend = {
  id: string
  date: string
  type: TypeOfEmail
  contentEmail: string
  email: string
  emailState: boolean
  
  
  // #Relations 
  // userSend: Users! @belongsTo  #User que envio el email
  // student: Student! @belongsTo
  


}

export const emptyEmailSend: EmailSend = {
  id:  "",
  date:  "", // new Date(Date.now()).toISOString()
  type:  "WELCOME",
  contentEmail:  "",
  email:  "",
  emailState: false,
};




export type InputOptions  = {
  to_sede?:string;
  to_nombre_sede?:string;
  to_categoria_sede?:string;
  to_dias_sesiones?:string;
  to_direccion_sede?:string;  
  to_estacionamientos_sede?:string;
  to_mudadores_sede?:string;
  reply_to?:string;
  
  from_name?:string;
  to_email?:string;
  to_name?:string;
}


export type FilterOptions  = { 
  type?: string;
  contentEmail?: string;
  contentMessage?: string;
  phone?: string;
  email?: string;
  emailState?: string;
  phoneState?: string;
  
  
  enrollmentEmailSendsId?: string;
  usersEmailSendId?: string;
  
  studentEmailSendId?: string;
  
}