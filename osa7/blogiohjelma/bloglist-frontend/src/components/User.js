import { useEffect, useState } from "react"
import { useMatch } from "react-router-dom"
import userService from "../services/users"

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await userService.getAll()
      setUsers(allUsers)
    }
    getUsers()
  }, [])


  const match = useMatch("/users/:id")

  const userId = match?.params?.id
  const userToShow = users.find((user) => user.id === userId)





  if (!userToShow) {
    return null
  }
  return (
    <div>
      <h2>{userToShow.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userToShow.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User