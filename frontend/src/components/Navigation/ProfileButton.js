// External modules
import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

// Internal modules
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <button className='button white' onClick={() => history.push(`/users/${user.id}`)}>
        <i className="fa-solid fa-user"></i>
      </button>
      <button className='button white' onClick={logout}>
        Log Out
      </button>
    </>
  );
}

export default ProfileButton;