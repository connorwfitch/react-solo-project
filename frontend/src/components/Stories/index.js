// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { getStories } from '../../store/story';

function Stories () {
  const stories = useSelector(state => {
    return state.stories.storyIdList.map(id => state.stories[id])
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch])

  if (!stories) return null;

  return (
    <main>
      {stories.map((story) => {
        return (
          <div className='story-card'>
            <h3>{story.title}</h3>
            <img 
              src={story.headerImgUrl} alt={`${story.title} header`}
              className='story-card-image'
            />
            <p className='story-card-p'>
              {`${story.content.slice(0,100)}...`}
            </p>
          </div>
        )
      })}
    </main>
  );
}

export default Stories;