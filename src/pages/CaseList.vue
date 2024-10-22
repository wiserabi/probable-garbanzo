<template>
  <SalesDialog
    :show="showSalesDialog"
    :selectedCase="selectedCase"
    :addNew="addNew"
    :maxCaseSeq="maxCaseSeq"
    @update="closeDialog"
  />

  <ErrorDialog
    :message="errorMsg"
    :show="showErrorDialog"
    :title="errorTitle"
    @close="closeErrorDialog"
  />

  <LoadingDialog
    :show="showLoadingDialog"
    title="데이터 가져오는 중.."
  />

  <v-container fluid>
    <v-row class="banner-container" dense>
      <v-col>
        <span class="banner-subtext">Home > 사건관리 > Main</span>
        <button class="banner-button" @click="onRegist(-1)"></button>
      </v-col>
    </v-row>
    <div class="list-container">
      <div class="search-container" v-if="detailedSearch">
        <v-row align="center" dense>
          <v-col cols="12">
            <span>검색어</span>
            <input v-model="searchText" class="search-text" placeholder="검색어 입력" @keydown.enter="onSearch">
          </v-col>
        </v-row>
        <v-row align="center" class="mt-3" dense>
          <v-col cols="10">
            <!--<select v-model="selOption">
              <option value="매출일">매출일</option>
              <option value="납품일">납품일</option>
              <option value="수정일">수정일</option>
            </select>-->
            <span>등록일</span>
            <flat-pickr v-model="sDate" class="custom-datepicker" :config="fpConfig" style="width: 216px; margin-left: 28px; border: 1px solid #DDDDDD;" />
            <span>-</span>
            <flat-pickr v-model="eDate" class="custom-datepicker" :config="fpConfig" style="width: 216px; border: 1px solid #DDDDDD;" />
            <span>수임료</span>
            <select v-model="selprogress" style="width: 216px; height: 40px; border: 1px solid #DDDDDD;">
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
            </select>
            <span style="margin-left: 10px;">담당자</span>
            <select v-model="selmanager" style="width: 216px; height: 40px; border: 1px solid #DDDDDD;">
              <option 
                v-for="(item, index) in managers" 
                :key="index" 
                :value="item">
                {{ item }}
              </option>
            </select>
          </v-col>
          <v-col align="right">
            <v-btn
              class="search-btn"
              color="#0048B2"
              variant="outlined"
              flat
              @click="onSearch"
            >
              검색하기
              <v-icon icon="mdi-magnify"
                  width="24px"
                  height="24px"
                  color="#D9D9D9">
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11" align="start">
            <div class="horizontal-line"></div> 
          </v-col cols="1">
          <v-col>
            <v-icon class="ml-2" color="#777777" icon="mdi-chevron-up" size="small" @click="detailedSearch = false"/>
          </v-col>
        </v-row>
      </div>
      <div class="tcount-container">
        <v-row align="start" class="ml-2" dense justify="start">
          <v-col style="background-color: #EEEEEE; border-radius: 4px;" cols="1">
            <span style="color: #777777;">TOTAL {{ total }}</span>
          </v-col>
          <v-col offset="9">
            <v-btn
              v-if="!detailedSearch"
              class="search-btn"
              color="#0048B2"
              variant="outlined"
              flat
              @click="detailedSearch=true;"
            >
              상세 검색
              <v-icon icon="mdi-magnify"
                  width="24px"
                  height="24px"
                  color="#D9D9D9">
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th
                v-for="(_, key) in tableHeaders"
                :key="key"
                :width="tableHeaders[key].width"
              >
                {{ tableHeaders[key].name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              @dblclick="onItemDbClick(index)"
            >
              <td
                v-for="(_, key) in item"
                :key="key"
              >
                <span v-if="typeof item[key] === 'number'">
                  {{ numToCommaString(item[key]) }}
                </span>
                <span v-else>
                  {{ item[key] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bottom-container">
        <v-row align="center" dense justify="space-between">
          <v-col cols="8">
            <select v-model="selCount" style="margin-left: 0px; width: 150px; height: 40px; border: 1px solid #DDDDDD; background-color: #F2F5F7; color: #6685A3;">
              <option value="10">10개씩 보기</option>
              <option value="20">20개씩 보기</option>
              <option value="30">30개씩 보기</option>
              <option value="50">50개씩 보기</option>
            </select>
          </v-col>
          <v-col align="right" cols="2" style="display: flex; align-items: center;">
            <span>페이지</span>
            <div class="pager-container ml-2">
              <span>{{ page }} / {{ pages }}</span>
            </div>
            <v-btn
              border
              class="ml-2"
              :disabled="page === 1"
              flat
              icon="mdi-chevron-left"
              rounded="0"
              size="small"
              @click="prevPage()"
            />
            <v-btn
              border
              class="ml-2"
              :disabled="page >= pages"
              flat
              icon="mdi-chevron-right"
              rounded="0"
              size="small"
              @click="nextPage()"
            />
          </v-col>
        </v-row>
      </div>
    </div>

  </v-container>
</template>

<script lang="ts" setup>
  // @ts-ignore
  import FlatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import { DateOption } from 'flatpickr/dist/types/options';
  import { Korean } from 'flatpickr/dist/l10n/ko.js';
  import { CustomLocale } from 'flatpickr/dist/types/locale';
  import { datetimeToyymmdd, numToCommaString } from '@/composables/utils';
  import { authApiStore } from '@/stores/authApiStore';
  import { salesApiStore } from '@/stores/salesApiStore';
  import SalesDialog from '@/components/dialogs/SalesDialog.vue';
  import ErrorDialog from '@/components/dialogs/ErrorDialog.vue';
  import LoadingDialog from '@/components/dialogs/LoadingDialog.vue';
  import { Case } from '@/interfaces/CaseInterface';

  // API store
  const authStore = authApiStore();
  const { getGid, getUid, getUserName, getName, getManagerName } = authStore;

  const apiStore = salesApiStore();
  const { apiCaseList } = apiStore;

  // 검색
  const searchText = ref<string>('');

  const mname = getManagerName();

  // Loading Dialog
  const showLoadingDialog = ref<boolean>(false);

  // Error Dialog
  const showErrorDialog = ref<boolean>(false);
  const errorTitle = ref<string>('영업관리 저장');
  const errorMsg = ref<string>('저장 중 문제가 발생했습니다.');
  const closeErrorDialog = () => {
    showErrorDialog.value = false;
  };

  onMounted(async () => {
    await getList(false);
  });

  const onSearch = async () => {
    await getList(true);
  };

  // 날짜 셀렉트박스
  const selOption = ref<string>('매출일');
  watch(selOption, () => {
    console.log(`selOption ${selOption.value}`);
  });

  // Date Pickers
  const sDate = ref<DateOption | DateOption[]>('');
  const eDate = ref<DateOption | DateOption[]>('');
  const fpConfig = ref<{dateFormat: string, locale: CustomLocale}>({ dateFormat: 'Y.m.d', locale: Korean });

  const detailedSearch = ref<boolean>(false); 
  
  // 수임료 셀렉트박스
  const selprogress = ref<string>('진행중');
  watch(selprogress, () => {
    console.log(`selprogress ${selprogress.value}`);
  });

  const managers = ref<Array<string>>([mname]);
  const selectedCase = ref<Case>({});

  // 담당자 셀렉트박스
  const selmanager = ref<string>(mname);
  watch(selmanager, () => {
    console.log(`selmanager ${selmanager.value}`);
    managers.value = [mname];
  });

  // Detail 다이얼로그
  const name = ref<string>();
  const showSalesDialog = ref<boolean>(false);
  const closeDialog = (update: boolean) => {
    showSalesDialog.value = false;
    if (update) {
      getList(false);
    }
  };

  const onRegist = async (index: number) => {
    if (caseList.value && caseList.value[index]) {//기존 목록 업데이트
      selectedCase.value = caseList.value[index];
      addNew.value = false;
      showSalesDialog.value = true;
    }
    else if(index == -1){//신규등록
      selectedCase.value = {applicant: '',
                            phone: '',
                            address: '',
                            email: '',
                            memo: '',
                            business: 0};
      addNew.value = true;
      showSalesDialog.value = true;
    }
    else {
      console.error('Invalid case index or caseList is empty');
    }
  };

  // 테이블
  const tableHeaders = ref<Record <string, {name: string, width: string, style: string}>>((
    {
      applicant: { name: '신청자명', width: '7%', style: '' },
      phone: { name: '전화번호', width: '9%', style: '' },
      address: { name: '주소', width: '27%', style: '' },
      casenum: { name: '사건번호', width: '11%', style: '' },
      created: { name: '등록일', width: '7%', style: '' },
      subdate: { name: '제출일', width: '7%', style: '' },
      fee: { name: '수임료', width: '8%', style: '' },
      paystate: { name: '분납/상태', width: '6%', style: '' },
      attorney: { name: '담당변호사', width: '6%', style: '' },
      mname: { name: '담당자', width: '7%', style: '' },
    }
  ));

  const tableData = ref<any[]>([]);
  const caseList = ref<Case[]>([]);
  const addNew = ref<boolean>(false);
  const maxCaseSeq = ref<number>(0);
  const total = ref<number>(0);

  const nextPage = async () => {
    if (page.value < pages.value) {
      page.value++;
      offset.value = (page.value - 1) * Number(selCount.value);
      await getList(false);
    }
  };

  const prevPage = async () => {
    if (page.value > 1) {
      page.value--;
      offset.value = (page.value - 1) * Number(selCount.value);
      await getList(false);
    }
  };

  // 데이터 조회
  const getList = async (search: boolean) => {
    showLoadingDialog.value = true;
    tableData.value = [];

    let query = `start=${offset.value}&count=${selCount.value}`;
    if (search) {
      query += `&search=${searchText.value}&sdate=${sDate.value}&edate=${eDate.value}`;
    }

    const response = await apiCaseList(query);
    if (!response || response.status !== 200) {
      errorTitle.value = '데이터 조회 실패';
      errorMsg.value = '데이터를 가져오지 못했습니다.';
      showErrorDialog.value = true;
    } else {
      // console.log(response.data)
      caseList.value = response.data.data;
      maxCaseSeq.value = Math.max(...caseList.value.map(item => item.case_seq || 0));

      // console.log("caseList", caseList.value);
      for (const item of response.data.data) {
        tableData.value.push({
          applicant: item.applicant,
          phone: item.phone,
          address: item.address,
          casenum: item.casenum,
          created: datetimeToyymmdd(item.createdAt),
          subdate: item.subdate,
          fee: numToCommaString(item.fee ? item.fee : 0),
          paystate: item.paystate,
          attorney: item.attorney,
          mname: getManagerName()
        });
      }
      total.value = response.data.total;
      pages.value = Math.ceil(total.value / Number(selCount.value));
    }
    showLoadingDialog.value = false;
  };

  // 게시글 수
  const offset = ref<number>(0);
  const page = ref<number>(1);
  const pages = ref<number>(1);

  const selCount = ref<string>('10');
  watch(selCount, () => {
    console.log(`selCount ${selCount.value}`);
    getList(false);
  });

  // 테이블 아이템 더블클릭
  const onItemDbClick = (index: number) => {
    // console.log(caseList.value[index]);
    onRegist(index);
  };
</script>

<style scoped>
.search-container {
  border-radius: 8px 8px 0px 0px;
  background-color: #FFFFFF;
  padding: 20px 35px;
  margin-left: 5px;
  margin-right: 33px;
}

.additional-container {
  border-radius: 0px 0px 8px 8px;
  border-left: 1px solid #EEEEEE;
  border-right: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
  background-color: #FFFFFF;
  padding: 10px 35px;
  height: 42px;
  margin-top: 0px;
  margin-left: 5px;
  margin-right: 33px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}

.search-text {
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  font-size: 14px;
  width: calc(100% - 70px);
  height: 40px;
  padding: 5px 10px;
  margin-top: 10px;
  margin-left: 28px;
}

.tcount-container {
  margin-top: 15px;
  margin-bottom: 15px;
}

select {
  width: 150px;
  height: 30px;
  padding: 5px 10px;
  margin-left: 10px;
  font-size: 12px;
  border: 1px solid #909090;
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
  border: 1px solid #909090; /* 테두리 설정 */
  border-radius: 5px; /* 모서리를 둥글게 설정 */
  padding: 5px 10px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 14px;
  width: 120px; /* 너비를 100%로 설정 */
  box-sizing: border-box; /* 테두리 및 패딩을 포함한 너비 계산 */
}

span {
  font-size: 14px;
}

.search-btn {
  border-radius: 4px;
  font-size: 14px;
  width: 110px;
  height: 40px;
  padding: 8px 10px;
}

.line-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1px;
  background-color: #EEEEEE;
}

.table-container {
  margin-top: 5px;
}

table {
  width: 98%;
  border-collapse: separate; /* 셀 테두리를 분리 */
  border-spacing: 0; /* 셀 사이의 간격을 0으로 설정 */
  border-radius: 8px; /* 테이블 외곽에 반지름 적용 */
  border: 1px solid #EEEEEE; /* 테이블 테두리 */
  border-bottom: 0px;
  background-color: #0048B2;
}
tbody tr {
  background-color: #FFFFFF;
  color: #333333;
}
tbody tr:hover {
  background-color: #F2F5F7;
  font-weight: 600;
  color: #003366;
  cursor: pointer;
}
th, td {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #EEEEEE;
  padding: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
}
th {
  text-align: center;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 400;
}
td {
  text-align: center;
  font-size: 12px;
}

.bottom-container {
  width: 100%;
  margin-top: 15px;
  padding-right: 5px;
}

.pager-container {
  border-radius: 4px;
  border: 1px solid #DDDDDD;
  padding: 7px 7px;
  width: 86px;
  height: 40px;
  text-align: center;
}

.banner-container {
  display: flex; /* Enable Flexbox */
  justify-content: flex-end; /* Align items to the right */
  background-image: url('@/assets/banner2.png'); /* Set the background image */
  background-size: cover; /* Cover the entire container */
  background-position: start; /* Center the image */
  width: 100%; /* Full width */
  height: 23.4vh; /* Set a height for the banner */
  position: relative; /* Position relative for absolute positioning of button */
}

.banner-container .banner-button {
  width: 148px; /* Change to viewport width for responsiveness */
  height: 38px; /* Adjust height as needed */
  position: absolute;
  top: 60%;
  left: 82%;
  background-image: url('@/assets/button1.png'); /* Set the background image */
  background-size: contain;
  background-position: center;
}

.banner-container .banner-subtext {
  width: 200px; /* Change to viewport width for responsiveness */
  height: 19px; /* Adjust height as needed */
  position: absolute;
  top: 20%;
  left: 82%;
  background-size: contain;
  background-position: center;
  color:#FFFFFF;
  font-size: 16px;
  font-family: 'Pretendard';
}

.horizontal-line {
  width: 100%; /* Full width of the container */
  height: 2px; /* Height of the line */
  background-color: #DDDDDD; /* Color of the line */
  margin-top: 10px;
}

.list-container {
  border-radius: 8px 8px 0px 0px;
  border: 1px solid #EEEEEE;
  background-color: #FFFFFF;
  padding: 20px 35px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 33px;
  margin-bottom: 15px;
}

</style>
