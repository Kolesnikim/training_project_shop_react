import shopActionsTypes from "./shop.types";

const INITIAL_STATE = {
    loading: false,
    errorMessage: null,
    collections: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case shopActionsTypes.UPDATE_COLLECTIONS_START:
            return {
                ...state,
                loading: true
            }
        case shopActionsTypes.UPDATE_COLLECTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                collections: action.payload
            }
        case shopActionsTypes.UPDATE_COLLECTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }
        default: return state
    }
}

export default shopReducer
