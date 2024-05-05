import axios from "axios";
import Cookies from "js-cookie";

// const baseUrl = "https://api.tinytools.com.br/";
const baseUrl = "http://localhost:3001/";

const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}auth/login`, {
    username: username,
    password: password,
  });

  Cookies.set("tinytoolssession", response.data.access_token);

  return response.data;
};

const getItems = async () => {
  const config = getTokenConfig();
  const response = await axios.get(`${baseUrl}api/getItems`, config);

  return response.data;
};

const getIsActive = async () => {
  const config = getTokenConfig();
  const response = await axios.get(`${baseUrl}api/getIsActive`, config);

  return response.data;
};

const editIsActive = async (isActive) => {
  const config = getTokenConfig();
  const response = await axios.put(
    `${baseUrl}api/editIsActive?isActive=${isActive}`,
    null,
    config
  );

  return response.data;
};

const addItems = async (products) => {
  const config = getTokenConfig();
  const response = await axios.post(`${baseUrl}api/addItems`, products, config);

  return response.data;
};

const editItem = async (id, product) => {
  const config = getTokenConfig();
  const response = await axios.put(
    `${baseUrl}api/editItem?id=${id}`,
    {
      sku: product.sku,
      price: product.price,
      isActive: product.isActive,
      aliPrice: product.aliPrice,
      aliActive: product.aliActive,
      sheinPrice: product.sheinPrice,
      sheinActive: product.sheinActive,
      mercadoPrice: product.mercadoPrice,
      mercadoActive: product.mercadoActive,
      shopeePrice: product.shopeePrice,
      shopeeActive: product.shopeeActive,
    },
    config
  );

  return response.data;
};

const editApiKey = async (apiKey) => {
  const config = getTokenConfig();
  const response = await axios.put(
    `${baseUrl}api/editApiKey?apiKey=${apiKey}`,
    null,
    config
  );

  return response.data;
};

const editTinyAccount = async (username, password) => {
  const config = getTokenConfig();
  const response = await axios.put(
    `${baseUrl}api/editTinyAccount?username=${username}&password=${password}`,
    null,
    config
  );

  return response.data;
};

const deleteItem = async (id) => {
  const config = getTokenConfig();
  const response = await axios.delete(
    `${baseUrl}api/deleteItem?id=${id}`,
    config
  );

  return response.data;
};

const getUserKeys = async () => {
  const config = getTokenConfig();
  const response = await axios.get(`${baseUrl}api/getUserKeys`, config);

  return response.data;
};

const getTokenConfig = () => {
  const token = Cookies.get("tinytoolssession");

  const config = {};
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  return config;
};

const api = {
  login,
  getItems,
  editItem,
  deleteItem,
  addItems,
  getUserKeys,
  getIsActive,
  editIsActive,
  editApiKey,
  editTinyAccount,
};

export default api;
