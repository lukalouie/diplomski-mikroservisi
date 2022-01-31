import {React, createContext, useState} from 'react'

const PaymentContext = createContext({
    paymentMethod: "PayPal",
    setPaymentMethod: function(method){},
    getPaymentMethod: function(){}
})

export function PaymentContextProvider(props) {
    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    function setPaymentMethodHandler(method) {
        setPaymentMethod(method)
    }

    function getPaymentMethodHandler() {
        return paymentMethod
    }

    const context = {
        paymentMethod: paymentMethod,
        setPaymentMethod: setPaymentMethodHandler,
        getPaymentMethod: getPaymentMethodHandler
    }

    return <PaymentContext.Provider value={context}>
        {props.children}
    </PaymentContext.Provider>
}

export default PaymentContext