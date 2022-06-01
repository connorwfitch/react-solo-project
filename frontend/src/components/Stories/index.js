// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Internal modules
import { getStories } from '../../store/story';
import './Stories.css';

function Stories () {
  const stories = useSelector(state => state.stories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch])

  if (!stories) return null;

  return (
    <main className='stories-main'>
      {Object.entries(stories).map(([key, story]) => {
        if(key === 'detail') return null;
        return (
          <Link to={`/stories/${story.id}`} className='story-card' key={story.id}>
            <img 
              src={story.headerImgUrl} alt={`${story.title} header`}
              className='story-card-image'
            />
            <div className='story-card-text'>
              <h3 className='story-card-title'>{story.title}</h3>
              <p className='story-card-p'>
                By: {story.User.username}
              </p>
              <p className='story-card-p'>
                {`${story.content.slice(0, 200)}...`}
              </p>
            </div>
          </Link>
        )
      })}
    </main>
  );
}

export default Stories;