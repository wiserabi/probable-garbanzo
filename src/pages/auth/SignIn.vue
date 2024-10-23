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
      <v-col cols="auto" class="dense-col">
        <img src="@/assets/login_left.png"/>
      </v-col>
      <v-col cols="auto" class="dense-col">
        <v-card class="signin-container" flat>
          <v-card-text class="text-center">
            <v-row style="margin-top: 50px;">
              <span class="title">User Login</span>
            </v-row>
            <v-row style="margin-top: 15%;">
              <span class="sub-title">E-mail</span>
            </v-row>
            <v-row>
              <v-col cols="auto">
                <input
                  v-model="userId"
                  class="input-text"
                  maxlength="16"
                >
              </v-col>
            </v-row>
            <v-row>
              <span class="sub-title">Password</span>
            </v-row>
            <v-row>
              <v-col cols="auto">
                <input
                  v-model="userPass"
                  class="input-text"
                  maxlength="16"
                  type="password"
                  @keyup.enter="onSignInClick"
                >
              </v-col>
              <v-col cols="auto">
                <v-btn
                  color="#0048B2"
                  width="73"
                  height="40"
                  density="default"
                  @click="onSignInClick"
                >
                <span class="login-txt">Login</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="auto">
                <v-checkbox
                  v-model="saveAccount"
                  label="계정 저장"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row style="margin-top: 12%;" justify="end">
              <v-col cols="auto">
                <a @click="onFindPassClick"><span class="link-text">비밀번호찾기</span></a>
              </v-col>
              <v-divider vertical class="mx-2" color="#999999"></v-divider>
              <v-col cols="auto">
                <a @click="onRegistClick"><span class="link-text">회원가입</span></a>
              </v-col>
            </v-row>

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
  import { onMounted } from 'vue';
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
  const saveAccount = ref<boolean>(false);
  
  onMounted(() => {
    // Retrieve saved credentials when component mounts
    const savedUserId = localStorage.getItem('savedUserId');
    const savedSaveAccount = localStorage.getItem('savedSaveAccount');

    if (savedUserId && savedSaveAccount === 'true') {
      userId.value = savedUserId;
      saveAccount.value = true;
    }
  });

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
      // Save credentials if checkbox is checked
      if (saveAccount.value) {
        localStorage.setItem('savedUserId', userId.value);
        localStorage.setItem('savedSaveAccount', 'true');
      } else {
        // Clear saved credentials if checkbox is unchecked
        localStorage.removeItem('savedUserId');
        localStorage.removeItem('savedSaveAccount');
      }
      router.push('/caselist');
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
  border-radius: 0px 8px 8px 0px;
  border: 1px solid #EEEEEE;
  background-color: #FFFFFF;
  padding: 20px 35px;
  height: 500px;
  width: 464px;

  margin-left: 0px;

}

.input-text {
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
  height: 40px;
  padding: 5px 10px;
  margin-left: 8px;
}

.link-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;
}

.link-text {
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  flex-shrink: 0;
  cursor: pointer;
}

.dense-col {
  padding: 0px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-left: 20px;
}

.sub-title {
  font-family: "Abhaya Libre";
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
  color: #999999;
}

.login-txt {
  font-family: "Abhaya Libre";
  font-size: 14px;
  font-weight: 400;
  color:#FFFFFF;
  text-transform: none;
}
</style>
