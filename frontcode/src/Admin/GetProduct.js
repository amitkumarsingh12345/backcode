import axios from "axios";

export const viewproductHandler = async () => {
    let data = await axios.get(`${window.location.origin}/api/v4/product/find`);
    data = data?.data;
    return data;
}
