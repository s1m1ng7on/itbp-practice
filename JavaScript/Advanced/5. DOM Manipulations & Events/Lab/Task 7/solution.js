function solve() {
    let addedProducts = [];
    let totalProductPrice = 0;

    const checkoutButtonElement = document.getElementsByClassName('checkout')[0];
    const cartTextareaElement = document.getElementsByTagName('textarea')[0];

    const handleAddProductToCart = (e) => {
        const productDivElement = e.currentTarget.parentElement.parentElement;

        const productTitle = productDivElement.getElementsByClassName('product-title')[0].textContent;
        const productPrice = Number(productDivElement.getElementsByClassName('product-line-price')[0].textContent);
        
        if (!addedProducts.includes(productTitle)) addedProducts.push(productTitle);
        totalProductPrice += productPrice;

        const orderMessage = `Added ${productTitle} for ${productPrice.toFixed(2)} to the cart.`;
        cartTextareaElement.textContent += orderMessage + '\n';
    }

    const handleCheckout = (e) => {
        const checkoutMessage = `You bought ${addedProducts.join(', ')} for ${totalProductPrice.toFixed(2)}.`;
        cartTextareaElement.textContent += checkoutMessage;

        disableAllButtons();
    };

    const disableAllButtons = () => {
        const buttonElements = document.getElementsByTagName('button');
        Array.from(buttonElements).forEach(buttonElement => buttonElement.setAttribute('disabled', true));
    };

    checkoutButtonElement.addEventListener('click', handleCheckout);

    const productDivElements = document.getElementsByClassName('product');
    Array.from(productDivElements).forEach((productDivElement) => {
        const addProductToCartButtonElement = productDivElement.getElementsByClassName('add-product')[0];
        addProductToCartButtonElement.addEventListener('click', handleAddProductToCart);
    });
}