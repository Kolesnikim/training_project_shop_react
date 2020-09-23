import {createSelector} from "reselect"

export const shopSelector = state => state.shop

export const collectionsForPreview = createSelector(
    [shopSelector],
    collections => Object.keys(collections).map(item => collections[item])
)

export const selectCollection = collectionParam =>
    createSelector(
        [shopSelector],
        collections => collections[collectionParam]
    )

