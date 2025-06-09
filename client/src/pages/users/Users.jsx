import { useState } from "react";
import userService from "../../utils/user";

import UserCard from "../../components/userCard/UserCard";

import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "client" });
    const [keyValue, setKeyValue] = useState(0);

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
                setKeyValue(keyValue => keyValue + 1);
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
                        <h3>There are no users created yet.</h3>
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
