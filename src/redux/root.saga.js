import {all, call} from 'redux-saga/effects'

import {updateCollectionsStart} from "./shop/shop.sagas"


export default function* rootSaga() {
    yield all([
        call(updateCollectionsStart)
    ])
}
