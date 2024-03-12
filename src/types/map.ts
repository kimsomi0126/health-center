import { Coordinates } from './info';

// 네이버 지도 맵에 대한 타입
export type NaverMap = naver.maps.Map;

export type ImageIcon = {
  url: string;
  size: naver.maps.Size;
  origin: naver.maps.Point;
  anchor: naver.maps.Point;
  scaledSize: naver.maps.Size;
};

// 지도 마커를 위한 데이터 타입
export type Marker = {
  map: NaverMap;
  coordinates: Coordinates;
  icon: ImageIcon;
};
