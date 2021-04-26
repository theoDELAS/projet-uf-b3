import axios from "axios";

const local = 'localhost'
const device = '192.168.1.8' 

class UserService {
    login(data) {
        return axios.post(`http://${device}:8000/api/login`, data)
    }

    getAll() {
        return axios.get(`http://${device}:8000/api/users`)
    }

    getOne(id) {
        return axios.get(`http://${device}:8000/api/users/${id}`)
    }

    getInventory() {
        return axios.get(`https://steamcommunity.com/id/sheguey667/inventory/json/730/2`)
    }

    updateUser(id, data) {
        return axios.patch(`http://${device}:8000/api/users/${id}`, data)
    }
}

export default new UserService();