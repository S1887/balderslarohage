import axios from 'axios';

const API_URL = '/api';

const client = axios.create({
    baseURL: API_URL,
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('gq_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (username, pin) => {
    const response = await client.post('/auth/login', { username, pin });
    return response.data;
};

export const registerUser = async (username, pin) => {
    const response = await client.post('/auth/register', { username, pin });
    return response.data;
};

export const syncProgress = async (data) => {
    return client.post('/users/sync', data);
};

export const getHighscores = async () => {
    const response = await client.get('/highscores');
    return response.data;
};

// Multiplication game API
export const saveMultiplicationScore = async (username, mode, score, time, questions) => {
    const response = await client.post('/multiplication/score', {
        username,
        mode,
        score,
        time,
        questions
    });
    return response.data;
};

export const getMultiplicationHighscores = async (mode) => {
    const params = mode ? { mode } : {};
    const response = await client.get('/multiplication/highscores', { params });
    return response.data;
};

export const getMultiplicationBestScores = async (username) => {
    const response = await client.get(`/multiplication/best/${username}`);
    return response.data;
};

// Math game API
export const saveMathScore = async (username, mode, score, time, questions) => {
    const response = await client.post('/math/score', {
        username,
        mode,
        score,
        time,
        questions
    });
    return response.data;
};

export const getMathBestScores = async (username) => {
    const response = await client.get(`/math/best/${username}`);
    return response.data;
};

