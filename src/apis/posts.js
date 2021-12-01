import axios from 'axios'

export const getPost = () => {
  return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}