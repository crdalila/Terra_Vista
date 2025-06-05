import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import updateUser from "../../utils/user";

// // import './Profile.css';

function Profile() {
    const userData = useContext(AuthContext);

    const [username, setUserName] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = await updateUser({ password });
        if (result.error) {
            setError(result.error);
        } else {
            setPassword("");
            setSuccess("Profile updated successfully");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        }
    };


    return (
        <article className="article my-profile">
            <h1>My Profile</h1>
        </article>
    );
}

export default Profile;