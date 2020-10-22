import {connect} from 'react-redux'
import {compose} from "redux"
import {createStructuredSelector} from "reselect"

import {selectShopCollectionIsLoaded} from "../../redux/shop/shop.selectors"
import WithSpinner from "../../components/with-spinner/with-spinner.component"
import CollectionPage from "./collection.component"

const mapStateToProps = createStructuredSelector({
    loading: state => selectShopCollectionIsLoaded(state)
})

const CollectionContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPage)

export default CollectionContainer