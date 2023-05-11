import BaseClient from "./BaseClient";

const client = new BaseClient("/api");
export const apiClient = {
    herder: {
        queue: {
            get: client.get('/herder/queue/'),
        },
        active: {
            get: client.get('/herder/active/'),
        },
        finished: {
            get: client.get('/herder/finished/'),
        }
    }
};
export default apiClient;