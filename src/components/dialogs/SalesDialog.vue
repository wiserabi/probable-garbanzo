<!-- eslint-disable vue/valid-v-model -->
<template>
  <ConfirmDialog
    :message="confirmMsg"
    :show="showConfirmDialog"
    :title="confirmTitle"
    @close="closeConfirmDialog"
  />

  <InfoDialog
    :message="infoMsg"
    :show="showInfoDialog"
    :title="infoTitle"
    @close="closeInfoDialog"
  />

  <ErrorDialog
    :message="errorMsg"
    :show="showErrorDialog"
    :title="errorTitle"
    @close="closeErrorDialog"
  />

  <LoadingDialog
    :show="showLoadingDialog"
    title="문서 분석 중.."
  />

  <v-dialog v-model="props.show" @keydown.esc="closeDialog">
    <div class="sales-container">
      <div class="left-container">
        <v-row>
          <v-col align="center">
            <v-icon 
            icon="mdi-chevron-left-circle-outline"
            color="#999999"
            size="x-large"
            class="icon-arrow">
            </v-icon>
          </v-col>
          <v-col align="center">
            <img class="avatar-img" src="@/assets/avatar.png" />
          </v-col>
          <v-col align="center">
            <v-icon 
            icon="mdi-chevron-right-circle-outline"
            color="#999999"
            size="x-large"
            class="icon-arrow">
            </v-icon>
          </v-col>
        </v-row>
        <v-row dense justify="center" style="margin-top: 20%;">
          <v-col align="center">
            <span class="dialog-title">
              신규 사건 등록
            </span>
          </v-col>
        </v-row>
        <v-row dense justify="center">
          <v-col align="center">
            <span class="dialog-content">
              신규 사건을 등록합니다.
            </span>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col align="center">
            <span class="dialog-content">
              채무자의 기본정보를 입력해주세요
            </span>
          </v-col>
        </v-row>

      </div>
      <div class="right-container">
        <v-row>
          <v-col offset="11">
            <v-icon 
            class="mdi mdi-close close-btn"
            size="x-small" 
            @click="closeDialog"/>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="4">
            <span class="span-sm-1">사건관리번호 </span>
            <span class="span-sm-2">{{ caseManageNum }}</span>
          </v-col>
          
          <v-col cols="3" offset="5">
            <div class="inner-shadow-wrapper">
              <v-btn
                :color="!caseData.business ? '#0048B2' : '#FFFFFF'"
                height="36px"
                width="62px"
                @click="toggleType"
                flat
                outlined
              >
                <span :class="!caseData.business ? 'text-white' : 'text-business'">개인</span>
              </v-btn>
              <v-btn
                :color="caseData.business ? '#0048B2' : '#FFFFFF'"
                height="36px"
                width="77px"
                @click="toggleType"
                flat
                outlined
              >
                <span :class="caseData.business ? 'text-white' : 'text-business'">사업자</span>
              </v-btn>
            </div>
          </v-col>
          
        </v-row>

        <v-row>
          <v-col cols="1">
            <span class="subtitle">
              이름<span class="reddot">*</span>
            </span>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="4">
            <input v-model="caseData.applicant" class="input-text" placeholder="">
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="4">
            <span class="subtitle">
              전화번호<span class="reddot">*</span>
            </span>
          </v-col>
          <v-col cols="4">
            <span class="subtitle">
              주민등록번호
            </span>
          </v-col>
          <v-col cols="4">
            <span class="subtitle">
              이메일
            </span>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="4">
            <input v-model="caseData.phone" class="input-text" placeholder="010-0000-0000">
          </v-col>
          <v-col cols="4">
            <input v-model="caseData.inum" class="input-text" placeholder="000000-0000000">
          </v-col>
          <v-col cols="4">
            <input v-model="caseData.email" class="input-text" placeholder="username@example.com">
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="auto">
            <span class="subtitle">주소</span>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="9">
            <input 
                v-model="caseData.address" 
                style="width: 675px;" 
                class="input-text" placeholder="">
          </v-col>
          <!-- <v-col offset="1">
            <v-btn
                class="mr-8 mb-3"
                color="#003366"
                variant="outlined"
                height="40px"
                width="108px"
                flat
                @click="onRegist(0)"
              >
                주소검색
                <v-icon icon="mdi-magnify"></v-icon>
            </v-btn>
          </v-col> -->
        </v-row>

        <v-row dense>
          <v-col cols="auto">
            <span class="subtitle">메모</span>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="auto">
            <v-textarea
              height="85px"
              width="675px"
              color="white"
              bg-color="white"
              variant="outlined"
              auto-grow
              v-model=caseData.memo
            >
            </v-textarea>
          </v-col>
        </v-row>

        <v-row dense class="save-container">
          <!--<v-btn
            border
            class="btn-save"
            flat
            @click="closeDialog"
          >
            닫기
          </v-btn>-->
          <v-col align="end">
            <v-btn
              v-if="props.addNew"
              class="btn-save"
              color="#0048B2"
              flat
              @click="checkInput"
            >
              저장
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <span style="color: #999999;">담당자: {{ manager }}</span>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
  import 'flatpickr/dist/flatpickr.css';
  // import { CustomLocale } from 'flatpickr/dist/types/locale';
  // import { Korean } from 'flatpickr/dist/l10n/ko';
  import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
  import InfoDialog from './InfoDialog.vue';
  import ErrorDialog from './ErrorDialog.vue';
  import LoadingDialog from './LoadingDialog.vue';
  import { Case } from '@/interfaces/CaseInterface';
  import { salesApiStore } from '@/stores/salesApiStore';
  // import { datetimeToyymmdd, datetimeToyymmddByDate, datetimeToyyyymmddByDate, getLastDayOfMonth, numToCommaString } from '@/composables/utils';
  import { authApiStore } from '@/stores/authApiStore';

  const authStore = authApiStore();
  const { getManagerName, getManagerId } = authStore;

  // API store
  const apiStore = salesApiStore();
  const { apiSaveCase } = apiStore;

  const props = defineProps({
    show: Boolean,
    selectedCase: {
      type: Object as PropType<Case | null>,
      default: null
    },
    addNew: Boolean,
    maxCaseSeq: Number,
  });

  const emit = defineEmits<{
    (e: 'update', value: boolean): void
    (e: 'close'): void
  }>();

  // Function to toggle between 사업자 and 개인
  const toggleType = () => {
    caseData.value.business = caseData.value.business ? 0 : 1;
  };

  const manager = getManagerName();
  const currentYear: string = new Date().getFullYear().toString();
  const caseManageNum = ref<string>('');

  const defaultCase = {case_seq: '',
                      managerid: '',
                      applicant: '',
                      phone: '',
                      address: '',
                      email: '',
                      memo: '',
                      business: 0};
  const caseData = ref<Case>(JSON.parse(JSON.stringify(defaultCase)));

  const initData = () => {
    updated.value = false;

    if (props.selectedCase) {
      caseData.value = { ...props.selectedCase };
    } else {
      // Reset to default values if no case is selected
      caseData.value = JSON.parse(JSON.stringify(defaultCase));
    }

    if(caseData.value.case_seq){
      caseManageNum.value = currentYear + "-" + getManagerId() + "-" + caseData.value.case_seq;
    }
    else if(props.maxCaseSeq){
      caseManageNum.value = currentYear + "-" + getManagerId() + "-" + (props.maxCaseSeq + 1).toString();
    }
  };

  // 화면 로딩
  watch(() => props.show, async (newFlag, oldFlag) => {
    console.log(`CaseDialog watch props.show: ${oldFlag} -> ${newFlag}`);
    if (newFlag && !oldFlag) {
      initData();
    }
  });

  const checkInput = () => {
    if (!caseData.value.applicant || caseData.value.applicant.length < 2) {
      errorTitle.value = '고객사명 입력필요';
      errorMsg.value = '2 글자 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    }
    if (!caseData.value.phone || caseData.value.phone.length < 11) {
      errorTitle.value = '고객사명 전화번호 입력필요';
      errorMsg.value = '11 글자 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    }

    confirmTitle.value = '신규 사건 등록';
    confirmMsg.value = '입력된 정보를 저장하고 신규로 등록하시겠습니까?';
    showConfirmDialog.value = true;
  };

  const updated = ref<boolean>(false);
  const closeDialog = () => {
    emit('update', updated.value);
  };

  const saveCaseData = async () => {
    showConfirmDialog.value = false;

    const sendData = {
        "managerid": "dsshin",
        "data": [caseData.value]
    };

    console.log(`sendData: ${JSON.stringify(sendData)}`);

    const response = await apiSaveCase(sendData);

    if (!response || response.status !== 201) {
      errorTitle.value = '사건관리 저장';
      errorMsg.value = '저장 중 문제가 발생했습니다.';
      showErrorDialog.value = true;
    } else {
      infoTitle.value = '사건관리 저장';
      infoMsg.value = '저장이 완료되었습니다.';
      showInfoDialog.value = true;

      updated.value = true;

      if (response.data && response.data.id) {
        caseData.value = response.data;
        console.log(`Saved ID: ${caseData.value.case_seq}`);
      }

      emit('close');
    }
  };

  // Loading Dialog
  const showLoadingDialog = ref<boolean>(false);

  // Confirm Dialog
  const showConfirmDialog = ref<boolean>(false);
  const confirmTitle = ref<string>('사건등록');
  const confirmMsg = ref<string>('진행할까요?');
  const closeConfirmDialog = (answer: boolean) => {
    if (answer && showConfirmDialog.value) {
      showConfirmDialog.value = false;
      saveCaseData();
    } else {
      showConfirmDialog.value =  false;
    }
  };

  // Info Dialog
  const showInfoDialog = ref<boolean>(false);
  const infoTitle = ref<string>('영업관리 저장');
  const infoMsg = ref<string>('저장 되었습니다.');
  const closeInfoDialog = () => {
    showInfoDialog.value = false;
  };

  // Error Dialog
  const showErrorDialog = ref<boolean>(false);
  const errorTitle = ref<string>('영업관리 저장');
  const errorMsg = ref<string>('저장 중 문제가 발생했습니다.');
  const closeErrorDialog = () => {
    showErrorDialog.value = false;
  };
</script>

<style scoped>
  span {
    font-size: 14px;
  }

  .sales-container {
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  .left-container {
    border-radius: 8px 0px 0px 8px;
    background-image: url('@/assets/dialog_left.png'); /* Set the background image */
    background-size: cover; /* Cover the entire container */
    width: 405px;
    height: 687px;
    padding-top: 10%;
  }

  .right-container {
    border-radius: 0px 8px 8px 0px;
    background-color: #FFFFFF;
    width: 775px;
    height: auto;
    max-height: 991px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    overflow-y: auto;
  }

  span.title {
    font-size: 16px;
    font-weight: bold;
  }

  .step-container {
    width: 127;
    margin-top: 15px;
  }

  .one-step-container {
    margin-top: 5px;
  }

  span.current-text {
    font-size: 16px;
    font-weight: 500;
    color: #003366;
  }

  span.next-text {
    font-size: 16px;
    color: #999999;
  }

  span.desc {
    font-size: 13px;
    color: #999999;
  }

  .vertical-dotted-line {
    width: 0px;
    height: 30px;
    border-right: 1px dotted #999999;
  }

  .close-btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }

  .form-container {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 10px;
    border-bottom: 1px solid #EEEEEE;
  }

  .info-title-container {
    display: flex;
    align-items: flex-end;
  }

  span.info-code {
    font-size: 14px;
    color: #777777;
    margin-left: 20px;
  }

  span.info-code-value {
    font-size: 14px;
    color: #999999;
    margin-left: 10px;
  }

  .table-form {
    width: 100%;
    margin-top: 15px;
    border-collapse: collapse;
  }

  .table-form th {
    text-align: left;
    font-size: 14px;
    width: 220px;
    border-bottom: 0px;
  }

  .table-form td {
    text-align: left;
    font-size: 14px;
    border-bottom: 0px;
  }

  .table-container {
    margin-top: 5px;
  }

  .table-purchase {
    width: 100%;
    border-collapse: separate; /* 셀 테두리를 분리 */
    border-spacing: 0; /* 셀 사이의 간격을 0으로 설정 */
    border-radius: 8px; /* 테이블 외곽에 반지름 적용 */
    border: 1px solid #EEEEEE; /* 테이블 테두리 */
    border-bottom: 0px;
    background-color: #003366;
  }
  .table-purchase tbody tr {
    background-color: #FFFFFF;
    color: #333333;
  }
  .table-purchase th, td {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #EEEEEE;
    padding-top: 10px;
    padding-bottom: 10px;
    height: 48px;
  }
  .table-purchase th {
    text-align: center;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 400;
  }
  .table-purchase td {
    text-align: center;
    justify-content: center;
    font-size: 12px;
  }

  span.purchase-text {
    font-size: 12px;
  }

  .input-text {
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    background-color: #ffffff;
    font-size: 14px;
    width: 205px;
    height: 40px;
    padding: 5px 10px;
  }

  .detail-container {
    width: 100%;
    text-align: right;
    margin-top: 10px;
    padding-right: 40px;
  }

  .detail-container:hover {
    cursor: pointer;
  }

  .detail-container-show {
    margin-top: 10px;
  }

  .detail-container-show:hover {
    cursor: pointer;
  }

  .upload-container-show {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
    padding-right: 40px;
  }

  span.detail-setting {
    font-weight: 500;
  }

  .paydata-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 15px;
  }

  .history-container {
    padding-top: 20px;
    padding-bottom: 15px;
    padding-left: 30px;
    padding-right: 20px;
  }

  .btn-history {
    border: 1px solid #003366;
    border-radius: 4px;
    height: 40px;
    width: 130px;
  }

  .save-container {
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    text-align: end;
    border-bottom: 1px solid #EEEEEE;
  }

  .btn-save {
    border-radius: 4px;
    font-size: 14px;
    width: 65px;
    height: 40px;
    padding: 8px 10px;
  }

  .btn-ctr {
    border-radius: 4px;
    font-size: 12px;
    width: 53px;
    height: 29px;
    padding: 5px 16px;
  }

  .bottom-container {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
  }

  select {
    width: 150px;
    height: 32px;
    padding: 5px 10px;
    font-size: 12px;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    background-color: #ffffff;
    color: #333;
    appearance: none; /* 기본 브라우저 스타일 제거 */
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE2IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWw3IDcgNy03IiBzdHJva2U9IiM3QTdBN0EiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+');
    background-repeat: no-repeat;
    background-position: right 10px center;
    cursor: pointer;
  }

  .custom-datepicker {
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    padding: 5px 10px;
    width: 205px;
    height: 40px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .left-container .dialog-title {
    font-size: 20px;
    font-family: 'Pretendard';
    font-weight: 600;
    color: #FFFFFF;
    text-align: start;
  }

  .left-container .dialog-content {
    font-size: 16px;
    font-family: 'Pretendard';
    font-weight: 500;
    color: #DDDDDD;
    text-align: start;
  }

  .left-container .avatar-img {
    width: 122px;
    height: 122px;
  }

  .left-container .icon-arrow {
    width: 36px;
    height: 36px;
    top: 35%;
  }

  .span-sm-1 {
    font-family: "Abhaya Libre";
    font-weight: 700;
    font-size: 14px;
    color: #777777;
  }

  .span-sm-2 {
    font-family: "Abhaya Libre";
    font-weight: 400;
    font-size: 14px;
    color: #999999;
  }

  .text-business {
    color: #0048B2;
  }

  .text-white {
    color: #FFFFFF;
  }

  span.subtitle {
    font-family: "Abhaya Libre";
    font-size: 14px;
    font-weight: bold;
  }

  span.reddot {
    font-size: 14px; 
    color: #EF0040;
  }

  .inner-shadow-wrapper {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    width: 153px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-radius: 4px;
  }

  .inner-shadow-wrapper .v-btn {
    margin: 0 1px; /* Adds a small gap between buttons */
  }
</style>
