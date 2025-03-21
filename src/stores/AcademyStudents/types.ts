
export type AcademyStudents = {
  id: string;
  name: string;
  urlImage: string;
  email: string;
  birthdate: string;
  years: number
  address: string;
  country: string;
  phone: string;
  profession: string;
  studiesRelated: string;
  medicalHistory: string;
  emergencyContact: string;
  createdAt: string;
  presence: string;
  isPaid: boolean;
  isSponsored: boolean;
}

export const emptyAcademyStudents: AcademyStudents = {
  id: "",
  name: "",
  urlImage: "",
  email:  "",
  birthdate:  "",
  years: 0,
  address:  "",
  country:  "",
  phone:  "",
  profession:  "",
  studiesRelated:  "",
  medicalHistory:  "",
  emergencyContact:  "",
  createdAt:  "",
  presence:  "",
  isPaid: false,
  isSponsored: false,
};



export type FilterOptions  = {
  isPaid: boolean;
}