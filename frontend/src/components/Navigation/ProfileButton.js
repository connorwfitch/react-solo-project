// External modules
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

// Internal modules
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    console.log('---------HERE----------', showMenu)
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {

    console.log('---------HERE2----------', showMenu)

    if (!showMenu) return;

    const closeMenu = () => {
      console.log('---------HERE3----------', showMenu)
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu} className='button white'>
        {user.username}
        <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;