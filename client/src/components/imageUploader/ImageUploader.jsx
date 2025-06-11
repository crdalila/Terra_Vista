import { uploadImageToTask } from "../../utils/clickup";
import { useState, useRef } from "react";
import Modal from "../Modal/Modal";

function ImageUploader ({ taskId }) {
	const [error, setError] = useState(null);
	const imageInputRef = useRef(null);
	const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

	const MAX_SIZE_MB = 5;
	const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

	const handleUpload = async () => {
		const imageFile = imageInputRef.current.files[0];
		if (!imageFile || !taskId) {
			return;
		}
		if (!ALLOWED_TYPES.includes(imageFile.type)) {
				setError("Use JPG, JPEG, PNG o WEBP.");
				return;
			}
	
		if (imageFile.size > MAX_SIZE_MB * 1024 * 1024) {
			setError(`File too large. Maximum allowed size is ${MAX_SIZE_MB} MB.`);
			return;
		}
	
		setError("");

		try {
			await uploadImageToTask(taskId, imageFile);
			setModalMessage("Image successfully uploaded");
			imageInputRef.current.value = "";
		} catch (err) {
			console.error(err);
			setError("Error uploading image");
		} finally {
			setShowModal(true);
		}
	};

	const handleModalClose = () => {
        setShowModal(false);
        window.location.reload();
    };

	return (
		<>
			<div className="image-uploader">
				<input type="file" accept=".jpg,.jpeg,.png,.webp" ref={imageInputRef} />
				<button className="button-sendSecreenshot" onClick={handleUpload}>Add a screenshot</button>
				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>
	
			{showModal && <Modal message={modalMessage} onClose={handleModalClose} />}
		</>
	);
}

export default ImageUploader;