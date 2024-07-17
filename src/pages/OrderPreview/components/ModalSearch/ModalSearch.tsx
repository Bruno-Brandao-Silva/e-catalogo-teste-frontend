import { useState } from 'react';
import './ModalSearch.css'
import axios from 'axios';
import { useCart } from '../../../../contexts/Cart';

const API_URL = import.meta.env.VITE_API_URL;

interface ModalSearchProps {
    setModalSearch: (value: boolean) => void;
    setCurrentProductIndex: (value: number) => void;
}

export default function ModalSearch(props: ModalSearchProps) {
    const { cartItems  } = useCart();
    const [searchInput, setSearchInput] = useState('')
    return (
        <div className='modal'>
            <div className="modal-content">
                <div className="modal-header">
                    <h1>BUSCAR POR REF</h1>
                    <button
                        onClick={() => (props.setModalSearch(false))}
                        type="button">X</button>
                </div>
                <input type="text" placeholder='000' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                <button onClick={() => {
                    const _id = Number(searchInput)
                    if (isNaN(_id)) return
                    axios.get(`${API_URL}/produtos/id/${_id}`)
                        .then(response => {
                            const _product = response.data as Product
                            if (_product) {
                                const _item = cartItems.find(item => item.product.id === _id)
                                if (_item) {
                                    props.setCurrentProductIndex(_item.index)
                                    props.setModalSearch(false)
                                } else {
                                    cartItems.push({ product: _product, quantity: 0, index: cartItems.length })
                                    props.setCurrentProductIndex(cartItems.length - 1)
                                    props.setModalSearch(false)

                                }
                            }
                        });
                }}>Buscar</button>
            </div>
        </div>
    )
}