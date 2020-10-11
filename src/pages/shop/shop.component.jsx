import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import { updateCollections, fetchCollectionAsync, fetchCollection } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
import { useEffect } from 'react';


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({fetchCollections, match, isCollectionFetching, isCollectionsLoaded}) => {
  
    useEffect(() => {
        fetchCollection();
    }, []);


        return (
            <div className="shop-page"> 
                 <Route exact path={`${match.path}/`} render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}  />
                 <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}  />
                </div>
        );
    
};


const mapDispatchToProps = dispatch => ({
    fetchCollections: () => dispatch(fetchCollection())
});

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);