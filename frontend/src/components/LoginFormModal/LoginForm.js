// External modules
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Internal modules
import * as sessionActions from "../../store/session";

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className='form-special'>
      <h2 className="garamond">
        Welcome back
      </h2>
      {errors.length > 0 && <ul className="errors">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>}
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className="buttons-holder">
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setShowModal(false);
          }}
          className="button cancel"
        >
          Cancel
        </button>
        <button type="submit" className="button orange">Log In</button>
      </div>
      <button type="button" onClick={(e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }));
      }} className="button orange">Use Demo Credentials</button>
    </form>
  );
}

export default LoginForm;