import './ProductList.css'
import Container from '../components/Container'
// import { useCart } from '../contexts/Cart.Hook'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCase from '../components/ProductCase'


export default function ProductList() {
    // const { addItemToCart, cartItems } = useCart()
    const [products, setProducts] = useState<Product[]>([])
    const [columns, setColumns] = useState(2);
    useEffect(() => {
        axios.get('http://localhost:3000/produtos/page/1')
            .then(response => {
                const produtos = response.data as Product[];
                setProducts(produtos);
            })
    }, [])

    return (
        <Container>
            <header className='productList-header'>
                <button>{'<'}</button>
                <span>
                    <h2>produtos disponíveis ({products.length})</h2>
                    <span>
                        <button type="button" className={1 === columns ? "bold" : ""} onClick={() => setColumns(1)}>1</button>
                        <button type="button" className={2 === columns ? "bold" : ""} onClick={() => setColumns(2)}>2</button>
                        <button type="button" className={3 === columns ? "bold" : ""} onClick={() => setColumns(3)}>3</button>
                        <button type="button" className={4 === columns ? "bold" : ""} onClick={() => setColumns(4)}>4</button>
                    </span>
                </span>
                <button>{'>'}</button>
            </header>
            <div className={`showroom-${columns}`}>
                {products.map((product, index) =>
                    <ProductCase {...product} key={index} />
                )}
            </div>
        </Container>
    )
}
