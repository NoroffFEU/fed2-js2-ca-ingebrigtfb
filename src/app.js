import "./css/style.css";

import router from "./js/router";

import { setLogoutListener } from "./js/ui/global/logout";

setLogoutListener();

await router(window.location.pathname);
