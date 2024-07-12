import './Container.css';

interface props {
    children: JSX.Element | JSX.Element[];
}

export default function Container({ children }: props) {

    return (
        <div className="container">
            {children}
        </div>
    )
}