import { useState } from "react";
import userService from "../../utils/user";

import UserCard from "../../components/userCard/UserCard";

function Users() {
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
            <h2>Users</h2>
            <section className="users-list">
                <h3>Users List</h3>
                <UserCard key={keyValue} />
            </section>

            <form className="create-user-form" onSubmit={handleCreateUser}>
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

                <button type="submit" className="button">Create User</button>
            </form>
        </article>
    );
}

export default Users;
