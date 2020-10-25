import {takeEvery, put, call, all} from 'redux-saga/effects'

import {userActionTypes} from "./user.types"
import {signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess} from "./user.actions";

import {auth, googleProvider, getCurrentUser, createUserProfileDocument} from '../../firebase/firebase.utils'

function* getSnapshot(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const snapshot = yield userRef.get()
        yield put(signInSuccess({id: snapshot.id, ...snapshot.data()}))
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshot(user)
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshot(user)
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return
        yield getSnapshot(userAuth)
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error.measure()))
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    } catch (error) {
        yield put(signUpFailure(error.message))
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    try {
        yield getSnapshot(user, additionalData)
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* onGoogleSignIn() {
    yield takeEvery(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* omEmailSignIn() {
    yield takeEvery(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeEvery(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeEvery(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeEvery(userActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeEvery(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignIn),
        call(omEmailSignIn),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}
