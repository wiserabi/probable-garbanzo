<template>
  <v-app-bar density="compact" flat height="80" style="border-bottom: 1px solid #EEEEEE !important;">
    <div class="app-bar-container">
      <div class="app-bar-left">
        <div class="logo-container">
          <img height="77px" src="@/assets/logo_aila.png" width="262px">
        </div>
        <div>
          <!-- <v-icon icon="mdi mdi-arrow-left-bold-circle" 
          width="30px" height="30px" size="x-large" color="#0048B2"/> -->
          <input v-model="searchText" class="search-text" @keydown.enter="onSearch">
        </div>
      </div>
      <div class="user-container">
        <v-row align="center" rows="2">
          <v-col class="d-flex align-center">
            <v-avatar>
              <img height="28px" src="@/assets/setting.png" width="28px;">
            </v-avatar>
            <v-avatar>
              <img height="45px" src="@/assets/user.png" width="45px;">
            </v-avatar>
          </v-col>
          <v-col class="user-info">
            <span class="user-name">{{ getUserName() }}</span>
            <span class="user-court">{{ getCourt() }}</span>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="line-container" />
  </v-app-bar>

  <v-navigation-drawer
    class="flat-drawer"
    width="234"
  >
    <v-row>
      <v-col>
        <span class="navi-home">HOME</span>
      </v-col>
    </v-row>
    <v-list class="mt-2" density="default" nav>
      <v-list-item
        v-for="(item, index) in menuList"
        :key="index"
        @click="onMenuSelect(index)"
        :class="{ 'selected-item': selectedMenuIndex === index }"
      >
        <v-list-item-title v-if="selectedMenuIndex === index">
          <v-icon v-if="item.icon.startsWith('mdi')" color="#FFFFFF" :icon="item.icon" />
          <span class="menu-selected-text">{{ item.text }}</span>
          <v-icon icon="mdi mdi-chevron-right" color="#FFFFFF"></v-icon>
        </v-list-item-title>
        <v-list-item-title v-else>
          <v-icon v-if="item.icon.startsWith('mdi')" color="#99ADC2" :icon="item.icon" />
          <span class="menu-text">{{ item.text }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import router from '@/router';
  import { authApiStore } from '@/stores/authApiStore';

  // API store
  const apiStore = authApiStore();
  const { getName, loadAuthInfo, apiVerifyToken } = apiStore;

  onMounted(async () => {
    // Get default infos
    loadAuthInfo();

    const verifyResult = await apiVerifyToken();
    if (verifyResult && verifyResult.status === 200) {
      //
    } else {
      console.log(`verifyResult: ${verifyResult}`);
      router.push('/auth/SignIn');
    }
  });

  const menuList = ref<{text: string, to: string, icon: string}[]>(
    [
      { text: '통계', to: '/salesstatus', icon: 'mdi-tune-variant' },
      { text: '사건관리', to: '/saleslist', icon: 'mdi-view-grid' },
      // { text: '정산관리', to: '/', icon: 'mdi-percent-box' },
      // { text: '거래처 관리', to: '/', icon: 'mdi-account-box' },
      // { text: '설정', to: '/', icon: 'mdi-cog' },
    ]);

  const searchText = ref<string>('');

  const getUserName = () => {
    return '하헌일';
  };

  const getCourt = () => {
    return '이강 법률사무소';
  };

  const selectedMenuIndex = ref<number>(0);

  const onMenuSelect = (index: number) => {
    console.log(`onMenuSelect: ${menuList.value[index].text}`);
    selectedMenuIndex.value = index;
    router.push(menuList.value[index].to);
  };

</script>

<style scoped>
.app-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.app-bar-left {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 80%;
}

.logo-container {
  text-align: center;
  width: 234px;
}

.menu-desc-container {
  justify-content: left;
}

.user-container {
  margin-right: 30px;
  justify-content: center;
  align-items: center;
}

.menu-1st {
  font-size: 16px;
  color: #777777;
}

.menu-2nd {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}

.line-container {
  width: 100%;
  height: 1px;
  flex: 1;
  background-color: #EEEEEE;
}

span {
  font-size: 14px;
  margin-left: 8px;
  color: #003366;
}

.menu-text {
  font-size: 16px;
  font-weight: 400;
  color: #99ADC2;
}

.menu-selected-text {
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
}

.flat-drawer {
  background-color: #F2F5F7; /* 배경색 설정 */
  padding: 16px; /* 내부 패딩 추가 (필요에 따라) */
  width: 234px;
  border-right: 0px;
}

.search-text {
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  font-size: 14px;
  width: 304px;
  height: 36px;
  padding: 5px 10px;
  margin-top: 10px;
  margin-left: 28px;
  background-image: url('@/assets/search.png');
  background-repeat: no-repeat;
}

.user-info {
  display: flex;
  flex-direction: column; /* Stack the elements vertically */
  text-align: left;
  width: 120px;
  padding: 4px;
}

.user-name {
  color: #232D42;
  font-size: 16px; /* Adjust font size as needed */
  text-align: left;
  margin-left: 0px;
}

.user-court {
  color: #8A92A6;
  font-size: 13px; /* Keep the font size for court information */
  font-family: 'Inter', sans-serif; /* Apply Inter font */
  font-weight: 400; /* Set font weight to 400 */
  text-align: left;
  margin-left: 0px;
}

.navi-home {
  width: 257px;
  height: 44px;
  font-size: 16px;
  color: #99ADC2;
  padding-left: 10px;
}

.selected-item {
  background-color: #3A57E8; /* Background color for selected item */
}
</style>
