
import axios from "axios";

export class ProductSDK {
  constructor(private baseUrl: string) {}

  getProducts(limit?: number, cursor?: string) {
    return axios.get(`${this.baseUrl}/products`, { params: { limit, cursor } })
      .then(r => r.data);
  }

  getProductById(id: string) {
    return axios.get(`${this.baseUrl}/products/${id}`).then(r => r.data);
  }

  getStats() {
    return axios.get(`${this.baseUrl}/api-stats`).then(r => r.data);
  }
}
