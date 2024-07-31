import { format, tzDate } from '@formkit/tempo';


type FormatDateType = {
  date: string;
  options?: Intl.DateTimeFormatOptions;
};

const optDefault: Intl.DateTimeFormatOptions = {
  month: "long",
  day: "numeric",
};




export const FormatDate = ({
  date,
  options = optDefault,
}: FormatDateType): string => {
  const opt = { ...optDefault, ...options };
  const validDate = date.split("").slice(-1)[0] === "Z" ? date : date + "Z";
  try {
    return new Intl.DateTimeFormat("es-es", opt).format(new Date(validDate));
  } catch (error) {
    return "";
  }
};
export const FormatDateSession = (fechaIso8601: string) => {
  
  try {
  
    // let fechaIso8601 =dateSession;
    fechaIso8601 =fechaIso8601.replace(/\D/g, ' ');          
    let componentsdate:any = fechaIso8601.split(' ');    
    const dateSession = new Date(`${componentsdate[0]}/${componentsdate[1]}/${componentsdate[2]} 00:00:00`);
    const fechaConZona = tzDate(dateSession.toISOString(), "America/Santiago");
    const fechaFormateada = format(fechaConZona, "ddd, DD-MMM", "es");
    
    return fechaFormateada
    
  } catch (error) {
    return fechaIso8601;
  }
};

function padTo2Digits(num: string) {
  return String(num).padStart(2, "0");
}

export const HoursAndMinutes = (date: string): string => {
  const d = new Date(date);

  const result: string =
    padTo2Digits(d.toUTCString()) + ":" + padTo2Digits(d.toUTCString());
  console.log(date), console.log(result);
  return result;
};
