import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateUser } from "../../utils/api/user";

// import './Profile.css';

function Profile() {
    const { userData, setUserData, onLogout } = useContext(AuthContext);

    const [activeSection, setActiveSection] = useState("profile");
    const [username, setUserName] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = await updateUser({ username, email, password });
        if (result.error) {
            setError(result.error);
        } else {
            setUserData({ ...userData, username, email });
            setPassword("");
            setSuccess("Profile updated successfully");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        }
    };


    return (
        <article className="my-profile">
            <section className="my-profile__index">
                <div className="index-item" onClick={() => setActiveSection("profile")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    <p className="profile-link">Perfil</p>
                </div>
                <div className="index-item" onClick={() => setActiveSection("favorites")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                    <p className="saved-restaurants-link">Restaurantes guardados</p>
                </div>
                <div className="index-item" onClick={() => setActiveSection("reviews")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-square-quote" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                    </svg>
                    <p className="reviews-link">Reseñas</p>
                </div>
                <div className="index-item create-restaurant-button">
                    {userData.isAdmin && (
                        <button
                            onClick={() => setActiveSection("createRestaurant")}
                        >
                            Crear restaurante
                        </button>
                    )}
                </div>
            </section>

            <section className="my-profile__content">
                <section className={`my-profile__data ${activeSection === "profile" ? "active" : "hidden"}`}>
                    <h2>Datos personales</h2>

                    <div className="data--info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="data--info-logo" width="60" height="60" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>                        <div className="data--info-name">
                            <h3 className="data--name">{userData.username}</h3>
                            <p className="data--email">{userData.email}</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="data--configuration">
                        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder={userData.username} />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={userData.email} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Cambiar contraseña" />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" />
                        <div className="configuration-buttons">
                            <button type="submit">Guardar cambios</button>
                            <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>
                        </div>
                        {success && <p className="modal-success">{success}</p>}
                        {error && <p className="modal-error">{error}</p>}
                    </form>
                </section>

                <section className={`my-profile__restaurants ${activeSection === "favorites" ? "active" : "hidden"}`}>
                    <FavoritesList />
                </section>

                <section className={`my-profile__reviews ${activeSection === "reviews" ? "active" : "hidden"}`}>
                    <ReviewsList />
                </section>

                <section className={`my-profile__create-restaurant ${activeSection === "createRestaurant" ? "active" : "hidden"}`}>
                    <CreateRestaurantForm onCreated={() => setActiveSection("profile")} />
                </section>
            </section>
        </article>
    );
}

export default Profile;