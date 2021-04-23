import axios from "axios";

const local = 'localhost'
const device = '172.20.10.2' 

class UserService {
    login(data) {
        return axios.post(`http://${device}:8000/api/login`, data)
    }

    getAll() {
        return axios.get(`http://${device}:8000/api/users`)
    }

    getOne() {
        return axios.get(`http://${device}:8000/api/users/20`)
    }

    getInventory() {
        return axios.get(`https://steamcommunity.com/id/sheguey667/inventory/json/730/2`)
    }
}

export default new UserService();