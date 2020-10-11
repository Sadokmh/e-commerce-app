import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { useState } from 'react';

const SignIn = ({emailSignInStart, googleSignInStart}) =>  {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });


    const handleSubmit = async event => {
        event.preventDefault();

        
        emailSignInStart({email: credentials.email, password: credentials.password});
    }

    const handleChange = event => {
        const { value, name} = event.target;
       setCredentials({...credentials,[name]: value})
    }

   
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput 
                        name="email" 
                        label="email"
                        value={credentials.email} 
                        required 
                        handleChange={handleChange}
                    />
                    <FormInput 
                        name="password" 
                        type="password" 
                        label="password"
                        value={credentials.password} 
                        required
                        handleChange={handleChange}
                    />
                    <div className="buttons">
                    <CustomButton type="submit"> Sign In </CustomButton>
                    <CustomButton 
                        type='button'
                        isGoogleSignIn
                        onClick={googleSignInStart}
                    > Sign In with Google </CustomButton>
                    </div>
                </form>
            </div>
        );
    }

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword))
});

export default connect(null,mapDispatchToProps)(SignIn);