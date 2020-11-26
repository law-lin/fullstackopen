import React, { useState, useEffect } from 'react';
import personService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, [message]);

  const addName = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };
    let foundPerson = null;
    if (
      persons.find((person) => {
        foundPerson = person;
        return person.name === newName;
      })
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updateNumber(foundPerson.id, personObject)
          .then((res) => {
            setMessage(`${newName}'s number updated successfully!`);
          })
          .catch((err) => setMessage(`${newName}'s number failed to update`));
      }
    } else {
      personService
        .create(personObject)
        .then((res) => {
          setPersons(persons.concat({ name: newName, number: newNumber }));
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((err) => {
          console.log(err.response.data);
          setMessage(err.response.data.error);
        });
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    if (
      message.toLowerCase().includes('success') ||
      message.toLowerCase().includes('added')
    ) {
      return <div className='success'>{message}</div>;
    }
    if (
      message.toLowerCase().includes('fail') ||
      message.toLowerCase().includes('has already')
    )
      return <div className='error'>{message}</div>;

    return null;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChange={(e) => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addName}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        setMessage={(message) => setMessage(message)}
      />
    </div>
  );
};

export default App;
