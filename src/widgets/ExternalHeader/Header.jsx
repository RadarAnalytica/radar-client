import styles from './Header.module.css'
import { Logo } from '../../shared/ui/Logo/Logo'



export const ExternalHeader = () => {
  return (
    <header className={styles.header}>
      <section className={styles.header__container}>
        <Logo />
      </section>
    </header>
  )
}


