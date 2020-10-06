import React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateCollectionsAsync} from "../../redux/shop/shop.actions"
import {loadingSelector, selectShopCollectionIsLoaded} from "../../redux/shop/shop.selectors";


import CollectionsOverview from "../../components/collection-overview/collections-overview.component"
import CollectionPage from "../collection/collection.component"
import WithSpinner from "../../components/with-spinner/with-spinner.component"
import {createStructuredSelector} from "reselect";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)


class ShopPage extends React.Component {
    componentDidMount() {
        const {updateCollectionsAsync} = this.props
        updateCollectionsAsync();
    }

    render() {
        const {match, loading, loaded} = this.props
        return (
            <div className='shop-page'>
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props =>
                        <CollectionsOverviewWithSpinner loading={loading} {...props}/>)} />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props =>
                        <CollectionPageWithSpinner loading={loaded} {...props}/>)} />
            </div>
        )
    }
}

const mapDispatchToProps =  dispatch => ({
    updateCollectionsAsync: () => dispatch(updateCollectionsAsync())
})

const mapStateToProps = createStructuredSelector({
    loaded: selectShopCollectionIsLoaded,
    loading: loadingSelector
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)
