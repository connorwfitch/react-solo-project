// External modules
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [image, setImage] = useState(false);
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getStoryDetail(storyId));
  }, [dispatch, storyId])

  useEffect(() => {
    setTitle(story ? story.title : '');
    setContent(story ? story.content : '');
  }, [story])

  if (!story) return null;

  // Auth checks
  if (!user) history.push('/login');
  if (user.id !== story.User.id) history.push('/unauthorized');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (!content || content === '<p><br></p>') {
      return setErrors(['Please provide content for your story.']);
    }
    return dispatch(editStory(storyId, { title, content, headerImgUrl: story.headerImgUrl, image,})).then(() => history.push(`/stories/${storyId}`)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="main flex-col-20">
      <form onSubmit={handleSubmit} className='flex-col-20 form-page border-shadow'>
        {errors.length > 0 && <ul className="errors">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>}
        <input
          className="title-input"
          type="text"
          value={title}
          placeholder='Title...'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          required
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder={"Tell your story..."}
          className="text-editor"
        />
        <label>
          Update Image (Optional)
          <input
            className="image-input"
            type="file"
            accept="image/*"
            onChange={updateFile}
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