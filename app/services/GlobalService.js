import axios from "axios";

const local = 'localhost'
const device = '192.168.1.8'

class GlobalService {
    getResource(route) {
        return axios.get(`http://${device}:8000${route}`)
    }
}

export default new GlobalService();