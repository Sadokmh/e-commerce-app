import React from 'react';

import './checkout.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartTotal, selectCartItems } from '../../redux/cart/cart.selector';
import { connect } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = ({cartItems, total}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span className="">
                    Product
                </span>
            </div>
            <div className="header-block">
                <span className="">
                    Description
                </span>
            </div>
            <div className="header-block">
                <span className="">
                    Quantity
                </span>
            </div>
            <div className="header-block">
                <span className="">
                    Price    
                </span>
            </div>
            <div className="header-block">
                <span className="">
                    Remove    
                </span>
            </div>
        </div>
        {
            cartItems.length ? 
            cartItems.map((item) => 
                <CheckoutItem key={item.id} cartItem={item} />
            )
            :
            ''
        }
        <div className="total">
            <span className="">TOTAL: ${total}</span>
        </div>
        <StripeCheckoutButton price={total} />
        <div className="test-warning">
                <span>
                *Please use the following test credit card for payments*
                <br/>
                4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
                </span>
            </div>
            

    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage); 