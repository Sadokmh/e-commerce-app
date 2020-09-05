import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import CartReducer from './cart/cart.reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'cart'  // no reason to persist user reducer, because Firebase do that persistance automatically
    ]
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: CartReducer
});

export default persistReducer(persistConfig, rootReducer);

