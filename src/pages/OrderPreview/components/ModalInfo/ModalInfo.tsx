import './ModalInfo.css';

interface ModalInfoProps {
    setModalInfo: (value: boolean) => void;
    product: Product;
}

export default function ModalInfo(props: ModalInfoProps) {
    return (
        <div className='modal'>
            <div className="modal-content">
                <div className="modal-header">
                    <h1>Informações</h1>
                    <button
                        onClick={() => (props.setModalInfo(false))}
                        type="button">X</button>
                </div>
                <h2><strong>Nome do produto: </strong>{props.product.nome}</h2>
                <h2><strong>Referência: </strong>{props.product.id}</h2>
                <h2><strong>Cores: </strong>{props.product.cores.join(', ')}</h2>
                <h2><strong>Marca: </strong>{props.product.marca}</h2>
                <h2><strong>Categoria: </strong>{props.product.categorias[0]}</h2>
                <h2><strong>Descrição: </strong>{props.product.descricao}</h2>
            </div>
        </div>
    )
}