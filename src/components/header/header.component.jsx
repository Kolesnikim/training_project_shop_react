import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'

import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../card-dropdown/card-dropdown.component"

import './header.styles.scss'

import {ReactComponent as Logo} from '../../assets/crown.svg'


const Header = ({currentUser}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/contact">
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className="option" onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>
                    :
                    <Link to="/signin" className='option'>
                        SIGN IN
                    </Link>

            }
            <CartIcon/>
        </div>
        <CartDropdown />
    </div>
)

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header)