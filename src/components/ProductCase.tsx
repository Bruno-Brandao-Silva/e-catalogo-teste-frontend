import { useEffect, useState } from 'react';
import { useCart } from '../contexts/Cart.Hook';
import './ProductCase.css';

export default function ProductCase(product: Product) {
    const { addItemToCart, removeItemFromCart, cartItems } = useCart();
    const [onCart, setOnCart] = useState(false)
    useEffect(() => {
        setOnCart(cartItems.find(item => item.product.id === product.id) != undefined)
    }, [cartItems, product.id])
    return (
        <div key={product.id} className="product-case"
            onClick={() => onCart ? removeItemFromCart(product.id) : addItemToCart({ index: cartItems.length, product, quantity: 0 })}>
            <div className={onCart ? "case-header selected" : "case-header"}>
                <span>
                    <p>R$</p>
                    <h3>
                        {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h3>
                </span>
                <span>
                    <p>REF</p>
                    <h3>
                        {product.id}
                    </h3>
                </span>
            </div>
            <div className="image-container">
                <img src={product.imagem} alt={product.nome} />
            </div>
        </div>
    )

}