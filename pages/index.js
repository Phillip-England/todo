import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import getUrl from '../utils/getUrl'

import Head from 'next/head'
import Image from 'next/image'

import SmallMessage from '../components/SmallMessage/SmallMessage'
import Bar from '../components/Bar/Bar.js'
import Button from '../components/Button/Button'
import Header from '../components/Header/Header'
import TextInput from '../components/TextInput/TextInput'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'

export default function Home({
}) {

  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const loginForm = useForm()
  const registerForm = useForm()
  const router = useRouter()

  const onRegister = async (data) => {
    const req = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const res = await req.json()
    setRegisterError(res.message)
  }

  const onLogin = async (data) => {
    data.email = data.email.toLowerCase()
    const req = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    setLoginError(res.error)
    if (res.redirect) {
      router.push(res.redirect)
    }
  }

  return (
    <>

      <Head>
        <title>Register</title>
      </Head>

      <Bar text={"What Drives You?"} />

      <SmallMessage header={'Get Going, Stay Productive'} text={'Consistency births passion'} />

      <form onSubmit={loginForm.handleSubmit(onLogin)} className={`${styles.form}`}>
        <Header text={"Log In"} />
        <ErrorMessage message={loginError} />
        <TextInput placeholder={'Email'} register={loginForm.register('email')} />
        <TextInput placeholder={'Password'} register={loginForm.register('password')} />  
        <Button text={'Log In'} type={'submit'} bg={'var(--main-color)'} />  
      </form>

      <form onSubmit={registerForm.handleSubmit(onRegister)} className={`${styles.form}`}>
        <Header text={"Register"} />
        <ErrorMessage message={registerError} />
        <TextInput placeholder={'Email'} register={registerForm.register('email')} />
        <TextInput placeholder={'Username'} register={registerForm.register('username')} />
        <TextInput placeholder={'Password'} register={registerForm.register('password')} />  
        <Button text={'Register'} type={'submit'} bg={'var(--green)'} />  
      </form>

    </>
  )
}