import { useContext } from 'react'

import { CartContext } from '../../context/cart.context'

import {CartIconContainer, ShoppingIconContainer, ItemCount} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen)
    }

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconContainer className='shopping-icon'/>
            <ItemCount >{ cartCount }</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;