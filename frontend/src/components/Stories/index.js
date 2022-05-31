// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    <main>
      {Object.values(stories).map((story) => {
        return (
          <div className='story-card'>
            <img 
              src={story.headerImgUrl} alt={`${story.title} header`}
              className='story-card-image'
            />
            <div className='story-card-text'>
              <h3 className='story-card-title'>{story.title}</h3>
              <p className='story-card-p'>
                {`${story.content.slice(0, 100)}...`}
              </p>
            </div>
          </div>
        )
      })}
    </main>
  );
}

export default Stories;