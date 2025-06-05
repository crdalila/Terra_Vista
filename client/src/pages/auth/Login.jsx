import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./auth.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { onLogin } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await onLogin(email, password);
        if (user) {
            setError(user);
        } else {
            navigate(`/user/projects/${user._id}`);
        }
    };

    return (
        <article className="login">
            <div className="login-title">
                <h2>Login</h2>
                <img src="../../../public/images/icons-card.png" alt="icons" className="icons-card" />
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} autoFocus required onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button" >Login<i>!</i></button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <a href="/register">Register</a></p>
        </article>
    );
}

export default Login;