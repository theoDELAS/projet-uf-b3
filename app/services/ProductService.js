import axios from "axios";

const local = 'localhost'
const device = '192.168.1.8'

class AuctionService {
    getProduct(id) {
        return axios.get(`http://${device}:8000/api/products/${id}`)
    }

<<<<<<< HEAD
    createProduct(data) {
        return axios.post(`http://${device}:8000/api/products/`, data)
=======
    postProduct(data) {
        return axios.post(`http://${device}:8000/api/products`, data)
>>>>>>> b6b0109b6e37b2c94a8e66cec29b129555e507ad
    }
}

export default new AuctionService();