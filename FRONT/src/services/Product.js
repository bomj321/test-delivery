import axios from "axios";
import environment from "../libs/environment";

export default {
  getProducts: (number = 1, size = 5) =>
    axios({
      method: "GET",
      url: `${environment.baseUrl}/products/${number}/${size}`,
    }),

  editProduct: (id) =>
    axios({
      method: "PUT",
      url: `${environment.baseUrl}/products/${id}`,
    }),
};
