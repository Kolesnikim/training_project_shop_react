import React from 'react'
import {connect} from 'react-redux'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {signUpStart} from "../../redux/user/user.actions"

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
        const {signUpStart} = this.props
        const {displayName, email, password, confirmedPassword} = this.state

        if (password !== confirmedPassword) {
            alert("Password don't match!")
            return
        }

        signUpStart({email, password, displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmedPassword: ''
            })
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

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp)
