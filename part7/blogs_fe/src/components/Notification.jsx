import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

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
    <div className="container">
      <Alert variant="success">{notification.message}</Alert>
    </div>
  ) : null
}

export default Notification
