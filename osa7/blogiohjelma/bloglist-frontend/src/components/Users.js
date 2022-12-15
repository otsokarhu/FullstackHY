import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div className="users">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><b><Link to={`users/${user.id}`}>{user.name}</Link></b></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default Users