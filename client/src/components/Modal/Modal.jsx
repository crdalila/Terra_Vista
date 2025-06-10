import "./Modal.css";

function Modal({ message, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}

export default Modal;
