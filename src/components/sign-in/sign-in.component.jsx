import React from 'react'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {signInWithGoogle} from '../../firebase/firebase.utils'

import './sign-in.styles.scss'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({email: '', password: ''})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I have already an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label="email" type="email" name='email' value={this.state.email} handleChange={this.handleChange}/>
                    <FormInput label="password" type="password" name='password' value={this.state.password} handleChange={this.handleChange}/>
                    <CustomButton type="submit" >Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} >Sign In</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn