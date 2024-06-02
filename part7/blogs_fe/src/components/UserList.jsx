import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <div>
      <h2>App users</h2>
      <Table hover bordered>
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
