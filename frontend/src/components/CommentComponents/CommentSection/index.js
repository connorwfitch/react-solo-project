// External modules
import { useSelector } from 'react-redux';
import CommentDeleteModal from '../CommentDeleteModal';
import CommentForm from '../CommentForm';

// Internal modules
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
          <div className="comment" key={`comment-${i}`}>
            <p className='comment-user'>{`${comment.User.username}:`}</p>
            <p>{comment.content}</p>
            {userExists && user.id === comment.User.id &&
              <div className='buttons-holder'>
                <button className='button orange'>Edit</button>
                <CommentDeleteModal commentId={comment.id}/>
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}

export default CommentSection;