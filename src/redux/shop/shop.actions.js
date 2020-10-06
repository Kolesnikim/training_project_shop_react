import shopActionsTypes from "./shop.types";
import {firestore} from "firebase";
import {convertCollectionSnapshotToMap} from "../../firebase/firebase.utils";

export const updateCollectionsStart = () => ({
    type: shopActionsTypes.UPDATE_COLLECTIONS_START,
})

export const updateCollectionsSuccess = collections => ({
    type: shopActionsTypes.UPDATE_COLLECTIONS_SUCCESS,
    payload: collections
})

export const updateCollectionsFailure = error => ({
    type: shopActionsTypes.UPDATE_COLLECTIONS_START,
    payload: error.message
})

export const updateCollectionsAsync = () => {
    return dispatch => {
        const collectionRef = firestore().collection('collections')
        dispatch(updateCollectionsStart())

        collectionRef.get().then(snapshot => {
            const collections = convertCollectionSnapshotToMap(snapshot)
            dispatch(updateCollectionsSuccess(collections))
        }).catch(error => {
            dispatch(updateCollectionsFailure(error))
        })
    }
}
