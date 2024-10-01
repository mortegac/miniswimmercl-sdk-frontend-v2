

type TypeOfBusiness = "SCHOOL" | "ACADEMY"
export type EmailsSent = {
  id: string
  title: string
  description: string
  typeOfBusiness: TypeOfBusiness


}

export const emptyEmailsSent: EmailsSent = {
  id:  "",
  title:  "",
  description:  "",
  typeOfBusiness:  "SCHOOL",
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

