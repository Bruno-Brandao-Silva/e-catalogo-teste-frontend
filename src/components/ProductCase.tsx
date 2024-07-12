import './ProductCase.css';

export default function ProductCase(product: Product) {
    return (
        <div key={product.id} className="product-case" onClick={() => { }}>
            <div className="case-header">
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