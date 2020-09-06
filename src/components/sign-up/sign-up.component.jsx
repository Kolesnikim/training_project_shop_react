import React from 'react'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'

import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmedPassword: ''
        }
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit = async event => {
        event.preventDefault()
        const {displayName, email, password, confirmedPassword} = this.state

        if (password !== confirmedPassword) alert("Password don't match!")

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, {displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmedPassword: ''
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    render() {
        const {displayName, email, password, confirmedPassword} = this.state
        return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput label="Display Name" type="text" name='displayName' value={displayName} handleChange={this.handleChange} required/>
                    <FormInput label="Email" type="email" name='email' value={email} handleChange={this.handleChange} required/>
                    <FormInput label="Password" type="password" name='password' value={password} handleChange={this.handleChange} required/>
                    <FormInput label="Confirm Password" type="password" name='confirmedPassword' value={confirmedPassword} handleChange={this.handleChange} required/>
                    <div className="buttons">
                        <CustomButton type="submit" >SIGN UP</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp