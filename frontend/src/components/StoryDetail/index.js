// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

// Internal modules
import { getStoryDetail } from '../../store/story';
import './StoryDetail.css';

function StoryDetail() {
  const story = useSelector(state => state.stories.detail);
  const { storyId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoryDetail(storyId));
  }, [dispatch, storyId])

  if(!story) return null;

  return (
    <main>
      <Link to='/stories' className='link'>
        Back to Stories
      </Link>
      <img
        src={story.headerImgUrl}
        alt={`${story.title} header`}
      />
      <h1>{story.title}</h1>
      {
        story.content.split('\n').map((par, i) => {
          return (
            <p key={`par-${i}`}>{par}</p>
          )
        })
      }
    </main>
  );

}

export default StoryDetail;