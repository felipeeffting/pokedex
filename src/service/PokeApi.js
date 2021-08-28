import axios from 'axios';

const URL_BASE = 'https://pokeapi.co/api/v2';

export const getByPagination = () => {
  return axios.get(`${URL_BASE}/pokemon`, {
    params: {
      // todo: get params by function
      limit: 100,
      offset: 0,
    },
  })
};

export const getPokemonDetailByUrl = (url) => {
  return axios.get(url);
};
