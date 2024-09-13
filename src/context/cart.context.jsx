import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: ++cartItem.quantity }
            : cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart item to remove 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //check if quantity is = 1, if it is remove that item from the cart 
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    //return back cartitems with matching cart item with reducted quantity
    return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: --cartItem.quantity }
            : cartItem
        );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}



export const  CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    substractItemFromCart: () => {},
    clearItemFromCart: () => {},
    setCartTotal: () => {},
    total: 0,
    cartCount: 0,
});

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ total, setCartTotal ] = useState(0);


    useEffect(() => {
        const newCartCount = cartItems.reduce(( total,cartItem ) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce(( total,cartItem ) => total + cartItem.quantity * cartItem.price, 
        0
        );
        setCartTotal(newCartTotal);
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const substractItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = { isCartOpen,
        setIsCartOpen,
        addItemToCart,
        substractItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        total,
     };

    return (
        <CartContext.Provider value={ value }> 
        { children } 
        </CartContext.Provider>
    )
}