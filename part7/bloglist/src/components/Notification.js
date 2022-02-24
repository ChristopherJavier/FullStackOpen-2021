/* eslint-disable react/react-in-jsx-scope */
const Notification = ({ notification }) => {
    if (notification) {
        return(
            <div className={notification.type}>
                <h3>
                    {notification.notification}
                </h3>
            </div>
        )
    }

    return (
        null
    )
}

export default Notification