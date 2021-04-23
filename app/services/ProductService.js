import axios from "axios";

const local = 'localhost'
const device = '192.168.1.8'

class AuctionService {
    getProduct(id) {
        return axios.get(`http://${device}:8000/api/products/${id}`)
    }
}

export default new AuctionService();