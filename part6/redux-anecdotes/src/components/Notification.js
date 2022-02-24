import React from 'react'
import { useSelector } from 'react-redux'

const NotificationDisplay = (notification) => {
  if (notification) {
    return (
      <div>
        {notification.notification}
      </div>
    )
  }

  return null
}

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: '1em 0em',
    visibility: ''
  }

  notification
    ? style.visibility = 'visible'
    : style.visibility = 'hidden'

  console.log(style.visibility)

  return (
    <div style={style}>
      <NotificationDisplay notification={notification} />
    </div>
  )
}

export default Notification