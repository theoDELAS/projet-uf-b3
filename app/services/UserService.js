import axios from "axios";

const local = 'localhost'
const device = '192.168.1.36' 

const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "http://http://localhost:19006/",
        "Access-Control-Allow-Methods": "*"
    },// some legacy browsers (IE11, various SmartTVs) choke on 204
}

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
        return axios.get(`https://steamcommunity.com/id/sheguey667/inventory/json/730/2`, cors(corsOptions))
    }
}

export default new UserService();