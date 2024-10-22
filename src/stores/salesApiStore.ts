import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authApiStore } from '@/stores/authApiStore';

export const salesApiStore = defineStore('salesApiStore', () => {
  const authStore = authApiStore();
  const { getToken, getGid, getUid, getName, getManagerId } = authStore;

  const axiosConfig = {
    baseURL: import.meta.env.VITE_API_SERVER_URL,
  };
  const salesAxios = axios.create(axiosConfig);

  const salesApiResponse = ref<any>(null);

  const updateStatus = (res: any) => {
    salesApiResponse.value = res;
  };

  salesAxios.interceptors.request.use(
    config => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  const apiCaseList = async (query: string) => {
    try {
      const managerId = getManagerId();
      const response = await salesAxios.get(`/caselist/${managerId}?${query}`);
      updateStatus(response);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while apiCaseList:', err);
      updateStatus(err.response);
    }
    return salesApiResponse.value;
  };

  const apiGetById = async (id: number) => {
    try {
      const response = await salesAxios.get(`/sales/get/${id}`);
      updateStatus(response);
      // console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while signin:', err);
      updateStatus(err.response);
    }
    return salesApiResponse.value;
  };

  const apiSaveCase = async (data: any) => {
    try {
      const response = await salesAxios.post(`/caselist/add`, data);
      updateStatus(response);
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while apiSaveSales:', err);
      updateStatus(err.response);
    }
    return salesApiResponse.value;
  };

  const apiUpdateCase = async (data: any) => {
    try {
      const response = await salesAxios.post(`/caselist/update`, data);
      updateStatus(response);
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while apiSaveSales:', err);
      updateStatus(err.response);
    }
    return salesApiResponse.value;
  };

  const apiAddSalesHistory = async (srcid: number, comment: string) => {
    try {
      const data = { src: 'sales', srcid, name: getName(), comment };
      const response = await salesAxios.post(`/history/create`, data);
      updateStatus(response);
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while apiAddSalesHistory:', err);
      updateStatus(err.response);
    }
    return salesApiResponse.value;
  };

  return {
    apiCaseList,
    apiGetById,
    apiAddSalesHistory,
    apiSaveCase,
    apiUpdateCase,
  };
});
