// External modules
import { useSelector } from 'react-redux';

// Internal modules
import CommentForm from '../CommentForm';
import Comment from '../Comment';
import './CommentSection.css'

function CommentSection({ comments }) {
  const user = useSelector(state => state.session.user);

  let userExists = false;
  if (user) userExists = true;

  return (
    <div className="comments-section">
      { userExists && <CommentForm />}
      <h2 className='comments-header'>Comments</h2>
      { [ ...comments].reverse().map((comment, i) => {
        return (
          <Comment comment={comment} i={i} key={`comment-${i}`}/>
        )
      })}
    </div>
  )
}

export default CommentSection;