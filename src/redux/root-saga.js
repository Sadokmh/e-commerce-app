import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart, shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';


export default function* rootSaga() {
    yield all([ // array of generators that we invoke
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ])
}