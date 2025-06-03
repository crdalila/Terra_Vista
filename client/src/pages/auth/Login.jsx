import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { onLogin } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await onLogin(email, password);
        if (result) {
            setError(result);
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
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
        </article>
    );
}

export default Login;