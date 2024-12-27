
const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const addShoppingCart = async (props) => {
    try {
    
        return (await api.createCart({
            env: ENVIROMENT,
            variables: {
                ...props,
            },
        })).data.createShoppingCart;
    } catch (error) {
        throw new Error("failed create ShoppingCart: " + error);
    }
};

const addShoppingCartDetail = async (props) => {
    try {
    
        return (await api.createCartDetail({
            env: ENVIROMENT,
            variables: {
                ...props,
            },
        })).data?.createShoppingCartDetail;
    } catch (error) {
        throw new Error("failed create ShoppingCart Detail: " + error);
    }
};
  
const fetchShoppingCart = async (props) => {
    try {
    
        return (await api.getShoppingCart({
            env: ENVIROMENT,
            variables: {
                ...props,
            },
        })).data.listShoppingCarts;
    } catch (error) {
        throw new Error("failed create ShoppingCart Detail: " + error);
    }
};
  

  module.exports = {
    addShoppingCart,
    addShoppingCartDetail,
    fetchShoppingCart
  }