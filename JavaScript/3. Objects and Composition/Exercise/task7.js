function townsToJSON(towns) {
    let townObjArray = [];

    const [column1, column2, column3] = towns[0].split(/[\s]*[|][\s]*/g).filter(Boolean);

    for (let i = 1; i < towns.length; i++) {
        let [town, latitude, longitude] = towns[i].split(/[\s]*[|][\s]*/g).filter(Boolean);

        const townObj = {
            [column1]: town,
            [column2]: Number(Number(latitude).toFixed(2)),
            [column3]: Number(Number(longitude).toFixed(2))
        }
        townObjArray.push(townObj);
    }

    console.log(JSON.stringify(townObjArray));
}

townsToJSON([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |'
]);

townsToJSON([
    '| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |'
]);