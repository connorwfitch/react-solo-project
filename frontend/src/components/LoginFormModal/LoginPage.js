// External modules
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

// Internal modules
import * as sessionActions from "../../store/session";
import './LoginPage.css'

function LoginPage() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if(user) history.push('/');

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
    <div className="special-background" >
      <form onSubmit={handleSubmit} className='form-page'>
        <h2>
          Please Log In
        </h2>
        {errors.length > 0 && <ul>
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
            onClick={(e) => {
              e.preventDefault();
              history.push('/');
            }}
            className="button cancel"
          >
            Cancel
          </button>
          <button type="submit" className="button orange">Log In</button>
        </div>
        <button onClick={(e) => {
          e.preventDefault();
          setCredential('demo@user.io');
          setPassword('password');
        }} className="button orange">Use Demo Credentials</button>
        <Link to='/signup' className="link">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;