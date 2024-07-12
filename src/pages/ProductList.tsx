import './ProductList.css'
import Container from '../components/Container'
import { useCart } from '../contexts/Cart.Hook'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCase from '../components/ProductCase'
import { useNavigate } from 'react-router-dom'


export default function ProductList() {
    const { addItemToCart, removeAllFromCart, cartItems } = useCart()
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [showProducts, setShowProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [subCategories, setSubCategories] = useState<string[]>([])
    const [selectedCategorie, setSelectedCategorie] = useState("")
    const [selectedSubCategorie, setSelectedSubCategorie] = useState("")
    const [columns, setColumns] = useState(2);
    const [selectedToggle, setSelectedToggle] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/produtos/page/1')
            .then(response => {
                const produtos = response.data as Product[];
                setAllProducts(produtos);
                axios.get('http://localhost:3000/produtos/page/2')
                    .then(_response => {
                        const _produtos = _response.data as Product[]
                        setAllProducts(produtos.concat(_produtos))
                    })

            })
        axios.get('http://localhost:3000/categorias')
            .then(response => {
                const categorias = response.data as string[]
                setCategories(categorias);
            })
        axios.get('http://localhost:3000/subcategorias')
            .then(response => {
                const subcategorias = response.data as string[]
                setSubCategories(subcategorias)
            })
    }, [])

    useEffect(() => {
        selectedCategorie.length == 0 ? setShowProducts(allProducts) : setShowProducts(allProducts.filter(product =>
            product.categorias.includes(selectedCategorie) && product
        ))
    }, [selectedCategorie, allProducts])

    return (
        <Container>
            <header className='productList-header'>
                <button>{'<'}</button>
                <span>
                    <h2>produtos disponíveis ({allProducts.length})</h2>
                    <span>
                        <button type="button" className={1 === columns ? "bold" : ""} onClick={() => setColumns(1)}>1</button>
                        <button type="button" className={2 === columns ? "bold" : ""} onClick={() => setColumns(2)}>2</button>
                        <button type="button" className={3 === columns ? "bold" : ""} onClick={() => setColumns(3)}>3</button>
                        <button type="button" className={4 === columns ? "bold" : ""} onClick={() => setColumns(4)}>4</button>
                    </span>
                </span>
                {cartItems.length > 0 ? <button onClick={() => navigate('/preview-compra/')}>{'>'}</button> : <button></button>}
            </header>
            <div className='showroom-tools'>
                <select value={selectedCategorie} onChange={e => setSelectedCategorie(e.target.value)}>
                    <option value="">Categorias</option>
                    {categories.map((item, index) => <option value={item} key={index}>{item}</option>)}
                </select>
                <select value={selectedSubCategorie} onChange={e => setSelectedSubCategorie(e.target.value)}>
                    <option value="">Subcategorias</option>
                    {subCategories.map((item, index) => <option value={item} key={index}>{item}</option>)}

                </select>
                <button onClick={() => setSelectedToggle(!selectedToggle)}>
                    <svg fill={selectedToggle ? "#008000" : "#809CAA"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 28" ><g id="Group 45"><circle id="Ellipse 4" cx="14" cy="14" r="14" /><g id="ð¦ icon &quot;eye&quot;"><path id="Vector" d="M13.8093 5.72727C7.18457 5.72727 3.25684 13.488 3.25684 13.488C3.25684 13.488 7.18457 21.2488 13.8093 21.2488C20.277 21.2488 24.2047 13.488 24.2047 13.488C24.2047 13.488 20.277 5.72727 13.8093 5.72727ZM13.7308 8.3142C16.6373 8.3142 18.9678 10.6424 18.9678 13.488C18.9678 16.3595 16.6373 18.6619 13.7308 18.6619C10.8505 18.6619 8.49381 16.3595 8.49381 13.488C8.49381 10.6424 10.8505 8.3142 13.7308 8.3142ZM13.7308 10.9011C12.2906 10.9011 11.1123 12.0652 11.1123 13.488C11.1123 14.9109 12.2906 16.075 13.7308 16.075C15.171 16.075 16.3493 14.9109 16.3493 13.488C16.3493 13.2294 16.2445 12.9965 16.1922 12.7637C15.9827 13.1776 15.5637 13.488 15.04 13.488C14.3069 13.488 13.7308 12.9189 13.7308 12.1946C13.7308 11.6772 14.045 11.2633 14.464 11.0563C14.2283 10.9787 13.9926 10.9011 13.7308 10.9011Z" fill="white" /></g></g></svg>
                </button>
                <button onClick={() => removeAllFromCart()}>
                    <svg stroke="currentColor" fill="#809CAA" strokeWidth="0" viewBox="0 0 512 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"></path></svg>
                </button>
            </div>
            <button className='tools-button' onClick={() => {
                showProducts.forEach(product => {
                    addItemToCart(product.id)
                })
            }}>Selecionar categoria completa</button>
            <div className={`showroom-${columns}`}>
                {selectedToggle ? allProducts.map((product, index) => cartItems.includes(product.id) && <ProductCase {...product} key={index} />) : showProducts.map((product, index) =>
                    <ProductCase {...product} key={index} />
                )}
            </div>
        </Container>
    )
}
