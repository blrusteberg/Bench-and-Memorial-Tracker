import axios from "axios";

export default class Types {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  get = (paths) => {
    return axios.get(`${this.baseUrl}/types/${paths.join("/")}`);
  };
}
