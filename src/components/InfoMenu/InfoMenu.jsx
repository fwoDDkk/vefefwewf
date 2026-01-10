import { useState } from "react"
import Modal from 'react-modal'
import styles from './InfoMenu.module.css'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export default function InfoMenu() {
    let subtitle;
const [show, setShow] = useState(false);
function OpenModal() {
    setShow(true);
   }
   function closeModal() {
    setShow(false);
   }
     function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
    return (
        <div>
        <button type="button" className={styles.btn} onClick={OpenModal}>?</button>
       <Modal
        isOpen={show}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      </div>
    )
}