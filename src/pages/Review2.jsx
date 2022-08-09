import { useState } from 'react'
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

function Review2() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
      <>
        <Modal isOpen={false}>
          This is Modal content
          <button onClick={()=> setModalIsOpen(false)}>Modal Open</button>
        </Modal>
      </>
  )
}

export default Review2



