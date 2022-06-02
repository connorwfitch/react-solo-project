// External modules
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { editComment } from "../../../store/story";
import CommentDeleteModal from '../CommentDeleteModal';

function Comment({ comment, i }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [formShow, setFormShow] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(editComment({ content, commentId: comment.id })).then(() => setFormShow(false));
  };

  let userExists = false;
  if (user) userExists = true;

  return (
    <div className="comment" >
      {!formShow && <>
        <p className='comment-user'>{`${comment.User.username}:`}</p>
        <p>{comment.content}</p>
        {userExists && user.id === comment.User.id &&
          <div className='buttons-holder'>
            <button onClick={() => setFormShow(true)}className='button orange'>Edit</button>
            <CommentDeleteModal commentId={comment.id} />
          </div>
        }
      </>}
      {formShow && <form onSubmit={handleSubmit} className='comment-form'>
        <label>
          Revise your thoughts
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <div className="buttons-holder">
          <button
            className="button cancel"
            type="button"
            onClick={() => {
              setFormShow(false);
              setContent(comment.content);
            }}
          >
            Cancel
          </button>
          <button type="submit" className="button orange">Publish</button>
        </div>
      </form>}
    </div>
  )
}

export default Comment;