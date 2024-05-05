import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useEffect } from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const [notification, dispatch] = useContext(NotificationContext)

  useEffect(() => {
    if (notification && notification.seconds) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, notification.seconds * 1000)

      return () => clearTimeout(timeout)
    }
  }, [notification])

  return notification && notification.message ? (
    <div style={style}>{notification.message}</div>
  ) : null
}

export default Notification
