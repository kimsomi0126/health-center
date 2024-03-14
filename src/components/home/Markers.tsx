'use client';
import { CITY_KEY } from '@/hooks/useInfo';
import { MAP_KEY } from '@/hooks/useMap';
import { Info } from '@/types/info';
import { ImageIcon, NaverMap } from '@/types/map';
import React from 'react';
import useSWR from 'swr';
import Marker from './Marker';
import { CURRENT_INFO_KEY, useCurrentInfo } from '@/hooks/useCurrentInfo';

const Markers = () => {
  // 좌표를 저장 및 삭제
  const { setCurrentInfo, clearCurrentInfo } = useCurrentInfo();
  // SWR에 보관된 정보를 추출
  const { data: currentInfo } = useSWR<Info>(CURRENT_INFO_KEY);
  // 보관하고 있는 SWR 을 활용
  // useSWR 에 TS 적용시 useSWR<타입>
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: infos } = useSWR<Info[]>(CITY_KEY);
  // 예외 처리
  if (!map || !infos) {
    return null;
  }
  // 클릭에 따라 true, false 인 경우 다른 ImageIcon 생성해서 리턴
  const changeMarkerIcon = (isSelected: boolean): ImageIcon => {
    return {
      url: isSelected ? '/hospital_active.png' : '/hospital.png',
      size: new naver.maps.Size(25, 32),
      origin: new naver.maps.Point(0, 0),
      scaledSize: new naver.maps.Size(17, 24),
    };
  };
  // 기본 아이콘 객체
  const iconImg = {
    url: '/hospital.png',
    size: new naver.maps.Size(25, 32),
    origin: new naver.maps.Point(0, 0),
    anchor: new naver.maps.Point(0, 0),
    scaledSize: new naver.maps.Size(17, 24),
  };

  return (
    <>
      {infos.map((item, index) => {
        return (
          <div key={index}>
            <Marker
              map={map}
              coordinates={item.coordinates}
              icon={changeMarkerIcon(false)}
              onClick={() => {
                setCurrentInfo(item);
              }}
            />
          </div>
        );
      })}
      {/* 만약 SWR에 보관된 좌표가 있는 경우 */}
      {currentInfo && (
        <div>
          <Marker
            map={map}
            coordinates={currentInfo.coordinates}
            icon={changeMarkerIcon(true)}
            key={9999999999}
            onClick={() => {
              // 보관된 좌표삭제
              clearCurrentInfo();
            }}
          />
          <div className="markerBox">
            <ul>
              <li>
                <b>{currentInfo.건강증진센터명}</b>
              </li>
              <li>{currentInfo.소재지도로명주소}</li>
              <li>
                {currentInfo.운영시작시각} ~ {currentInfo.운영종료시각} (
                {currentInfo.휴무일정보})
              </li>
              <li>{currentInfo.운영기관전화번호}</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Markers;
