import React from 'react';
import './collection-overview.styles.scss';
import { connect } from 'react-redux';
import PreviewCollection from '../preview-collection/preview-collection.component';
import { createStructuredSelector } from 'reselect';
import { selectShopCollections, selectCollectionsForPreview } from '../../redux/shop/shop.selector';

const CollectionOverview = ({collections}) => {

    return (
        <div className="collections-overview"> 
                {
                    collections.map(({id, ...otherCollectionProps}) => (
                        <PreviewCollection key={id} {...otherCollectionProps} />
                    ))
                }
            </div>
    );
};

const mapStateToProps = createStructuredSelector ({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionOverview);