import React from 'react'
import {connect} from 'react-redux'

import {ReactComponent as ShoppingBag} from "../../assets/shopping-bag.svg"
import {toggleCart} from '../../redux/cart/cart.actions'
import {selectCartItemsCount} from '../../redux/cart/cart.selectors'

import './cart-icon.styles.scss'


const CartIcon = ({toggleCart, count}) => (
    <div className="cart-icon" onClick={toggleCart}>
        <ShoppingBag className="shopping-icon" />
        <span className="item-count">{count}</span>
    </div>
)

const mapStateToProps = (state) => (
    {
        count: selectCartItemsCount(state)
    }
)
const mapDispatchToProps = dispatch => ({
    toggleCart: () => dispatch(toggleCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
