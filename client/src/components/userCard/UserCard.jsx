import { useState } from "react";
import { useEffect } from "react";
import userService from "../../utils/user";
import user from "../../utils/user";

import "./UserCard.css";

function UserCard() {
    const [users, setUsers] = useState([]);

    const [userToDelete, setUserToDelete] = useState(null);
    const [error, setError] = useState("");

    // Extraemos fetchUsers para usarlo dentro y fuera del useEffect
    const fetchUsers = async () => {
        try {
            const result = await userService.getAllUsers();
            if (Array.isArray(result)) {
                const clients = result.filter(user => user.role === "client");
                setUsers(clients);
            } else {
                console.error("Can't get users");
            }
        } catch (err) {
            console.error("Error getting users:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRemoveUser = async (userId) => {
        try {
            const result = await userService.removeUser(userId);

            if (result.error) {
                setError(`Error removing user: ${result.message} (status ${result.status})`);
            } else {
                window.location.reload();
            }
        } catch (error) {
            setError(`Error removing user: ${error.message}`);
        }
        setUserToDelete(null);
    };

    return (
        <article className="user-card-container">
            {users.map(user => (
                <div key={user._id} className="user-card">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="var(--text-color)" width='24' height='24'>
                        <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                    </svg>
                    <p className="user-card__name">{user.name}</p>
                    <p>{user.email}</p>

                    {/*DELETE BUTTON*/}
                    <div className="user-card__trash">
                        <svg viewBox="0 0 448 512" fill="black" height="18px" width="18px"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setUserToDelete(user);
                            }}>
                            {" "}
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                    </div>
                </div>
            ))}

            {/*CONFIRM DELETE*/}
            {userToDelete && (
                <div className="delete-confirmation" onClick={() => setUserToDelete(null)}>
                    <div className="delete-confirmation__content" onClick={(e) => e.stopPropagation()}>
                        <p>Are you sure you want to delete this user?</p>
                        <div className="delete-confirmation__buttons">
                            <button onClick={() => setUserToDelete(null)} className="button-cancel">
                                Cancel
                            </button>
                            <button onClick={() => handleRemoveUser(userToDelete._id)} className="button-delete">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article>
    )
}

export default UserCard