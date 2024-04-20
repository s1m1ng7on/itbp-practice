function generateReport() {
    let report = [];
    const employeeTableBodyRowsElement = document.querySelectorAll('table tbody tr');
    const employeeSelectedColumns = Array.from(document.querySelectorAll('table thead tr th input[type="checkbox"]')).filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);
    console.log(employeeSelectedColumns);
}