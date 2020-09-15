import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;    

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async (snapshot) => {
            console.log(snapshot);
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            console.log(collectionMap);
            updateCollections(collectionMap);
        })
    }

    render() {
        const {match} = this.props
        return (
            <div className="shop-page"> 
                 <Route exact path={`${match.path}/`} component={CollectionOverview}  />
                 <Route exact path={`${match.path}/:collectionId`} component={CollectionPage}  />
                </div>
        );
    }
};


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);