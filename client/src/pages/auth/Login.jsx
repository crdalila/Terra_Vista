import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";

// import './auth.css';

function Login() {
    // const { onLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await onLogin(email, password);
        if (result.error) {
            setError(result.error);
        } else {
            onclose();
        }
    };

    return (
        <article className="login">
            <h2>Login</h2>
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
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </article>
    );
}

export default Login;