import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';

import {connect} from 'react-redux'; 

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import {OptionsContainer, LogoContainer, HeaderContainer, OptionDiv, OptionLink} from './header.styles';

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo"/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/contact">
                CONTACT
            </OptionLink>
            {
                currentUser 
                ?
                <div onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <OptionLink to="/signin">SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            (!hidden) 
            ?
            <CartDropdown/>
            :
            ''
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default  connect(mapStateToProps)(Header);