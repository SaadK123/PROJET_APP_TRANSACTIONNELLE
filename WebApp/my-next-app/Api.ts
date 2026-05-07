import { TestControlleurApi,Configuration } from "./src/api"

export const API = new TestControlleurApi(new Configuration({
    basePath: 'http://localhost:8080',
    accessToken: () => localStorage.getItem('token') ?? ''
}));