import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const YearForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [changeYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()

    changeYear({ variables: { name, setBornTo: parseInt(year) } })

    setName('')
    setYear('')
  }

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <Select
            placeholder="Select author"
            defaultValue={{ value: name, label: name }}
            value={{ value: name, label: name }}
            onChange={({ value }) => setName(value)}
            options={options}
          />
        </div>
        <div>
          born{' '}
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  )
}

export default YearForm
