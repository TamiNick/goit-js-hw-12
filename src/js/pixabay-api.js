import axios from "axios";
const API_KEY = "52838885-6d116f44af4c58ac8463c8402";
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query,page) {
    const { data } = await axios(BASE_URL, { 
        params:  {
        key: API_KEY,
        q: query,
        mage_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page,
}});
    return data;
}