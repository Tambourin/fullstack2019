import React, { useState, useEffect } from "react";
import personService from "../services/persons";

const Names = ({ persons, deletePerson }) => {

  

  const personNamesAndNumbers = persons.map(person => (
    <p key={person.id}>
      {person.name} {person.number}
      <span>  </span>
      <button onClick={deletePerson(person)}>Poista</button>
    </p>
  ));

  return (
    <>
      <h2>Numerot</h2>
      {personNamesAndNumbers}
      
    </>
  );
};

const Filter = props => {
  return (
    <div>
      rajaa näytettäviä:
      <input onChange={props.changeHandler} value={props.filter} />
    </div>
  );
};

const PersonForm = props => {
  return (
    <form>
      <div>
        nimi: <input onChange={props.nameChangeHandler} value={props.newName} />
      </div>
      <div>
        numero:{" "}
        <input onChange={props.numberChangeHandler} value={props.newNumber} />
      </div>
      <div>
        <button type="submit" onClick={props.submitHandler}>
          lisää
        </button>
      </div>
    </form>
  );
};

const Message = ({ message}) => {
  if(message === null || message ==="") {
    return null;
  }  
  const messageStyle = {
    color: 'green',
    border: 'solid',
    fontSize: 16,
  }
  return (
    <div style={messageStyle}>
      <p>{message}</p>
    </div>
  );
}

const ErrorMessage = ({ errorMessage }) => {
  if(errorMessage === null || errorMessage ==="") {
    return null;
  }  
  const messageStyle = {
    color: 'red',
    border: 'solid',
    fontSize: 16,
  }
  return (
    <div style={messageStyle}>
      <p>{errorMessage}</p>
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("uusi nimi");
  const [newNumber, setNewNumber] = useState(" ");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = event => {
    setNewName(event.target.value);
  };
  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = event => {
    setFilterName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} on jo luettelossa, haluatko korvata numeron`)) {
        const p = persons.find(p => p.name === newName);
        const updatedP = { ...p, number: newNumber }
        personService.update(updatedP).then(response => {
          setPersons(persons.map(person => 
            person.id !== response.data.id ? person : response.data));
        }).catch (error => {
          setErrorMessage("Päivittäminen ei onnistunut");
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        });
      } else {
        return;
      }
      
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      };
  
      personService.create(newPerson).then(addedPerson => {
        setPersons(persons.concat(addedPerson));
        setMessage("Uusi yhteystieto luotu.")    
        setTimeout(() => {
          setMessage(null)
        }, 5000)    
        setNewName("");
        setNewNumber("");
      });
    }    
  };

  

  const deletePerson = (person) => {
    return () => {
      if(window.confirm(`Haluatko varmasti poistaa hekilön ${person.name}`)) {
        personService.deleteById(person.id).then((response) => {
          setPersons(persons.filter(p => p.id !== person.id));
        }).catch(error => {
          setErrorMessage("Poistaminen ei onnistunut");
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        });
      }
    }
    
  }



  useEffect(() => {
    personService.getAll().then(data => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Message message={message} />
      <ErrorMessage errorMessage={errorMessage} />
      <Filter changeHandler={handleFilterChange} filer={filterName} />
      <PersonForm
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        submitHandler={handleSubmit}
      />
      <Names
        deletePerson={deletePerson}
        persons={persons.filter(person =>
          person.name.toLowerCase().match(filterName.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;
