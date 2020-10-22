import shopActionsTypes from "./shop.types";

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

