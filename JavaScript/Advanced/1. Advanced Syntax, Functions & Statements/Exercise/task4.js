function getPreviousDate(year, month, date) {
    const currentDate = new Date(year, month - 1, date);

    let previousDate = currentDate.getTime() - 24 * 60 * 60 * 1000;
    previousDate = new Date(previousDate);

    console.log(`${previousDate.getFullYear()}-${previousDate.getMonth() + 1}-${previousDate.getDate()}`);
}

getPreviousDate(2023, 11, 9);