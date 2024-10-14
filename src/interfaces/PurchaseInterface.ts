export interface Purchase {
  id?: number;
  code?: string;
  gid?: number; // 그룹 ID
  uid?: number; // 유저 ID
  sid?: number; // 영업 ID
  name: string; // 매입처
  detail: string; // 내용
  amnt: number; // 매입액
  invoice: string; // 계산서 발행일
  sendReq: string; // 출금 요청일
  send: string; // 출금 확인일
  delay: number; // 지연일
  accInfo: string; // 계좌정보
  contact: string; // 고객담당자
  phone: string; // 연락처
  bnum?: string; // 사업자등록번호
  ceo?: string; // 대표
  btype?: string; // 업태
  bkind?: string; // 종목
  addr?: string; // 주소
  fileid?: number; /// 파일 ID
  createdAt?: string; // 생성날짜
  updatedAt?: string; // 수정날짜
}
