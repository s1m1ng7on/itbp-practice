function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);

    function onClick() {
        const tableRowsElements = document.querySelectorAll('table tbody tr');
        const patternToSearch = document.querySelector('#searchBtn').value;

        tableRowsElements.forEach((row) => {
            row.forEach((element) => {
                if (element.textContent.includes(patternToSearch)) {
                    row.
                }
            });
        });
    }
}