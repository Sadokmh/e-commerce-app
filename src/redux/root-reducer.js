import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import CartReducer from './cart/cart.reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ // no reason to persist user reducer, because Firebase do that persistance automatically
        'cart',  
        'directory',
        'shop'
    ]
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: CartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);

