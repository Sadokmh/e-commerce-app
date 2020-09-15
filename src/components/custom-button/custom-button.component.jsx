import React from 'react';
import './custom-button.styles.scss';
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, ...otherProps}) => (
    
    <CustomButtonContainer {...otherProps}>
        {children}
    </CustomButtonContainer>

)

export default CustomButton;

//changed with styled components, we put it here to avoid build error ( comment build error  )
    // <button 
    //     className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}
    // >
    //     {children}
    // </button>