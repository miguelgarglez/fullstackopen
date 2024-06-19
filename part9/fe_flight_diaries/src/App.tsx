import { useState, useEffect } from 'react'
import { Diary } from './types'
import { getAllDiaries } from './services/diaryService'
import DiaryEntry from './components/DiaryEntry'
import DiaryForm from './components/DiaryForm'
import Notification from './components/Notification'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    // fetch data from backend
    getAllDiaries().then((data) => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <h1>Flight Diaries</h1>

      <Notification />
      <DiaryForm />

      {diaries.map((diary) => (
        <DiaryEntry key={diary.id} diary={diary} />
      ))}
    </div>
  )
}

export default App
