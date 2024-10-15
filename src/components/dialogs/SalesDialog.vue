<!-- eslint-disable vue/valid-v-model -->
<template>
  <ConfirmDialog
    :message="confirmMsg"
    :show="showConfirmDialog || showPurchaseDeleteDialog"
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

  <PurchaseDialog
    :name="props.name"
    :pdata="purchaseData[selectedPurchaseIndex]"
    :show="showPurchaseDialog"
    @close="closePurchaseDialog"
    @create="createPurchase"
    @update="updatePurchase"
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
            <span class="span-sm-2">{{ caseData.casenum }}</span>
          </v-col>

          <v-col cols="1" offset="5">
            <v-btn
                class="mr-8 mb-3"
                :color="isBusiness ? '#0048B2' : '#FFFFFF'"
                height="36px"
                width="77px"
                @click="toggleType"
              >
              <span :class="isBusiness ? 'text-white' : 'text-business'">사업자</span>
            </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn
                class="mr-8 mb-3"
                :color="!isBusiness ? '#0048B2' : '#FFFFFF'"
                height="36px"
                width="77px"
                @click="toggleType"
              >
              <span :class="!isBusiness ? 'text-white' : 'text-business'">개인</span>
            </v-btn>
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
            <input v-model="caseData.c_name" class="input-text" placeholder="">
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
            <input v-model="caseData.c_phone" class="input-text" placeholder="010-0000-0000">
          </v-col>
          <v-col cols="4">
            <input v-model="caseData.c_inum" class="input-text" placeholder="000000-0000000">
          </v-col>
          <v-col cols="4">
            <input v-model="caseData.c_email" class="input-text" placeholder="username@example.com">
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
                v-model="caseData.c_address" 
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
            <span style="color: #999999;">담당자: {{ caseData.manager }}</span>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
  import FlatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import { CustomLocale } from 'flatpickr/dist/types/locale';
  import { Korean } from 'flatpickr/dist/l10n/ko';
  import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
  import InfoDialog from './InfoDialog.vue';
  import ErrorDialog from './ErrorDialog.vue';
  import PurchaseDialog from './PurchaseDialog.vue';
  import LoadingDialog from './LoadingDialog.vue';
  import { CustomerInfo, FileInfo, Sales } from '@/interfaces/SalesInterface';
  import { salesApiStore } from '@/stores/salesApiStore';
  import { filesApiStore } from '@/stores/filesApiStore';
  import { Purchase } from '@/interfaces/PurchaseInterface';
  import { datetimeToyymmdd, datetimeToyymmddByDate, datetimeToyyyymmddByDate, getLastDayOfMonth, numToCommaString } from '@/composables/utils';
  import { PaymentInterface } from '@/interfaces/PaymentInterface';
  import { HistoryInterface } from '@/interfaces/HistoryInterface';

  // API store
  const apiStore = salesApiStore();
  const { apiGetById, apiSaveSales, apiAddSalesHistory } = apiStore;

  const fApiStore = filesApiStore();
  const { apiUploadFile } = fApiStore;

  const fpConfig = ref<{dateFormat: string, locale: CustomLocale}>({ dateFormat: 'Y.m.d', locale: Korean });

  const props = defineProps({
    show: Boolean,
    sid: Number,
    username: String,
    name: String,
  });

  const emit = defineEmits<{(e: 'update', value: boolean): void}>();

  const isBusiness = ref<boolean>(true); // true for 사업자, false for 개인

  // Function to toggle between 사업자 and 개인
  const toggleType = () => {
    isBusiness.value = !isBusiness.value;
  };

  const caseData = ref<Sales>({
    gid: 0,
    uid: 0,
    saleser: '',
    c_name: '',
    c_phone: '',
    c_address: '',
    c_inum: '',
    c_email: '',
    memo: '',
    manager: '하헌일',
    casenum: '2030_2939_1111'
  });

  const steps = ref([
    { text: '20%', desc: '계약전 정보등록이 완료된 상태' },
    { text: '40%', desc: '계약 완료 상태' },
    { text: '60%', desc: '원가 계산이 완료된 상태' },
    { text: '80%', desc: '발주서가 접수되어 납품 예정인 상태' },
    { text: '100%', desc: '영업이 완료되어 계산서 발행이 필요한 상태' },
    { text: '계산서 발행 완료', desc: '정산이 필요한 상태' },
  ]);

  // 사업자 정보
  const showCustomerDetail = ref<boolean>(false);
  const customerInfo = ref<CustomerInfo>({ name: '', bnum: '', ceo: '', btype: '', bkind: '', addr: '' });
  const customerFileInfo = ref<FileInfo>({ id: 0, gid: 0, uid: 0, fname: '' });

  // 파트너 정보
  const showPartnerDetail = ref<boolean>(false);
  const partnerInfo = ref<CustomerInfo>({ name: '', bnum: '', ceo: '', btype: '', bkind: '', addr: '' });
  const partnerFileInfo = ref<FileInfo>({ id: 0, gid: 0, uid: 0, fname: '' });

  // 매입 테이블
  const purchaseHeaders = ref<Record <string, {name: string, width: string}>>((
    {
      code: { name: '매입처코드', width: '13%' },
      name: { name: '매출처', width: '14%' },
      detail: { name: '건명', width: '37%' },
      amnt: { name: '금액', width: '18%' },
      updatedAt: { name: 'CTR', width: '18%' },
    }
  ));

  const purchaseData = ref<Purchase []>([]);
  const selectedPurchaseIndex = ref<number>(-1);

  const initData = () => {
    updated.value = false;

    caseData.value = {
      gid: 0,
      uid: 0,
      saleser: '',
      c_name: '',
      c_phone: '',
      c_address: '',
      c_inum: '',
      c_email: '',
      memo: '',
      manager: '하헌일',
      casenum: '2030_2939_1111'
    };

    purchaseData.value = [];

    showCustomerDetail.value = false;
    customerFile.value = null;
    customerInfo.value = { name: '', bnum: '', ceo: '', btype: '', bkind: '', addr: '' };
    customerFileInfo.value = { id: 0, gid: 0, uid: 0, fname: '' };

    showPartnerDetail.value = false;
    partnerFile.value = null;
    partnerInfo.value = { name: '', bnum: '', ceo: '', btype: '', bkind: '', addr: '' };
    partnerFileInfo.value = { id: 0, gid: 0, uid: 0, fname: '' };

    historyList.value = [];
    historyText.value = '';
  };

  // 화면 로딩
  watch(() => props.show, async (newFlag, oldFlag) => {
    console.log(`SalesDialog watch props.show: ${oldFlag} -> ${newFlag}`);
    if (newFlag && !oldFlag) {
      initData();

      if (props.sid) {
        console.log(`onUpdated caseData.value.id: props.sid: ${props.sid}`);

        const response = await apiGetById(props.sid);
        if (response.status !== 200) {
          errorTitle.value = '데이터 가져오기 실패';
          errorMsg.value = '데이터 조회 중 문제가 발생했습니다.';
          showErrorDialog.value = true;
        } else {
          caseData.value = response.data.sales;
          selectedStep.value = caseData.value.s_step.toString();
          if (caseData.value?.purchase) {
            purchaseData.value = JSON.parse(caseData.value.purchase);
            calcCost();
            // console.log(`purchaseData: ${caseData.value.purchase}`);
          }
          console.log(caseData.value);

          // 고객정보
          if (response.data.cinfo) {
            customerInfo.value = response.data.cinfo;
            if (customerInfo.value.fileid) {
              customerFileInfo.value = response.data.cfile;
            }
          }

          // 파트너정보
          if (caseData.value.s_path === 1 && response.data.pinfo) {
            partnerInfo.value = response.data.pinfo;
            if (partnerInfo.value.fileid) {
              partnerFileInfo.value = response.data.pfile;
            }
          }

          // 히스토리
          if (response.data.history) {
            historyList.value = response.data.history;
          }
        }
      } else {
        initData();
      }
    }
  });

  // 이익 계산
  const calcProfit = computed<number>(() => {
    if (caseData.value && caseData.value.s_amnt >= caseData.value.s_cost) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      caseData.value.s_profit = caseData.value.s_amnt - caseData.value.s_cost;
    }
    return caseData.value.s_profit;
  });

  // 과금 데이터
  const payData = computed<PaymentInterface []>(() => {
    const data: PaymentInterface[] = [];

    if (!caseData.value.b_start || !caseData.value.b_end) {
      return data;
    }

    const dt = new Date(caseData.value.b_start);
    const end = new Date(caseData.value.b_end);
    const cycle = Number(caseData.value.b_cycle);
    const bDay = Number(caseData.value.b_day);

    const curDay = dt.getDate();
    const firstDay = bDay === 0 ? getLastDayOfMonth(dt) : bDay;
    // 현재 날짜가 첫 결제일을 지났을때
    if (curDay > firstDay) {
      dt.setDate(1); // 31일이 없는 달로 바로 셋팅 할 경우 추가로 한달이 늘어나는 것 방지.
      dt.setMonth(dt.getMonth() + cycle); // +1 월
    }

    while (dt.getTime() < end.getTime()) {
      if (bDay === 0) {
        const lday = getLastDayOfMonth(dt);
        dt.setDate(lday);
      } else {
        dt.setDate(bDay);
      }
      if (dt.getTime() > end.getTime()) break;
      data.push({ date: datetimeToyyyymmddByDate(dt), amnt: 0 });
      dt.setDate(1);
      dt.setMonth(dt.getMonth() + cycle);
    }

    // 월 요금 계산
    const count = data.length;
    const monthly = Math.floor(caseData.value.s_amnt / count);
    let sum = 0;
    for (const item of data) {
      item.amnt = monthly;
      sum += monthly;
    }
    // 나머지 금액 첫달에 합산
    const diff = caseData.value.s_amnt - sum;
    if (diff !== 0) {
      data[0].amnt += diff;
    }
    return data;
  });

  const setSalesPath = (spath: number) => {
    caseData.value.s_path = spath;
  };

  const setBType = (btype: number) => {
    caseData.value.s_btype = btype;
  };

  const selectedStep = ref<string>('0');
  const setSalesStep = () => {
    caseData.value.s_step = Number(selectedStep.value);
  };

  const checkInput = () => {
    if (!caseData.value.c_name || caseData.value.c_name.length < 2) {
      errorTitle.value = '고객사명 입력필요';
      errorMsg.value = '2 글자 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    }
    if (caseData.value.s_path === 1 && (!caseData.value.p_name || caseData.value.p_name.length < 2)) {
      errorTitle.value = '파트너명 입력필요';
      errorMsg.value = '2 글자 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    } else if (caseData.value.s_path === 0) {
      caseData.value.p_name = '직접';
    }

    caseData.value.saleser = props.username;

    confirmTitle.value = '신규 사건 등록';
    confirmMsg.value = '입력된 정보를 저장하고 신규로 등록하시겠습니까?';
    showConfirmDialog.value = true;
  };

  const updated = ref<boolean>(false);
  const closeDialog = () => {
    caseData.value.id = 0; // 다시 열었을때 data를 다시 불러오기 위해.
    emit('update', updated.value);
  };

  const saveSalesData = async () => {
    showConfirmDialog.value = false;

    caseData.value.purchase = JSON.stringify(purchaseData.value);
    if (caseData.value.s_btype === 1) {
      caseData.value.b_data = JSON.stringify(payData.value);
    }

    const sendData = {
      sales: caseData.value,
      cinfo: customerInfo.value,
      cfile: customerFileInfo.value,
      pinfo: partnerInfo.value,
      pfile: partnerFileInfo.value,
    };

    console.log(`sendData: ${JSON.stringify(sendData)}`);
    const response = await apiSaveSales(sendData);
    if (response.status !== 201) {
      errorTitle.value = '영업관리 저장';
      errorMsg.value = '저장 중 문제가 발생했습니다.';
      showErrorDialog.value = true;
    } else {
      infoTitle.value = '영업관리 저장';
      infoMsg.value = '저장이 완료되었습니다.';
      showInfoDialog.value = true;

      updated.value = true;

      if (response.data && response.data.id) {
        caseData.value = response.data;
        console.log(`Saved ID: ${caseData.value.id}`);
      }
    }
  };

  // 고객사 파일 입력
  const customerFileInput = ref<HTMLInputElement | null>(null);
  const customerFile = ref<File | null>(null);

  const triggerFileInput = () => {
    if (customerFileInput.value) {
      customerFileInput.value.click();
    }
  };

  const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      showLoadingDialog.value = true;

      customerFile.value = target.files[0];

      const response = await apiUploadFile(customerFile.value, 'bizlicense');

      showLoadingDialog.value = false;

      console.log(response);
      customerInfo.value = response.data.bizInfo;
      customerFileInfo.value = response.data.fileInfo;
    }
  };

  // 파트너 파일 입력
  const partnerFileInput = ref<HTMLInputElement | null>(null);
  const partnerFile = ref<File | null>(null);

  const triggerPartFileInput = () => {
    if (partnerFileInput.value) {
      partnerFileInput.value.click();
    }
  };

  const handlePartFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      showLoadingDialog.value = true;

      partnerFile.value = target.files[0];

      const response = await apiUploadFile(partnerFile.value, 'partlicense');

      showLoadingDialog.value = false;

      console.log(response);
      partnerInfo.value = response.data.bizInfo;
      partnerFileInfo.value = response.data.fileInfo;
    }
  };

  // 히스토리
  const historyList = ref<HistoryInterface[]>([]);
  const historyText = ref<string>();
  const AddHistory = async () => {
    if (historyText.value) {
      const result = await apiAddSalesHistory(Number(caseData.value.id), historyText.value);
      if (result.status === 201 && result.data) {
        historyList.value.push(result.data);
      }
    }
  };

  // Loading Dialog
  const showLoadingDialog = ref<boolean>(false);

  // Confirm Dialog
  const showConfirmDialog = ref<boolean>(false);
  const confirmTitle = ref<string>('영업관리');
  const confirmMsg = ref<string>('진행할까요?');
  const closeConfirmDialog = (answer: boolean) => {
    if (answer) {
      if (showConfirmDialog.value) {
        showConfirmDialog.value = false;
        saveSalesData();
      } else if (showPurchaseDeleteDialog.value) {
        showPurchaseDeleteDialog.value = false;
        deletePurchase();
      }
    } else {
      showConfirmDialog.value = showPurchaseDeleteDialog.value = false;
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

  // Purchase Dialog
  const calcCost = () => {
    caseData.value.s_cost = 0;
    for (const p of purchaseData.value) {
      caseData.value.s_cost += Number(p.amnt);
    }
  };

  const showPurchaseDialog = ref<boolean>(false);
  const showPurchaseDeleteDialog = ref<boolean>(false);

  const createPurchase = (pData: Purchase) => {
    updated.value = true;
    showPurchaseDialog.value = false;
    purchaseData.value.push(pData);
    calcCost();
  };

  const deletePurchase = () => {
    console.log(`updatePurchase: ${JSON.stringify(purchaseData.value[selectedPurchaseIndex.value])}`);
    purchaseData.value.splice(selectedPurchaseIndex.value, 1);
    selectedPurchaseIndex.value = -1;
  };

  const updatePurchase = (pData: Purchase) => {
    console.log(`updatePurchase: ${JSON.stringify(pData)}`);
    updated.value = true;
    showPurchaseDialog.value = false;
    purchaseData.value[selectedPurchaseIndex.value] = pData;
    calcCost();
  };

  const closePurchaseDialog = () => {
    showPurchaseDialog.value = false;
  };

  const onCreatePurchase = () => {
    selectedPurchaseIndex.value = -1;
    showPurchaseDialog.value = true;
  };
  const onModifyPurchase = (index: number) => {
    selectedPurchaseIndex.value = index;
    showPurchaseDialog.value = true;
  };
  const onDeletePurchase = (index: number) => {
    selectedPurchaseIndex.value = index;
    confirmTitle.value = '매입 정보 삭제';
    confirmMsg.value = '선택하신 매입 정보를 삭제할까요?';
    showPurchaseDeleteDialog.value = true;
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
    width: 735px;
    height: auto;
    max-height: 991px;
    padding-top: 10px;
    padding-left: 30px;
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
</style>
