import axios from "axios";

export default class Memorials {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  get = (paths) => {
    return axios.get(`${this.baseUrl}/types/${paths.join("/")}`);
  };
}
