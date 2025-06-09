
import NotificationCard from "./NotificationCard";
import { Fragment } from "react";
function NotificationList({ projects }) {


    return (
        <article className="notifications">
            <h2>notificationsications</h2>
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