import axios from "axios";
const BASEURL = import.meta.env.VITE_API_URL;

const Axios = axios.create({
  baseURL: BASEURL,
});

export default Axios;
