import React, {useState} from 'react'
import{connect} from 'react-redux'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

import './sign-in.styles.scss'

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    })

    const handleChange = event => {
        const {name, value} = event.target
        setUserCredentials({...userCredentials, [name]: value})
    }

    const {email, password} = userCredentials

    const handleSubmit = async event => {
        event.preventDefault()
        emailSignInStart(email, password)
    }

        return (
            <div className='sign-in'>
                <h2>I have already an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput label="email" type="email" name='email' value={email} handleChange={handleChange} required/>
                    <FormInput label="password" type="password" name='password' value={password} handleChange={handleChange} required/>
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)
