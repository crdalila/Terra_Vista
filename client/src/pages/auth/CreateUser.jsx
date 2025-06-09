import { useState } from "react";

// import './auth.css';

function CreateUser() {
    const [email, setEmail] = useState("");
    const [provisionalPassword, setProvisionalPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleProvisionalPasswordChange = (event) => {
        setProvisionalPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="create-user-account">
            <h2 className="create-user-account-title">Create User</h2>
            <img src="../../../public/images/icons-card.png" alt="icons" className="icons-card" />
            <form className="create-user-account-form">
                <label>Email:</label>
                <input type="email" autoFocus value={email} onChange={handleEmailChange} />
                <label>Provisional Password:</label>
                <input
                    type="password"
                    value={provisionalPassword}
                    onChange={handleProvisionalPasswordChange}
                />

                <button
                    type="button"
                    onClick={toggleShowPassword}
                    style={{
                        position: "absolute",
                        right: "0.5em",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "0.25em 0.5em",
                        fontSize: "0.8rem",
                    }}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>

                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default CreateUser;