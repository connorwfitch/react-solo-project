// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import parse from 'html-react-parser';

// Internal modules
import { getStoryDetail } from '../../../store/story';
import CommentSection from '../../CommentComponents/CommentSection';
import LikeButton from './LikeButton';

function StoryDetail() {
  const story = useSelector(state => state.stories.detail);
  const user = useSelector(state => state.session.user);
  const { storyId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoryDetail(storyId));
  }, [dispatch, storyId])



  if(!story) return null;

  let userExists = false;
  if(user) userExists = true;

  return (
    <main className='main flex-col-20'>
      <div className='detail-links'>
        <Link to='/stories' className='link'>
          Back to Stories
        </Link>
        {
          userExists && user.id === story.User.id && <button onClick={() => history.push(`/stories/${storyId}/edit`)} className='button orange'>
            Edit Story
          </button>
        }
      </div>
      <h1 className='detail-title'>{story.title}</h1>
      <img
        src={story.headerImgUrl}
        alt={`${story.title} header`}
        className='detail-header-image'
      />
      <div className='detail-byline'>
        <h3>By: {story.User.username}</h3>
        <div className='buttons-holder'>
          <p>Likes: {story.Likes.length}</p>
          <LikeButton />
        </div>
      </div>
      <div className='detail-p'>
        {parse(story.content)}
      </div>
      <CommentSection />
    </main>
  );

}

export default StoryDetail;