import axios from "axios";

let URL;

if (process.env.NODE_ENV === "production") {
	URL = "https://progressor-web.herokuapp.com/api/";
} else {
	URL = "http://localhost:8000/api/";
}

export default axios.create({
	baseURL: URL,
});
