import { useState, useEffect } from "react";
import userService from "../../utils/user";

import UserCard from "../../components/userCard/UserCard";

import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "client" });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const result = await userService.createUser(newUser);
            if (result && result._id) {
                setNewUser({ name: "", email: "", role: "client" });
                await fetchUsers(); // Refresca la lista de usuarios
            } else {
                console.error("Error creating user");
            }
        } catch (err) {
            console.error("Failed to create user:", err);
        }
    };

    return (
        <article className="users article">
            <section className="page-header">
                <h2 className="page-title">Users</h2>
            </section>
            <section className="page-content">
                <div className="users-list">
                    {users.length === 0 ? (
                        <p>There are no users created yet.</p>
                    ) : (
                        users.map(user =>
                            <UserCard user={user} key={user._id} />)
                    )}
                </div>

                <form className="create-user-form" onSubmit={handleCreateUser}>
                    <h3>Create New User</h3>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newUser.name}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        required
                    />

                    <button type="submit" className="new-user-button button">Create User<i>!</i></button>
                </form>
            </section>
        </article>
    );
}

export default Users;
