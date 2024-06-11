import { useQuery } from '@apollo/client'
import { ME, FAVOURITES } from '../queries'

const Recommendations = ({ show }) => {
  const result_user = useQuery(ME)

  const result_books = useQuery(FAVOURITES)

  if (!show) {
    return null
  }

  if (result_user.loading || result_books.loading) {
    return <div>loading...</div>
  }

  const books = result_books.data.favourites
  const genre = result_user.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      {genre && (
        <div>
          books in your favourite genre <strong>{genre}</strong>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default Recommendations
