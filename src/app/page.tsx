"use client";
import 
HeaderComponent from '@/components/common/HeaderComponent';
import styles from '@/styles/header.module.scss'
import Link from 'next/link';
import { IoMdInformationCircle } from 'react-icons/io';
import { IoChatbubblesSharp, IoShareSocialSharp } from 'react-icons/io5';

export default function Home() {
  return (
    <>
      <HeaderComponent rightElements={[
        <Link href="/about" key="about" className={styles.box}><IoMdInformationCircle />서비스소개</Link>,
        <Link  href="/feedback" key="feedback" className={styles.box}> <IoChatbubblesSharp /> 피드백</Link>,
        <button key="share" className={styles.box} onClick={()=>{alert("공유")}}> <IoShareSocialSharp /> 공유</button>,
      ]}/>
      <main>테스트</main>
    </>
  );
}