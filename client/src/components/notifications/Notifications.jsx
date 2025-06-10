
import NotificationCard from "./NotificationCard";
import { Fragment } from "react";

import "./Notifications.css";
function NotificationList({ projects }) {


    return (
        <article className="notifications">
            <h3>Notifications</h3>
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