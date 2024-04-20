function filterEmployees(employeesJSON, criteria) {
    const applyFilter = function(criteria) {
        const criteriaArray = criteria.split('-');
        const criteriaKey = criteriaArray[0];
        const criteriaValue = criteriaArray[1];

        const filteredEmployees = employeesArray.filter(employee => {
            return employee[criteriaKey] === criteriaValue;
        });

        filteredEmployees.forEach((employee, index) => {
            console.log(`${index}. ${employee['first_name']} ${employee['last_name']} - ${employee['email']}`);
        });
    }

    const employeesArray = JSON.parse(employeesJSON);
    applyFilter(criteria);

    return applyFilter;
}

const employees = filterEmployees(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  },
{
    "id": "4",
    "first_name": "Kaylee",
    "last_name": "Johnson",
    "email": "k0@cnn.com",
    "gender": "Female"
  },
{
    "id": "5",
    "first_name": "Kizzee",
    "last_name": "Johnson",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },
{
    "id": "6",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  },
{
    "id": "7",
    "first_name": "Evanne",
    "last_name": "Johnson",
    "email": "ev2@hostgator.com",
    "gender": "Male"    
}]`,
    'gender-Female'
);
employees('last_name-Johnson');