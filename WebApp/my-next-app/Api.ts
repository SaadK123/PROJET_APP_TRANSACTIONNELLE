import { TestControlleurApi } from "./src/api/generated/apis";

import { Configuration } from "./src/api/generated/runtime";

export const API = new TestControlleurApi(

    new Configuration({

        basePath: "http://localhost:8080",

        accessToken: () => localStorage.getItem("token") ?? ""

    })

);
