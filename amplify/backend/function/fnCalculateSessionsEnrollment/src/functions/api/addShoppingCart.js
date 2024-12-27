
const { api } = require("/opt/nodejs/index");
const ENVIROMENT = process.env.ENV;

const addShoppingCart = async (props) => {
    try {
    
        return (await api.createCart({
            env: ENVIROMENT,
            variables: {
                ...props,
            },
        })).data;
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
        })).data;
    } catch (error) {
        throw new Error("failed create ShoppingCart Detail: " + error);
    }
};
  
  module.exports = {
    addShoppingCart,
    addShoppingCartDetail
  }