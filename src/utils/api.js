import axios from "axios";
// 상황따라 주소 다름
// const BACKEND_URL = `${process.env.REACT_APP_BACKEND_PROXY}/api`; //netlify redirect용

const BACKEND_URL = process.env.REACT_APP_LOCAL_BACKEND+'/api';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
