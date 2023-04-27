import axios from "axios";

const fetchItemsRequest = axios.create({
  baseURL: "https://dummyjson.com",
});

export default fetchItemsRequest;
