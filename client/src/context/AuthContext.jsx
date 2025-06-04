import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, register, logout } from "../utils/auth";

const AuthContext = createContext({
    userData: null,
    onLogin: async () => {},
    onLogout: () => {},
    onRegister: async () => {}
});

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (email, password) => {
        try {
            const result = await register(email, password);
            if (result.error) return result.error;

            if (result.user) {
                setUserData(result.user);
            }

            navigate("/login");
            return null;
        } catch (error) {
            console.error("Register error:", error);
            return "Error processing the register.";
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const result = await login(email, password);
            if (result.error) return result.error;

            if (result.user) {
                setUserData(result.user);
            }

            navigate("/project/user/");
            return null;
        } catch (error) {
            console.error("Login error:", error);
            return "Error processing the login.";
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUserData(null);
            navigate("/");
        }
    };

    return (
        <AuthContext.Provider value={{
            userData,
            onLogin: handleLogin,
            onLogout: handleLogout,
            onRegister: handleRegister
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };