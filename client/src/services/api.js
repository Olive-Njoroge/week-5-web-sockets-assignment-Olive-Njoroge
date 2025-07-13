import axios from 'axios';
import io from 'socket.io-client'

const backendBaseUrl = "http://localhost:5000";
const API_BaseUrl = "http://localhost:5000/api";

const API = axios.create({
    baseURL : API_BaseUrl
});

export const registerUser = (username) => {
    API.post("/auth/register", {username});
}

export const getRooms = () => {
    API.get("/rooms");
}

export const createRoom = (name) => {
    API.post("/rooms", {name});
}

export const getMessages = (roomId) => {
    API.get(`/messages/${roomId}`);
}

export const socket = io(backendBaseUrl, {autoconnect: false});

