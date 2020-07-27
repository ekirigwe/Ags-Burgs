import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactburger-1401b.firebaseio.com/",
});

export default instance;
