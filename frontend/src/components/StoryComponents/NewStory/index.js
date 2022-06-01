// External modules
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Internal modules
import { writeStory } from '../../../store/story';
import './NewStory.css';

function NewStory() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  if(!user) history.push('/login');
  
  const [title, setTitle] = useState('');
  const [headerImgUrl, setHeaderImgUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(writeStory({ title, content, headerImgUrl, userId: user.id })).then(history.push('/stories')).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )
  };

  return (
    <form onSubmit={handleSubmit} className='new-story'>
      <h2 className="tell-your-story">
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
  );
}

export default NewStory