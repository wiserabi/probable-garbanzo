import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authApiStore } from '@/stores/authApiStore';

export const filesApiStore = defineStore('filesApiStore', () => {
  const authStore = authApiStore();
  const { getToken, getGid, getUid, getName } = authStore;

  const axiosConfig = {
    baseURL: import.meta.env.VITE_API_SERVER_URL,
  };
  const filesAxios = axios.create(axiosConfig);

  const filesApiResponse = ref<any>(null);

  const updateStatus = (res: any) => {
    filesApiResponse.value = res;
  };

  filesAxios.interceptors.request.use(
    config => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'multipart/form-data';
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  const apiGetFileInfo = async (id: number) => {
    try {
      const response = await filesAxios.get(`/files/get/${id}`);
      updateStatus(response);
      // console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while apiGetFileInfo:', err);
      updateStatus(err.response);
    }
    return filesApiResponse.value;
  };

  const apiUploadFile = async (attachedFile: any, category: string) => {
    try {
      const formData = new FormData();
      formData.append('gid', getGid().toString());
      formData.append('uid', getUid().toString());
      formData.append('saleser', getName());
      const blob = attachedFile.slice(0, attachedFile.size, attachedFile.type);
      const newFile = new File([blob], encodeURIComponent(attachedFile.name), {
        type: attachedFile.type,
      });
      formData.append('file', newFile);
      const response = await filesAxios.post(`/files/upload/${category}`, formData);
      updateStatus(response);
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while apiUploadFile:', err);
      updateStatus(err.response);
    }
    return filesApiResponse.value;
  };

  return {
    apiGetFileInfo,
    apiUploadFile,
  };
});
