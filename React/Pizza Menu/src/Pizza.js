export default function Pizza(props) {
    return (
        <div className="pizza">
            <img src={props.photoName} alt={props.name}></img>
            <div>
                <h3>{props.name}</h3>
                <p>{props.ingredients}</p>
                <span>${props.price.toFixed(2)}</span>
            </div>
        </div>
    );
}
