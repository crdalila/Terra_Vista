import { createContext, useEffect, useState } from "react";

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

    const [loading, setLoading] = useState(true); // nuevo estado

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("Fetching user by cookies...");
                const result = await getUserByCookies();
                if (result?.userData) {
                    setUserData(result.userData);
                }
            } catch (error) {
                console.error("Error getting user by cookies:", error);
            } finally {
                setLoading(false); // se completó la carga (con éxito o error)
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // o cualquier componente de carga
    }

    const handleRegister = async (email, password) => {
        try {
            const result = await register(email, password);
            if (result.error) return result.error;

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
            if (result.error) return result.error;
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
