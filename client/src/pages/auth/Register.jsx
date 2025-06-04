import { useState } from "react";

// import './auth.css';

function Register() {
    const [email, setEmail] = useState("");
    const [provisionalPassword, setProvisionalPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleProvisionalPasswordChange = (event) => {
        setProvisionalPassword(event.target.value);
    };

    return (
        <div className="create-user">
            <h2>Create User</h2>
            <form>
                <label>Email:</label>
                <input type="email" autoFocus value={email} onChange={handleEmailChange} />
                <label>Provisional Password:</label>
                <input
                    type="password"
                    value={provisionalPassword}
                    onChange={handleProvisionalPasswordChange}
                />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default Register;