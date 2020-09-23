import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"

import { collectionsForPreview} from '../../redux/shop/shop.selectors'
import CollectionPreview from '../../components/preview-collection/preview-collection.component'

import './collection-overview.styles.scss'

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
        {
            collections.map(({id, ...otherCollectionsProps}) => (
                <CollectionPreview key={id} {...otherCollectionsProps} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: collectionsForPreview
})

export default connect(mapStateToProps, null)(CollectionsOverview)

