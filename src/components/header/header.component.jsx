import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"

import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../card-dropdown/card-dropdown.component"
import {ReactComponent as Logo} from '../../assets/crown.svg'

import './header.styles.scss'

import {selectCurrentUser} from '../../redux/user/user.selectors'
import {selectCartHidden} from '../../redux/cart/cart.selectors'


const Header = ({currentUser, hidden}) => (
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
        {hidden ? <CartDropdown/> : ''}
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)