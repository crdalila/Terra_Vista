import { useState, useEffect } from "react";
import userService from "../../utils/user";

import UserCard from "../../components/userCard/UserCard";

import "./Users.css";

function Users() {
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "client" });
    const [users, setUsers] = useState([]);
    const [tempPass, settempPass] = useState("");

    const randomIconIndex = Math.floor(Math.random() * 12) + 1;
    const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;


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
            const { result, newPassword } = await userService.createUser(newUser);

            if (result && result._id) {
                setNewUser({ name: "", email: "", role: "client" });
                settempPass(newPassword);
                fetchUsers();
            } else {
                console.error("Error creating user");
            }
        } catch (err) {
            console.error("Failed to create user:", err);
        }
    };

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
    };

    return (
        <article className="users article">
            <section className="page-header">
                <h2 className="page-title">Users</h2>
                <div className="page-info">
                    <h3>Connect with your team.</h3>
                    <p>Add, edit, or view the profiles of users who are part of Terra Vista. Manage permissions,
                        assign tasks, or communicate directly with your team from this centralized section</p>
                </div>
            </section>

            <section className="page-content">
                <form className="create-user-form" onSubmit={handleCreateUser}>
                    <h3>Create New User</h3>
                    <img src={iconPath} alt={`icon-${randomIconIndex}`} className="project--icons" />

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
                {tempPass && <p className="temporal-password">Temporal Password for new user is : {tempPass}</p>}
                <div className="users-list">
                    {users.length > 0 ? (users.map(user => (
                        <UserCard key={user._id} user={user} onRemoveUser={handleRemoveUser}
                        text={"Are you sure you want to delete this user?"} />
                    ))) : (<p>There are no users created yet.</p>)
                    }

                </div>
            </section>
        </article>
    );
}

export default Users;
