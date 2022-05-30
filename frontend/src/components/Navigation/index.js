// External modules
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Internal modules
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import logo from '../../assets/gemiddeldLarge.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='navigation'>
      <NavLink exact to="/">
        <img src={logo} alt='Gemiddeld' className='nav-logo'>
        </img>
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;