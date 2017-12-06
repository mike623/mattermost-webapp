import axios from 'axios';

const baseUrl = 'http://localhost:9091';

export function createProject(channelId, projectData) {
    return axios.post(`${baseUrl}/projects`, {channelId, projectData});
};