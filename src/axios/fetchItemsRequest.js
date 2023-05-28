import axios from "axios";
import { URL } from "../helper";

const fetchItemsRequest = axios.create({
  baseURL: URL,
  headers: {
    Accept: "application/json",
  },
});

export default fetchItemsRequest;
