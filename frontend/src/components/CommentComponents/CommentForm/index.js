// External modules
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { writeComment } from "../../../store/story";
import './CommentForm.css';


function CommentForm() {
  const userId = useSelector(state => state.session.user.id);
  const storyId = useSelector(state => state.stories.detail.id);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(writeComment({ content, userId, storyId})).then(() => setContent(''));
  };

  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <label>
        Share your thoughts
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <div className="buttons-holder">
        <button
          className="button cancel"
          type="reset"
          onClick={() => setContent('')}
        >
          Cancel
        </button>
        <button type="submit" className="button orange">Publish</button>
      </div>
    </form>
  )
}

export default CommentForm;