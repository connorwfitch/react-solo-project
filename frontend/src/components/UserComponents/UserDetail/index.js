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
    <main className='main flex-col-20'>
      <div className='detail-links'>
        <Link to='/users' className='link'>
          Back to Users
        </Link>
      </div>
      <div className='detail-profile border-shadow'>
        <h1>{userDetail.username}</h1>
        <img
          src={userDetail.profileImgUrl}
          alt={`${userDetail.username} profile`}
          className='detail-profile-image'
        />
        <p>{userDetail.bio}</p>
      </div>
      <h2>Stories</h2>
      {userDetail.Stories.map((story) => {
        return (
          <Link to={`/stories/${story.id}`} className='display-card' key={story.id}>
            <img
              src={story.headerImgUrl} alt={`${story.title} header`}
              className='display-card-image'
            />
            <div className='display-card-text'>
              <h3 className='display-card-title'>{story.title}</h3>
              <p className='display-card-p'>
                {story.content.length > 150 ? `${story.content.slice(0, 150)}...` : story.content}
              </p>
            </div>
          </Link>
        )
      })}
      {userDetail.Stories.length === 0 && <p>
        {userDetail.username} does not have any stories yet
      </p>}
    </main>
  );
}

export default UserDetail;