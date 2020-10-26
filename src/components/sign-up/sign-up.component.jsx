import React, {useState} from 'react'
import {connect} from 'react-redux'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {signUpStart} from "../../redux/user/user.actions"

import './sign-up.styles.scss'

const SignUp = ({signUpStart}) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmedPassword: ''
    })

    const handleChange = event => {
        const {name, value} = event.target
        setUserCredentials({...userCredentials, [name]: value})
    }

    const {displayName, email, password, confirmedPassword} = userCredentials

    const handleSubmit = async event => {
        event.preventDefault()

        if (password !== confirmedPassword) {
            alert("Password don't match!")
            return
        }

        signUpStart({email, password, displayName})
        setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmedPassword: ''
            })
    }
    return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput label="Display Name" type="text" name='displayName' value={displayName} handleChange={handleChange} required/>
                    <FormInput label="Email" type="email" name='email' value={email} handleChange={handleChange} required/>
                    <FormInput label="Password" type="password" name='password' value={password} handleChange={handleChange} required/>
                    <FormInput label="Confirm Password" type="password" name='confirmedPassword' value={confirmedPassword} handleChange={handleChange} required/>
                    <div className="buttons">
                        <CustomButton type="submit" >SIGN UP</CustomButton>
                    </div>
                </form>
            </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp)
