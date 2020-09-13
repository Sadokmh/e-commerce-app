import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishedKey = 'pk_test_51HQuOqBl2ErYAA4OhU8JLmjUsHweytwmSdQh9IYevjKBCsJghERimEMQrW430oq3l9iWW5wBFFZjq1jm7WHSxYon00pMSiq9Il';

    const onToken = token => {
        console.log(token);
        alert('Payment successful')
    }

    return (
        <StripeCheckout
            label='Pay Now !'
            name='CRWN Clothing TM.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishedKey}
        />
    );
};

export default StripeCheckoutButton;