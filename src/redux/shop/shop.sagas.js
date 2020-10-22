import {takeEvery, call, put} from 'redux-saga/effects'
import {firestore} from "firebase";
import {convertCollectionSnapshotToMap} from "../../firebase/firebase.utils";

import shopActionsTypes from "./shop.types"
import {updateCollectionsFailure, updateCollectionsSuccess} from "./shop.actions";


function* updateCollectionsAsync() {
    try {
        const collectionRef = yield firestore().collection('collections')
        const snapshot = yield collectionRef.get()
        const collections = yield call(convertCollectionSnapshotToMap, snapshot)
        yield put(updateCollectionsSuccess(collections))
    } catch (error) {
        yield put(updateCollectionsFailure(error))
    }
}

export function* updateCollectionsStart() {
    yield takeEvery(shopActionsTypes.UPDATE_COLLECTIONS_START, updateCollectionsAsync)
}
