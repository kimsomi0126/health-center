 import Link from 'next/link'
import React from 'react'
import styles from '@/styles/header.module.scss'
import Image from 'next/image'

// React.ReactNode는 React에서 만든 HTML 요소
// 여러개의 children 을 받을것이므로 배열로 설정
interface Props {
  rightElements ?: React.ReactNode[];
}

 const HeaderComponent:React.FC<Props> = ({rightElements}):JSX.Element => {
   return (
     <header className={styles.header}>
      <div className={styles.flexitem}>
        <Link href="/" className={styles.logo}>
          <Image src={"/next.svg"} width={80} height={20} quality={75} priority={true} alt='보건소 안내 서비스'/>
        </Link>
      </div>
      {rightElements && <div className={styles.flexitem}>{rightElements}</div>}
      {/* <div className={styles.flexitem}>
        <Link href="/about"  className={styles.box}>About</Link>
        <Link href="/feedback"  className={styles.box}>Feedback</Link>
        <Link href="/"  className={styles.box}>menu3</Link>
      </div> */}
     </header>
   )
 }
 
 export default HeaderComponent