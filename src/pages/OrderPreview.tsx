import { useEffect, useState } from 'react'
import Container from '../components/Container'
import { useCart } from '../contexts/Cart.Hook'
import './OrderPreview.css'
import { useNavigate } from 'react-router-dom'

export default function OrderPreview() {
    const navigate = useNavigate();
    const { cartItems, } = useCart()

    const [, reactRefresh] = useState({})
    const [currentProductIndex, setCurrentProductIndex] = useState<number>(0)
    const [modalInfo, setModalInfo] = useState(false);
    const [modalSearch, setModalSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('')
    useEffect(() => {
        if (cartItems.length === 0)
            navigate('/')
    }, [cartItems, navigate])


    return (
        <Container>
            {modalInfo ? <div className='modal'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1>Informações</h1>
                        <button
                            onClick={() => (setModalInfo(false))}
                            type="button">X</button>
                    </div>
                    <h2><strong>Nome do produto: </strong>{cartItems[currentProductIndex].product.nome}</h2>
                    <h2><strong>Referência: </strong>{cartItems[currentProductIndex].product.id}</h2>
                    <h2><strong>Cores: </strong>{cartItems[currentProductIndex].product.cores.join(', ')}</h2>
                    <h2><strong>Marca: </strong>{cartItems[currentProductIndex].product.marca}</h2>
                    <h2><strong>Categoria: </strong>{cartItems[currentProductIndex].product.categorias[0]}</h2>
                    <h2><strong>Descrição: </strong>{cartItems[currentProductIndex].product.descricao}</h2>
                </div>
            </div> : <></>}
            {modalSearch ? <div className='modal'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1>BUSCAR POR REF</h1>
                        <button
                            onClick={() => (setModalSearch(false))}
                            type="button">X</button>
                    </div>
                    <input type="text" placeholder='000' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                    <button onClick={() => {
                        const _id = Number(searchInput)
                        if (isNaN(_id)) return
                        const _item = cartItems.find(item => item.product.id === _id)
                        if (_item) {
                            setCurrentProductIndex(_item.index)
                            setModalSearch(false)
                        }
                    }}>Buscar</button>
                </div>
            </div> : <></>}
            {modalSearch ? <div>
                asd</div> : <></>}
            <header className='order-preview-header'>
                <button onClick={() => navigate('/')}>{'<'}</button>
                <span>
                    <button onClick={() => {
                        const _item = cartItems.slice(0, currentProductIndex).reverse().find(item => item.product.categorias[0] != cartItems[currentProductIndex].product.categorias[0])
                        if (_item) {
                            setCurrentProductIndex(_item.index)
                        }
                    }}>{'<'}</button>
                    <h3>{`(${cartItems.reduce((total, item) => total + (item.product.categorias[0] === cartItems[currentProductIndex].product.categorias[0] ? 1 : 0), 0)}) ${cartItems[currentProductIndex].product.categorias[0]}`}</h3>
                    <button onClick={() => {
                        const _item = cartItems.slice(currentProductIndex).find(item => item.product.categorias[0] != cartItems[currentProductIndex].product.categorias[0])
                        if (_item) {
                            setCurrentProductIndex(_item.index)
                        }
                    }}>{'>'}</button>
                </span>
                <button>F</button>
            </header>
            <main className='order-preview-main'>
                <div className="images-carousel">
                    <button
                        onClick={() => {
                            setCurrentProductIndex(currentProductIndex > 0 ? currentProductIndex - 1 : currentProductIndex)
                        }}>{'<'}</button>
                    <div>
                        {cartItems[currentProductIndex].product && <img src={cartItems[currentProductIndex].product.imagem} />}
                    </div>
                    <button onClick={() => {
                        setCurrentProductIndex(currentProductIndex < cartItems.length - 1 ? currentProductIndex + 1 : currentProductIndex)
                    }}>{'>'}</button>
                </div>
                <div className="utils">
                    <button onClick={() => setModalInfo(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#809CAA" /><path d="M13.8572 5.35721C13.8572 5.92553 14.0829 6.47058 14.4848 6.87244C14.8867 7.2743 15.4317 7.50007 16 7.50007C16.5684 7.50007 17.1134 7.2743 17.5153 6.87244C17.9171 6.47058 18.1429 5.92553 18.1429 5.35721C18.1429 4.78889 17.9171 4.24385 17.5153 3.84198C17.1134 3.44012 16.5684 3.21436 16 3.21436C15.4317 3.21436 14.8867 3.44012 14.4848 3.84198C14.0829 4.24385 13.8572 4.78889 13.8572 5.35721ZM17.0715 10.9822H14.9286C14.7813 10.9822 14.6607 11.1027 14.6607 11.2501V26.7858C14.6607 26.9331 14.7813 27.0536 14.9286 27.0536H17.0715C17.2188 27.0536 17.3393 26.9331 17.3393 26.7858V11.2501C17.3393 11.1027 17.2188 10.9822 17.0715 10.9822Z" fill="white" /></svg>
                    </button>
                    <button onClick={() => setModalSearch(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none"><g id="Group 44"><circle id="Ellipse 2" cx="14.0879" cy="14" r="14" fill="#809CAA" /><g id="ð¦ icon &quot;magnifying glass&quot;"><path id="Vector" d="M13.0399 5.74631C9.4067 5.74631 6.45117 8.73412 6.45117 12.407C6.45117 16.0799 9.4067 19.0677 13.0399 19.0677C14.1506 19.0677 15.2425 18.8013 16.1649 18.2875C16.2388 18.3774 16.3207 18.4602 16.4096 18.5349L18.2921 20.438C18.4659 20.6357 18.6779 20.7954 18.915 20.9073C19.1521 21.0192 19.4093 21.081 19.6709 21.0888C19.9324 21.0966 20.1928 21.0502 20.436 20.9526C20.6792 20.855 20.9001 20.7081 21.0851 20.5211C21.2702 20.334 21.4154 20.1107 21.512 19.8649C21.6086 19.619 21.6544 19.3558 21.6467 19.0914C21.639 18.827 21.5779 18.5669 21.4672 18.3272C21.3565 18.0875 21.1985 17.8733 21.0029 17.6975L19.1204 15.7945C19.0287 15.7017 18.9278 15.6188 18.8192 15.5471C19.3275 14.6146 19.6475 13.5298 19.6475 12.388C19.6475 8.71509 16.692 5.72728 13.0588 5.72728L13.0399 5.74631ZM13.0399 7.64937C15.6566 7.64937 17.7462 9.76177 17.7462 12.407C17.7462 13.663 17.2944 14.8239 16.5037 15.6803C16.4849 15.6993 16.4661 15.7184 16.4473 15.7374C16.3583 15.8121 16.2764 15.8949 16.2025 15.9848C15.3742 16.746 14.2447 17.1837 13.0211 17.1837C10.4044 17.1837 8.31485 15.0713 8.31485 12.4261C8.31485 9.7808 10.4044 7.6684 13.0211 7.6684L13.0399 7.64937Z" fill="white" /></g></g></svg>
                    </button>
                    <span className="miniature-carousel">
                        <div>
                            {cartItems[currentProductIndex].product && <img src={cartItems[currentProductIndex].product.imagem} />}
                        </div>
                    </span>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none"><g id="Group 46"><circle id="Ellipse 3" cx="14" cy="14" r="14" fill="#809CAA" /><g id="ð¦ icon &quot;cart&quot;"><path id="Vector" d="M5.65243 7.5059C5.35831 7.55348 5.09494 7.71721 4.92024 7.96109C4.74554 8.20497 4.67384 8.50902 4.7209 8.80635C4.76796 9.10368 4.92992 9.36993 5.17117 9.54653C5.41242 9.72314 5.71318 9.79562 6.00729 9.74805H9.33418L9.53379 10.3086L10.4431 13.1113L11.3525 15.914C11.4412 16.2054 11.8183 16.4745 12.1066 16.4745H19.8693C20.1798 16.4745 20.5347 16.2054 20.6234 15.914L22.4199 10.3086C22.5087 10.0171 22.3756 9.74805 22.0651 9.74805H12.2175L11.3747 8.13371C11.2849 7.94841 11.1463 7.79176 10.9741 7.68099C10.8019 7.57022 10.6028 7.50963 10.3988 7.5059L5.96293 7.5059C5.89653 7.49984 5.82972 7.49984 5.76332 7.5059C5.719 7.50321 5.67456 7.50321 5.63025 7.5059L5.65243 7.5059ZM12.6611 18.7166C12.0401 18.7166 11.5521 19.2099 11.5521 19.8377C11.5521 20.4655 12.0401 20.9588 12.6611 20.9588C13.2821 20.9588 13.77 20.4655 13.77 19.8377C13.77 19.2099 13.2821 18.7166 12.6611 18.7166ZM19.3148 18.7166C18.6938 18.7166 18.2059 19.2099 18.2059 19.8377C18.2059 20.4655 18.6938 20.9588 19.3148 20.9588C19.9359 20.9588 20.4238 20.4655 20.4238 19.8377C20.4238 19.2099 19.9359 18.7166 19.3148 18.7166Z" fill="white" /></g></g></svg>
                    </button>
                </div>

                <div className="product-info">
                    {cartItems[currentProductIndex].product && <h3>{cartItems[currentProductIndex].product.nome}</h3>}
                    {cartItems[currentProductIndex].product && <h3>{`REF: ${cartItems[currentProductIndex].product.id}`}</h3>}
                    {cartItems[currentProductIndex].product && <p>{`R$ `}<h3>{cartItems[currentProductIndex].product.preco.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3></p>}
                </div>
                <div className="quantity-controller">
                    <div>
                        <p>Atual</p>
                        <h3>{`R$ ${(cartItems[currentProductIndex].quantity * cartItems[currentProductIndex].product.preco * cartItems[currentProductIndex].product.tamanhos.reduce((_total, _item) => _total + _item.quantidade, 0)).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</h3>
                    </div>
                    <span>
                        <button onClick={() => {
                            if (cartItems[currentProductIndex].quantity > 0) {
                                cartItems[currentProductIndex].quantity -= 1;
                                reactRefresh({})
                            }
                        }}>-</button>
                        <h3>{cartItems[currentProductIndex].quantity}</h3>
                        <button onClick={() => {
                            cartItems[currentProductIndex].quantity += 1;
                            reactRefresh({})
                        }}>+</button>

                    </span>
                    <div>
                        <p>Acumulado</p>
                        <h3>{`R$ ${cartItems.reduce((total, item) => total + item.product.preco * item.quantity * item.product.tamanhos.reduce((_total, _item) => _total + _item.quantidade, 0), 0)
                            }`}</h3>
                    </div>
                </div>
            </main>
            <footer className='order-preview-footer'>
                <span>
                    {cartItems[currentProductIndex].product && cartItems[currentProductIndex].product.tamanhos.map((item, index) =>
                        <SizeComponent key={index} nome={item.nome} quantidade={item.quantidade} />
                    )}
                </span>
                <p>=</p>
                <div>
                    <p>PACK</p>
                    <h3>{cartItems[currentProductIndex].product && cartItems[currentProductIndex].product.tamanhos.reduce((total, item) => total + item.quantidade, 0)}</h3>
                </div>
            </footer>
        </Container>
    )
}

interface SizeComponentProps {
    nome: string,
    quantidade: number
}

function SizeComponent(props: SizeComponentProps) {
    return (<div className='size-component'>
        <h2>{props.quantidade}</h2>
        <h3>{props.nome}</h3>
    </div>)
}