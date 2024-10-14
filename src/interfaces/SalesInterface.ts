export interface Sales {
  id?: number;
  code?: string; // 코드
  gid: number; // 그룹 ID
  uid: number; // 유저 ID
  saleser: string | undefined; // 담당자
  cid?: number; // 고객사 ID
  c_name: string; // 고객사명
  c_contact?: string; // 고객사 담당자
  c_phone?: string; // 고객사 전화
  c_email?: string; // 고객사 이메일
  s_path: number; // 판매 경로(직접/파트너)
  pid?: number; // 파트너 ID
  p_name?: string; // 파트너명
  p_contact?: string; // 파트너 담당자
  p_phone?: string; // 파트너 전화
  p_email?: string; // 파트너 이메일
  s_type: number; // 매출타입(상품/제품/서비스)
  prod_id?: number; // 상풍 ID
  s_name?: string; // 건명
  s_btype: number; // 판매유형(일반/과금)
  s_eday: string; // 매출 예상일
  s_amnt: number; // 매출액
  s_profit: number; // 매출 이익
  s_cost: number; // 원가
  s_step: number; // 영업 단계
  b_cycle?: number; // 과금주기
  b_day?: number; // 결제일
  b_start: string; // 과금 시작
  b_end: string; // 과금 종료
  b_data?: string; // 과금 데이터(json)
  purchase?: string;
  createdAt?: string; // 생성날짜
  updatedAt?: string; // 수정날짜
}

export interface CustomerInfo {
  id?: number;
  code?: string;
  name: string; // 고객사명
  contact?: string; // 고객사 담당자
  phone?: string; // 고객사 전화
  email?: string; // 고객사 이메일
  bnum: string; // 사업자등록번호
  ceo: string; // 대표
  btype: string; // 업태
  bkind: string; // 종목
  addr: string; // 주소
  fileid?: number; // 파일 ID
}

export interface FileInfo {
  id: number;
  gid: number; // 그룹 ID
  uid: number; // 유저 ID
  saleser?: string | undefined; // 담당자
  fname: string; // 파일명
  fpath?: string; // 파일 경로
  fsize?: number; // 파일 사이즈
  format?: string; // 포맷
  category?: string; // 카테고리
  parsed?: number; // 분석 여부
  createdAt?: Date;
  updatedAt?: Date;
}
