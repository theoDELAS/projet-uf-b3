import axios from "axios";

const local = 'localhost'
const device = '192.168.1.8'

class AuctionService {
    createAuction(data) {
        return axios.post(`http://${device}:8000/api/auctions`, data)
    }

    getAuction(id) {
        return axios.get(`http://${device}:8000/api/auctions/${id}`)
    }
}

export default new AuctionService();