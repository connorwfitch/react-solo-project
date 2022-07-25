// External modules
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

// Internal modules
import { writeStory } from '../../../store/story';

function NewStory() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [title, setTitle] = useState('');
  const [headerImgUrl, setHeaderImgUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(writeStory({ title, content, headerImgUrl, userId: user.id })).then(() => history.push('/stories')).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )
  };

  if (!user) {
    return (
      <Redirect to={'/login'}/>
    )
  }

  return (
    <div className="main flex-col-20">
      <form onSubmit={handleSubmit} className='flex-col-20 form-page border-shadow'>
        <h2 className="average">
          Tell your story
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
        </div>
      </form>
    </div>
  );
}

export default NewStory