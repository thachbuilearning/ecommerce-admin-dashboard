import axios from "axios";

const BASE_URL = "https://ecommerce-backendapi-p6ga.onrender.com/api/";

const getAccessTokenFromLocalStorage = () => {
    try {
        const persistedState = JSON.parse(localStorage.getItem("persist:root"));
        if (!persistedState?.currentUser) return null;

        const currentUser = JSON.parse(persistedState.currentUser);
        return currentUser?.accessToken || null;
    } catch (error) {
        console.error("Error getting accessToken from localStorage:", error);
        return null;
    }
};

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
});

userRequest.interceptors.request.use((config) => {
    const token = getAccessTokenFromLocalStorage();

    if (token) {
        config.headers.accessToken = token;
    }

    return config;
});

