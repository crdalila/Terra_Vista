import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { login, register, logout } from "../utils/auth";
import getUserByCookies from "../utils/cookies";

const AuthContext = createContext({
    userData: null,
    onLogin: async () => { },
    onLogout: () => { },
    onRegister: async () => { }
});

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const result = await getUserByCookies();
                if (result && !result.error) {
                    setUserData(result);
                }else{
                    setUserData(null);
                }
            } catch (error) {
                console.error("Error getting user by cookies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleRegister = async (email, password) => {
        try {
            const result = await register(email, password);
            if (result.error) {
                if(result.error == true) return result.message;
                return result.error;
            }

            if (result.userData) {
                setUserData(result.userData);
            }
            return null;
        } catch (error) {
            console.error("Register error:", error);
            return "Error processing the register.";
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const result = await login(email, password);
            if (result.error) {
                if(result.error == true) return result.message;
                return result.error;
            }
            if (result.userData) {
                setUserData(result.userData);
            }
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
            <Navigate to="/" />;
        }
    };

    return (
        <AuthContext.Provider value={{
            userData,
            loading,
            onLogin: handleLogin,
            onLogout: handleLogout,
            onRegister: handleRegister
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };