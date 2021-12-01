// import axios from '@utils/axios'
import axiosInstance from '../configs/axios'

export const loginWithHeader = () => {
  return axiosInstance.get('api/login/api/logintokenheader')
}
