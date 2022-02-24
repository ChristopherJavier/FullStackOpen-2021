/* eslint-disable react/react-in-jsx-scope */
const Notification = ({ errorMessage, notificationMsg }) => {
    if (errorMessage) {
        return(
            <div className={'error'}>
                <h3>
                    {errorMessage}
                </h3>
            </div>
        )
    }

    if (notificationMsg) {
        return(
            <div className={'notification'}>
                <h3>
                    {notificationMsg}
                </h3>
            </div>
        )
    }

    return (
        null
    )
}

export default Notification