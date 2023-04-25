import axios from "axios";

const API_URL = "http://localhost:5000/api/queue/";

export const queueAPI = {

    getQueue: async () => {
        const response = await axios.get(`${API_URL}get`);
        return response.data;
    },

    takeTicket: async () => {
        const response = await axios.get(`${API_URL}enqueue`);
        return response.data;
    }

}

