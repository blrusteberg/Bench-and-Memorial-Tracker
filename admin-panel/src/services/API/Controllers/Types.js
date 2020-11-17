import axios from "axios";

export default class Types {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  get = (path) => {
    return axios.get(`${this.baseUrl}/memorials/${path.join("/")}`);
  };

  put = (path) => {
    return axios.put(`${this.baseUrl}/memorials/${path.join("/")}`);
  };

  post = (path, memorial) => {
    return axios.put(`${this.baseUrl}/memorials/${path.join("/")}`, memorial);
  };
}
