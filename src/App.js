import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { createStructuredSelector } from 'reselect';

import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';

const HatsPage = () => (
  <div>
    <h1>HATS Page </h1>
  </div>
)

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {checkUserSession} = this.props;

    checkUserSession();
    
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }



  render() {
    return (
      <div className="test-test">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
            this.props.currentUser
             ?
              (<Redirect to='/'/>) 
             : 
              (<SignInAndSignUpPage/>)
              }
            />
        </Switch>
      </div>
    );
  }
  
}

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collections: selectCollectionsForPreview
});

 export default  connect(mapStateToProps, mapDispatchToProps)(App);
