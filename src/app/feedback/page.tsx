"use client";
import HeaderComponent from '@/components/common/HeaderComponent'
import React from 'react'
import styles from '@/styles/header.module.scss'
import Link from 'next/link'
import { IoShareSocialSharp } from 'react-icons/io5';
import { IoMdInformationCircle } from 'react-icons/io';

const Feedback = ():JSX.Element => {
  return (
    <>
      <HeaderComponent rightElements={[
        <Link href="/about" key="about" className={styles.box}><IoMdInformationCircle />서비스소개</Link>,
        <button key="share" className={styles.box} onClick={()=>{alert("공유")}}><IoShareSocialSharp />공유</button>,
      ]}/>
      <main>
        피드백페이지
      </main>
    </>
  )
}

export default Feedback