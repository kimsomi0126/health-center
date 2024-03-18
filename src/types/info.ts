// 위도를 표현하는 타입
type Lat = number;
// 경도를 표현하는 타입
type Lng = number;
// 위도와 경도를 묶어준 타입
export type Coordinates = [Lat, Lng];
// json에서 온 데이터를 위한 타입 정의
export type Info = {
  건강증진센터명?: string;
  건강증진센터구분?: string;
  소재지도로명주소?: string;
  소재지지번주소?: string;
  coordinates: Coordinates[];
  건강증진업무내용?: string;
  운영시작시각?: string;
  운영종료시각?: string;
  휴무일정보?: string;
  건물면적?: string;
  의사수?: string;
  간호사수?: string;
  사회복지사수?: string;
  영양사수?: string;
  기타인력현황?: string;
  기타이용안내?: string;
  운영기관전화번호?: string;
  운영기관명?: string;
  관리기관전화번호?: string;
  관리기관명?: string;
  데이터기준일자?: string;
  제공기관코드?: string;
  제공기관명?: string;
};
