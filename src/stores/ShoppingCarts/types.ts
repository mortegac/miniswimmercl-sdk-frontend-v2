




export type ShoppingCart = {
  id: string
  totalPrice: number
  status: string
  createdAt: string
  
  // #Relations
  // user: Users! @belongsTo      #Cliente que paga el carro
  // seller: Users! @belongsTo      #Vendedor que gestiona la venta
  // sellersCommission: SellersCommission @belongsTo
  // cartDetails: [ShoppingCart] @hasMany
  // paymentTransactions: [PaymentTransactions] @hasMany
}

export const emptyShoppingCart: ShoppingCart = {
  id: "",
  totalPrice: 0,
  status: "",
  createdAt: "",
  
};



export type FilterOptions  = {

  userId?: string;
  status?: string;

}