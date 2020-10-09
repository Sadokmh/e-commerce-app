import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionsTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { googleSignSuccess, googleSignInFailure, emailSignInFailure, emailSignSuccess, signOutFailure, signOutSuccess, signUpSuccess } from './user.actions';


export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(emailSignSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
    catch(error) {
        console.log(error);
        yield put(emailSignInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        console.log(userRef);
    }
    catch(error) {
        console.log(error);
        yield put(googleSignInFailure(error))
    }
}

export function* signInWithEmail({payload: { email, password}}) { // the action object will be passed here, so we distructure the payload, then distructure the email & password
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(emailSignSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
    catch(error) {
        console.log(error);
        yield put(emailSignInFailure(error))
    }
} 

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    }
    catch (error) {
        console.log(error);
        yield put(signOutFailure(error))
    }
}

export function* signUp({payload: {displayName, email, password}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        const userRef= yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signUpSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))

    }
    catch(error) {
        console.log(error);
        yield put(signOutFailure(error));
    }
}


// sagas
export function* onCheckUserSession() {
    yield takeLatest(UserActionsTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionsTypes.GOOGLE_SIGN_IN_START, signInWithGoogle) // watch the action provided in the 1st param, when it dispatched, the function in the 2nd param will be handled ( same principe of Effects in ngRx )
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionsTypes.EMAIL_SIGN_IN_START,signInWithEmail);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionsTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionsTypes.SIGN_UP_START, signUp);
}

export function* userSagas()  {
    yield all([
            call(onGoogleSignInStart),
            call(onEmailSignInStart),
            call(onCheckUserSession),
            call(onSignOutStart),
            call(onSignUpStart)
        ])
} 