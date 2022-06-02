// External modules
import { useSelector } from 'react-redux';

// Internal modules
import CommentForm from '../CommentForm';
import Comment from '../Comment';
import './CommentSection.css'

function CommentSection() {
  const user = useSelector(state => state.session.user);
  const story = useSelector(state => state.stories.detail);

  const comments = story.Comments;

  let userExists = false;
  if (user) userExists = true;

  return (
    <div className="comments-section">
      { userExists && <CommentForm />}
      <h2 className='comments-header'>Comments</h2>
      { [ ...comments].map((comment, i) => {
        return (
          <Comment i={i} key={`comment-${i}`}/>
        )
      })}
      { comments.length === 0 && <p>
        No comments yet.
      </p>}
    </div>
  )
}

export default CommentSection;