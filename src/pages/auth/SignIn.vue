<template>
  <InfoDialog
    :message="infoMsg"
    :show="showInfoDialog"
    :title="infoTitle"
    @close="closeDialog"
  />

  <LoadingDialog
    :show="showLoadingDialog"
    title="로그인 중.."
  />

  <v-container>
    <v-row class="mt-10" justify="center">
      <v-col cols="auto">
        <v-card class="signin-container" flat>
          <v-card-text class="text-center">
            <div>
              <img height="46px" src="@/assets/logo_saleser.png" width="128px">
            </div>
            <v-divider class="mt-5 mb-3" />
            <div>
              <v-icon icon="mdi-account" />
              <input
                v-model="userId"
                class="input-text"
                maxlength="16"
                placeholder="ID"
              >
            </div>
            <div>
              <v-icon icon="mdi-lock" />
              <input
                v-model="userPass"
                class="input-text"
                maxlength="16"
                placeholder="PASSWORD"
                type="password"
                @keyup.enter="onSignInClick"
              >
            </div>
            <v-divider class="mt-8" />
            <div>
              <v-btn
                class="mt-8"
                color="#003366"
                flat
                width="260"
                @click="onSignInClick"
              >
                로그인
              </v-btn>
            </div>
            <div class="link-container">
              <a @click="onFindPassClick"><span class="link-text">비밀번호찾기</span></a>
              <a @click="onRegistClick"><span class="link-text">회원가입</span></a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import InfoDialog from '@/components/dialogs/InfoDialog.vue';
  import LoadingDialog from '@/components/dialogs/LoadingDialog.vue';
  import router from '@/router';
  import { authApiStore } from '@/stores/authApiStore';

  // API store
  const apiStore = authApiStore();
  const { apiSignIn } = apiStore;

  const showLoadingDialog = ref<boolean>(false);

  const showInfoDialog = ref<boolean>(false);
  const infoTitle = ref<string>('로그인 에러');
  const infoMsg = ref<string>('Error');
  const closeDialog = () => {
    showInfoDialog.value = false;
  };

  const userId = ref<string>();
  const userPass = ref<string>();
  
  // router.push('/saleslist');
  const onSignInClick = async () => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,}$/;
    const passwordRegex = /^[a-zA-Z][a-zA-Z0-9]{7,}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    console.log('onSignInClick');

    if (!userId.value || usernameRegex.test(userId.value) !== true) {
      infoMsg.value = '아이디는 4자 이상 입력해주세요.';
      showInfoDialog.value = true;
      return;
    }

    if (!userPass.value || passwordRegex.test(userPass.value) !== true) {
      infoMsg.value = '비밀번호는 8자 이상 사용해주세요.';
      showInfoDialog.value = true;
      return;
    }

    showLoadingDialog.value = true;

    const response = await apiSignIn(userId.value, userPass.value);

    showLoadingDialog.value = false;
    if (response && response.status === 201) {
      router.push('/saleslist');
    } else {
      infoMsg.value = '로그인 중 에러가 발생하였습니다.';
      showInfoDialog.value = true;
    }
  };

  const onFindPassClick = () => {
    console.log('onFindPassClick');
  };

  const onRegistClick = () => {
    console.log('onRegistClick');
  };

</script>

<style scoped>
.signin-container {
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #EEEEEE;
  background-color: #FFFFFF;
  padding: 20px 35px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 33px;
}

.input-text {
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
  height: 40px;
  padding: 5px 10px;
  margin-top: 20px;
  margin-left: 28px;
}

.link-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;
}

.link-text {
  font-size: 12px;
  color: #003366;
  flex-shrink: 0;
  cursor: pointer;
}
</style>
