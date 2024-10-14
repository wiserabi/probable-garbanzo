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
    <div class="main-container">
      <div class="purchase-container">
        <div class="close-btn-container">
          <button class="close-btn" @click="closeDialog">
            <i class="mdi mdi-close" />
          </button>
        </div>
        <!-- 고객 정보 -->
        <div class="form-container">
          <span class="title">
            매입 등록
          </span>
          <div class="info-title-container" style="margin-top: 15px;">
            <span class="info-code">거래처 코드</span>
            <span class="info-code-value">확인되지 않음</span>
          </div>
          <table style="padding-bottom: 20px; border-bottom: 1px solid #EEEEEE;">
            <thead>
              <th>매입처<span style="font-size: 14px; color: #EF0040;">*</span></th>
              <th style="width: 440px;">매입 내용<span style="font-size: 14px; color: #EF0040;">*</span></th>
              <th>매입액<span style="font-size: 14px; color: #EF0040;">*</span></th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input v-model="pData.name" class="input-text" placeholder="거래처 입력">
                </td>
                <td>
                  <input v-model="pData.detail" class="input-text" placeholder="매입 내용 입력" style="width: 425px;">
                </td>
                <td>
                  <input v-model="pData.amnt" class="input-text" placeholder="0">
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="showDetail">
            <!-- 상세 설정: 매입 상세 정보 -->
            <table>
              <thead>
                <th style="width: 440px;">계좌정보<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>고객담당자<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>연락처<span style="font-size: 14px; color: #EF0040;">*</span></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input v-model="pData.accInfo" class="input-text" placeholder="계좌정보 입력" style="width: 425px;">
                  </td>
                  <td>
                    <input v-model="pData.contact" class="input-text" placeholder="담당자 입력">
                  </td>
                  <td>
                    <input v-model="pData.phone" class="input-text" placeholder="010-1234-5678">
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="padding-bottom: 20px; border-bottom: 1px solid #EEEEEE;">
              <thead>
                <th>계산서 발행일<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>출금 요청일<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>출금 확인</th>
                <th>지연일</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <flat-pickr v-model="pData.invoice" class="custom-datepicker" :config="fpConfig" style="background-color: #FFFFFF;" />
                  </td>
                  <td>
                    <flat-pickr v-model="pData.sendReq" class="custom-datepicker" :config="fpConfig" style="background-color: #FFFFFF;" />
                  </td>
                  <td>
                    <flat-pickr v-model="pData.send" class="custom-datepicker" :config="fpConfig" style="background-color: #FFFFFF;" />
                  </td>
                  <td>
                    <input v-model="pData.delay" class="input-text" placeholder="0일">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="showDetail">
            <!-- 상세 설정: 매입처 사업자 정보 -->
            <table v-if="pData.bnum">
              <thead>
                <th style="width: 440px;">사업자 등록 번호<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>상호(법인명)<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>대표자명<span style="font-size: 14px; color: #EF0040;">*</span></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input v-model="pData.bnum" class="input-text" placeholder="123-45-67890" style="width: 425px;">
                  </td>
                  <td>
                    <input v-model="pData.name" class="input-text" placeholder="상호 입력">
                  </td>
                  <td>
                    <input v-model="pData.ceo" class="input-text" placeholder="대표자명 입력">
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-if="pData.bnum">
              <thead>
                <th>업태<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>업종<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th style="width: 440px;">사업장 주소<span style="font-size: 14px; color: #EF0040;">*</span></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input v-model="pData.btype" class="input-text" placeholder="업태 입력">
                  </td>
                  <td>
                    <input v-model="pData.bkind" class="input-text" placeholder="업종 입력">
                  </td>
                  <td>
                    <input v-model="pData.addr" class="input-text" placeholder="사업장 주소 입력" style="width: 425px;">
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="upload-container-show">
              <div>
                <span>사업자 등록증</span>
                <span style="font-size: 13px; color: #999999;">&nbsp;&nbsp;*사업자등록증을 업로드하면 자동으로 입력됩니다.</span>
                <br>
                <v-btn
                  class="btn-save"
                  color="#003366"
                  flat
                  :text="detailFileInfo.fname || detailFile? '파일 재선택': '파일선택'"
                  width="105"
                  @click="triggerFileInput"
                />
                <input
                  ref="detailFileInput"
                  accept="application/pdf"
                  style="display: none;"
                  type="file"
                  @change="handleFileUpload"
                >
                <span style="color: #003366; margin-left: 10px;">{{ detailFileInfo.fname? detailFileInfo.fname: detailFile?.name }}</span>
              </div>
              <div class="detail-container-show" @click="showDetail = !showDetail">
                <span class="detail-setting">상세 내용 설정</span>
                <i class="mdi mdi-chevron-up" style="margin-left: 10px;" />
              </div>
            </div>
          </div>
          <div v-else class="detail-container" @click="showDetail = !showDetail">
            <span class="detail-setting">상세 내용 설정</span>
            <i class="mdi mdi-chevron-down" style="margin-left: 10px;" />
          </div>
        </div>
        <div class="save-container">
          <div>
            <span style="color: #999999;">담당자: {{ props.name }}</span>
          </div>
          <div>
            <v-btn
              class="btn-save"
              color="#003366"
              flat
              @click="checkInput"
            >
              저장
            </v-btn>
          </div>
        </div>
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
  import LoadingDialog from './LoadingDialog.vue';
  import { Purchase } from '@/interfaces/PurchaseInterface';
  import { CustomerInfo, FileInfo } from '@/interfaces/SalesInterface';
  import { filesApiStore } from '@/stores/filesApiStore';

  // API store
  const fApiStore = filesApiStore();
  const { apiGetFileInfo, apiUploadFile } = fApiStore;

  const fpConfig = ref<{dateFormat: string, locale: CustomLocale}>({ dateFormat: 'Y.m.d', locale: Korean });

  const props = defineProps({
    show: Boolean,
    sid: Number,
    name: String,
    pdata: Object,
  });

  const emit = defineEmits<{(e: 'close', value: boolean): void, (e: 'create', value: Purchase): void, (e: 'update', value: Purchase): void}>();

  const pData = ref<Purchase>({
    name: '',
    detail: '',
    amnt: 0,
    invoice: '',
    sendReq: '',
    send: '',
    delay: 0,
    accInfo: '',
    contact: '',
    phone: '',
    bnum: '',
    ceo: '',
    btype: '',
    bkind: '',
    addr: '',
  });

  const mode = ref<string>('');

  // 매입처 정보
  const showDetail = ref<boolean>(false);
  const detailInfo = ref<CustomerInfo>({ name: '', bnum: '', ceo: '', btype: '', bkind: '', addr: '' });
  const detailFileInfo = ref<FileInfo>({ id: 0, gid: 0, uid: 0, fname: '' });

  // 매입처 파일 입력
  const detailFileInput = ref<HTMLInputElement | null>(null);
  const detailFile = ref<File | null>(null);

  const triggerFileInput = () => {
    if (detailFileInput.value) {
      detailFileInput.value.click();
    }
  };

  const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      showLoadingDialog.value = true;

      detailFile.value = target.files[0];

      const response = await apiUploadFile(detailFile.value, 'purchaselicense');

      showLoadingDialog.value = false;

      console.log(response);
      detailInfo.value = response.data.bizInfo;
      detailFileInfo.value = response.data.fileInfo;

      if (response.data.bizInfo) {
        pData.value.bnum = response.data.bizInfo.bnum;
        pData.value.ceo = response.data.bizInfo.ceo;
        pData.value.btype = response.data.bizInfo.btype;
        pData.value.bkind = response.data.bizInfo.bkind;
        pData.value.addr = response.data.bizInfo.addr;
      }

      if (response.data.fileInfo) {
        pData.value.fileid = response.data.fileInfo.id;
      }
    }
  };

  const getFileInfo = async (id: number) => {
    const response = await apiGetFileInfo(id);
    if (response.status === 200 && response.data) {
      detailFileInfo.value = response.data;
    }
  };

  watch(() => props.show, (newFlag, oldFlag) => {
    console.log(`PurchaseDialog watch props.show: ${oldFlag} -> ${newFlag}`);
    if (newFlag && !oldFlag) {
      // init data
      showDetail.value = false;
      detailFile.value = null;
      detailInfo.value = { name: '', bnum: '', ceo: '', btype: '', bkind: '', addr: '' };
      detailFileInfo.value = { id: 0, gid: 0, uid: 0, fname: '' };

      if (props.pdata) {
        pData.value = { ...props.pdata as Purchase };
        mode.value = 'update';

        console.log(`pData: ${JSON.stringify(pData.value)}`);

        if (pData.value.fileid) {
          getFileInfo(pData.value.fileid);
        }
      } else {
        pData.value = {
          name: '',
          detail: '',
          amnt: 0,
          invoice: '',
          sendReq: '',
          send: '',
          delay: 0,
          accInfo: '',
          contact: '',
          phone: '',
          bnum: '',
          ceo: '',
          btype: '',
          bkind: '',
          addr: '',
        };
        mode.value = 'new';
      }
    }
  });

  const checkInput = () => {
    if (!pData.value.name || pData.value.name.length < 2) {
      errorTitle.value = '거래처 입력필요';
      errorMsg.value = '2 글자 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    }
    if (!pData.value.detail || pData.value.detail.length < 4) {
      errorTitle.value = '매입 내용 입력필요';
      errorMsg.value = '4 글자 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    }
    if (!pData.value.amnt || Number(pData.value.amnt) < 1000) {
      errorTitle.value = '매입액 입력필요';
      errorMsg.value = '천원 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    }

    showConfirmDialog.value = true;
  };

  const closeDialog = () => {
    emit('close', false);
  };

  const saveData = async () => {
    showConfirmDialog.value = false;
    if (mode.value === 'update') {
      emit('update', pData.value);
    } else {
      emit('create', pData.value);
    }
  };

  // Loading Dialog
  const showLoadingDialog = ref<boolean>(false);

  // Confirm Dialog
  const showConfirmDialog = ref<boolean>(false);
  const confirmTitle = ref<string>('매입 저장');
  const confirmMsg = ref<string>('입력하신 매입 내용을 저장 할까요?');
  const closeConfirmDialog = (answer: boolean) => {
    showConfirmDialog.value = false;
    if (answer) {
      saveData();
    }
  };

  // Info Dialog
  const showInfoDialog = ref<boolean>(false);
  const infoTitle = ref<string>('매입 저장');
  const infoMsg = ref<string>('저장 되었습니다.');
  const closeInfoDialog = () => {
    showInfoDialog.value = false;
  };

  // Error Dialog
  const showErrorDialog = ref<boolean>(false);
  const errorTitle = ref<string>('매입 저장');
  const errorMsg = ref<string>('저장 중 문제가 발생했습니다.');
  const closeErrorDialog = () => {
    showErrorDialog.value = false;
  };
</script>

<style scoped>
  span {
    font-size: 14px;
  }

  .main-container {
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .purchase-container {
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #EEEEEE;
    background-color: #FFFFFF;
    width: 960px;
    height: auto;
    padding-top: 10px;
  }

  span.title {
    font-size: 20px;
    font-weight: bold;
  }

  .close-btn-container {
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 10px;           /* 위쪽에서 10px 떨어진 위치 */
    right: 25px;         /* 오른쪽에서 10px 떨어진 위치 */
    cursor: pointer;
    font-size: 14px;
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
  }

  span.info-code-value {
    font-size: 14px;
    color: #999999;
    margin-left: 10px;
  }

  table {
    margin-top: 15px;
  }

  table th {
    text-align: left;
    font-size: 14px;
    width: 220px;
  }

  .input-text {
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    font-size: 14px;
    width: 205px;
    height: 40px;
    padding: 5px 10px;
    margin-top: 10px;
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

  .save-container {
    width: 960px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 60px;
  }

  .btn-save {
    border-radius: 4px;
    font-size: 14px;
    width: 65px;
    height: 40px;
    padding: 8px 10px;
  }

  select {
    width: 150px;
    height: 32px;
    padding: 5px 10px;
    margin-left: 10px;
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
    margin-top: 10px;
  }
</style>
