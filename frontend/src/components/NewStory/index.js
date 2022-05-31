// External modules
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Internal modules

function NewStory() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [headerImgUrl, setHeaderImgUrl] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // TODO: thunk for creating a story
    return dispatch().catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )

  };

  return (
    <form onSubmit={handleSubmit}>
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
        <button type="reset" className="button cancel">Cancel</button>
        <button type="submit" className="button orange">Log In</button>
      </div>
    </form>
  );
}

export default NewStory