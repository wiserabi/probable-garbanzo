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
        <span class="title">
          신규등록
        </span>
        <div class="step-container">
          <div
            v-for="(step, index) of steps"
            :key="index"
            class="one-step-container"
          >
            <div
              v-if="index !== 0"
              class="vertical-dotted-line"
            />
            <div v-if="index <= salesData.s_step">
              <v-icon
                color="#003366"
                icon="mdi-check-circle"
                size="large"
              />
              <br>
              <span class="current-text">{{ step.text }}</span>
              <br>
              <span class="desc">{{ step.desc }}</span>
            </div>
            <div v-else>
              <v-icon
                color="#999999"
                icon="mdi-check-circle-outline"
                size="large"
              />
              <br>
              <span class="next-text">{{ step.text }}</span>
              <br>
              <span class="desc">{{ step.desc }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="close-btn-container">
          <button class="close-btn" @click="closeDialog">
            <i class="mdi mdi-close" />
          </button>
        </div>
        <!-- 고객 정보 -->
        <div class="form-container">
          <div class="info-title-container" style="margin-top: 20px;">
            <span class="title">고객 정보</span>
            <span class="info-code">고객 코드</span>
            <span class="info-code-value">{{ customerInfo.code? customerInfo.code: '확인되지 않음' }}</span>
          </div>
          <table class="table-form">
            <thead>
              <th>고객사명<span style="font-size: 14px; color: #EF0040;">*</span></th>
              <th>담당자명</th>
              <th>연락처</th>
              <th>이메일</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input v-model="salesData.c_name" class="input-text" placeholder="고객사명 입력">
                </td>
                <td>
                  <input v-model="salesData.c_contact" class="input-text" placeholder="담당자명 입력">
                </td>
                <td>
                  <input v-model="salesData.c_phone" class="input-text" placeholder="010-1234-5678">
                </td>
                <td>
                  <input v-model="salesData.c_email" class="input-text" placeholder="example@salser.com">
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 고객 정보 상세 설정 -->
          <div v-if="showCustomerDetail">
            <table class="table-form">
              <thead>
                <th style="width: 440px;">사업자 등록 번호<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>상호(법인명)<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>대표자명<span style="font-size: 14px; color: #EF0040;">*</span></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input v-model="customerInfo.bnum" class="input-text" placeholder="123-45-67890" style="width: 430px;">
                  </td>
                  <td>
                    <input v-model="customerInfo.name" class="input-text" placeholder="상호 입력">
                  </td>
                  <td>
                    <input v-model="customerInfo.ceo" class="input-text" placeholder="대표자명 입력">
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table-form">
              <thead>
                <th>업태<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>업종<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th style="width: 440px;">사업장 주소<span style="font-size: 14px; color: #EF0040;">*</span></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input v-model="customerInfo.btype" class="input-text" placeholder="업태 입력">
                  </td>
                  <td>
                    <input v-model="customerInfo.bkind" class="input-text" placeholder="업종 입력">
                  </td>
                  <td>
                    <input v-model="customerInfo.addr" class="input-text" placeholder="사업장 주소 입력" style="width: 430px;">
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
                  :text="customerFileInfo.fname || customerFile? '파일 재선택': '파일선택'"
                  width="105"
                  @click="triggerFileInput"
                />
                <input
                  ref="customerFileInput"
                  accept="application/pdf"
                  style="display: none;"
                  type="file"
                  @change="handleFileUpload"
                >
                <span style="color: #003366; margin-left: 10px;">{{ customerFileInfo.fname? customerFileInfo.fname: customerFile?.name }}</span>
              </div>
              <div class="detail-container-show" @click="showCustomerDetail = !showCustomerDetail">
                <span class="detail-setting">상세 내용 설정</span>
                <i class="mdi mdi-chevron-up" style="margin-left: 10px;" />
              </div>
            </div>
          </div>
          <div v-else class="detail-container" @click="showCustomerDetail = !showCustomerDetail">
            <span class="detail-setting">상세 내용 설정</span>
            <i class="mdi mdi-chevron-down" style="margin-left: 10px;" />
          </div>
        </div>
        <!-- 매출 경로 -->
        <div class="form-container">
          <div class="info-title-container">
            <span class="title mr-3">매출 경로</span>
            <label>
              <input
                :checked="salesData.s_path === 0"
                style="margin-left: 5px;"
                type="radio"
                @change="setSalesPath(0)"
              >
              <span> 직접</span>
            </label>
            <label>
              <input
                :checked="salesData.s_path === 1"
                style="margin-left: 15px;"
                type="radio"
                @change="setSalesPath(1)"
              >
              <span> 파트너</span>
            </label>
            <span v-if="salesData.s_path === 1" class="info-code">파트너 코드</span>
            <span v-if="salesData.s_path === 1" class="info-code-value">{{ partnerInfo.code? partnerInfo.code: '확인되지 않음' }}</span>
          </div>
          <div v-if="salesData.s_path === 1">
            <table class="table-form">
              <thead>
                <th>고객사명<span style="font-size: 14px; color: #EF0040;">*</span></th>
                <th>담당자명</th>
                <th>연락처</th>
                <th>이메일</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input v-model="salesData.p_name" class="input-text" placeholder="고객사명 입력">
                  </td>
                  <td>
                    <input v-model="salesData.p_contact" class="input-text" placeholder="담당자명 입력">
                  </td>
                  <td>
                    <input v-model="salesData.p_phone" class="input-text" placeholder="010-1234-5678">
                  </td>
                  <td>
                    <input v-model="salesData.p_email" class="input-text" placeholder="example@salser.com">
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- 파트너 정보 상세 설정 -->
            <div v-if="showPartnerDetail">
              <table class="table-form">
                <thead>
                  <th style="width: 440px;">사업자 등록 번호<span style="font-size: 14px; color: #EF0040;">*</span></th>
                  <th>상호(법인명)<span style="font-size: 14px; color: #EF0040;">*</span></th>
                  <th>대표자명<span style="font-size: 14px; color: #EF0040;">*</span></th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input v-model="partnerInfo.bnum" class="input-text" placeholder="123-45-67890" style="width: 430px;">
                    </td>
                    <td>
                      <input v-model="partnerInfo.name" class="input-text" placeholder="상호 입력">
                    </td>
                    <td>
                      <input v-model="partnerInfo.ceo" class="input-text" placeholder="대표자명 입력">
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table-form">
                <thead>
                  <th>업태<span style="font-size: 14px; color: #EF0040;">*</span></th>
                  <th>업종<span style="font-size: 14px; color: #EF0040;">*</span></th>
                  <th style="width: 440px;">사업장 주소<span style="font-size: 14px; color: #EF0040;">*</span></th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input v-model="partnerInfo.btype" class="input-text" placeholder="업태 입력">
                    </td>
                    <td>
                      <input v-model="partnerInfo.bkind" class="input-text" placeholder="업종 입력">
                    </td>
                    <td>
                      <input v-model="partnerInfo.addr" class="input-text" placeholder="사업장 주소 입력" style="width: 430px;">
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
                    :text="partnerFileInfo.fname || partnerFile? '파일 재선택': '파일선택'"
                    width="105"
                    @click="triggerPartFileInput"
                  />
                  <input
                    ref="partnerFileInput"
                    accept="application/pdf"
                    style="display: none;"
                    type="file"
                    @change="handlePartFileUpload"
                  >
                  <span style="color: #003366; margin-left: 10px;">{{ partnerFileInfo.fname? partnerFileInfo.fname: partnerFile?.name }}</span>
                </div>
                <div class="detail-container-show" @click="showPartnerDetail = !showPartnerDetail">
                  <span class="detail-setting">상세 내용 설정</span>
                  <i class="mdi mdi-chevron-up" style="margin-left: 10px;" />
                </div>
              </div>
            </div>
            <div v-else class="detail-container" @click="showPartnerDetail = !showPartnerDetail">
              <span class="detail-setting">상세 내용 설정</span>
              <i class="mdi mdi-chevron-down" style="margin-left: 10px;" />
            </div>
          </div>
        </div>
        <!-- 매출 정보 -->
        <div class="form-container" style="background-color: #F8F8F8;">
          <div class="info-title-container">
            <span class="title">매출 정보</span>
          </div>
          <table class="table-form">
            <thead>
              <th style="width: 440px;">건 명</th>
              <th />
              <th>매출 예상일</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input v-model="salesData.s_name" class="input-text" placeholder="건 명 입력" style="width: 430px;">
                </td>
                <td>
                  <label>
                    <input
                      :checked="salesData.s_btype === 0"
                      style="margin-left: 5px;"
                      type="radio"
                      @change="setBType(0)"
                    >
                    <span> 일반형</span>
                  </label>
                  <label>
                    <input
                      :checked="salesData.s_btype === 1"
                      style="margin-left: 15px;"
                      type="radio"
                      @change="setBType(1)"
                    >
                    <span> 과금형</span>
                  </label>
                </td>
                <td>
                  <flat-pickr v-model="salesData.s_eday" class="custom-datepicker" :config="fpConfig" style="background-color: #FFFFFF;" />
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table-form" :style="salesData.s_btype === 1? 'border-bottom: 1px solid #EEEEEE;': ''">
            <thead>
              <th>매출액</th>
              <th>매출이익</th>
              <th>원가</th>
              <th>영업 단계</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input v-model="salesData.s_amnt" class="input-text" placeholder="0">
                </td>
                <td>
                  <input v-model="calcProfit" class="input-text" disabled placeholder="0">
                </td>
                <td>
                  <input
                    v-model="salesData.s_cost"
                    class="input-text"
                    placeholder="0"
                    @focusin="onCreatePurchase"
                  >
                </td>
                <td>
                  <select
                    v-model="selectedStep"
                    style="width: 205px; height: 40px; border: 1px solid #DDDDDD;"
                    @change="setSalesStep()"
                  >
                    <option value="0">20%</option>
                    <option value="1">40%</option>
                    <option value="2">60%</option>
                    <option value="3">80%</option>
                    <option value="4">100%</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 과금 정보-->
          <table v-if="salesData.s_btype === 1" class="table-form">
            <thead>
              <th style="width: 290px;">과금주기</th>
              <th style="width: 290px;">결제일</th>
              <th style="width: 280px;">결제기간</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    v-model="salesData.b_cycle"
                    style="width: 280px; height: 40px; border: 1px solid #DDDDDD;"
                  >
                    <option value="1">매월</option>
                    <option value="3">3개월</option>
                    <option value="6">6개월</option>
                  </select>
                </td>
                <td>
                  <select
                    v-model="salesData.b_day"
                    style="width: 280px; height: 40px; border: 1px solid #DDDDDD;"
                  >
                    <option value="0">말일</option>
                    <option value="5">5일</option>
                    <option value="25">25일</option>
                  </select>
                </td>
                <td>
                  <flat-pickr v-model="salesData.b_start" class="custom-datepicker" :config="fpConfig" style="background-color: #FFFFFF; width: 130px;" />
                  ~
                  <flat-pickr v-model="salesData.b_end" class="custom-datepicker" :config="fpConfig" style="background-color: #FFFFFF; width: 130px;" />
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 과금 데이터-->
          <div v-if="salesData.s_btype === 1" class="paydata-container">
            <div v-for="(item, index) in payData" :key="index" style="width: 150px;">
              <table>
                <thead>
                  <th style="width: 140px; font-size: 14px; text-align: left;">{{ item.date }}</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        class="input-text"
                        disabled
                        placeholder="입력"
                        style="width: 130px;"
                        :value="numToCommaString(item.amnt)"
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 매입 내용 -->
        <div v-if="purchaseData && purchaseData.length > 0" class="form-container" style="background-color: #F8F8F8;">
          <div class="info-title-container">
            <span class="title">매입 내용</span>
          </div>
          <div class="table-container">
            <table class="table-purchase">
              <thead>
                <tr>
                  <th
                    v-for="(_, key) in purchaseHeaders"
                    :key="key"
                    :width="purchaseHeaders[key].width"
                  >
                    {{ purchaseHeaders[key].name }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in purchaseData"
                  :key="index"
                >
                  <td>
                    <span v-if="item.code" class="purchase-text">{{ item.code }}</span>
                    <span v-else class="purchase-text" style="color: #EF0040; font-weight: bold;">확인되지 않음</span>
                  </td>
                  <td>
                    <span class="purchase-text">{{ item.name }}</span>
                  </td>
                  <td>
                    <span class="purchase-text">{{ item.detail }}</span>
                  </td>
                  <td>
                    <span class="purchase-text">{{ numToCommaString(item.amnt) }}</span>
                  </td>
                  <td>
                    <v-btn
                      class="btn-ctr"
                      color="#003366"
                      flat
                      text="수정"
                      @click="onModifyPurchase(index)"
                    />
                    <v-btn
                      border
                      class="ml-2 btn-ctr"
                      flat
                      text="삭제"
                      @click="onDeletePurchase(index)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 업엉 히스토리 -->
        <div class="history-container">
          <div class="info-title-container">
            <span class="title">영업 히스토리</span>
          </div>
          <table class="table-form">
            <thead>
              <th style="width: 140px;">등록일자</th>
              <th style="width: 140px;">작성자</th>
              <th style="width: 440px;">내용</th>
              <th style="width: 140px;" />
            </thead>
            <tbody>
              <tr>
                <td>
                  <input class="input-text" disabled style="width: 130px;" :value="datetimeToyymmdd('')">
                </td>
                <td>
                  <input class="input-text" disabled style="width: 130px;" :value="props.name">
                </td>
                <td>
                  <input v-model="historyText" class="input-text" placeholder="내용 입력" style="width: 440px;">
                </td>
                <td>
                  <v-btn
                    border=""
                    class="btn-history"
                    :disabled="props.sid === 0"
                    flat
                    text="히스토리 등록"
                    @click="AddHistory"
                  />
                </td>
              </tr>
              <tr v-for="(item, index) in historyList" :key="index" style="background-color: #F8F8F8;">
                <td colspan="4">
                  <span style="color: #999999; margin-left: 20px;">{{ datetimeToyymmdd(item.createdAt) }}</span>
                  <span style="font-weight: 500; margin-left: 15px;">{{ item.name }}</span>
                  <span style="font-weight: 400; margin-left: 15px;">{{ item.comment }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="save-container">
          <!--<v-btn
            border
            class="btn-save"
            flat
            @click="closeDialog"
          >
            닫기
          </v-btn>-->
          <v-btn
            class="btn-save"
            color="#003366"
            flat
            @click="checkInput"
          >
            저장
          </v-btn>
        </div>
        <div class="bottom-container">
          <div>
            <div>
              <span style="color: #999999;">SalesCode: {{ salesData.code? salesData.code: '-' }}</span>
            </div>
            <div>
              <span style="color: #999999;">최초등록일: {{ salesData.createdAt? datetimeToyymmdd(salesData.createdAt): '-' }}</span>
              <span style="color: #999999; margin-left: 20px;">최종수정일: {{ salesData.updatedAt? datetimeToyymmdd(salesData.updatedAt): '-' }}</span>
            </div>
          </div>
          <div style="margin-top: 10px;">
            <span>담당자</span>
            <select class="ml-3">
              <option :value="props.name">@{{ props.name }}</option>
            </select>
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

  const salesData = ref<Sales>({
    gid: 0,
    uid: 0,
    saleser: '',
    c_name: '',
    s_path: 0,
    s_type: 0,
    s_btype: 0,
    s_eday: '',
    s_amnt: 0,
    s_profit: 0,
    s_cost: 0,
    s_step: 0,
    b_cycle: 1,
    b_day: 0,
    b_start: '',
    b_end: '',
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

    salesData.value = {
      gid: 0,
      uid: 0,
      saleser: '',
      c_name: '',
      c_contact: '',
      c_phone: '',
      c_email: '',
      s_path: 0,
      p_name: '',
      p_contact: '',
      p_phone: '',
      p_email: '',
      s_type: 0,
      s_name: '',
      s_btype: 0,
      s_eday: '',
      s_amnt: 0,
      s_profit: 0,
      s_cost: 0,
      s_step: 0,
      b_cycle: 1,
      b_day: 0,
      b_start: '',
      b_end: '',
      purchase: '',
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
        console.log(`onUpdated salesData.value.id: props.sid: ${props.sid}`);

        const response = await apiGetById(props.sid);
        if (response.status !== 200) {
          errorTitle.value = '데이터 가져오기 실패';
          errorMsg.value = '데이터 조회 중 문제가 발생했습니다.';
          showErrorDialog.value = true;
        } else {
          salesData.value = response.data.sales;
          selectedStep.value = salesData.value.s_step.toString();
          if (salesData.value?.purchase) {
            purchaseData.value = JSON.parse(salesData.value.purchase);
            calcCost();
            // console.log(`purchaseData: ${salesData.value.purchase}`);
          }
          console.log(salesData.value);

          // 고객정보
          if (response.data.cinfo) {
            customerInfo.value = response.data.cinfo;
            if (customerInfo.value.fileid) {
              customerFileInfo.value = response.data.cfile;
            }
          }

          // 파트너정보
          if (salesData.value.s_path === 1 && response.data.pinfo) {
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
    if (salesData.value && salesData.value.s_amnt >= salesData.value.s_cost) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      salesData.value.s_profit = salesData.value.s_amnt - salesData.value.s_cost;
    }
    return salesData.value.s_profit;
  });

  // 과금 데이터
  const payData = computed<PaymentInterface []>(() => {
    const data: PaymentInterface[] = [];

    if (!salesData.value.b_start || !salesData.value.b_end) {
      return data;
    }

    const dt = new Date(salesData.value.b_start);
    const end = new Date(salesData.value.b_end);
    const cycle = Number(salesData.value.b_cycle);
    const bDay = Number(salesData.value.b_day);

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
    const monthly = Math.floor(salesData.value.s_amnt / count);
    let sum = 0;
    for (const item of data) {
      item.amnt = monthly;
      sum += monthly;
    }
    // 나머지 금액 첫달에 합산
    const diff = salesData.value.s_amnt - sum;
    if (diff !== 0) {
      data[0].amnt += diff;
    }
    return data;
  });

  const setSalesPath = (spath: number) => {
    salesData.value.s_path = spath;
  };

  const setBType = (btype: number) => {
    salesData.value.s_btype = btype;
  };

  const selectedStep = ref<string>('0');
  const setSalesStep = () => {
    salesData.value.s_step = Number(selectedStep.value);
  };

  const checkInput = () => {
    if (!salesData.value.c_name || salesData.value.c_name.length < 2) {
      errorTitle.value = '고객사명 입력필요';
      errorMsg.value = '2 글자 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    }
    if (salesData.value.s_path === 1 && (!salesData.value.p_name || salesData.value.p_name.length < 2)) {
      errorTitle.value = '파트너명 입력필요';
      errorMsg.value = '2 글자 이상 입력해주세요.';
      showErrorDialog.value = true;
      return;
    } else if (salesData.value.s_path === 0) {
      salesData.value.p_name = '직접';
    }

    salesData.value.saleser = props.username;

    confirmTitle.value = '영업관리 저장';
    confirmMsg.value = '입력하신 영업관리 내용을 저장 할까요?';
    showConfirmDialog.value = true;
  };

  const updated = ref<boolean>(false);
  const closeDialog = () => {
    salesData.value.id = 0; // 다시 열었을때 data를 다시 불러오기 위해.
    emit('update', updated.value);
  };

  const saveSalesData = async () => {
    showConfirmDialog.value = false;

    salesData.value.purchase = JSON.stringify(purchaseData.value);
    if (salesData.value.s_btype === 1) {
      salesData.value.b_data = JSON.stringify(payData.value);
    }

    const sendData = {
      sales: salesData.value,
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
        salesData.value = response.data;
        console.log(`Saved ID: ${salesData.value.id}`);
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
      const result = await apiAddSalesHistory(Number(salesData.value.id), historyText.value);
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
    salesData.value.s_cost = 0;
    for (const p of purchaseData.value) {
      salesData.value.s_cost += Number(p.amnt);
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
    border: 1px solid #EEEEEE;
    background-color: #F2F5F7;
    width: 207px;
    padding-top: 30px;
    padding-left: 40px;
  }

  .right-container {
    border-radius: 0px 8px 8px 0px;
    border: 1px solid #EEEEEE;
    background-color: #FFFFFF;
    width: 961px;
    height: auto;
    max-height: 991px;
    padding-top: 10px;
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
</style>
