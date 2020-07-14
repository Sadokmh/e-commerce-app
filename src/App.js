import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

const HatsPage = () => (
  <div>
    <h1>HATS Page </h1>
  </div>
)

class App extends React.Component {
  unsubscribeFromAuth = null;

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
           this.setState({
             currentUser: {
               id: snapshot.id,
               ...snapshot.data()
             }
           }, () => { //callback that triggers after setState
            console.log(this.state);
           });
        });
      }
      this.setState({ currentUser: userAuth });

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }



  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
  
}

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })

 export default App //connect(null, mapDispatchToProps)(App);
