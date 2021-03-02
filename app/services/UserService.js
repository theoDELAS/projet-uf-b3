import axios from "axios";

class UserService {
    getAll() {
        return axios.get('http://localhost:8000/api/users')
    }
}

export default new UserService();