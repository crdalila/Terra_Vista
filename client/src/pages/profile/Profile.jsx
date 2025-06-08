import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import updateUser from "../../utils/user";
import { useNavigate, Navigate } from "react-router-dom";
import getUserByCookies from "../../utils/cookies";

import './Profile.css';

function Profile() {
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (oldPassword && oldPassword !== userData.password) {
            setError("Incorrect old password");
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = await updateUser({ newPassword, confirmPassword });
        if (result.error) {
            setError(result.error);
        } else {
            setNewPassword("");
            setSuccess("Password updated successfully");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        }
    };

    const handleLogout = () => {
    }

    const handleEditPassword = () => {
        document.querySelector(".my-profile-right").classList.toggle("hidden");
    }

    return (
        <article className="article my-profile">
            <button className="back-button" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                </svg>
            </button>

            <h2>My Profile</h2>
            <p>Name:{userData.name}</p>
            <p>Email:{userData.email}</p>

            <button className="edit-password-button" onClick={() => handleEditPassword()}>
                Edit Password
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
            </button>

            <form action="" onSubmit={handleSubmit} method="post" className="edit-password-form hidden">
                <label htmlFor="current-password">Current password</label>
                <input type="password" id="current-password" /> {/* TODO VACIAR CAMPO */}

                <label htmlFor="new-password">Password</label>
                <input type="password" id="new-password" />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" />

                <button type="submit" className="submit-password">Save Changes</button>
            </form>

            <button className="logout-button" onClick={() => handleLogout()}>
                Logout
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
            </button>
        </article>
    );
}

export default Profile;