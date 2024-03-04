"use client";
import HeaderComponent from '@/components/common/HeaderComponent'
import React from 'react'
import styles from '@/styles/header.module.scss'
import Link from 'next/link'
import { IoChatbubblesSharp, IoShareSocialSharp } from 'react-icons/io5';

const About = ():JSX.Element => {
  return (
    <>
      <HeaderComponent rightElements={[
        <Link href="/feedback" key="feedback" className={styles.box}><IoChatbubblesSharp />피드백</Link>,
        <button key="share" className={styles.box} onClick={()=>{alert("공유")}}><IoShareSocialSharp />공유</button>,
      ]}/>
      <main>서비스소개</main>
    </>
  )
}

export default About