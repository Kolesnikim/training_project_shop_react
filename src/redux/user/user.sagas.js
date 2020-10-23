import {takeEvery, put, call, all} from 'redux-saga/effects'

import {userActionTypes} from "./user.types"
import {signInFailure, signInSuccess} from "./user.actions";

import {auth, googleProvider, createUserProfileDocument} from '../../firebase/firebase.utils'

function* getSnapshot(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth)
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

export function* onGoogleSignIn() {
    yield takeEvery(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* omEmailSignIn() {
    yield takeEvery(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignIn),
        call(omEmailSignIn)
    ])
}
