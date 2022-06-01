// External modules
import { useSelector } from 'react-redux';
import CommentForm from '../CommentForm';

// Internal modules
import './CommentSection.css'

function CommentSection({ comments }) {
  const user = useSelector(state => state.session.user);

  let userExists = false;
  if (user) userExists = true;

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      { userExists && <CommentForm />}
      { [ ...comments].reverse().map((comment, i) => {
        return (
          <div className="comment" key={`comment-${i}`}>
            <p className='comment-user'>{`${comment.User.username}:`}</p>
            <p>{comment.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default CommentSection;