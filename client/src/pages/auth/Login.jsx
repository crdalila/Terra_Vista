import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./auth.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { onLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = await onLogin(email, password);
        if (error) {
            setError(error);
        } else {
            navigate("/");
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const randomIconIndex = Math.floor(Math.random() * 12) + 1;
	const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;

    return (
        <article className="login">
            <div className="login-title">
                <h2>Login</h2>
                    <img src={iconPath} alt={`icon-${randomIconIndex}`} className="project--icons" />
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    autoFocus
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password:</label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="toggle-password-button"
                        style={{
                            position: "absolute",
                            top: "1.2em",
                            right: "1em",
                        }}
                    >
                        {showPassword ?
                            < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--text-color)" className="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--text-color)" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                            </svg>}
                    </button>
                </div>

                <button type="submit" className="login-button">
                    Login<i>!</i>
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <a href="/register">Register</a></p>
        </article >
    );
}

export default Login;
