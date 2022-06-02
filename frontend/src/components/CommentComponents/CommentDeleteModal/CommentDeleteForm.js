// External modules
import { useDispatch } from "react-redux";

// Internal modules
import { deleteComment } from "../../../store/story";

function CommentDeleteForm({ commentId, setShowModal }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    setShowModal(false);
    dispatch(deleteComment(commentId))
  }

  return (
    <div className="delete-modal">
      <h2>Delete this comment?</h2>
      <div className="buttons-holder">
        <button
          type='button'
          onClick={() => {
            setShowModal(false);
          }}
          className="button cancel"
        >
          Cancel
        </button>
        <button type='button' className="button red" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default CommentDeleteForm;