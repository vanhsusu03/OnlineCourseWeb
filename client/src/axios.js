import axios from "axios";

window.axios = axios;

axios.defaults.withCredentials = false;

let serverUrl = "http://" + window.location.hostname.toString() + ":3000/";
axios.defaults.baseURL = serverUrl;

export default serverUrl;