import ShopActionsTypes from "./shop.types";

const { default: SHOP_DATA } = require("../../pages/shop/shop.data");

const INITIAL_STATE = {
    collections: SHOP_DATA
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case ShopActionsTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            };

        default:
            return state;
    };
};

export default shopReducer;