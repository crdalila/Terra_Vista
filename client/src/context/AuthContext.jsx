import { createContext, useEffect, useState } from "react";
<<<<<<< HEAD
import getUserByCookies from "../utils/cookies";
=======
>>>>>>> fullstack

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
<<<<<<< HEAD
=======
    const [loading, setLoading] = useState(true); // nuevo estado
>>>>>>> fullstack

    useEffect(() => {
        const fetchUser = async () => {
            try {
<<<<<<< HEAD
                const result = await getUserByCookies(); // esto debe devolver { userData }
                if (result && result.userData) {
                    setUserData(result.userData); // no necesitas JSON.parse
                }
            } catch (error) {
                console.error("Error getting user from cookies:", error);
            }
        };

        fetchUser();
    }, []);

=======
                setLoading(true);
                console.log("Fetching user by cookies...");
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
<<<<<<< HEAD
            console.log('result', result)
=======
>>>>>>> fullstack
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
