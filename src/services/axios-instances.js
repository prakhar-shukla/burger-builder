import axios from 'axios'
import {AXIOS_BASE_URL} from '../keys/keys'

export const axiosOrders = axios.create({
    baseURL: AXIOS_BASE_URL
})