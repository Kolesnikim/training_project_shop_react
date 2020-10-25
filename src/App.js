import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"


import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"
import CheckOutPage from "./pages/checkout/checkout.component";

import Header from './components/header/header.component'

import {checkUserSession} from "./redux/user/user.actions"
import {selectCurrentUser} from './redux/user/user.selectors'
import {collectionsForPreview} from './redux/shop/shop.selectors'


import './App.css'


class App extends React.Component {

    unSubscribeFromAuth = null

    /**
     *  const {setCurrentUser} = this.props
     this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
           if (userAuth) {
               const userRef = await createUserProfileDocument(userAuth)
               userRef.onSnapshot(snapShot => {
                   setCurrentUser({id: snapShot.id, ...snapShot.data()})
               })
           }
           setCurrentUser(userAuth)

        })
     */
    componentDidMount() {
         const {checkUserSession} = this.props
        checkUserSession()
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
                    <Route path = '/checkout' component = {CheckOutPage}/>
                    <Route
                        exact
                        path = '/signin'
                        render={() => this.props.currentUser ?
                            (<Redirect to='/'/>) :
                            (<SignInAndSignUpPage/>)}
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    collectionsArray: collectionsForPreview
})

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
