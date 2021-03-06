import  UserActionsTypes  from './user.types';

export const setCurrentUser = user => ({
    type: UserActionsTypes.SET_CURRENT_USER,
    payload: user
});

export const googleSignInStart = () => ({
    type: UserActionsTypes.GOOGLE_SIGN_IN_START
});

export const googleSignSuccess = (user) => ({
    type: UserActionsTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
});

export const googleSignInFailure = (error) => ({
    type: UserActionsTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionsTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const emailSignSuccess = (user) => ({
    type: UserActionsTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
});

export const emailSignInFailure = (error) => ({
    type: UserActionsTypes.EMAIL_SIGN_IN_FAILURE,
    payload: error
});

export const checkUserSession = () => ({
    type: UserActionsTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: UserActionsTypes.SIGN_OUT_START
});

export const signOutSuccess= () => ({
    type: UserActionsTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
    type: UserActionsTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStart = (credentials) => ({
    type: UserActionsTypes.SIGN_UP_START,
    payload: credentials
});

export const signUpSuccess = (user) => ({
    type: UserActionsTypes.SIGN_UP_SUCCESS,
    payload: user
});

export const signUpFailure = (error) => ({
    type: UserActionsTypes.SIGN_UP_FAILURE,
    payload: error
});