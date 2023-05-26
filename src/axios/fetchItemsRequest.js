import axios from "axios";

const fetchItemsRequest = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    Accept: "application/json",
  },
});

export default fetchItemsRequest;
