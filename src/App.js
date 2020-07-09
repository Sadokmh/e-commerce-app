import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';

import { Switch, Route } from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1>HATS Page </h1>
  </div>
)

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
