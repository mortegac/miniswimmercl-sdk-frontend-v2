
export type QuickResponse = {
  id: string;
  name: string;
  message: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  __typename?: string;
};

export const emptyQuickResponse: QuickResponse = {
  id: "",
  name: "",
  message: "",
  isActive: true,
  createdAt: "",
  updatedAt: "",
  __typename: "QuickResponse",
};

export type FilterOptions = {
  id?: string;
  name?: string;
  message?: string;
  isActive?: boolean;
  searchTerm?: string;
};
