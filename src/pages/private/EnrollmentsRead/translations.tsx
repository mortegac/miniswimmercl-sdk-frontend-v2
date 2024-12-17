type translationType = {
  [key: string]: string;
};

export const TranslationsConsultancyPaths = (name: string): string => {
  const translation: translationType = {
    totalAmount: "Devolución",
    totalResidenceServiceMargin: "Margen residencia",
    totalEnergicaServiceMargin: "Margen Enérgica",
  };

  return translation[name] || name;
};
