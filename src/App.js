import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from './components/header/header.component'

class App extends React.Component {

    unSubscribeFromAuth = null

    componentDidMount() {
        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
           if (userAuth) {
               const userRef = await createUserProfileDocument(userAuth)

               userRef.onSnapshot(snapShot => {
                   this.props.setCurrentUser({id: snapShot.id, ...snapShot.data()})
               })
           }
           else {
               this.props.setCurrentUser(userAuth)
           }
        })
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth()
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path = '/' component = {HomePage}/>
                    <Route path = '/shop' component = {ShopPage}/>
                    <Route
                        exact
                        path = '/signin'
                        render={() => this.props.currentUser ?
                            (<Redirect to='/'/>) :
                            (<SignInAndSignUpPage/>)}
                    />
                </Switch> </div>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
