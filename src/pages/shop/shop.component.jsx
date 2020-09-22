import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"

import sectionsSelector from '../../redux/shop/shop.selectors'
import CollectionPreview from '../../components/preview-collection/preview-collection.component'

const ShopPage = ({collections}) => (
    <div className='shop-page'>
        {
            collections.map(({id, ...otherCollectionsProps}) => (
                <CollectionPreview key={id} {...otherCollectionsProps} />
                ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: sectionsSelector
})


export default connect(mapStateToProps)(ShopPage)