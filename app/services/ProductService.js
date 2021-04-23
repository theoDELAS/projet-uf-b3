import axios from "axios";

const local = 'localhost'
const device = '172.20.10.2'

class AuctionService {
    getProduct(id) {
        return axios.get(`http://${device}:8000/api/products/${id}`)
    }
}

export default new AuctionService();