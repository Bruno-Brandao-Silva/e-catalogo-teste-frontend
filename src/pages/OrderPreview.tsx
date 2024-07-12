import Container from '../components/Container'
import { useCart } from '../contexts/Cart.Hook'
import './OrderPreview.css'

export default function OrderPreview() {
    const cart = useCart()
    cart.addItemToCart({ id: 1, name: 'Produto 1' })
    return (
        <Container>
            <h1>
                asdf
                {cart.cartItems.map(item => <>{item}</>)}
            </h1>
        </Container>
    )
}
