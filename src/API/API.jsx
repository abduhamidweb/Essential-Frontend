import axios from "axios";
const BASE_URL = "https://sapid.onrender.com";
const API = {
    getData: async (category) => {
        try {
            if (category) {
                if (category.toLowerCase().trim() == String("all Products").toLocaleLowerCase().trim()) {
                    const res = await axios.get(`${BASE_URL}/api/product`);
                    return res.data;
                } else {
                    const res = await axios.get(`${BASE_URL}/api/product?category=${category}`);
                    return res.data;
                }
            } else {
                const res = await axios.get(`${BASE_URL}/api/product`);
                return res.data;
            }
        } catch (error) {
            console.log('error :', error);
            return null;
        }
    },
    getDataByCategory: async (category) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/product?category=${category}`);
            return res.data;
        } catch (error) {
            console.log('error :', error);
            return null;
        }
    },
    getDataById: async (id) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/product?id=${id}`);
            return res.data;
        } catch (error) {
            console.log('error :', error);
            return null;
        }
    },
    postData: async (data) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/LINK`, data);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    putData: async (id, data) => {
        try {
            const res = await axios.put(`${BASE_URL}/api/LINK/${id}`, data);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteData: async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}/api/LINK/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default { API, BASE_URL };