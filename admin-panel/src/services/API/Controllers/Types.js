import axios from "axios";

export default class Types {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getAll = () => {
    return axios.get(`${this.baseUrl}/types`);
  };

  getAllAndAttributes = () => {
    return axios.get(`${this.baseUrl}/types/attributes`);
  };
}
