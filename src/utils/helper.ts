import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { parseColor } from "tailwindcss/lib/util/color";

dayjs.extend(duration);
export const daysDate = [
  { id: "1", name: "01" },
  { id: "2", name: "02" },
  { id: "3", name: "03" },
  { id: "4", name: "04" },
  { id: "5", name: "05" },
  { id: "6", name: "06" },
  { id: "7", name: "07" },
  { id: "8", name: "08" },
  { id: "9", name: "09" },
  { id: "10", name: "10" },
  { id: "11", name: "11" },
  { id: "12", name: "12" },
  { id: "13", name: "13" },
  { id: "14", name: "14" },
  { id: "15", name: "15" },
  { id: "16", name: "16" },
  { id: "17", name: "17" },
  { id: "18", name: "18" },
  { id: "19", name: "19" },
  { id: "20", name: "20" },
  { id: "21", name: "21" },
  { id: "22", name: "22" },
  { id: "23", name: "23" },
  { id: "24", name: "24" },
  { id: "25", name: "25" },
  { id: "26", name: "26" },
  { id: "27", name: "27" },
  { id: "28", name: "28" },
  { id: "29", name: "29" },
  { id: "30", name: "30" },
  { id: "31", name: "31" },
];
export const monthsDate = [
  { id: "01", name: "ENERO" },
  { id: "02", name: "FEBRERO" },
  { id: "03", name: "MARZO" },
  { id: "04", name: "ABRIL" },
  { id: "05", name: "MAYO" },
  { id: "06", name: "JUNIO" },
  { id: "07", name: "JULIO" },
  { id: "08", name: "AGOSTO" },
  { id: "09", name: "SEPTIEMBRE" },
  { id: "10", name: "OCTUBRE" },
  { id: "11", name: "NOVIEMBRE" },
  { id: "12", name: "DICIEMBRE" },
];
export const yearsDate = [
  { id: "2021", name: "2021" },
  { id: "2022", name: "2022" },
  { id: "2023", name: "2023" },
];

interface YearItem {
  id: string;
  name: string;
}

export function generateYearsArray(): YearItem[] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const yearsArray: YearItem[] = [
    // Dos años atrás
    { id: `${currentYear - 2}`, name: `${currentYear - 2}` },

    // Año anterior
    { id: `${currentYear - 1}`, name: `${currentYear - 1}` },

    // Año actual
    { id: `${currentYear}`, name: `${currentYear}` },

    // Próximo año
    { id: `${currentYear + 1}`, name: `${currentYear + 1}` }
  ];

  return yearsArray;
}

export const calculateCurrentDate = () => {
  // const date = new Date();
  const date: String = new Date(Date.now()).toString();
  const year = new Date(Date.now()).getFullYear();
  const month = new Date(Date.now()).getMonth() + 1;
  const day = new Date(Date.now()).getDate().toString();
  const hour = new Date(Date.now()).getHours();
  const minutes = new Date(Date.now()).getMinutes();

  return {
    now: date,
    day: Number(day) < 10 ? "0" + day?.toString() : day?.toString(),
    month: month < 10 ? "0" + month?.toString() : month?.toString(),
    year: year?.toString(),
    hourFull: `${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? "0" + minutes : minutes}`,
    hour: hour < 10 ? "0" + hour : hour,
    minutes: minutes < 10 ? "0" + minutes : minutes,
  };
};

export function getMonthNameById(id: string) {
  return monthsDate.find(month => month.id === id)?.name || null;
}


const cutText = (text: string, length: number) => {
  if (text.split(" ").length > 1) {
    const string = text.substring(0, length);
    const splitText = string.split(" ");
    splitText.pop();
    return splitText.join(" ") + "...";
  } else {
    return text;
  }
};

const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format);
};

const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "";
  }
};

const onlyNumber = (string: string) => {
  if (string) {
    return string.replace(/\D/g, "");
  } else {
    return "";
  }
};

const formatCurrency = (number: number) => {
  if (number) {
    const formattedNumber = number.toString().replace(/\D/g, "");
    const rest = formattedNumber.length % 3;
    let currency = formattedNumber.substr(0, rest);
    const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
    let separator;

    if (thousand) {
      separator = rest ? "," : "";
      currency += separator + thousand.join(",");
    }

    return currency;
  } else {
    return "";
  }
};

const timeAgo = (time: string) => {
  const date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const dayDiff = Math.floor(diff / 86400);

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return dayjs(time).format("MMMM DD, YYYY");
  }

  return (
    (dayDiff === 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
    (dayDiff === 1 && "Yesterday") ||
    (dayDiff < 7 && dayDiff + " days ago") ||
    (dayDiff < 31 && Math.ceil(dayDiff / 7) + " weeks ago")
  );
};

const diffTimeByNow = (time: string) => {
  const startDate = dayjs(dayjs().format("YYYY-MM-DD HH:mm:ss").toString());
  const endDate = dayjs(dayjs(time).format("YYYY-MM-DD HH:mm:ss").toString());

  const duration = dayjs.duration(endDate.diff(startDate));
  const milliseconds = Math.floor(duration.asMilliseconds());

  const days = Math.round(milliseconds / 86400000);
  const hours = Math.round((milliseconds % 86400000) / 3600000);
  let minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000);
  const seconds = Math.round(
    (((milliseconds % 86400000) % 3600000) % 60000) / 1000
  );

  if (seconds < 30 && seconds >= 0) {
    minutes += 1;
  }

  return {
    days: days.toString().length < 2 ? "0" + days : days,
    hours: hours.toString().length < 2 ? "0" + hours : hours,
    minutes: minutes.toString().length < 2 ? "0" + minutes : minutes,
    seconds: seconds.toString().length < 2 ? "0" + seconds : seconds,
  };
};

const isset = (obj: object | string) => {
  if (obj !== null && obj !== undefined) {
    if (typeof obj === "object" || Array.isArray(obj)) {
      return Object.keys(obj).length;
    } else {
      return obj.toString().length;
    }
  }

  return false;
};

const toRaw = (obj: object) => {
  return JSON.parse(JSON.stringify(obj));
};

const randomNumbers = (from: number, to: number, length: number) => {
  const numbers = [0];
  for (let i = 1; i < length; i++) {
    numbers.push(Math.ceil(Math.random() * (from - to) + to));
  }

  return numbers;
};

const toRGB = (value: string) => {
  return parseColor(value).color.join(" ");
};

const stringToHTML = (arg: string) => {
  const parser = new DOMParser(),
    DOM = parser.parseFromString(arg, "text/html");
  return DOM.body.childNodes[0] as HTMLElement;
};

const slideUp = (
  el: HTMLElement,
  duration = 300,
  callback = (el: HTMLElement) => {}
) => {
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.height = el.offsetHeight + "px";
  el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = "0";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "0";
  el.style.marginTop = "0";
  el.style.marginBottom = "0";
  window.setTimeout(() => {
    el.style.display = "none";
    el.style.removeProperty("height");
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    callback(el);
  }, duration);
};

const slideDown = (
  el: HTMLElement,
  duration = 300,
  callback = (el: HTMLElement) => {}
) => {
  el.style.removeProperty("display");
  let display = window.getComputedStyle(el).display;
  if (display === "none") display = "block";
  el.style.display = display;
  let height = el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = "0";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "0";
  el.style.marginTop = "0";
  el.style.marginBottom = "0";
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.height = height + "px";
  el.style.removeProperty("padding-top");
  el.style.removeProperty("padding-bottom");
  el.style.removeProperty("margin-top");
  el.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    callback(el);
  }, duration);
};

export {
  cutText,
  formatDate,
  capitalizeFirstLetter,
  onlyNumber,
  formatCurrency,
  timeAgo,
  diffTimeByNow,
  isset,
  toRaw,
  randomNumbers,
  toRGB,
  stringToHTML,
  slideUp,
  slideDown,
};
