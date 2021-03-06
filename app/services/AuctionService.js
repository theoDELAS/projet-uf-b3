import axios from "axios";

const local = 'localhost'
const device = '192.168.1.36'

class AuctionService {
    createAuction(data) {
        return axios.post(`http://${device}:8000/api/auctions`, data)
    }

    updateAuction(id, data) {
        return axios.patch(`http://${device}:8000/api/auctions/${id}`, data)
    }

    getAuction(id) {
        return axios.get(`http://${device}:8000/api/auctions/${id}`)
    }

    getAllAuctions() {
        return axios.get(`http://${device}:8000/api/auctions`)
    }
}

export default new AuctionService();