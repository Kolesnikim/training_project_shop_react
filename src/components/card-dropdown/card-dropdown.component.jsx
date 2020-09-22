import React from 'react'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'


import CustomButton from "../custom-button/custom-button.component"
import CartItem from "../cart-item/cart-item.component"
import {selectCartItems} from '../../redux/cart/cart.selectors'

import './card-dropdown.styles.scss'
import {toggleCart} from "../../redux/cart/cart.actions";

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            { cartItems.length ?
                cartItems.map(item =>
                      (  <CartItem key={item.id} item={item}/>)
                ) :
                (<span className="empty-message">Cart is empty</span>)
            }
        </div>
        <CustomButton onClick={() => {
            dispatch(toggleCart())
            history.push('/checkout')
        }
        }>
            GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))

