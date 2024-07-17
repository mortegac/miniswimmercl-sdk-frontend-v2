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
