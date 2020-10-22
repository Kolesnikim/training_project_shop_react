import {connect} from 'react-redux'
import {compose} from "redux"
import {createStructuredSelector} from "reselect"

import {loadingSelector} from "../../redux/shop/shop.selectors"
import CollectionsOverview from "./collections-overview.component"
import WithSpinner from "../with-spinner/with-spinner.component"

const mapStateToProps = createStructuredSelector({
    loading: loadingSelector
})

const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview)

export default CollectionsOverviewContainer