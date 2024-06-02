import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

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
    <Form id="login-form" onSubmit={handleLogin}>
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label htmlFor="loginUsername">Username:</Form.Label>
        <Form.Control type="text" name="username" id="username" />
      </Form.Group>
      <Form.Group style={{ marginTop: '20px' }}>
        <Form.Label htmlFor="loginPassword">Password:</Form.Label>
        <Form.Control type="password" name="password" id="password" />
      </Form.Group>
      <div style={{ marginTop: '20px' }}>
        <Button id="login-button" type="submit">
          login
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
