import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value,
      }
      dispatch(loginUser(credentials))

      event.target.username.value = ''
      event.target.password.value = ''
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'Wrong credentials',
          seconds: 5,
        })
      )
    }
  }

  return (
    <form id="login-form" onSubmit={handleLogin}>
      <div>
        username
        <input type="text" name="username" id="username" />
      </div>
      <div>
        password
        <input type="password" name="password" id="password" />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
