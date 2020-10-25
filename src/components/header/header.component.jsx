import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"

import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../card-dropdown/card-dropdown.component"
import {ReactComponent as Logo} from '../../assets/crown.svg'

import {HeaderContainer, LogoContainer, OptionContainerLink, OptionsContainer} from "./header.styles";

import {selectCurrentUser} from '../../redux/user/user.selectors'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {signOutStart} from "../../redux/user/user.actions"


const Header = ({currentUser, hidden, signOutStart}) => (
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
                    <OptionContainerLink as='div' onClick={signOutStart}>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
