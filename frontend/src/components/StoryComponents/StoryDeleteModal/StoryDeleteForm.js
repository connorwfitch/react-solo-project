// External modules
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Internal modules
import { deleteStory } from "../../../store/story";

function StoryDeleteForm({ storyId, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    setShowModal(false);
    dispatch(deleteStory(storyId)).then(() => history.push('/stories'))
  }

  return (
    <div className="delete-modal">
      <h2>Delete this story?</h2>
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

export default StoryDeleteForm;