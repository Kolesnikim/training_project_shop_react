import React from 'react'
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"

import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../card-dropdown/card-dropdown.component"
import {ReactComponent as Logo} from '../../assets/crown.svg'

import {HeaderContainer, LogoContainer, OptionContainerLink, OptionsContainer} from "./header.styles";

import {selectCurrentUser} from '../../redux/user/user.selectors'
import {selectCartHidden} from '../../redux/cart/cart.selectors'


const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionContainerLink to="/shop">
                SHOP
            </OptionContainerLink>
            <OptionContainerLink to="/contact">
                CONTACT
            </OptionContainerLink>
            {
                currentUser ?
                    <OptionContainerLink as='div' onClick={() => auth.signOut()}>
                        SIGN OUT
                    </OptionContainerLink>
                    :
                    <OptionContainerLink to="/signin">
                        SIGN IN
                    </OptionContainerLink>

            }
            <CartIcon/>
        </OptionsContainer>
        {hidden ? <CartDropdown/> : ''}
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)