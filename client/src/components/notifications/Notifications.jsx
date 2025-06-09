import { useEffect,useState } from "react";
import NotificationCard from "./NotificationCard";

function NotificationList(projects = []) {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let mynotifications = [];
        projects.forEach((project)=> {
            project.notifications.forEach((task)=>{
                mynotifications.push(task);
            });
        });
        setNotifications(mynotifications);
    },setNotifications);

    return (
        <article className="notifications">
            <h2>notificationsications</h2>
            {notifications.map((notif)=>{
                <NotificationCard notif={notif}/>
            })}
        </article>
    );
}

export default NotificationList;