import { Diary } from '../types'

const DiaryEntry = ({ diary }: { diary: Diary }) => {
  return (
    <div>
      <h2>{diary.date}</h2>
      <p>
        Weather: {diary.weather}
        <br />
        Visibility: {diary.visibility}
      </p>
    </div>
  )
}

export default DiaryEntry
