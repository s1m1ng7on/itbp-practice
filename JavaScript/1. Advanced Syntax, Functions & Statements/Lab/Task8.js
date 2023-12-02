function getNumberOfDays(month, year) {
    let date = new Date(year, month - 1);

    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);

    return date.getDate();
}

console.log(getNumberOfDays(11, 2023));