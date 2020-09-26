import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;    

    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async (snapshot) => {
            console.log(snapshot);
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            console.log(collectionMap);
            updateCollections(collectionMap);
            this.setState({isLoading: false});
        })
    }

    render() {
        const {match} = this.props
        const {isLoading} = this.state;
        return (
            <div className="shop-page"> 
                 <Route exact path={`${match.path}/`} render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />}  />
                 <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props} />}  />
                </div>
        );
    }
};


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);