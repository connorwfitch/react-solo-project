// External modules
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

// Internal modules
import { getStories } from '../../../store/story';

function Stories() {
  const stories = useSelector(state => state.stories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch])

  if (!stories) return null;

  return (
    <main className='main flex-col-20'>
      {Object.entries(stories).map(([key, story]) => {
        if(key === 'detail') return null;
        return (
          <Link to={`/stories/${story.id}`} className='display-card' key={story.id}>
            <img 
              src={story.headerImgUrl} alt={`${story.title} header`}
              className='display-card-image'
            />
            <div className='display-card-text'>
              <h2 className='display-card-title'>{story.title}</h2>
              <p className='display-card-p'>
                By: {story.User.username}
              </p>
              <div className='display-card-story'>
                {parse(story.content)}
              </div>
            </div>
          </Link>
        )
      })}
    </main>
  );
}

export default Stories;