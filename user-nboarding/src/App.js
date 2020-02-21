import React, { useState } from 'react';
import logo from './logo.svg';
import FormikLoginForm from './components/LoginForm'
import User from './components/User'
import './App.css';

function App() {

  const [users, setUsers] = useState([]);

  function appendToUsers(user) {
    setUsers([...users, user]);
  }

  return (
    <div className="App">
      {users.map(user => (
        <User key={Math.random()} user={user} />
      ))}
      <FormikLoginForm
        validateOnChange={false}
        validateOnBlur={true}
        setUsers={setUsers}
        appendToUsers={appendToUsers}
      />
    </div>
  );
}

export default App;
