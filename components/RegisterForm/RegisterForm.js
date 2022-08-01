import styles from './RegisterForm.module.css'

import Link from 'next/link'

import TextInput from '../TextInput/TextInput'
import Button from '../Button/Button'
import Header from '../Header/Header'

export default function RegisterForm() {
  return(
    <form className={styles.form}>
      <Header
        text={'Sign-Up'}
        className={styles.header}
        fontSize={'var(--f-4)'}
      />
      <TextInput 
        placeholder={'Email'}
        className={styles.inputs}
      />
      <TextInput 
        placeholder={'Password'}
        className={styles.inputs}
      />
      <Button
        text={'Register'}
        className={styles.submit}
        type={'submit'}
      />
      <Link href={'/login'}>
          <a>
            <Button
              text={'Already Have An Account?'}
              className={styles.already}
              type={'button'}
            />
          </a>
      </Link>
      
    </form>
  )
}