import * as axios from 'axios';

export class HttpService {
  constructor() {
    this.http = axios.create({ baseURL: 'https://api.github.com/' });
  }

  async get(url, options) {
    const result = await this.http.get(url, options);
    return result.data;
  }
}

export default new HttpService();
