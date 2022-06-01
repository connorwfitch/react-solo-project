// External modules
import React, { useState } from 'react';

// Internal modules
import { Modal } from '../../../context/Modal';
import StoryDeleteForm from './StoryDeleteForm';

function StoryDeleteModal({ storyId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='button red' type='button' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <StoryDeleteForm setShowModal={setShowModal} storyId={storyId}/>
        </Modal>
      )}
    </>
  );
}

export default StoryDeleteModal;