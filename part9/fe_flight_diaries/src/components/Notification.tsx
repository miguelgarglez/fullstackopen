import { clearNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'

const Notification = () => {
  const dispatch = useAppDispatch()
  const notification = useAppSelector((state) => state.notification)
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
