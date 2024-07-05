import { pizzaData } from './data.js';
import Pizza from './Pizza';

export const Menu = () => {
    return (
        <main className="menu">
            <h2>Our menu:</h2>
            {pizzaData.map((pizza) => (
                <Pizza
                    name={pizza.name}
                    photoName={pizza.photoName}
                    ingredients={pizza.ingredients}
                    price={Number(pizza.price)}
                />
            ))}
        </main>
    );
};
