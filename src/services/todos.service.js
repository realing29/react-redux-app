import httpService from "./http.service";

const todosEndpoint = "todos/";

const todosService = {
  async fetch() {
    const { data } = await httpService.get(todosEndpoint, {
      params: { _page: 1, _limit: 10 },
    });
    return data;
  },
  async create(payload) {
    const { data } = await httpService.post(todosEndpoint, payload);
    return data;
  },
};

export default todosService;
