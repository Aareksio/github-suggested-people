import httpService from './HttpService';

export class SuggestedPeopleService {
  constructor(httpService) {
    this.http = httpService;
  }

  get(since = 1) {
    return this.http.get('/users', { params: { since } });
  }
}

export default new SuggestedPeopleService(httpService);
