
import NotificationCard from "./NotificationCard";
import { Fragment } from "react";

import "./Notifications.css";
function NotificationList({ projects }) {
    const randomIconIndex = Math.floor(Math.random() * 12) + 1;
    const iconPath = `/images/threeIcons/${randomIconIndex}.svg`;

    return (
        <article className="notifications">
            <h3>Notifications</h3>
            <img src={iconPath} alt={`icon-${randomIconIndex}`} className="project--icons" />

            {projects.map((project) => {
                return (
                    <Fragment key={project._id}>
                        {project.notifications.map((notif) => {
                            return (
                                <NotificationCard key={project._id + notif} notif={notif} />
                            );
                        })}
                    </Fragment>
                );
            })}
        </article>
    );
}

export default NotificationList;