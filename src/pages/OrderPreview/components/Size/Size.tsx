import './Size.css'

interface SizeProps {
    nome: string,
    quantidade: number
}

export default function Size(props: SizeProps) {
    return (<div className='size-component'>
        <h2>{props.quantidade}</h2>
        <h3>{props.nome}</h3>
    </div>)
}