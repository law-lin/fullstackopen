import React from 'react';
import personService from '../services/persons';

function Persons(props) {
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then((res) => {
          props.setMessage(`${name} successfully removed!`);
        })
        .catch((err) => {
          props.setMessage(
            `Information of ${name} has already been removed from server`
          );
        });
    }
  };
  return (
    <div>
      <ul>
        {props.persons.map((person) => {
          if (person.name.toLowerCase().includes(props.filter)) {
            return (
              <li key={person.name}>
                {person.name} {person.number}{' '}
                <button onClick={() => deletePerson(person.id, person.name)}>
                  delete
                </button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Persons;
