import { createContext, useState, useEffect, useMemo } from "react";

const TIME_TO_LIVE_SECONDS = 10;
const initialNotification = {
    status: 'hidden',
    title: '',
    body: ''
}

export const NotificationContext = createContext();
export default function NotificationProvider(props) {
    const [notification, setNotification] = useState(initialNotification);

    // Destroy notification after x-seconds
    useEffect(() => {
        if (notification.status !== 'hidden' && notification.status !== 'destroying') {
            setTimeout( () => setNotification(existing => ({
                ...existing,
                status: 'destroying'
            })
            ), TIME_TO_LIVE_SECONDS * 1000 );
        } // if
        else if (notification.status === 'destroying')
            setTimeout( () => setNotification(initialNotification), 1 * 1000 ); /* transition-duration in component Notification */
    }, [notification])

    function hideNotification() {
        setNotification(existing => ({
            ...existing,
            status: 'destroying'
        }));
    }

    function notify(status, title, body) {
        // Check if no notification is being showed
        if (notification.status === 'hidden')
            setNotification({
                status,
                title,
                body
            });
    }

    const context = useMemo(() => ({
        notification,
        notify,
        hideNotification
    }), [notification]);

    return <NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>
}