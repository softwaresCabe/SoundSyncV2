import { CartContainer, ItemDetails } from './cart-item.styles.jsx'

const CartItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;

    return(
        <CartContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
            </ItemDetails>
        </CartContainer>
    )

}

export default CartItem;