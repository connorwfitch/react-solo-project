// External modules
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// Internal modules
import { editStory, getStoryDetail } from '../../../store/story';
import StoryDeleteModal from "../StoryDeleteModal";

function StoryEdit() {
  const story = useSelector(state => state.stories.detail);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const { storyId } = useParams();

  const [title, setTitle] = useState('');
  const [headerImgUrl, setHeaderImgUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getStoryDetail(storyId));
  }, [dispatch, storyId])

  useEffect(() => {
    setTitle(story ? story.title : '');
    setHeaderImgUrl(story ? story.headerImgUrl : '');
    setContent(story ? story.content : '');
  }, [story])

  if (!story) return null;

  // Auth checks
  if (!user) history.push('/login');
  if (user.id !== story.User.id) history.push('/unauthorized');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(editStory(storyId, { title, content, headerImgUrl, userId: user.id })).then(() => history.push(`/stories/${storyId}`)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )
  };

  return (
    <div className="main flex-col-20">
      <form onSubmit={handleSubmit} className='flex-col-20 form-page border-shadow'>
        <h2 className="average">
          Nothing is ever so good that it can't stand a little revision...
        </h2>
        {errors.length > 0 && <ul className="errors">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>}
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Header Image URL (Optional)
          <input
            type="text"
            value={headerImgUrl}
            onChange={(e) => setHeaderImgUrl(e.target.value)}
          />
        </label>
        <label>
          Story Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <div className="buttons-holder">
          <button
            className="button cancel"
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Cancel
          </button>
          <button type="submit" className="button orange">Publish</button>
          <StoryDeleteModal storyId={storyId} />
        </div>
      </form>
    </div>
  );
}

export default StoryEdit