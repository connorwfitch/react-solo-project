// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal modules
import { getUsers } from '../../../store/user';

function Users() {
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  if (!users) return null;

  return (
    <main className='stories-main'>
      {Object.entries(users).map(([key, user]) => {
        if (key === 'detail') return null;
        return (
          <Link to={`/users/${user.id}`} className='story-card' key={user.id}>
            <img
              src={user.profileImgUrl} alt={`${user.username} profile`}
              className='story-card-image'
            />
            <div className='story-card-text'>
              <h3 className='story-card-title'>{user.username}</h3>
              <p className='story-card-p'>
                {user.bio}
              </p>
            </div>
          </Link>
        );
      })}
    </main>
  );
}

export default Users;