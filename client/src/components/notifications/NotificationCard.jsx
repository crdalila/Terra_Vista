import './Notifications.css'

function NotificationCard({notif}) {
    const colorList = ['#FFB41D', '#F96E43', '#3D9DD8', '#F78BD8', '#189B5C', '#7CE55E'];
	const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

    return (
        <article className="notification-card" style={{ '--random-color': randomColor }}>
            <div className="notification-card--icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L96 64zM64 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                </svg>
            </div>

            <div className="notification-card--info">
                <p>{notif}</p>
            </div>
        </article>
    )
}

export default NotificationCard;