// External modules
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Internal modules
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

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
    <div className='nav-background'>
      <div className='nav-container'>
        <Link className='nav-logo' to='/'>
          <h2>Gemiddeld</h2>
        </Link>
        <div className='nav-sub'>
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
    </div>
  );
}

export default Navigation;