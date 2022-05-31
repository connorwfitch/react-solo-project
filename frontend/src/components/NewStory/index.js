// External modules
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import { writeStory } from '../../store/story';
import './NewStory.css';

function NewStory() {
  const userId = useSelector(state => state.session.user.id);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [headerImgUrl, setHeaderImgUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(writeStory({ title, headerImgUrl, content, userId })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )

  };

  return (
    <form onSubmit={handleSubmit} className='new-story'>
      <h2>
        Tell your story
      </h2>
      {errors.length > 0 && <ul>
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
        Header Image URL
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
        {/* TODO: onClick to return you to the previous page you were on */}
        <button type="reset" className="button cancel">Cancel</button>
        <button type="submit" className="button orange">Publish</button>
      </div>
    </form>
  );
}

export default NewStory