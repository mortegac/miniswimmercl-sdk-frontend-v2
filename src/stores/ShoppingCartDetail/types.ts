


type Type = "PRODUCTS" | "ENROLLMENT"; 




export type ShoppingCartDetail = {
  id: string
  type: Type
  quantity: number
  amount: number
  detail: string
}

export const emptyShoppingCartDetail: ShoppingCartDetail = {
  id: "",
  type: "PRODUCTS",
  quantity: 0,
  amount: 0,
  detail: "",
  
};



export type InputOptions  = {

  type?: string;
  amount?: string;
  detail?: string;
  shoppingCartId?: string;

  enrollmentId?: string;

}
export type FilterOptions  = {

  cartId?: string;
  enrollmentId?: string;

}