
export type Product = {
  id: string
  sku: string
  name: string
  currentStock: string
  criticalStock: string
  purchasePrice: string
  sellingPrice: string
  profits: string
  isActive: string
  supplierProductsId: string
}

export const emptyProduct: Product = {
  id:  "",
  sku:  "",
  name:  "",
  currentStock:  "",
  criticalStock:  "",
  purchasePrice:  "",
  sellingPrice:  "",
  profits:  "",
  isActive:  "",
  supplierProductsId:  "",
};



export type FilterOptions  = {
  isActive?: boolean;
}
// export type InputCourse  = {
//   id?: string;
//   title?: string;
//   description?: string;
//   startingAge: number
//   endingAge:number
//   ageType?: string;
//   AgeGroupType?: string;
//   duration?: string;
//   isActive: boolean
//   locationCoursesId?: string;
// }