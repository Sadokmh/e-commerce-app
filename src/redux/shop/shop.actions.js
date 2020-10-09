import ShopActionsTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollection = () => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS
});

export const fetchCollectionSuccess = (collectionMap) => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionFailure = (errorMessage) => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionAsync = () => {
    return dispatch => {
       
    }
}


