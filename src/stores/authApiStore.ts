import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IUserInfo {
  id: number;
  gid: number;
  level: number;
}

interface ITokenInfo {
  username: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export const authApiStore = defineStore('authApiStore', () => {
  const apiToken = ref<string | null>();
  const tokenInfo = ref<ITokenInfo>();

  const userInfo = ref<IUserInfo>();

  const axiosConfig = {
    baseURL: import.meta.env.VITE_API_SERVER_URL,
  };
  const authAxios = axios.create(axiosConfig);

  const authApiResponse = ref<any>(null);

  const updateStatus = (res: any) => {
    authApiResponse.value = res;
  };

  const updateToken = (token: string) => {
    apiToken.value = token;
    localStorage.setItem('token', apiToken.value);
  };

  const updateTokenInfo = (info: ITokenInfo) => {
    tokenInfo.value = info;
    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo.value));
  };

  const updateUserInfo = (info: IUserInfo) => {
    userInfo.value = info;
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value));
  };

  const getToken = () => {
    return apiToken.value;
  };

  const getGid = () => {
    if (userInfo.value) {
      return Number(userInfo.value.gid);
    } else {
      return 0;
    }
  };

  const getUid = () => {
    if (userInfo.value) {
      return Number(userInfo.value.id);
    } else {
      return 0;
    }
  };

  const getUserName = () => {
    if (tokenInfo.value) {
      return tokenInfo.value.username;
    } else {
      return '';
    }
  };

  const getName = () => {
    if (tokenInfo.value) {
      return tokenInfo.value.name;
    } else {
      return '';
    }
  };

  const loadAuthInfo = () => {
    apiToken.value = localStorage.getItem('token');
    console.log(`apiToken: ${apiToken.value}`);

    const tInfo = localStorage.getItem('tokenInfo');
    if (tInfo) {
      tokenInfo.value = JSON.parse(tInfo);
      console.log(`tokenInfo: ${tInfo}`);
    }

    const uInfo = localStorage.getItem('userInfo');
    if (uInfo) {
      userInfo.value = JSON.parse(uInfo);
      console.log(`userInfo: ${uInfo}`);
    }
  };

  const apiSignIn = async (username: string, pass: string) => {
    try {
      const response = await authAxios.post('/auth/signin', { username, pass });
      updateStatus(response);
      console.log(response.data);
      if (response.status === 201 && response.data.token) {
        updateToken(response.data.token);
        updateUserInfo(response.data.info);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while signin:', err);
      updateStatus(err.response);
    }
    return authApiResponse.value;
  };

  const apiVerifyToken = async () => {
    if (!apiToken.value) {
      return null;
    }
    if (tokenInfo.value && tokenInfo.value.iat >= tokenInfo.value.exp) {
      return null;
    }

    try {
      const response = await authAxios.get('/auth/verify',
        {
          headers: { Authorization: 'Bearer ' + apiToken.value },
        }
      );
      updateStatus(response);
      tokenInfo.value = response.data;
      if (tokenInfo.value) {
        updateTokenInfo(tokenInfo.value);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error('Error while verity:', err);
      updateStatus(err.response);
    }
    return authApiResponse.value;
  };

  return {
    apiToken,
    tokenInfo,
    userInfo,
    loadAuthInfo,
    apiSignIn,
    apiVerifyToken,
    getToken,
    getGid,
    getUid,
    getUserName,
    getName,
  };
});
