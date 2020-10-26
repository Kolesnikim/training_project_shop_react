import React, {useEffect} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateCollectionsStart} from "../../redux/shop/shop.actions"

import CollectionsOverviewContainer from "../../components/collection-overview/collection-overview.container"
import CollectionContainer from "../collection/collection.container"

const ShopPage = ({updateCollectionsStart, match}) => {
    useEffect(() => {
        updateCollectionsStart()
    }, [updateCollectionsStart])

    return (
            <div className='shop-page'>
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer} />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionContainer} />
            </div>
    )
}

const mapDispatchToProps =  dispatch => ({
    updateCollectionsStart: () => dispatch(updateCollectionsStart())
})


export default connect(null, mapDispatchToProps)(ShopPage)
