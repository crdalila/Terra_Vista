import { useEffect,useState } from "react";
import NotificationCard from "./NotificationCard";

function NotificationList(projects = []) {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let mynotifications = [];
        if(projects) {
            projects.forEach((project)=> {
            project.notifications.forEach((task)=>{
                mynotifications.push(task);
            });
        });
        setNotifications(mynotifications);
        }
        
    },[setNotifications]);

    if(!notifications) return null;
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