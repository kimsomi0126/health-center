import React from 'react';
import Map from './Map';
import { INITIAL_CENTER, INITIAL_ZOOM, useMap } from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import Markers from '@/components/home/Markers';
import { useCurrentInfo } from '@/hooks/useCurrentInfo';
import { useSearchParams } from 'next/navigation';
import { Coordinates } from '@/types/info';

const MapSection = () => {
  const searchParams = useSearchParams();
  const zoom = searchParams.get('zoom');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const initialZoom = zoom ? Number(zoom) : INITIAL_ZOOM;
  const initialCenter: Coordinates =
    lat && lng ? [Number(lat), Number(lng)] : INITIAL_CENTER;
  // console.log(zoom, lat, lng);
  // 보관하고있던 SWR 좌표값 삭제
  const { clearCurrentInfo } = useCurrentInfo();
  // 커스텀 훅으로 Naver Map 초기화시도
  const { initializeMap } = useMap();
  const onLoadMap = (map?: NaverMap) => {
    initializeMap(map);
    // 네이버 API 문서 참조
    naver.maps.Event.addListener(map, 'click', clearCurrentInfo);
  };
  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      />
      <Markers />
    </>
  );
};

export default MapSection;
