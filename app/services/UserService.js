import axios from "axios";

class UserService {
    getAll() {
        return axios.get('http://192.168.1.36:8000/api/users')
    }
}

export default new UserService();