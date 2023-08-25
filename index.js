const search = document.getElementById('input');
const listOfPeople = document.getElementById('peopleList');

let myPerson = null;

fetch('https://randomuser.me/api/?results=10')
  .then(response => response.json())
  .then(data => {
    data.results.forEach(personData => {
      myPerson = personData;
      processData();
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
});

function processData() {
    if (myPerson) {

        const person = document.createElement('li');
        const fullName = document.createElement('h4');
        const locationName = document.createElement('p');

        fullName.textContent = myPerson.name.first + ' ' + myPerson.name.last;
        locationName.textContent = myPerson.location.street.name + ' ' + myPerson.location.country;
       
        person.appendChild(fullName);
        person.appendChild(locationName);

        listOfPeople.appendChild(person);

    } else {
      console.log("Data has not been fetched yet.");
    }
}


function filter() {
    const fullName = document.querySelectorAll('h4');
    const locationName = document.querySelectorAll('p');

    const searchText = search.value.toLowerCase();
    const people = document.querySelectorAll('li');

    people.forEach((person, index) => {
        const name = fullName[index].textContent.toLowerCase();
        const location = locationName[index].textContent.toLowerCase();
        
        if (name.includes(searchText) || location.includes(searchText)) {
            person.style.display = 'flex'; 
        } else {
            person.style.display = 'none'; 
        }
    });
}


search.addEventListener('input', filter);
