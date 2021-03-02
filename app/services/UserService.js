import axios from "axios";

const local = 'localhost'
const device = '192.168.1.36' 

class UserService {
    getAll() {
        return axios.get(`http://${local}:8000/api/users`)
    }
}

export default new UserService();