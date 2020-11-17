import axios from "axios";

import Types from "./Controllers/Types";
import Memorials from "./Controllers/Memorials";

export default class API {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
    this.Types = new Types(this.baseUrl);
    this.Memorials = new Memorials(this.baseUrl);
  }
}
