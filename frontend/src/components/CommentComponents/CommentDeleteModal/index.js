// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../context/Modal';
import CommentDeleteForm from './CommentDeleteForm.js';

function CommentDeleteModal({ commentId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='button red' type='button' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentDeleteForm setShowModal={setShowModal} commentId={commentId} />
        </Modal>
      )}
    </>
  );
}

export default CommentDeleteModal;