import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../utils/user";
import { useNavigate } from "react-router-dom";

import './Profile.css';

function Profile() {
    const navigate = useNavigate();

    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { onLogout, userData } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const result = await userService.changeUserPassword({ oldPassword, newPassword, userId: userData._id });

            if (result.error) {
                setError(result.error);
            } else {
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setSuccess("Password updated successfully");
                setTimeout(() => setSuccess(""), 3000);
            }
        } catch (error) {
            setError("Error updating password");
        }
    };

    return (
        <article className="article my-profile">
            <section className="page-header">
                <h2 className="page-title">Profile</h2>
                <div className="page-info">
                    <h3>{userData.name}</h3>
                    <p>{userData.email}</p>

                    <div className="page-buttons">
                        <button className="logout-button button" onClick={onLogout}>
                            Logout
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512" width='20' height='20'>
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <button className="back-button" onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                        <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                    </svg>
                </button>
            </section>

            <section className="page-content">
                <h3>Edit Password</h3>
                <form onSubmit={handleSubmit} method="post" className="edit-password-form">
                    <label htmlFor="current-password">Current password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="new-password">Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <button type="submit" className="submit-password button">Save Changes<i>!</i></button>
                </form>
            </section>
        </article>
    );
}

export default Profile;
