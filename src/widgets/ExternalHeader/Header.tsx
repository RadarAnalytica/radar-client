// @ts-ignore
import styles from './Header.module.scss'
// @ts-ignore
import { Logo } from '../../../_shared'



export const ExternalHeader = () => {
  return (
    <header className={styles.header}>
      <section className={styles.header__container}>
        <Logo />
      </section>
    </header>
  )
}


