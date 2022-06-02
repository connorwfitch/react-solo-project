// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// Internal modules
import { getUserDetail } from '../../../store/user';

function UserDetail() {
  const userDetail = useSelector(state => state.users.detail);

  const { userDetailId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetail(userDetailId));
  }, [dispatch, userDetailId]);

  if(!userDetail) return null;

  return (
    <main className='story-detail-main'>
      <div className='story-detail-links'>
        <Link to='/users' className='link'>
          Back to Users
        </Link>
      </div>
      <h1>{userDetail.username}</h1>
      <img src={userDetail.profileImgUrl} alt={`${userDetail.username} profile`} />
      <h2>Stories</h2>
    </main>
  );
}

export default UserDetail;