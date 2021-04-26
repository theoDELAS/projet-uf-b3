import axios from "axios";

const local = 'localhost'
const device = '172.20.10.5'

class GlobalService {
    getResource(route) {
        return axios.get(`http://${device}:8000${route}`)
    }
}

export default new GlobalService();