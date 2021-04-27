import axios from "axios";

const local = 'localhost'
const device = '192.168.1.36'

class AuctionService {
    getProduct(id) {
        return axios.get(`http://${device}:8000/api/products/${id}`)
    }

    createProduct(data) {
        return axios.post(`http://${device}:8000/api/products/`, data)
    }
    postProduct(data) {
        return axios.post(`http://${device}:8000/api/products`, data)
    }
}

export default new AuctionService();