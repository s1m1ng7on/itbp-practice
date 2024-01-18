function solve() {
    const furnitureListTableTbodyElement = document.querySelector('tbody');

    const textareaElements = document.querySelectorAll('textarea');
    const jsonFurnitureListTextAreaElement = textareaElements[0];
    const boughtFurnitureTextAreaElement = textareaElements[1];

    const buttonElements = document.querySelectorAll('button');
    const generateFurnitureListButtonElement = buttonElements[0];
    const buyFurnitureButtonElement = buttonElements[1];

    generateFurnitureListButtonElement.addEventListener('click', () => {
        const furnitureList = JSON.parse(jsonFurnitureListTextAreaElement.value);
        furnitureList.forEach(furnitureItem => {
            const newFurnitureItemTrElement = document.createElement('tr');
            
            const newFurnitureItemImgTdElement = document.createElement('td');
            const newFurnitureItemImgElement = document.createElement('img');
            newFurnitureItemImgElement.src = furnitureItem.img;
            newFurnitureItemImgTdElement.appendChild(newFurnitureItemImgElement);

            const newFurnitureItemNameTdElement = document.createElement('td');
            const newFurnitureItemNamePElement = document.createElement('p');
            newFurnitureItemNamePElement.textContent = furnitureItem.name;
            newFurnitureItemNameTdElement.append(newFurnitureItemNamePElement);

            const newFurnitureItemPriceTdElement = document.createElement('td');
            const newFurnitureItemPricePElement = document.createElement('p');
            newFurnitureItemPricePElement.textContent = furnitureItem.price;
            newFurnitureItemPriceTdElement.append(newFurnitureItemPricePElement);

            const newFurnitureItemDecorationFactorTdElement = document.createElement('td');
            const newFurnitureItemDecorationFactorPElement = document.createElement('p');
            newFurnitureItemDecorationFactorPElement.textContent = furnitureItem.decFactor;
            newFurnitureItemDecorationFactorTdElement.append(newFurnitureItemDecorationFactorPElement);

            const newFurnitureItemMarkTdElement = document.createElement('td');
            const newFurnitureItemMarkInputElement = document.createElement('input');
            newFurnitureItemMarkInputElement.type = 'checkbox';
            newFurnitureItemMarkTdElement.append(newFurnitureItemMarkInputElement);

            newFurnitureItemTrElement.appendChild(newFurnitureItemImgTdElement);
            newFurnitureItemTrElement.appendChild(newFurnitureItemNameTdElement);
            newFurnitureItemTrElement.appendChild(newFurnitureItemPriceTdElement);
            newFurnitureItemTrElement.appendChild(newFurnitureItemDecorationFactorTdElement);
            newFurnitureItemTrElement.appendChild(newFurnitureItemMarkTdElement);

            furnitureListTableTbodyElement.appendChild(newFurnitureItemTrElement);
        });
    });

    buyFurnitureButtonElement.addEventListener('click', () => {
        let boughtFurnitureList = [];
        let totalPrice = 0;
        let totalDecorationFactor = 0;
        let boughtFurnitureCount = 0;

        Array.from(furnitureListTableTbodyElement).forEach(furnitureItemTrElement => {
            const furnitureItemMarkInputElement = furnitureItemTrElement.querySelector('input[type="checkbox"]');
            if (furnitureItemMarkInputElement.checked) {
                const furnitureItemPElements = furnitureItemTrElement.querySelectorAll('p');

                const furnitureItemName = furnitureItemPElements[0].textContent;
                const furnitureItemPrice = Number(furnitureItemPElements[1].textContent);
                const furnitureItemDecorationFactor = Number(furnitureItemPElements[2].textContent);

                if (!boughtFurnitureList.includes(furnitureItemName)) boughtFurnitureList.push(furnitureItemName);
                totalPrice += furnitureItemPrice;
                totalDecorationFactor += furnitureItemDecorationFactor;
                boughtFurnitureCount++;
            }
        });

        const averageDecorationFactor = totalDecorationFactor / boughtFurnitureCount;

        const checkoutMessage = `Bought furniture: ${boughtFurnitureList.join(', ')}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${averageDecorationFactor}`;
        boughtFurnitureTextAreaElement.textContent = checkoutMessage;
    });
}