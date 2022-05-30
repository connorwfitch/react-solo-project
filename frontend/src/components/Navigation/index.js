// External modules
import { Link } from 'react-router-dom';
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
      <Link to='/'>
        <img src={logo} alt='Gemiddeld' className='nav-logo'>
        </img>
      </Link>
      <div>
        <Link className='link' to='/stories/new'>
          Write
        </Link>
        <Link className='link' to='/stories'>
          Stories
        </Link>
        <Link className='link' to='/users'>
          Users
        </Link>
        <Link className='link' to='/about'>
          About
        </Link>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;