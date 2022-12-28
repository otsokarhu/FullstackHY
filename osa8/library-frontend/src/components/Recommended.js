import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../query";
import { useEffect, useState } from "react";

const Recommend = ({ show }) => {
  const [favGenre, setFavGenre] = useState([]);
  const [books, setBooks] = useState([])

  const user = useQuery(ME)
  const allBooks = useQuery(ALL_BOOKS)


  useEffect(() => {
    allBooks.data && setBooks(allBooks.data.allBooks)
  }, [allBooks.data])

  useEffect(() => {
    user.data && setFavGenre(user.data.me.favouriteGenre)
  }, [user.data])




  if (!show) {
    return null
  }

  if (allBooks.loading) {
    return <div>loading...</div>
  }

  if (user.loading) {
    return <div>loading...</div>
  }



  const recommendBooks = books.filter((book) => book.genres.includes(favGenre))

  return (
    <div>
      <h2>books in your favourite genre: {favGenre}</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )


}
export default Recommend