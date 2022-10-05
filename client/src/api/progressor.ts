import axios from "axios";

let URL = "http://localhost:8000/api/";

export default axios.create({
  baseURL: URL,
});