import {React, createContext, useState} from 'react'

const CartContext = createContext({
    cartItems: [],
    amount: 0,
    getCartItems: function() {},
    addCartItem: function(itemData) {},
    removeCartItem: function(itemData) {},
    countCartItems: function() {},
    emptyCart: function() {},
    getPrice: function() {}
})

export function CartContextProvider(props) {
    const [cart, setCart] = useState([])
    const [price, setPrice] = useState(0)

    function addCartItemHandler(itemData) {
        const cartDummy = cart
        const priceDummy = itemData.price
        cartDummy.push(itemData)
        setCart(cartDummy)
        setPrice(price + priceDummy)
    }

    function removeCartItemHandler(itemData) {
        for( var i = 0; i < cart.length; i++){ 
    
            if ( cart[i].id === itemData.id) { 
        
                cart.splice(i, 1);
                setPrice(price - itemData.price) 
            }
        
        }
    }

    function getCartItemsHandler() {
        return cart
    }

    function countCarTItemsHandler() {
        return cart.length
    }

    function emptyCartHandler() {
        setCart([])
    }
    
    function getPriceHandler() {

        return price
    }

    const context = {
        cartItems: cart,
        amount: price,
        getCartItems: getCartItemsHandler,
        addCartItem: addCartItemHandler,
        removeCartItem: removeCartItemHandler,
        countCartItems: countCarTItemsHandler,
        emptyCart: emptyCartHandler,
        getPrice: getPriceHandler

    }

    return <CartContext.Provider value={context}>
        {props.children}
    </CartContext.Provider>
}

export default CartContext
