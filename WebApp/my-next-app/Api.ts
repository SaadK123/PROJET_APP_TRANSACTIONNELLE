import { TestControlleurApi,Configuration } from "./src/api"

export const API = new TestControlleurApi(new Configuration({
    basePath: 'https://linkup-n9cw.onrender.com',
    accessToken: () => localStorage.getItem('token') ?? ''
}));