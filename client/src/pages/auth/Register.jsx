import { useState, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// import './auth.css';

function Register() {
    // const { onLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [provisionalPassword, setProvisionalPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [error, setError] = useState("");

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    return (
        <article className="register">
            <div className="register-title">
                <h2>Register</h2>
                <img src="../../../public/images/icons-card.png" alt="icons" className="icons-card" />
            </div>
            <form className="register-form">
                <label>Email:</label>
                <input type="email" autoFocus value={email} required onChange={(e) => setEmail(e.target.value)} />
                <label>Provisional Password:</label>
                <input
                    type="password"
                    value={provisionalPassword}
                    onChange={(e) => setProvisionalPassword(e.target.value)}
                    required
                />
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                <button type="submit" className="register-button">Register<i>!</i></button>
            </form>
        </article>
    )
}

export default Register
