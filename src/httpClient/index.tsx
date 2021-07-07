import * as Axios from 'axios';

const axios = Axios.default.create({
    headers: {
        "Prigin": "https://synchthia-sounds.storage.googleapis.com",
        "Access-Control-Allow-Headers": "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET, PUT, DELETE, PATCH"
    }
});
axios.interceptors.request.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
)

export default axios;