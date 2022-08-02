import styles from './TextInput.module.css'

export default function TextInput({
  placeholder,
  className,
  register,
  onInput,
}) {



  return(
    <input placeholder={placeholder} className={`${styles.input} ${className}`} {...register} onInput={onInput} />
  )
}