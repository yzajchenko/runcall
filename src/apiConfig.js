import axios from "axios";

const baseURL = "http://test.runcall.ru/Api/";

const apiConfig = {
  baseURL,
  timeout: 100000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Pragma: "no-cache",
  },
  params: {},
};

export default axios.create(apiConfig);
