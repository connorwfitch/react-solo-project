// External modules
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Internal modules
import { Modal } from '../../../context/Modal';
import LoginForm from '../../LoginFormModal/LoginForm';
import { addLike, deleteLike } from '../../../store/story';
  
function LikeButton() {
  const [showModal, setShowModal] = useState(false);

  const story = useSelector(state => state.stories.detail);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const userLikeIds = new Set(story.userLike.map(like => like.id));
  console.log(userLikeIds);

  const handleLike = () => {
    return dispatch(addLike({ userId: user.id, storyId: story.id }))
  }

  const handleUnlike = () => {
    return dispatch(deleteLike())
  }

  let displayedButton;

  if (!user) {
    displayedButton = (
      <>
        <button className='button like' onClick={() => setShowModal(true)}>
          <i className="fa-solid fa-heart"></i>
        </button>
        {
          showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm setShowModal={setShowModal} />
            </Modal>
          )
        }
      </>
    )
  } else if (userLikeIds.has(user.id)) {
    displayedButton = (
      <button className='button unlike' onClick={handleLike}>
        <i className="fa-solid fa-heart"></i>
      </button>
    )
  } else {
    displayedButton = (
      <button className='button like' onClick={handleLike}>
        <i className="fa-solid fa-heart"></i>
      </button>
    )
  }

  return (
    displayedButton
  );
}

export default LikeButton;