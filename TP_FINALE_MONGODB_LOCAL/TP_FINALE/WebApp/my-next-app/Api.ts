import { TestControlleurApi } from "./src/api/apis";
import { Configuration } from "./src/api/runtime";

export const API = new TestControlleurApi(
    new Configuration({
        basePath: "http://localhost:8080",
        credentials: "include"
    })
);