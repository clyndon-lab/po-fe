import { getToken } from '@utils/token'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000
})

axiosInstance.defaults.withCredentials = true

axiosInstance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'

axiosInstance.interceptors.request.use(
  (configs) => {
    const jwtToken = getToken()

    // TODO: create middleware to ignore public url or external requests
    if (jwtToken) {
      configs.headers = { ...configs.headers, 'Authorization': `Bearer ${getToken()}` }
    }

    return configs
  },
  (error) => {
    console.error('Axios critical error =>', error)
    console.log(error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // TODO: handle generic errors
    // console.log(response)
    return Promise.resolve(response.data)
  },
  (error) => {
    // TODO: handle generic errors
    return Promise.reject(error)
  }
)

export default axiosInstance
