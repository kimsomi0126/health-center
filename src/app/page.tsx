'use client';
import HeaderComponent from '@/components/common/HeaderComponent';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import { IoMdInformationCircle } from 'react-icons/io';
import { IoChatbubblesSharp, IoShareSocialSharp } from 'react-icons/io5';
import MapSection from './map/MapSection';
import { useCallback, useEffect } from 'react';
import { getInfoList } from '@/apis/api';
import { useInfo } from '@/hooks/useInfo';
import { Info } from '@/types/info';
import { useMap } from '@/hooks/useMap';
import { useRouter } from 'next/navigation';
import copy from 'copy-to-clipboard';

export default function Home() {
  // 라우터 활용
  const router = useRouter();
  // 지도 관련 Hooks
  const { getMapOption } = useMap();
  // 현재 지도 좌표, zoom 정보 얻어오기
  const copyAndSaveInfo = useCallback(() => {
    const mapOptions = getMapOption();
    // console.log(mapOptions);
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;
    // console.log(query);
    // 패스 이동을 표현
    router.push(query);
    copy(query);
  }, [router, getMapOption]);

  // SWR 에 정의한 Hook 호출하기
  const { initializeInfo } = useInfo();

  // 페이지 준비가 되면 데이터 호출
  useEffect(() => {
    // 마커를 위한 데이터 호출
    const fetchInfoList = async () => {
      try {
        const res: Info[] = await getInfoList();
        // SWR 에 초기값 보관하기
        initializeInfo(res);
        // console.log(res);
        // res.map(info => console.log(info.coordinates));
      } catch (error) {
        console.log('에러가 발생습니다.', error);
      }
    };

    fetchInfoList();
  }, []);

  return (
    <>
      <HeaderComponent
        rightElements={[
          <Link href="/about" key="about" className={styles.box}>
            <IoMdInformationCircle />
            서비스소개
          </Link>,
          <Link href="/feedback" key="feedback" className={styles.box}>
            {' '}
            <IoChatbubblesSharp /> 피드백
          </Link>,
          <button
            key="share"
            className={styles.box}
            onClick={() => {
              // alert('공유');
              // 현재 네이버 좌표/확대비율을 보관해서 전달하도록 준비
              copyAndSaveInfo();
            }}
          >
            {' '}
            <IoShareSocialSharp /> 공유
          </button>,
        ]}
      />
      <main>
        <MapSection />
      </main>
    </>
  );
}
