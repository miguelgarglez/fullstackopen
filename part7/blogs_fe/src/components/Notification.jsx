import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  // Limpiar la notificación después de la duración especificada
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, notification.seconds * 1000) // Convertir la duración a milisegundos

      // Limpiar el temporizador si el componente se desmonta
      return () => clearTimeout(timer)
    }
  }, [dispatch, notification])

  return notification.message ? (
    <div style={style}>{notification.message}</div>
  ) : null
}

export default Notification
