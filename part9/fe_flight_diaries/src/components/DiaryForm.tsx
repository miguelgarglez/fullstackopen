import { createDiary } from '../services/diaryService'
import { NewDiary } from '../types'
import { setNotification } from '../reducers/notificationReducer'
import { useAppDispatch } from '../hooks'
import axios from 'axios'

const DiaryForm = () => {
  const dispatch = useAppDispatch()
  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      date: { value: string }
      weather: { value: string }
      visibility: { value: string }
      comment: { value: string }
    }
    const newDiary: NewDiary = {
      date: target.date.value,
      weather: target.weather.value,
      visibility: target.visibility.value,
      comment: target.comment.value,
    }
    createDiary(newDiary)
      .then((data) => {
        console.log(data)
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response) {
          // Do something with this error...
          dispatch(
            setNotification({
              message: `${error.response.data}`,
              seconds: 5,
            })
          )
        }
      })

    target.date.value = ''
    target.weather.value = ''
    target.visibility.value = ''
    target.comment.value = ''
  }
  return (
    <div>
      <h2>New Diary</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <label>
            <b>Date: </b>
          </label>
          <input name="date" type="date" />
        </div>
        <br />
        <div>
          <label>
            <b>Weather</b>
          </label>

          <input type="radio" id="sunny" name="weather" value="sunny" />
          <label htmlFor="sunny">Sunny</label>

          <input type="radio" id="rainy" name="weather" value="rainy" />
          <label htmlFor="rainy">Rainy</label>

          <input type="radio" id="cloudy" name="weather" value="cloudy" />
          <label htmlFor="cloudy">Cloudy</label>

          <input type="radio" id="stormy" name="weather" value="stormy" />
          <label htmlFor="stormy">Stormy</label>

          <input type="radio" id="windy" name="weather" value="windy" />
          <label htmlFor="windy">Windy</label>
        </div>
        <br />
        <div>
          <label>
            <b>Visibility</b>
          </label>

          <input type="radio" id="great" name="visibility" value="great" />
          <label htmlFor="great">Great</label>

          <input type="radio" id="good" name="visibility" value="good" />
          <label htmlFor="good">Good</label>

          <input type="radio" id="ok" name="visibility" value="ok" />
          <label htmlFor="ok">OK</label>

          <input type="radio" id="poor" name="visibility" value="poor" />
          <label htmlFor="poor">Poor</label>
        </div>
        <br />
        <div>
          <label>
            <b>Comment: </b>
          </label>
          <input name="comment" type="text" />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default DiaryForm
