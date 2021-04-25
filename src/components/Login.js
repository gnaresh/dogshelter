import React, { useState } from 'react';
import PropTypes from 'prop-types';

const loginCss = `
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
`

async function loginUser(credentials) {
 return fetch('/api/users/authenticate', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 }).then(response=>response.text()).then(response=>{
    return JSON.parse(response)
 })
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <style>
        {loginCss}
      </style>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}