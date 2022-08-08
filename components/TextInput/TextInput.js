import styles from './TextInput.module.css'

export default function TextInput({
  placeholder,
  className,
  register,
  onInput,
  onClick,
  onBlur,
  spellCheck,
  defaultValue,
  value,
}) {



  return(
    <input value={value} defaultValue={defaultValue} spellCheck={spellCheck} onBlur={onBlur} onClick={onClick} placeholder={placeholder} className={`${styles.input} ${className}`} {...register} onInput={onInput} />
  )
}