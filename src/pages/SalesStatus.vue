<template>
  <v-container fluid>
    <v-row class="mt-3" dense justify="start">
      <v-col>
        <span class="title">매출현황</span>
      </v-col>
    </v-row>
    <div class="search-container">
      <v-row align="center" class="mt-3" dense>
        <v-col cols="8">
          <span class="span-bold">년도</span>
          <select v-model="selYear">
            <option value="매출일">매출일</option>
            <option value="납품일">납품일</option>
            <option value="수정일">수정일</option>
          </select>
          <span class="span-bold ml-10">월</span>
          <select v-model="selMonth">
            <option value="매출일">매출일</option>
            <option value="납품일">납품일</option>
            <option value="수정일">수정일</option>
          </select>
          <span class="span-bold ml-10">일</span>
          <select v-model="selDay">
            <option value="매출일">매출일</option>
            <option value="납품일">납품일</option>
            <option value="수정일">수정일</option>
          </select>
        </v-col>
        <v-col align="right">
          <v-btn
            class="search-btn"
            color="#003366"
            flat
            @click="onSearch"
          >
            검색
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="additional-container">
      <span>추가 검색조건 설정하기</span>
      <v-icon class="ml-2" color="#777777" icon="mdi-chevron-down" size="small" />
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  // 검색
  const selYear = ref<number>();
  const selMonth = ref<number>();
  const selDay = ref<number>();

  const onSearch = async () => {
    //
  };
</script>

<style scoped>
.search-container {
  border-radius: 8px 8px 0px 0px;
  border: 1px solid #EEEEEE;
  background-color: #FFFFFF;
  padding: 20px 35px;
  margin-top: 15px;
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
}

select {
  width: 180px;
  height: 40px;
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
  border: 1px solid #909090; /* 테두리 설정 */
  border-radius: 5px; /* 모서리를 둥글게 설정 */
  padding: 5px 10px;
  margin-left: 15px;
  margin-right: 15px;
  width: 120px; /* 너비를 100%로 설정 */
  box-sizing: border-box; /* 테두리 및 패딩을 포함한 너비 계산 */
}

span {
  font-size: 14px;
}

.span-bold {
  font-size: 14px;
  font-weight: 700;
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

.new-btn {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 35px;
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
  background-color: #003366;
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
</style>
