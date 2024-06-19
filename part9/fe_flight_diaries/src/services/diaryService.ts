import axios from 'axios';
import { Diary, NewDiary } from '../types';
const URL = 'http://localhost:3000/api/diaries';


export const getAllDiaries = () => {
    return axios.get<Diary[]>(URL).then(response => response.data);
}

export const createDiary = (newDiary: NewDiary) => {
    return axios.post<Diary>(URL, newDiary).then(response => response.data);
}