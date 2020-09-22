import React from 'react'

import {connect} from 'react-redux'
import {clearItemFromCard, removeItem, addItem} from "../../redux/cart/cart.actions";

import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem, clearItemFromCard, removeItem, addItem}) => {
    const {name, price, quantity, imageUrl} = cartItem
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt={name}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div className='remove-button' onClick={() => clearItemFromCard(cartItem)}>&#10005;</div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    clearItemFromCard: item => dispatch(clearItemFromCard(item)),
    removeItem: item => dispatch(removeItem(item)),
    addItem: item => dispatch(addItem(item))
})



export default connect(null, mapDispatchToProps)(CheckoutItem)