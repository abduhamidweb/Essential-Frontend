import axios from "axios";
const BASE_URL = "http://localhost:5000";
const API = {
    getDataBook: async () => {
        try {
            const headers = {
                'Content-Type': 'application/json', // Muhim: Kerakli tahlil bilan almashtiring
                'token': localStorage.getItem("token") // Kerakli autentifikatsiya xati bilan almashtiring
            };
            const res = await axios.get(`${BASE_URL}/api/books`, { headers });
            return res.data;
        } catch (error) {
            console.log('error :', error);
            return null;
        }
    },
    getDataUnits: async () => {
        try {
            const headers = {
                'Content-Type': 'application/json', // Muhim: Kerakli tahlil bilan almashtiring
                'token': localStorage.getItem("token") // Kerakli autentifikatsiya xati bilan almashtiring
            };
            const res = await axios.get(`${BASE_URL}/api/units`, { headers });
            return res.data;
        } catch (error) {
            console.log('error :', error);
            return null;
        }
    },
    getDataById: async (id) => {
        const headers = {
            'Content-Type': 'application/json', // Muhim: Kerakli tahlil bilan almashtiring
            'token': localStorage.getItem("token") // Kerakli autentifikatsiya xati bilan almashtiring
        };
        try {
            const res = await axios.get(`${BASE_URL}/api/books/${id}`, { headers });
            return res.data;
        } catch (error) {
            console.log('error :', error);
            return null;
        }
    },
    postUser: async (data) => {
        const headers = {
            'Content-Type': 'application/json', // Muhim: Kerakli tahlil bilan almashtiring
            'token': localStorage.getItem("token") // Kerakli autentifikatsiya xati bilan almashtiring
        };
        try {
            const res = await axios.post(`${BASE_URL}/api/users`, data, { headers });
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    postStartPlay: async (data) => {
        const headers = {
            'Content-Type': 'application/json', // Muhim: Kerakli tahlil bilan almashtiring
            token: localStorage.getItem("token") // Kerakli autentifikatsiya xati bilan almashtiring
        };
        try {
            const res = await axios.post(`${BASE_URL}/api/start`, data, { headers });
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    postEndPlay: async (data) => {
        const headers = {
            'Content-Type': 'application/json', // Muhim: Kerakli tahlil bilan almashtiring
            token: localStorage.getItem("token") // Kerakli autentifikatsiya xati bilan almashtiring
        };
        try {
            const res = await axios.post(`${BASE_URL}/api/end`, data, { headers });
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    putData: async (id, data) => {
        const headers = {
            'Content-Type': 'application/json', // Muhim: Kerakli tahlil bilan almashtiring
            'token': localStorage.getItem("token") // Kerakli autentifikatsiya xati bilan almashtiring
        };
        try {
            const res = await axios.put(`${BASE_URL}/api/LINK/${id}`, data, { headers });
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteData: async (id) => {
        const headers = {
            'Content-Type': 'application/json', // Muhim: Kerakli tahlil bilan almashtiring
            'token': localStorage.getItem("token") // Kerakli autentifikatsiya xati bilan almashtiring
        };
        try {
            const res = await axios.delete(`${BASE_URL}/api/LINK/${id}`, { headers });
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default { API, BASE_URL };