import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionsTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
    try {
        yield console.log('Im fired');
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap)); //Saga dispatch action with "put" keyword 

        // collectionRef.get().then( (snapshot) => {
        //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionSuccess(collectionMap))
        // })
        // .catch(error => dispatch(fetchCollectionFailure(error.message)))
    }
    catch (error) {
        yield put(fetchCollectionFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionsTypes.FETCH_COLLECTIONS, fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
};