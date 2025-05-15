


export const typeOfPresence: any = {
  [""]: "",
  ["VIRTUAL"]: "CURSO ONLINE",
  ["IN_PERSON"]: "CURSO PRESENCIAL",
  ["HYBRID"]: "CURSO PRESENCIAL y ONLINE",
};

export const typeOfMonth: any = {
  [""]: "",
  ["01"]: "ENE",
  ["1"]: "ENE",
  ["02"]: "FEB",
  ["2"]: "FEB",
  ["03"]: "MAR",
  ["3"]: "MAR",
  ["04"]: "ABR",
  ["4"]: "ABR",
  ["05"]: "MAY",
  ["5"]: "MAY",
  ["06"]: "JUN",
  ["6"]: "JUN",
  ["07"]: "JUL",
  ["7"]: "JUL",
  ["08"]: "AGO",
  ["8"]: "AGO",
  ["09"]: "SEP",
  ["9"]: "SEP",
  ["10"]: "OCT",
  ["11"]: "NOV",
  ["12"]: "DIC",
};

export const typeOfMonthENG: any = {
  [""]: "",
  ["01"]: "JAN", 
  ["1"]: "JAN", 
  ["02"]: "FEB", 
  ["2"]: "FEB", 
  ["03"]: "MAR", 
  ["3"]: "MAR", 
  ["04"]: "APR", 
  ["4"]: "APR", 
  ["05"]: "MAY", 
  ["5"]: "MAY", 
  ["06"]: "JUN", 
  ["6"]: "JUN", 
  ["07"]: "JUL", 
  ["7"]: "JUL", 
  ["08"]: "AUG", 
  ["8"]: "AUG", 
  ["09"]: "SEP", 
  ["9"]: "SEP", 
  ["10"]: "OCT", 
  ["11"]: "NOV", 
  ["12"]: "DEC",
};



export const typeOfRelationship: any = {
    [""]: "",
    ["NONE"]: "",
    ["FATHER"]: "Padre",
    ["MOTHER"]: "Madre",
    ["OTHER"]: "Otro",
    ["GRANDFATHER"]: "Abuelo",
    ["GRANDMOTHER"]: "Abuela",
    ["UNCLE"]: "Tio",
    ["AUNT"]: "Tia",
    ["FAMILYS_FRIEND"]: "Amigo familia",
    ["Primo/a"]: "",
  };
  
  
export const typeOfSession: any = {
    [""]: "",
    ["ACTIVE"]: "ACTIVA",
    ["USED"]: "USADA",
    ["RECOVERED"]: "REAGENDADA",
    ["DELETED"]: "ELIMINADA",
  };
  
  
  export const statusSession:any=[
    { id:"ACTIVE", name:"ACTIVA" },
    { id:"USED", name:"USADA" },
    { id:"RECOVERED", name:"REAGENDADA" },
    { id:"DELETED", name:"ELIMINADA" },
  ]