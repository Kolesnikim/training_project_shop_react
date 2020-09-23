import React from 'react'

import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButton = ({price}) => {
    const onToken = token => {
        console.log(token)
        alert('Payment successful')
    }
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51HUTljAuQrMTVHh6Udfi9m6WhVeExIa8hW2Xgx836TdDeMG9ED294DSX94Jk8ZZUsIhA46iXDOG1QzaomdAfn4fz00YLIdqe4A'
    return (
        <StripeCheckout
            label="PAY NOW!"
            name='CRWN Clothing Ltd.'
            billingAdress
            shippingAdress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now!"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton