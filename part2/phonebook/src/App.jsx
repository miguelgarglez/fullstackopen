/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import personServer from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [message, setMessage] = useState({ content: null, color: "green" });

  const hook = () => {
    personServer.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      } else {
        const person = persons.find((p) => p.name === newName);
        personServer
          .update(person.id, { ...person, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            setMessage({ content: `Updated '${newName}'`, color: "green" });
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage({
              content: `${error.response.data.error}`,
              color: "red",
            });
            // This was useful on past situations and statuses of the app
            // setPersons(persons.filter((p) => p.id !== person.id));
            setTimeout(() => {
              setMessage({ content: null, color: "green" });
            }, 5000);
          });
        return;
      }
    }

    personServer
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage({ content: `Added '${newName}'`, color: "green" });
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          setMessage({ content: null, color: "green" });
        }, 5000);
      })
      .catch((error) => {
        setMessage({
          content: `Failed to add '${newName}': ${error.response.data.error}`,
          color: "red",
        });
        setTimeout(() => {
          setMessage({ content: null, color: "green" });
        }, 5000);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterString(event.target.value);
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personServer.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterString.toLowerCase())
  );

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={message.content} color={message.color} />
      <Filter
        filterString={filterString}
        handleFilterChange={handleFilterChange}
      />

      <Header text="Add a new" />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Header text="Numbers" />
      <Persons persons={personsToShow} handleDelete={handleDeletePerson} />
    </div>
  );
};

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Filter = ({ filterString, handleFilterChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={filterString} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <PersonTile
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

const PersonTile = ({ person, handleDelete }) => {
  return (
    <>
      <p>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(person.id)}>delete</button>
      </p>
    </>
  );
};

const Notification = ({ message, color }) => {
  const notificationStyle = {
    color: color,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default App;
