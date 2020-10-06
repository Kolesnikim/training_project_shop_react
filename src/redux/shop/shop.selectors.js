import {createSelector} from "reselect"

export const shopSelector = state => state.shop

export const loadingSelector = createSelector(
    [shopSelector],
    shop => shop.loading
)

export const collectionsSelector = createSelector(
    [shopSelector],
    shop => shop.collections
)

export const collectionsForPreview = createSelector(
    [collectionsSelector],
    collections => collections ? Object.keys(collections).map(item => collections[item]) : []
)

export const selectCollection = collectionParam =>
    createSelector(
        [collectionsSelector],
        collections => collections ? collections[collectionParam] : null
    )

export const selectShopCollectionIsLoaded = createSelector(
    [collectionsSelector],
    collections => !collections
)

